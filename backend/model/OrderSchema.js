import mongoose, { Schema } from "mongoose"
const OrderSchema = new Schema({
    tokenNumber: String, // Unique token given to the customer

    // Customer Info
    walkInCustomer: {
        name: String,
        phone: String,
        email: String
    },

    onlineCustomer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OnlineCustomer'
    },

    // Created By (Receptionist/Admin)
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Job Details
    jobType: String, // e.g., brochure, banner
    specifications: {
        size: String,
        quantity: Number,
        material: String
    },

    deadline: Date,
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
        default: 'design'
    },

    // Assigned Designer
    assignedDesigner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    // Uploaded design files
    designFiles: [String],
    // Billing Info
    totalAmount: Number,
    amountPaid: Number,

    paymentStatus: {
        type: String,
        enum: ['payment_unpaid', 'payment_partially_paid', 'payment_received', 'payment_credit'],
        default: 'payment_unpaid'
    },

    // Printing Info
    printingUnit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PrintingUnit'
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




export const Order=mongoose.model("Order",OrderSchema)