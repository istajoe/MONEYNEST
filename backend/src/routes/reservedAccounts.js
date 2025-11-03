import express from "express";
import { reserveAccount } from "../lib/monnify.js"; // careful: default vs named import — we used named exports above
import { reserveAccount as reserveAccountFn, getMonnifyToken } from "../lib/monnify.js"; // use named
import User from "../models/User.js";
import Transaction from "../models/transaction.js";
import { requireAuth } from "../middleware/authMiddleware.js"; // use your auth middleware

const router = express.Router();

/**
 * POST /api/reserved-account/create
 * creates reserved accounts for the logged-in user and saves to user
 */
router.post("/create", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // if user already has reserved accounts, return them
    if (user.reservedAccounts && user.reservedAccounts.length > 0) {
      return res.json({ reservedAccounts: user.reservedAccounts });
    }

    const payload = {
      accountReference: `MN-USER-${user._id}`,
      accountName: user.name,
      currencyCode: "NGN",
      contractCode: process.env.MONNIFY_CONTRACT_CODE,
      customerEmail: user.email,
      getAllAvailableBanks: true
    };

    const responseBody = await reserveAccountFn(payload);
    // responseBody.accounts => array of accounts
    const accounts = responseBody.accounts || [];

    // map & save minimal fields
    user.reservedAccounts = accounts.map((a) => ({
      bankName: a.bankName,
      bankCode: a.bankCode,
      accountNumber: a.accountNumber,
      accountReference: payload.accountReference,
      currencyCode: a.currencyCode || "NGN",
    }));

    await user.save();
    res.json({ reservedAccounts: user.reservedAccounts });
  } catch (err) {
    console.error("reserve create error:", err.response?.data || err.message || err);
    res.status(500).json({ error: "Failed to create reserved account" });
  }
});

/**
 * GET /api/reserved-account
 * returns stored reserved accounts for logged-in user
 */
router.get("/", requireAuth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ reservedAccounts: user.reservedAccounts || [] });
});

export default router;
