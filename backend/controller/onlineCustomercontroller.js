import { OnlineCustomer } from "../model/onlineCustomer.js";
import signinValidation from "../validation/signinValidation.js";
import signupValidation from "../validation/signupValidation.js";
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

// Sign up
const onlineSignup = async (req, res) => {
    const { name, email, password, phone, whatsapp, address, shop } = req.body;
    const { errors, isValid } = signupValidation(req.body);

    try {
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const exist = await OnlineCustomer.findOne({ email });
        if (exist) {
            errors.email = "Email already registered";
            return res.status(400).json(errors);
        }

        const result = await OnlineCustomer.create({
            name,
            email,
            password, // model handles hashing
            phone,
            whatsapp,
            address,
            shop
        });
        // Remove password from result
        const customerData = result.toObject();
        delete customerData.password;
        generateToken(res, result._id)

        res.status(200).json({ message: "Signup successful", data: customerData });
    } catch (error) {
        res.status(500).json({ message: "Error occurred during sign up", data: error.message });
    }
};

// Sign in (sets JWT in cookie)
const onlineSignin = async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = signinValidation(req.body);

    try {
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const customer = await OnlineCustomer.findOne({ email });
        if (!customer) {
            errors.email = "Email doesn't exist";
            return res.status(400).json(errors);
        }

        const passwordMatch = await customer.comparePassword(password);
        if (!passwordMatch) {
            errors.password = "Wrong password";
            return res.status(400).json(errors);
        }
        generateToken(res, customer._id)

        // const token = jwt.sign(
        //     { _id: customer._id },
        //     process.env.JWT_SECRET || "default_secret",
        //     { expiresIn: "8h" }
        // );

        // // Set cookie
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "strict",
        //     maxAge: 8 * 60 * 60 * 1000 // 8 hours
        // })
        res.status(200).json({ message: "Login successful", data: customer });
    } catch (error) {
        res.status(500).json({ message: "Error occurred during login", data: error.message });
    }
};

// Get customer profile
const onlineCustomerProfile = async (req, res) => {
    const { id } = req.params;

    try {
        if (req.user.userId !== id) {
            return res.status(403).json({ message: "You can only access your own profile" });
        }

        const customer = await OnlineCustomer.findById(id).select("-password");
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ data: customer });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while fetching profile", data: error.message });
    }
};

//for file uploading
// const uploadFile = async (req, res) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: "No file uploaded" });
//         }

//         res.status(200).json({
//             message: "File uploaded successfully",
//             file: {
//                 filename: req.file.filename,
//                 path: req.file.path,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Upload failed", error: error.message });
//     }
// };

// const uploadFile = async (req, res) => {
//     const { id } = req.params
//     const { files } = req.body
//     try {
//         const customer = await OnlineCustomer.findById(id)
//         if (!customer) {
//             return res.status(400).json({
//                 message: "user not found"
//             })
//         }
//         if (req.files && req.files.length > 0) {
//             customer.upload = req.files.map(file => file.path)
//         }
//         await customer.save()
//         return res.status(200).json({
//             message: "succesfully uploaded"
//         })
//     }
//     catch (error) {
//         res.status(405).json({
//             message: "error", data: error.message
//         })
//     }
// }


const uploadFile = async (req, res) => {
    const { id } = req.params;
    try {
        if (req.user.userId !== id) {
            return res.status(403).json({ message: "You can post only on your profile" });
        }
        const customer = await OnlineCustomer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        if (req.files && req.files.length > 0) {
            // Save file paths to the customer
            customer.uploads = req.files.map(file => file.path);
            await customer.save();
        }

        return res.status(200).json({
            message: "Files uploaded successfully",
            files: customer.uploads
        });
    } catch (error) {
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
};


// Logout
const onlineLogout = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    });
    res.status(200).json({ message: "Logout successful" });
};

//for getting customer details for each shop
const getCustomersByShop = async (req, res) => {
    const { shopId } = req.params;

    try {
        const customers = await OnlineCustomer.find({ shop: shopId }).select("-password");

        if (!customers.length) {
            return res.status(404).json({ message: "No customers found for this shop" });
        }

        res.status(200).json({ data: customers });
    } catch (error) {
        res.status(500).json({ message: "Error fetching customers", error: error.message });
    }
};

//for updating online customer
const updateOnlineCustomer = async (req, res) => {
    try {
        const updated = await OnlineCustomer.findByIdAndUpdate(
            req.user._id,
            req.body,
            { new: true, runValidators: true }
        ).select("-password");

        res.status(200).json({ message: "Profile updated", data: updated });
    } catch (error) {
        res.status(500).json({ message: "Update failed", error: error.message });
    }
};

//for  getting all customer details
const getAllOnlineCustomers = async (req, res) => {
    try {
        const customers = await OnlineCustomer.find({ isDeleted: false }).select("-password");
        res.status(200).json({ data: customers });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch customers", error: error.message });
    }
};

//for deleting customer
const deleteCustomer = async (req, res) => {
    try {
        // console.log(req.user.userId,"req")
        await OnlineCustomer.findByIdAndDelete(req.user.userId, { isDeleted: true, isActive: false });
        res.status(200).json({ message: "Customer deleted" });
    } catch (error) {
        res.status(500).json({ message: "Delete failed", error: error.message });
    }
};

//for changing password
const changeOnlineCustomerPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    //     console.log("old",oldPassword)
    // console.log("hoi")    
    // const {id}=req.params
    // console.log(id,"id")

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ message: "Both old and new passwords are required" });
    }

    try {
        const customer = await OnlineCustomer.findById(req.user.userId);

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const isMatch = await customer.comparePassword(oldPassword);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        customer.password = newPassword; // model will hash it
        await customer.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Password update failed", error: error.message });
    }
};



export { onlineSignup, onlineSignin, onlineCustomerProfile, uploadFile, onlineLogout, getCustomersByShop, updateOnlineCustomer, getAllOnlineCustomers, deleteCustomer, changeOnlineCustomerPassword };
