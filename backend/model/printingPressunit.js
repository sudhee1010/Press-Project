import mongoose from 'mongoose';

const printingUnitSchema = new mongoose.Schema({
  // Basic info
  name: { type: String, required: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  phone: { type: String, require: true },
  whatsapp: { type: String, require: true },
  address: { type: String, require: true },
  role: { type: String, default: 'admin' },


  // App status (can be disabled by superadmin if payment is pending)
  isActive: { type: Boolean, default: true },

  // Billing/subscription info
  subscription: {
    isPaid: { type: Boolean, default: false },
    startDate: { type: Date },
    nextDueDate: { type: Date },
    lastPaymentDate: { type: Date },
    amount: { type: Number }
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],

  // Optional: settings for future integrations
  settings: {
    tokenPrefix: { type: String, default: 'TKN' },
    notifyViaWhatsApp: { type: Boolean, default: false }

  },

  // verification by superadmin
  verified: {
    type: Boolean,
    default: false
  },
  // verification by superadmin (approval to login)
  approval: { type: Boolean, default: false },
  rejected: {
    type: Boolean,
    default: false
  },

}, { timestamps: true });

export const printingPressunit = mongoose.model('PrintingPressunit', printingUnitSchema);
