import axios, { type AxiosResponse } from 'axios'

// API Base Configuration
const API_BASE_URL = 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    console.error('API Request Error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for logging and error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`API Response: ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// API Types (matching backend)
export type AuthRequest = {
  pin: string
}

export type AuthResponse = {
  success: boolean
  user?: {
    id: string
    name: string
    cardType: 'visa' | 'mastercard' | 'amex'
    balance: number
  }
  message: string
}

export type TransactionRequest = {
  userId: string
  amount: number
}

export type TransactionResponse = {
  success: boolean
  transaction?: {
    id: string
    userId: string
    type: 'deposit' | 'withdrawal'
    amount: number
    timestamp: string
    balanceAfter: number
  }
  newBalance?: number
  message: string
}

export type BalanceResponse = {
  success: boolean
  balance?: number
  message: string
}



// ATM API Service
export const atmApi = {
  // Authenticate user with PIN
  authenticate: async (pin: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>('/auth', { pin })
    return response.data
  },

  // Get user balance
  getBalance: async (userId: string): Promise<BalanceResponse> => {
    const response = await apiClient.get<BalanceResponse>(`/balance/${userId}`)
    return response.data
  },

  // Withdraw money
  withdraw: async (userId: string, amount: number): Promise<TransactionResponse> => {
    const response = await apiClient.post<TransactionResponse>('/withdraw', { userId, amount })
    return response.data
  },

  // Deposit money
  deposit: async (userId: string, amount: number): Promise<TransactionResponse> => {
    const response = await apiClient.post<TransactionResponse>('/deposit', { userId, amount })
    return response.data
  },


}

export default atmApi