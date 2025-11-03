import express from "express";
import Joi from "joi";
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

// Buy airtime
router.post("/airtime", auth, validateRequest(airtimeSchema), async (req, res) => {
  const { phone, provider, amount } = req.body;
  const tx = await Transaction.create({
    userId: req.user.id,
    type: "airtime",
    amount,
    details: { phone, provider },
  });
  res.status(201).json({ message: "Airtime purchase initiated", tx });
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
