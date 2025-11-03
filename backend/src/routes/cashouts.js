const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Cashout = require("../models/Cashout");
const Contribution = require("../models/Contribution");

// Request a cashout (monthly/annual)
router.post("/", auth, async (req, res) => {
  try {
    const { method } = req.body;

    // Calculate total pending contributions
    const contributions = await Contribution.find({ userId: req.user.id, status: "pending" });
    if (!contributions.length) return res.status(400).json({ msg: "No contributions to cash out" });

    const totalAmount = contributions.reduce((acc, c) => acc + c.amount, 0);

    // Create cashout request
    const cashout = new Cashout({
      userId: req.user.id,
      amount: totalAmount,
      method,
    });
    await cashout.save();

    // Mark contributions as cashed out
    await Contribution.updateMany({ userId: req.user.id, status: "pending" }, { status: "cashedOut" });

    res.status(201).json(cashout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get cashout history for logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const cashouts = await Cashout.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(cashouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Admin: get all cashouts
router.get("/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ msg: "Admin only" });

    const cashouts = await Cashout.find().populate("userId", "name email").sort({ date: -1 });
    res.json(cashouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
