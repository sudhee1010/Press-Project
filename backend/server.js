import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import onlineCustomerRouter from "./route/onlineCustomerRoute.js";
import printingUnitRouter from "./route/printingPressunitRoute.js";
import orderRouter from "./route/OrderRoutes.js";
import tokenRouter from "./route/tokenRoutes.js";
import userRoutes from "./route/userRoutes.js"

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(cookieParser());
app.use("/api/v1/onlineCustomer", onlineCustomerRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/printingUnit", printingUnitRouter);
app.use("/api/v1/tokenRouter", tokenRouter);
app.use("/api/v1/users",userRoutes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export { app };
