const express = require("express");
const router = express.Router();
const Contribution = require("../models/Contribution");

// Add contribution
router.post("/add", async (req, res) => {
  try {
    const { userId, amount, frequency, nextContributionDate, linkedBankAccount } = req.body;

    const contribution = new Contribution({
      userId,
      amount,
      frequency,
      nextContributionDate,
      linkedBankAccount,
      status: "pending",
    });

    await contribution.save();
    res.status(201).json(contribution);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all contributions for a user
router.get("/:userId", async (req, res) => {
  try {
    const contributions = await Contribution.find({ userId: req.params.userId });
    res.json(contributions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
