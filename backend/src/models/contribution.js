const mongoose = require("mongoose");

const ContributionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, enum: ["daily", "weekly", "monthly"], required: true },
  nextContributionDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
  linkedBankAccount: { type: String }, // bank account ID
}, { timestamps: true });

module.exports = mongoose.model("Contribution", ContributionSchema);
