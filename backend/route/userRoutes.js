import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
} from "../controller/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import authorizeRoles from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).get(authenticateToken, getUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(authenticateToken, authorizeRoles("admin"), getUserProfile)
  .put(authenticateToken, updateUserProfile);

router
  .route("/:id")
  .delete(authenticateToken, authorizeRoles("admin"), deleteUser)
  .get(authenticateToken, authorizeRoles("admin"), getUserByID)
  .put(authenticateToken, authorizeRoles("admin"), updateUser);

export default router;
