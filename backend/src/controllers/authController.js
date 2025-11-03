// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME || "moneynest_token";
const TOKEN_EXPIRES = process.env.JWT_EXPIRES || "1d";

// Helper to generate JWT
     
const generateToken = (userId) => {
  if (!JWT_SECRET) throw new Error("JWT_SECRET not defined"); // ✅ check here
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
};

// ===== REGISTER =====
export const register = async (req, res) => {
  try {
    console.log("[ROUTE HIT] POST /api/auth/register");
    console.log("Register request body:", req.body);

    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    if (!validator.isEmail(email))
      return res.status(400).json({ error: "Invalid email format" });

    if (!validator.isLength(password, { min: 8 }))
      return res.status(400).json({ error: "Password must be at least 8 characters" });

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("❌ Email already registered:", email);
      return res.status(400).json({ error: "Email already registered" });
    }

    //console.log("Hashing password...");
    //const hashed = await bcrypt.hash(password, 10);
    //console.log("✅ Password hashed successfully");

    console.log("Creating user in DB...");
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });
    console.log("✅ User created successfully:", user.email);

    // Generate token
    const token = generateToken(user._id);
    console.log("✅ Token generated:", token ? "yes" : "no");

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });
    console.log("✅ Cookie set for", user.email);

    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===== LOGIN =====
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login request body:", req.body);

    if (!email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const user = await User.findOne({ email });
    console.log("user found:", user ? user.email : "none");
    
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    console.log("password match:", match);

    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(user._id);
    console.log("token generated for", user.email);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("✅ Cookie set for", user.email);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===== LOGOUT =====
export const logout = (req, res) => {
  res.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  res.json({ message: "Logged out successfully" });
};

// ===== CURRENT USER =====
export const me = async (req, res) => {
  try {
    const token = req.cookies[COOKIE_NAME] || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};