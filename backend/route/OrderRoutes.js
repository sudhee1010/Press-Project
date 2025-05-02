import express from "express";
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controller/orderController.js";
import authenticateToken from "../middleware/authenticateToken.js"
import authorizeRoles from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

// Create a new order (Receptionist/Admin)
orderRouter.route("/createOrder").post(authenticateToken,authorizeRoles('admin'), createOrder);

// Get all orders (All staff)
orderRouter.route("/getAllOrders").get(authenticateToken,authorizeRoles('admin','superadmin'),getAllOrders);

// Get a single order by ID
orderRouter.route("/getOrderById/:id").get(authenticateToken,authorizeRoles('designer','admin'),getOrderById);

// Update an order
orderRouter.route("/updateOrder/:id").put(authenticateToken,authorizeRoles('designer', 'admin', 'printing', 'production'), updateOrder);

// Delete an order
orderRouter.route("/deleteOrder/:id").delete(authenticateToken,authorizeRoles('admin'), deleteOrder);

// Export default
export default orderRouter;
