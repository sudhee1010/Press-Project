import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const onlineCustomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        trim: true,
        unique: true
    },
    whatsapp: {
        type: String,
        trim: true
    },
    address: {
        type: String
    },
    // shopId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "PrintingPressunit",
    //     required: true
    // },
    // printingUnit: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'PrintingPressUnit'
    // },
    // orders:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Order"
    // },
    isActive: {
        type: Boolean,
        default: true
    },
    uploads: {
        type: [String],
        default: [],
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
    
}, { timestamps: true });

// Hash password before saving
onlineCustomerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare entered password
onlineCustomerSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export const OnlineCustomer = mongoose.model('OnlineCustomer', onlineCustomerSchema);
