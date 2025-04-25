import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  tokenNumber: { type: Number, required: true },

  customerName: { type: String }, // no longer required

  status: {
    type: String,
    enum: ["waiting", "in-progress", "completed"],
    default: "waiting"
  },

  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shop", // or "User"
    required: true
  },

  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order"
  },

  issuedAt: {
    type: Date,
    default: Date.now
  },

  
});

export default mongoose.model("Token", tokenSchema);
