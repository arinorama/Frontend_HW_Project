import { User, Transaction } from '../types';

// Mock ATM Users - In production, this would come from a database
export const mockUsers: User[] = [
  {
    id: '1',
    pin: '1234',
    name: 'Peter Parker',
    cardType: 'visa',
    balance: 1500.00
  },
  {
    id: '2', 
    pin: '5678',
    name: 'Jane Smith',
    cardType: 'mastercard',
    balance: 2300.50
  },
  {
    id: '3',
    pin: '9999',
    name: 'Mike Johnson', 
    cardType: 'maestro',
    balance: 750.25
  }
];

// Mock Transaction History
export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    userId: '1',
    type: 'withdrawal',
    amount: 100,
    timestamp: new Date('2024-12-20T10:30:00'),
    balanceAfter: 1500.00
  },
  {
    id: 'tx2', 
    userId: '1',
    type: 'deposit',
    amount: 200,
    timestamp: new Date('2024-12-19T15:45:00'),
    balanceAfter: 1600.00
  }
];

// Helper function to find user by PIN
export const findUserByPin = (pin: string): User | undefined => {
  return mockUsers.find(user => user.pin === pin);
};

// Helper function to update user balance
export const updateUserBalance = (userId: string, newBalance: number): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUsers[userIndex].balance = newBalance;
    return true;
  }
  return false;
};

// Helper function to add transaction
export const addTransaction = (transaction: Omit<Transaction, 'id'>): Transaction => {
  const newTransaction: Transaction = {
    ...transaction,
    id: `tx${Date.now()}` // Simple ID generation
  };
  mockTransactions.push(newTransaction);
  return newTransaction;
};