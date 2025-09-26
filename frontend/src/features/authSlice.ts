import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { atmApi } from '../services/atmApi'
import { clearPin as clearPinUI } from './uiSlice'
import type { CardType } from '../types'

// Types
export type User = {
  id: string
  name: string
  cardType: CardType
  balance: number
}

export type AuthState = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  pin: string
}

// Initial State
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  pin: '',
}

// Async Thunks
export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async (pin: string, { rejectWithValue, dispatch }) => {
    try {
      const response = await atmApi.authenticate(pin)
      
      if (response.success && response.user) {
        return {
          user: response.user,
          message: response.message,
        }
      } else {
        // Clear PIN input on authentication failure
        dispatch(clearPinUI())
        return rejectWithValue(response.message || 'Authentication failed')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Network error'
      // Clear PIN input on network error as well
      dispatch(clearPinUI())
      return rejectWithValue(errorMessage)
    }
  }
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload
      state.error = null
    },
    clearPin: (state) => {
      state.pin = ''
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.pin = ''
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Authenticate User
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.user = null
      })
  },
})

// Actions
export const { setPin, clearPin, logout, clearError } = authSlice.actions

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error
export const selectPin = (state: { auth: AuthState }) => state.auth.pin

export default authSlice.reducer