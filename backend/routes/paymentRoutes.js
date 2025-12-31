import express from 'express';
import { createPaymentOrder } from '../controllers/paymentController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/create-order').post(protect, createPaymentOrder);

export default router;
