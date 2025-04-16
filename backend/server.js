import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/database.js";
import onlineCustomerRouter from "./route/onlineCustomerRoute.js";

dotenv.config();
const app = express();
connectDB();

// app.listen(3000, () => console.log(`Server is running in port`));
const PORT = process.env.PORT || 3000;  // Use PORT from .env or default to 3000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
app.use(express.json());
app.use(cors());
app.use("/onlineCustomer", onlineCustomerRouter);

export { app };
