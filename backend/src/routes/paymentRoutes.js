import express from "express";
import Joi from "joi";
import axios from "axios";
import Transaction from "../models/transaction.js";
import { auth } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validate.js";

const router = express.Router();

// Joi schemas
const transferSchema = Joi.object({
  recipient: Joi.string().required(),
  amount: Joi.number().min(1).required(),
});

const airtimeSchema = Joi.object({
  phone: Joi.string().required(),
  provider: Joi.string().required(),
  amount: Joi.number().min(50).required(),
});

const billSchema = Joi.object({
  biller: Joi.string().required(),
  accountNumber: Joi.string().required(),
  amount: Joi.number().min(100).required(),
});

// Transfer money
router.post("/transfer", auth, validateRequest(transferSchema), async (req, res) => {
  const { recipient, amount } = req.body;
  const tx = await Transaction.create({
    userId: req.user.id,
    type: "transfer",
    amount,
    details: { recipient },
  });
  res.status(201).json({ message: "Transfer initiated", tx });
});

// ✅ Buy airtime with Monnify
router.post("/airtime", auth, validateRequest(airtimeSchema), async (req, res) => {
  try {
    const { phone, provider, amount } = req.body;

    // Step 1: Save transaction record (pending)
    const tx = await Transaction.create({
      userId: req.user.id,
      type: "airtime",
      amount,
      status: "pending",
      details: { phone, provider },
    });

    // Step 2: Generate Monnify access token
    const credentials = Buffer.from(
      `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

    const authResponse = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
      {},
      { headers: { Authorization: `Basic ${credentials}` } }
    );

    const token = authResponse.data.responseBody.accessToken;

    // Step 3: Initiate transaction on Monnify
    const paymentRef = `AIRTIME-${Date.now()}-${req.user.id}`;
    const paymentResponse = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v1/merchant/transactions/init-transaction`,
      {
        amount,
        customerName: req.user.fullName || "Moneynest User",
        customerEmail: req.user.email,
        paymentReference: paymentRef,
        paymentDescription: `Airtime purchase for ${phone} (${provider})`,
        currencyCode: "NGN",
        contractCode: process.env.MONNIFY_CONTRACT_CODE,
        redirectUrl: "http://localhost:5173/payment-success",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const checkoutUrl = paymentResponse.data.responseBody.checkoutUrl;

    // Step 4: Update transaction with payment reference
    tx.paymentRef = paymentRef;
    await tx.save();

    // Step 5: Send payment link to frontend
    res.status(200).json({
      message: "Payment initiated successfully",
      paymentUrl: checkoutUrl,
      tx,
    });
  } catch (err) {
    console.error("Monnify Airtime Error:", err.response?.data || err.message);
    res.status(500).json({ 
      error: "Failed to initiate Monnify payment",
      details: err.response?.data || err.message,
    });
      
  }
});

// Pay bills
router.post("/bill", auth, validateRequest(billSchema), async (req, res) => {
  const { biller, accountNumber, amount } = req.body;
  const tx = await Transaction.create({
    userId: req.user.id,
    type: "bill",
    amount,
    details: { biller, accountNumber },
  });
  res.status(201).json({ message: "Bill payment initiated", tx });
});

export default router;
