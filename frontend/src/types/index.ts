// Screen Types
export type ScreenType = 
  | 'welcome' 
  | 'pin-entry' 
  | 'main-menu' 
  | 'balance' 
  | 'withdraw' 
  | 'deposit';

// User Types
export type User = {
  id: string;
  name: string;
  pin: string;
  cardType: 'VISA' | 'MASTERCARD' | 'AMEX';
  balance: number;
}

// ATM State Types
export type ATMState = {
  currentScreen: ScreenType;
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Button Configuration
export type ButtonConfig = {
  label: string | null;
  action: string | null;
  isEnabled: boolean;
}

export type ScreenButtonConfig = {
  left: (string | null)[];
  right: (string | null)[];
}

// API Types
export type AuthRequest = {
  pin: string;
}

export type AuthResponse = {
  success: boolean;
  user?: User;
  message?: string;
}

export type TransactionRequest = {
  userId: string;
  amount: number;
  type: 'withdraw' | 'deposit';
}

export type TransactionResponse = {
  success: boolean;
  newBalance?: number;
  message?: string;
}

// Dynamic screen configuration function with translation support
export const getScreenConfigs = (t: (key: string) => string): Record<ScreenType, ScreenButtonConfig> => ({
  welcome: {
    left: [t('languages.languageToggle'), null, null, null],
    right: [null, null, null, t('buttons.enterPin')]
  },
  'pin-entry': {
    left: [t('languages.languageToggle'), null, null, null],
    right: [null, null, t('buttons.clear'), t('buttons.cancel')]
  },
  'main-menu': {
    left: [t('languages.languageToggle'), null, t('buttons.withdraw'), t('buttons.deposit')],
    right: [null, t('buttons.exit'), t('buttons.balance'), t('buttons.reEnterPin')]
  },
  balance: {
    left: [t('languages.languageToggle'), null, null, null],
    right: [null, null, t('buttons.mainMenu'), null]
  },
  withdraw: {
    left: [t('languages.languageToggle'), null, null, null],
    right: [null, t('buttons.cancel'), t('buttons.confirm'), t('buttons.mainMenu')]
  },
  deposit: {
    left: [t('languages.languageToggle'), null, null, null],
    right: [null, t('buttons.cancel'), t('buttons.confirm'), t('buttons.mainMenu')]
  }
})

// Backup static screen configurations (fallback)
export const SCREEN_CONFIGS: Record<ScreenType, ScreenButtonConfig> = {
  welcome: {
    left: [null, null, null, null],
    right: [null, null, null, 'Enter PIN']
  },
  'pin-entry': {
    left: [null, null, null, null],
    right: [null, null, 'Clear', 'Cancel']
  },
  'main-menu': {
    left: [null, null, 'Withdraw', 'Deposit'],
    right: [null, 'Exit', 'Balance', 'Re-Enter PIN']
  },
  balance: {
    left: [null, null, null, null],
    right: [null, null, 'Main Menu', null]
  },
  withdraw: {
    left: [null, null, null, null],
    right: [null, 'Cancel', 'Confirm', 'Main Menu']
  },
  deposit: {
    left: [null, null, null, null],
    right: [null, 'Cancel', 'Confirm', 'Main Menu']
  }
};