import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
} from "../controller/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/profile").get(authenticateToken, getUserProfile);

export default router;
