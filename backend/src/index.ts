import express from 'express';
import cors from 'cors';
import atmRoutes from './routes/atmRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', atmRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ATM Backend Server is running!',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`ATM Backend Server running on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}/api`);
  console.log('Available endpoints:');
  console.log('POST /api/auth - Authenticate with PIN');
  console.log('GET /api/balance/:userId - Get account balance');
  console.log('POST /api/withdraw - Withdraw money');
  console.log('POST /api/deposit - Deposit money');
  console.log('GET /api/transactions/:userId - Get transaction history');
});