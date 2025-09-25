import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { atmApi } from '../services/atmApi'

// Types
export type Transaction = {
  id: string
  userId: string
  type: 'deposit' | 'withdrawal' | 'balance_inquiry'
  amount?: number
  timestamp: string
  balanceAfter: number
}

export type TransactionState = {
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
  currentTransaction: Transaction | null
}

// Initial State
const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
  currentTransaction: null,
}

// Async Thunks
export const withdrawMoney = createAsyncThunk(
  'transactions/withdraw',
  async ({ userId, amount }: { userId: string; amount: number }, { rejectWithValue }) => {
    try {
      const response = await atmApi.withdraw(userId, amount)
      
      if (response.success && response.transaction && response.newBalance !== undefined) {
        return {
          transaction: response.transaction,
          newBalance: response.newBalance,
          message: response.message,
        }
      } else {
        return rejectWithValue(response.message || 'Withdrawal failed')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      return rejectWithValue(errorMessage)
    }
  }
)

export const depositMoney = createAsyncThunk(
  'transactions/deposit',
  async ({ userId, amount }: { userId: string; amount: number }, { rejectWithValue }) => {
    try {
      const response = await atmApi.deposit(userId, amount)
      
      if (response.success && response.transaction && response.newBalance !== undefined) {
        return {
          transaction: response.transaction,
          newBalance: response.newBalance,
          message: response.message,
        }
      } else {
        return rejectWithValue(response.message || 'Deposit failed')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      return rejectWithValue(errorMessage)
    }
  }
)



// Slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.transactions = []
      state.currentTransaction = null
      state.error = null
    },
    clearTransactionError: (state) => {
      state.error = null
    },
    setCurrentTransaction: (state, action: PayloadAction<Transaction | null>) => {
      state.currentTransaction = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Withdraw Money
      .addCase(withdrawMoney.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(withdrawMoney.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTransaction = action.payload.transaction
        // Add to transaction history (most recent first)
        state.transactions.unshift(action.payload.transaction)
        state.error = null
      })
      .addCase(withdrawMoney.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
      
      // Deposit Money
      .addCase(depositMoney.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(depositMoney.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTransaction = action.payload.transaction
        // Add to transaction history (most recent first)
        state.transactions.unshift(action.payload.transaction)
        state.error = null
      })
      .addCase(depositMoney.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })

  },
})

// Actions
export const { 
  clearTransactions, 
  clearTransactionError, 
  setCurrentTransaction
} = transactionSlice.actions

// Selectors
export const selectTransactions = (state: { transactions: TransactionState }) => state.transactions.transactions
export const selectTransactionLoading = (state: { transactions: TransactionState }) => state.transactions.isLoading
export const selectTransactionError = (state: { transactions: TransactionState }) => state.transactions.error
export const selectCurrentTransaction = (state: { transactions: TransactionState }) => state.transactions.currentTransaction

export default transactionSlice.reducer