import { Router } from "express";
import { generateToken } from "../controller/tokenController.js";

const tokenRouter = Router();

// Route: POST /api/token/tokengenerate
// Description: Generate a new token for a customer
tokenRouter.route("/tokengenerate").post(generateToken);

export default tokenRouter;
