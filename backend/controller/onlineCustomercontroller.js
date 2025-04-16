import { onlineCustomer } from "../model/onlineCustomer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import signinValidation from "../validation/signinValidation.js";
import signupValidation from "../validation/signupValidation.js";

// Sign up
const onlineSignup = async (req, res) => {
    const { name, email, password, phone, whatsapp, address } = req.body;
    const { errors, isValid } = signupValidation(req.body);

    console.log("dai", req.body);


    try {
        if (!isValid) {
            console.log("err", errors)
            return res.status(400).json(errors);
        }

        const exist = await onlineCustomer.findOne({ email });
        console.log("exist", exist)
        if (exist) {
            errors.email = "Email already registered";
            return res.status(400).json(errors);
        }

        // Using async hash for password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("hash", hashedPassword)

        const result = await onlineCustomer.create({ name, email, password: hashedPassword, phone, whatsapp, address });
        console.log("result", result)

        res.status(200).json({ data: result, message: "Signup successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred during sign up", data: error.message });
    }
};

// Sign in
const onlineSignin = async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = signinValidation(req.body);

    try {
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const customer = await onlineCustomer.findOne({ email });
        if (!customer) {
            errors.email = "Email doesn't exist";
            return res.status(400).json(errors);
        }

        // Using async compare for password
        const passwordMatch = await bcrypt.compare(password, customer.password);
        if (!passwordMatch) {
            errors.password = "Wrong password";
            return res.status(400).json(errors);
        }

        // JWT Secret should be stored in .env file for security
        const token = jwt.sign({ _id: customer._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "8h" });

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error occurred during login", data: error.message });
    }
};

// Get profile
const onlineCustomerProfile = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the logged-in user is accessing their own profile
        if (req.user._id !== id) {
            return res.status(403).json({ message: "You can only access your own profile" });
        }

        const customer = await onlineCustomer.findById(id).select("-password");
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.status(200).json({ data: customer });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while fetching profile", data: error.message });
    }
};


export { onlineSignup, onlineSignin, onlineCustomerProfile };
