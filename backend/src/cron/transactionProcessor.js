import cron from "node-cron";
import Transaction from "../models/transaction.js";

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  console.log("Running automated transaction processor...");

  try {
    const pendingTransactions = await Transaction.find({ status: "pending" });

    for (let tx of pendingTransactions) {
      // Simulate processing logic
      // TODO: Integrate with payment, airtime, or bill API

      // Example logic: mark all as success
      tx.status = "success";

      await tx.save();
      console.log(`Processed transaction ${tx._id} for user ${tx.userId}`);
    }
  } catch (err) {
    console.error("Error processing transactions:", err);
  }
});
