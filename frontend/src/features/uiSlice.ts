import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Types
export type UIState = {
  // PIN Entry UI
  pinClearTrigger: number
  
  // Transaction UI
  currentAmount: string | null
  transactionType: 'withdraw' | 'deposit' | null
  
  // Screen UI States
  isLoading: boolean
  error: string | null
}

const initialState: UIState = {
  pinClearTrigger: 0,
  currentAmount: null,
  transactionType: null,
  isLoading: false,
  error: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // PIN UI Actions
    clearPin: (state) => {
      state.pinClearTrigger += 1
    },
    
    // Transaction UI Actions
    setCurrentAmount: (state, action: PayloadAction<string | null>) => {
      state.currentAmount = action.payload
    },
    setTransactionType: (state, action: PayloadAction<'withdraw' | 'deposit' | null>) => {
      state.transactionType = action.payload
    },
    
    // General UI Actions
    setUILoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setUIError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    clearUIError: (state) => {
      state.error = null
    },
    
    // Clear all UI state
    clearUIState: (state) => {
      state.currentAmount = null
      state.transactionType = null
      state.error = null
      state.isLoading = false
    }
  }
})

// Actions
export const { 
  clearPin,
  setCurrentAmount,
  setTransactionType,
  setUILoading,
  setUIError,
  clearUIError,
  clearUIState
} = uiSlice.actions

// Selectors
export const selectPinClearTrigger = (state: { ui: UIState }) => state.ui.pinClearTrigger
export const selectCurrentAmount = (state: { ui: UIState }) => state.ui.currentAmount
export const selectTransactionType = (state: { ui: UIState }) => state.ui.transactionType
export const selectUILoading = (state: { ui: UIState }) => state.ui.isLoading
export const selectUIError = (state: { ui: UIState }) => state.ui.error

export default uiSlice.reducer