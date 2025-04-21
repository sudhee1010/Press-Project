// models/token.js
import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  tokenNumber: { type: Number,
     required: true
     },
  customerName: { type: String, required: true }, // or reference onlineCustomer if needed
  status: {
    type: String,
    enum: ["waiting", "in-progress", "completed"],
    default: "waiting"
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Token", tokenSchema);
