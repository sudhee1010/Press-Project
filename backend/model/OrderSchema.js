import mongoose, { Schema } from "mongoose"
const OrderSchema = new Schema({

    // Customer Info
    walkInCustomer: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        // email: { type: String, required: true }
    },

    onlineCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OnlineCustomer',
        default:null
    },

    // Created By (Receptionist/Admin)
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required:true
    },

    // Job Details
    jobType: {
        type: String,
        required: true
    }, // e.g., brochure, banner

    specifications: {
        size: { type: String },
        quantity: { type: Number},
        material: { type: String}

    },

    // deadline: {
    //     type: Date
    // },
    notes: String,

    // Workflow Status
    status: {
        type: String,
        enum: [
            'pending_design',
            'in_design',
            'design_ready',
            'design_approved',
            'in_printing',
            'printing_done',
            'in_production',
            'completed',
            'delivered'
        ],
        default: 'pending_design'
    },

    // Type of order Needed
    orderType: {
        type: String,
        enum: ['design', 'design_print', 'design_print_production'],
        default: 'design',
        required: true
    },

    // Assigned Designer
    assignedDesigner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Uploaded design files
    designFiles: [String],
    // Billing Info
    totalAmount: {
        type: Number
    },
    amountPaid: {
        type: Number
    },

    paymentStatus: {
        type: String,
        enum: ['payment_unpaid', 'payment_partially_paid', 'payment_received', 'payment_credit'],
        default: 'payment_unpaid'
    },

    // Printing Info
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'printingPressunit',
        required: true
    },

    // Production Info
    productionStatus: {
        type: String,
        enum: ['not_started', 'in_production', 'completed'],
        default: 'not_started'
    },

    // Delivery Info
    delivered: {
        type: Boolean,
        default: false
    },

    deliveryDate: Date,


}, { timestamps: true });




export const Order = mongoose.model("Order", OrderSchema)