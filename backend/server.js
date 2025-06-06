import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/database.js";
import onlineCustomerRouter from "./route/onlineCustomerRoute.js";
import printingUnitRouter from "./route/printingPressunitRoute.js";
import orderRouter from "./route/OrderRoutes.js";
import tokenRouter from "./route/tokenRoutes.js";
import userRoutes from "./route/userRoutes.js";
import reviewRouter from "./route/reviewRoute.js";
import refresh from "./route/RefreshRoutes.js";
import paymentRoutes from "./route/paymentRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { notFound } from "./middleware/errorMiddleware.js";

import path from "path";
import { fileURLToPath } from "url";

// Needed to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.dev from the backend directory
dotenv.config({ path: path.join(__dirname, ".env.dev") });

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
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/review", reviewRouter);
app.use("/api/refresh", refresh);
app.use("api/v1/payment", paymentRoutes);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export { app };
