import Transaction from "../models/transaction.js";
import User from "../models/User.js";

// Create transaction
export const createTransaction = async (req, res) => {
  try {
    const { type, amount, details } = req.body;
    const userId = req.user._id;

    // Fetch user balance
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Deduct balance for financial transactions
    if (["transfer", "airtime", "data", "bill"].includes(type)) {
      if (user.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      user.balance -= amount;
      await user.save();
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      type,
      amount,
      details,
      status: "pending",
    });

    res.status(201).json({ message: "Transaction created", transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Optional: fetch all transactions for user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
