import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { atmApi } from '../services/atmApi'

// Types
export type AccountState = {
  balance: number | null
  isLoading: boolean
  error: string | null
  lastUpdated: string | null
}

// Initial State
const initialState: AccountState = {
  balance: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
}

// Async Thunks
export const fetchBalance = createAsyncThunk(
  'account/fetchBalance',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await atmApi.getBalance(userId)
      
      if (response.success && response.balance !== undefined) {
        return {
          balance: response.balance,
          timestamp: new Date().toISOString(),
        }
      } else {
        return rejectWithValue(response.message || 'Failed to fetch balance')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      return rejectWithValue(errorMessage)
    }
  }
)

// Slice
const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    updateBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload
      state.lastUpdated = new Date().toISOString()
    },
    clearBalance: (state) => {
      state.balance = null
      state.lastUpdated = null
      state.error = null
    },
    clearAccountError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Balance
      .addCase(fetchBalance.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.isLoading = false
        state.balance = action.payload.balance
        state.lastUpdated = action.payload.timestamp
        state.error = null
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
      })
  },
})

// Actions
export const { updateBalance, clearBalance, clearAccountError } = accountSlice.actions

// Selectors
export const selectAccount = (state: { account: AccountState }) => state.account
export const selectBalance = (state: { account: AccountState }) => state.account.balance
export const selectAccountLoading = (state: { account: AccountState }) => state.account.isLoading
export const selectAccountError = (state: { account: AccountState }) => state.account.error
export const selectLastUpdated = (state: { account: AccountState }) => state.account.lastUpdated

export default accountSlice.reducer