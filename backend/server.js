import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
dotenv.config();
const app = express();
connectDB();

app.listen(3000, () => console.log(`Server is running in port`));
