// src/models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// --- Reserved Account sub-schema (for Monnify) ---
const reservedAccountSchema = new mongoose.Schema({
  bankName: String,
  bankCode: String,
  accountNumber: String,
  accountReference: String,
  currencyCode: String,
  createdAt: { type: Date, default: Date.now },
});

// --- Main User schema ---
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // 🏦 Virtual Account + Wallet fields
    balance: { type: Number, default: 0 },
    reservedAccounts: { type: [reservedAccountSchema], default: [] },
  },
  { timestamps: true }
);

// ✅ Automatically hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Password comparison method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
