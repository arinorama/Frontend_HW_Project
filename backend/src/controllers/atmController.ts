import { Request, Response } from 'express';
import { AuthRequest, AuthResponse, TransactionRequest, TransactionResponse, User } from '../types.js';
import { findUserByPin, updateUserBalance, addTransaction, mockUsers } from '../data/mockData.js';

// TODO: Implement real database connection
// NOTE: Currently using mock data for demo purposes

// POST /api/auth - PIN Authentication
export const authenticateUser = (req: Request<Record<string, never>, AuthResponse, AuthRequest>, res: Response<AuthResponse>): Response<AuthResponse> | void => {
  const { pin } = req.body;

  if (!pin) {
    return res.status(400).json({
      success: false,
      message: 'PIN is required'
    });
  }

  const user = findUserByPin(pin);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid PIN. Please try again.'
    });
  }

  res.json({
    success: true,
    user,
    message: 'Authentication successful'
  });
};

// GET /api/balance/:userId - Check Balance
export const getBalance = (req: Request, res: Response): Response | void => {
  const { userId } = req.params;
  
  // Find user by ID
  const currentUser = mockUsers.find((u: User) => u.id === userId);
  
  if (!currentUser) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  res.json({
    success: true,
    balance: currentUser.balance,
    message: 'Balance retrieved successfully'
  });
};

// POST /api/withdraw - Withdraw Money
export const withdrawMoney = (req: Request<Record<string, never>, TransactionResponse, TransactionRequest>, res: Response<TransactionResponse>): Response<TransactionResponse> | void => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({
      success: false,
      message: 'User ID and amount are required'
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be greater than 0'
    });
  }

  // Find user and check balance
  const user = mockUsers.find((u: User) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  if (user.balance < amount) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient funds'
    });
  }

  // Process withdrawal
  const newBalance = user.balance - amount;
  updateUserBalance(userId, newBalance);

  // Add transaction record
  const transaction = addTransaction({
    userId,
    type: 'withdrawal',
    amount,
    timestamp: new Date(),
    balanceAfter: newBalance
  });

  res.json({
    success: true,
    transaction,
    newBalance,
    message: `Successfully withdrew $${amount}`
  });
};

// POST /api/deposit - Deposit Money  
export const depositMoney = (req: Request<Record<string, never>, TransactionResponse, TransactionRequest>, res: Response<TransactionResponse>): Response<TransactionResponse> | void => {
  const { userId, amount } = req.body;

  if (!userId || !amount) {
    return res.status(400).json({
      success: false,
      message: 'User ID and amount are required'
    });
  }

  if (amount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Amount must be greater than 0'
    });
  }

  // Find user
  const user = mockUsers.find((u: User) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found'
    });
  }

  // Process deposit
  const newBalance = user.balance + amount;
  updateUserBalance(userId, newBalance);

  // Add transaction record
  const transaction = addTransaction({
    userId,
    type: 'deposit',
    amount,
    timestamp: new Date(),
    balanceAfter: newBalance
  });

  res.json({
    success: true,
    transaction,
    newBalance,
    message: `Successfully deposited $${amount}`
  });
};

