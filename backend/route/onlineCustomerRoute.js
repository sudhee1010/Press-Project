import { Router } from "express";
import { onlineSignup, onlineSignin, onlineCustomerProfile } from "../controller/onlineCustomercontroller.js";
import authenticateToken from "../middleware/authenticateToken.js"; // Import the authenticateToken middleware
import mongoose from "mongoose";

const onlineCustomerRouter = Router();



onlineCustomerRouter.route("/signup").post(onlineSignup);
onlineCustomerRouter.route("/signin").post(onlineSignin);



// Route to get the customer profile (with token authentication)
onlineCustomerRouter.route("/profile/:id")
    .get(
        authenticateToken, // Protect this route with token authentication
        async (req, res, next) => {
            const { id } = req.params;
            // Check if the ID is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid customer ID" });
            }
            next(); // Proceed to the controller if the ID is valid
        },
        onlineCustomerProfile // Profile controller will only be executed if the token is valid
    );

export default onlineCustomerRouter;