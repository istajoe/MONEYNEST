import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  type: { type: String, required: true }, // deposit, transfer, withdrawal
  amount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  reference: String,
  details: Object,
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
