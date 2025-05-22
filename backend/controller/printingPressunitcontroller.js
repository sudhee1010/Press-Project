import bcrypt from 'bcryptjs';
import { printingPressunit } from "../model/printingPressunit.js";
import generateToken from '../utils/generateToken.js';
import signinValidation from '../validation/signinValidation.js';

// Create a new printing unit 
// const createPrintingUnit = async (req, res) => {
//     try {
//         const { name, email, password, phone, whatsapp, address, role } = req.body;

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create the unit with the hashed password
//         const unit = await printingPressunit.create({
//             name, email, phone, whatsapp, address, role,
//             password: hashedPassword
//         });

//         // Convert Mongoose doc to plain object to delete password
//         const unitObject = unit.toObject();
//         delete unitObject.password;
//         const payload = {
//             shopId: unit._id,
//             role: unit.role
//         }
//         generateToken(res, payload)

//         res.status(201).json({ data: unitObject, message: 'Printing unit created successfully' });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };


const createPrintingUnit = async (req, res) => {
    try {
        const { name, email, password, phone, whatsapp, address, role } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the unit with approval set to false by default
        const unit = await printingPressunit.create({
            name,
            email,
            phone,
            whatsapp,
            address,
            role,
            password: hashedPassword,
            approval: false, // <- Add this line to enforce workflow
        });

        // Remove password before sending response
        const unitObject = unit.toObject();
        delete unitObject.password;

        // No token generation at registration because approval is pending
        res.status(201).json({
            data: unitObject,
            message: 'Registration successful. Awaiting admin approval.'
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};



// Get all printing units 

const getAllUnits = async (req, res) => {
    try {
        // if (!req.user) {
        //     return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
        // }

        const units = await printingPressunit.find();
        res.status(200).json({ data: units });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//  Get a Single Printing Unit by ID

const getUnitById = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
        }

        const unit = await printingPressunit.findById(req.params.id);
        if (!unit) return res.status(404).json({ message: 'Printing unit not found' });
        res.status(200).json({ data: unit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a Printing Unit
// const updateUnit = async (req, res) => {
//     try {
//         if (!req.user) {
//             return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
//         }
//         const updated = await printingPressunit.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updated) return res.status(404).json({ message: 'Printing unit not found' });
//         res.status(200).json({ data: updated, message: 'Unit updated successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
// Delete a Printing Unit
const deleteUnit = async (req, res) => {
    try {
        // if (!req.user) {
        //     return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
        // }
        const deleted = await printingPressunit.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Printing unit not found' });
        res.status(200).json({ message: 'Unit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


//sign in
const signin = async (req, res) => {
    const { email, password } = req.body
    const { errors, isValid } = signinValidation(req.body)
    try {
        if (!isValid) {
            return res.status(400).json(
                errors
            )
        }
        const customer = await printingPressunit.findOne({ email })
        if (!customer) {
            errors.email = "email doesnt exist"
            return res.status(400).json(errors)


        }
        const passwordmatch = bcrypt.compareSync(password, customer.password)
        if (!passwordmatch) {
            errors.password = "wrong password"
            return res.status(400).json(errors)
        }
        const payload = {
            shopId: customer._id,
            role: customer.role
        }
        generateToken(res, payload)
        // const token = jwt.sign(
        //     { _id: student._id },
        //     "MEGHA_M",
        //    { expiresIn: "8h" }
        // )
        // const userId= student._id
        res.status(200).json({ message: "login succesfully", data: customer })

    }

    catch (error) {
        res.status(400).json({
            message: "error", data: error.message
        })
    }
}
//verification
const verifyPrintingUnit = async (req, res) => {
    try {
        const unit = await printingPressunit.findById(req.params.id);
        if (!unit) {
            return res.status(404).json({ message: 'Printing unit not found' });
        }

        unit.verified = true;
        await unit.save();

        const payload = {
            shopId: unit._id,
            role: unit.role
        };
        generateToken(res, payload);

        res.status(200).json({ message: 'Printing unit verified successfully', data: unit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Logout
const adminLogout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
    res.status(200).json({ message: "Logout successful" });
};

// Update a Printing Unit
const adminupdateUnit = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Not authorized, token missing or invalid' });
        }

        const unit = await printingPressunit.findById(req.params.id);

        if (!unit) {
            return res.status(404).json({ message: 'Printing unit not found' });
        }

        // Only allow update if the logged-in user is the creator
        if (unit.createdBy.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied. You can only update units you created.' });
        }

        const updated = await printingPressunit.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({ data: updated, message: 'Unit updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





export { createPrintingUnit, getAllUnits, getUnitById,deleteUnit, signin, verifyPrintingUnit, adminLogout,adminupdateUnit };