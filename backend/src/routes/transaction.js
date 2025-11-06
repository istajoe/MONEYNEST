// src/routes/transaction.js
import express from "express";
import axios from "axios";
import Transaction from "../models/transaction.js";
import User from "../models/User.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { validateTransactionRequest } from "../middleware/validateTransaction.js";

const router = express.Router();

/* ============================================================================
   ✅ GET: All transactions for the logged-in user
============================================================================ */
router.get("/", requireAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ✅ POST: Create new transaction (handles deposit, withdrawal, transfer, etc.) */

router.post("/", requireAuth, validateTransactionRequest, async (req, res) => {
  try {
    const { type, amount, details } = req.body;
    const allowedTypes = [
      "deposit",
      "withdrawal",
      "transfer",
      "airtime",
      "data",
      "bill",
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        error: `Transaction type must be one of: ${allowedTypes.join(", ")}`,
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount must be greater than 0" });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    let balance = user.balance || 0;

    //  DEPOSIT (Monnify integration)
    if (type === "deposit") {
      const credentials = Buffer.from(
        `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
      ).toString("base64");

      // Get Monnify token
      const loginRes = await axios.post(
        `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
        {},
        { headers: { Authorization: `Basic ${credentials}` } }
      );

      const token = loginRes.data.responseBody.accessToken;

      const paymentReference = `MN-${Date.now()}`;
      const payload = {
        amount,
        customerName: user.name,
        customerEmail: user.email,
        paymentReference,
        paymentDescription: "Moneynest Wallet Funding",
        currencyCode: "NGN",
        contractCode: process.env.MONNIFY_CONTRACT_CODE,
        redirectUrl: "http://localhost:5173/payment-success",
        paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
      };

      const txRes = await axios.post(
        `${process.env.MONNIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Save pending transaction
      const transaction = await Transaction.create({
        user: req.user._id,
        type,
        amount,
        details: details || {},
        status: "pending",
        reference: paymentReference,
        gatewayResponse: txRes.data,
      });

      return res.status(201).json({
        message: "Deposit initialized successfully",
        transaction,
        paymentLink: txRes.data.responseBody.checkoutUrl,
      });
    }

    // ==================== 🔸 WITHDRAWAL / TRANSFER / BILL / AIRTIME
if (["withdrawal", "transfer"].includes(type)) {
  if (amount > balance)
    return res.status(400).json({ error: "Insufficient balance" });

  balance -= amount;
}

// 🔸 AIRTIME, DATA, BILL — Initialize Monnify payment (like deposit)
if (["airtime", "data", "bill"].includes(type)) {
  const credentials = Buffer.from(
    `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
  ).toString("base64");

  const loginRes = await axios.post(
    `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
    {},
    { headers: { Authorization: `Basic ${credentials}` } }
  );

  const token = loginRes.data.responseBody.accessToken;

  const paymentReference = `MN-${type.toUpperCase()}-${Date.now()}`;

  const payload = {
    amount,
    customerName: user.name,
    customerEmail: user.email,
    paymentReference,
    paymentDescription: `Moneynest ${type.toUpperCase()} Purchase`,
    currencyCode: "NGN",
    contractCode: process.env.MONNIFY_CONTRACT_CODE,
    redirectUrl: "http://localhost:5173/payment-success",
    paymentMethods: ["CARD", "ACCOUNT_TRANSFER"],
  };

  const txRes = await axios.post(
    `${process.env.MONNIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Save pending airtime/data/bill transaction
  const transaction = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    details: details || {},
    status: "pending",
    reference: paymentReference,
    gatewayResponse: txRes.data,
  });

  return res.status(201).json({
    message: `${type} payment initialized successfully`,
    transaction,
    paymentLink: txRes.data.responseBody.checkoutUrl,
  });
}


    user.balance = balance;
    await user.save();

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      amount,
      details: details || {},
      status: "completed",
    });

    res.status(201).json({
      message: "Transaction completed successfully",
      transaction,
    });
  } catch (err) {
    console.error("Error creating transaction:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================================================================
   ✅ OPTIONAL: Admin route to view all transactions
============================================================================ */
router.get("/admin/all", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ error: "Access denied" });

    const allTx = await Transaction.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(allTx);
  } catch (err) {
    console.error("Error fetching all transactions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* ============================================================================
   ✅ OPTIONAL SHORTCUT ROUTES (if you want them)
   These simply call the same POST logic with pre-filled `type`
============================================================================ */
router.post("/deposit", requireAuth, (req, res, next) => {
  req.body.type = "deposit";
  next();
}, router.handle.bind(router, { method: "POST", url: "/" }));

router.post("/withdraw", requireAuth, (req, res, next) => {
  req.body.type = "withdrawal";
  next();
}, router.handle.bind(router, { method: "POST", url: "/" }));

router.post("/transfer", requireAuth, (req, res, next) => {
  req.body.type = "transfer";
  next();
}, router.handle.bind(router, { method: "POST", url: "/" }));

export default router;
