import { OnlineCustomer } from "../model/onlineCustomer.js";
import signinValidation from "../validation/signinValidation.js";
import signupValidation from "../validation/signupValidation.js";
import jwt from "jsonwebtoken";

// Sign up
const onlineSignup = async (req, res) => {
    const { name, email, password, phone, whatsapp, address } = req.body;
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
            address
        });

        res.status(200).json({ message: "Signup successful", data: result });
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

        const token = jwt.sign(
            { _id: customer._id },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "8h" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 8 * 60 * 60 * 1000 // 8 hours
        }).status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Error occurred during login", data: error.message });
    }
};

// Get customer profile
const onlineCustomerProfile = async (req, res) => {
    const { id } = req.params;

    try {
        if (req.user._id !== id) {
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

export { onlineSignup, onlineSignin, onlineCustomerProfile };
