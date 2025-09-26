# ATM Simulation Project

A demo ATM simulation application built with node + react. This project demonstrates a banking interface with PIN authentication, balance inquiries, money withdrawals, and deposits.

## Developer Note

I tried to reflect the mock screens as much as possible here, but it didn't turn out exactly as I wanted. However, I focused on improving the project with code quality and feature enhancements. I added features such as lazy loading, state machine, internationalisation, atomic principles, CSS tokens, and fluid design to enhance the project.

## Project Overview

The application follows atomic design principles for component architecture and implements a minimal backend API for demo banking operations.

### Key Features

- **PIN-based Authentication**: Secure 4-digit PIN authentication system
- **Balance Inquiry**: Check account balance in real-time
- **Money Withdrawal**: Withdraw funds with balance validation
- **Money Deposit**: Deposit funds to account
- **Multi-language Support**: English and Spanish language options
- **Responsive Design**: Mobile-friendly ATM interface
- **Transaction History**: Track all banking operations
- **Real-time Updates**: Instant balance and transaction updates

## Architecture

### Frontend Architecture

- **Framework**: React 19+ with TypeScript
- **State Management**: Redux Toolkit for global state
- **Styling**: TailwindCSS for responsive design
- **Component Structure**: Atomic Design Pattern
  - **Atoms**: Basic UI elements (Button, Input, Display)
  - **Molecules**: Simple component combinations (ATMButton, ScreenInstruction)
  - **Organisms**: Complex UI sections (ATMScreen, ATMSidebar)
  - **Layouts**: Page-level components (ATMLayout, ScreenLayouts)
  - **Screens**: Complete views (WelcomeScreen, PinEntryScreen, etc.)

### Backend Architecture

- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **API Design**: RESTful API with minimal error handling for demo purposes
- **Data**: Mock data service (ready for database integration)

### Tech Stack

#### Frontend

- React 19.1.1
- TypeScript 5.8.3
- Redux Toolkit 2.9.0
- TailwindCSS 3.4.17
- Vite 7.1.7 (Build tool)
- i18next (Internationalization)
- Axios (HTTP client)

#### Backend

- Node.js with Express 5.1.0
- TypeScript 5.9.2
- CORS enabled
- RESTful API design

## Project Structure

```
Frontend_HW_Project/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Atomic design components
│   │   │   ├── atoms/       # Basic UI elements
│   │   │   ├── molecules/   # Component combinations
│   │   │   ├── organisms/   # Complex UI sections
│   │   │   ├── layouts/     # Page layouts
│   │   │   └── screens/     # Complete screen views
│   │   ├── features/        # Redux slices
│   │   ├── services/        # API services
│   │   ├── i18n/           # Internationalization
│   │   ├── locales/        # Translation files
│   │   └── types/          # TypeScript definitions
└── backend/                 # Express backend API
    └── src/
        ├── controllers/     # Request handlers
        ├── routes/         # API routes
        ├── data/           # Mock data service
        └── types.ts        # Type definitions
```

## Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone
   cd Frontend_HW_Project
   ```

2. **Install Backend Dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

### Development Mode

1. **Start the Backend Server**

   ```bash
   cd backend
   npm run dev
   ```

   The backend server will start on http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will start on http://localhost:5173

### Production Build

1. **Build the Backend**

   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## API Endpoints

The backend provides the following REST API endpoints:

- `POST /api/auth` - PIN authentication
- `GET /api/balance/:userId` - Get account balance
- `POST /api/withdraw` - Withdraw money
- `POST /api/deposit` - Deposit money
- `GET /api/transactions/:userId` - Get transaction history

## Key Components

### State Management

The application uses Redux Toolkit with the following slices:

- **authSlice**: User authentication state
- **accountSlice**: Account information and balance
- **transactionSlice**: Transaction history management
- **uiSlice**: UI state and navigation

### Services

- **atmApi**: Centralized API communication service
- **navigationService**: Screen navigation management
- **screenRenderService**: Dynamic screen rendering with preloading

### Internationalization

- Supports English and Spanish languages
- Automatic language detection
- Easy to extend for additional languages

## Development Features

### Code Quality

- ESLint configuration for code quality
- TypeScript for type safety
- Modular component architecture

### Performance Optimization

- Screen preloading strategy
- Lazy loading of non-critical components
- State Machine Service

### Responsive Design

- Mobile-first approach
- TailwindCSS utility classes
- Adaptive ATM interface

## Testing and Authentication

### Demo Credentials

The application includes mock data for testing. You can use 4-digit PIN to authenticate (UI Hints)

### Available Test Accounts

Check `backend/src/data/mockData.ts` for available test accounts with different balances.

## Short Falls

Need to implement grafiti sprites
