// ATM Types
export interface User {
  id: string;
  pin: string;
  name: string;
  cardType: 'star' | 'pulsa' | 'maestro' | 'mastercard' | 'plus' | 'visa';
  balance: number;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'balance_inquiry';
  amount?: number;
  timestamp: Date;
  balanceAfter: number;
}

export interface AuthRequest {
  pin: string;
}

export interface TransactionRequest {
  userId: string;
  amount: number;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  message: string;
}

export interface TransactionResponse {
  success: boolean;
  transaction?: Transaction;
  newBalance?: number;
  message: string;
}