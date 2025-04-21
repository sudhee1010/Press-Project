import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import onlineCustomerRouter from "./route/onlineCustomerRoute.js";

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1/onlineCustomer", onlineCustomerRouter);
const PORT = process.env.PORT || 3000;  
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export { app };
