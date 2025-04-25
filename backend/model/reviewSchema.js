import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    printingUnit: { type: mongoose.Schema.Types.ObjectId, ref: 'PrintingPressUnit', required: true }
},
    { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);
