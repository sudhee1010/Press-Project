import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import Payment from '../models/PaymentSchema.js';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

export const createRazorpayOrder = async (req, res) => {
  const { amount, orderId, userId } = req.body;

  const options = {
    amount: amount * 100, // in paise
    currency: 'INR',
    receipt: `receipt_${orderId}`,
    payment_capture: 1
  };

  try {
    const razorpayOrder = await razorpay.orders.create(options);

    const payment = new Payment({
      orderId,
      userId,
      amount,
      currency: 'INR',
      status: 'pending',
      transactionId: razorpayOrder.id
    });

    await payment.save();

    res.status(200).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

