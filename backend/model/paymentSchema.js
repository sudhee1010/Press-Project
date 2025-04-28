import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  paymentMethod: {
    type: String,
    enum: ['card', 'cash', 'upi', 'wallet', 'netbanking'],
    default: 'cash'
  },
  status: {
    type: String,
    enum: ['pending', 'successful', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: { type: String }, // Razorpay Order ID
  gatewayResponse: { type: Object },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date }
});

export default mongoose.model('Payment', paymentSchema);

