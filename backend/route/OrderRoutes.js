import express from "express";
import { createOrder, getAllOrders, getOrderById, updateOrder, deleteOrder } from "../controllers/orderController.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const orderRouter = express.Router();  // Correct Router

// Create a new order (Receptionist/Admin)
orderRouter.route("/createOrder").post(authorizeRoles('receptionist', 'admin'), createOrder);

// Get all orders (All staff)
orderRouter.route("/getAllOrders").get(getAllOrders);

// Get a single order by ID
orderRouter.route("/getOrderById/:id").get(getOrderById);

// Update an order
orderRouter.route("/updateOrder/:id").put(authorizeRoles('designer', 'admin', 'printing_staff', 'production_staff'), updateOrder);

// Delete an order
orderRouter.route("/deleteOrder/:id").delete(authorizeRoles('admin'), deleteOrder);

// Export default
export default orderRouter;
