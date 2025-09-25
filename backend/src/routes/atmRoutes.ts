import { Router } from 'express';
import { authenticateUser, getBalance, withdrawMoney, depositMoney } from '../controllers/atmController.js';

const router = Router();

// Auth route
router.post('/auth', authenticateUser);

// Account routes  
router.get('/balance/:userId', getBalance);
router.post('/withdraw', withdrawMoney);
router.post('/deposit', depositMoney);

export default router;