import jwt from "jsonwebtoken";
import User from "../models/User.js";

const COOKIE_NAME = process.env.COOKIE_NAME || "moneynest_token";
const JWT_SECRET = process.env.JWT_SECRET;

export const requireAuth = async (req, res, next) => {
  try {
    // ===========================
    // ✅ 1. Read token from both cookie & header
    // ===========================
    let token = null;

    // Try cookie first
    if (req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }

    // If not found, try Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // ===========================
    // ✅ 2. Verify and decode JWT
    // ===========================
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded?.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token structure" });
    }

    // ===========================
    // ✅ 3. Fetch user from DB
    // ===========================
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    // ===========================
    // ✅ 4. Attach user & continue
    // ===========================
    req.user = user;
    next();
  } catch (err) {
    console.error("⚠️ Auth Middleware Error:", err);

    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Session expired. Please log in again." });
    }

    if (err.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. Please log in again." });
    }

    res
      .status(401)
      .json({ success: false, message: "Authentication failed. Try again." });
  }
};
