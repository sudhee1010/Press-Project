import mongoose from "mongoose";
const tokenCounterSchema = new mongoose.Schema({
    printingUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'PrintingUnit', unique: true },
    lastTokenNumber: { type: Number, default: 0 }
  });
  
  export const token = mongoose.model('TokenCounter', tokenCounterSchema);
  
  