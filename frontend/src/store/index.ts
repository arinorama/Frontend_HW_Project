import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/authSlice.js'
import accountSlice from '../features/accountSlice.js'
import transactionSlice from '../features/transactionSlice.js'
import uiSlice from '../features/uiSlice.js'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    account: accountSlice,
    transactions: transactionSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch