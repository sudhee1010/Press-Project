import { Router } from "express";
import jwt from "jsonwebtoken";
import authUtils from "../utils/GenerateToken2.js"; // adjust path as needed

const router = Router();

router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = authUtils.generateAccessToken({
      _id: decoded._id,
      email: decoded.email,
      role: decoded.role,
    });

    // Set only the new access token; refresh remains same
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 min
    });

    res.json({ success: true });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

// Logout route (reusing your authUtils function)
router.post("/logout", (req, res) => {
  authUtils.clearAuthCookies(res);
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
