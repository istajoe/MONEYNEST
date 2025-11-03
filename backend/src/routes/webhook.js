import express from "express";
import User from "../models/User.js";
import Transaction from "../models/transaction.js";

const router = express.Router();

/**
 * POST /api/webhook/monnify
 * Monnify will send events here — configure in Monnify dashboard.
 */
router.post("/monnify", async (req, res) => {
  try {
    // Monnify sends { eventType, eventData } (check actual shape in your Monnify docs)
    const { eventType, eventData } = req.body;
    console.log("monnify webhook:", eventType);

    // Example: eventType for reserved account collection might be COLLECTION_RESERVE_ACCOUNT
    // Check the actual eventType string in your Monnify sandbox webhook payloads.
    if (eventType === "COLLECTION_RESERVE_ACCOUNT" || eventType === "COLLECTION_RESERVE_ACCOUNT_SUCCESS" || eventType === "COLLECTION") {
      // eventData may include accountReference, amountPaid, customerEmail, accounts etc.
      const { accountReference, amountPaid, customerEmail } = eventData;

      // Find user by reserved account reference or email
      const user = await User.findOne({
        $or: [
          { "reservedAccounts.accountReference": accountReference },
          { email: customerEmail }
        ]
      });

      if (!user) {
        console.warn("Webhook: user not found for accountReference/email", accountReference, customerEmail);
        return res.status(200).send("Ignored - user not found");
      }

      // Credit the user
      user.balance = (user.balance || 0) + amountPaid;
      await user.save();

      // Save transaction
      await Transaction.create({
        user: user._id,
        type: "deposit",
        amount: amountPaid,
        status: "completed",
        reference: accountReference,
        details: eventData,
      });

      console.log(`Credited user ${user.email} with ${amountPaid}`);
    }

    // Reply 200 quickly
    res.status(200).send("OK");
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).send("Error");
  }
});

export default router;
