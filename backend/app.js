// app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import transactionRoutes from "./src/routes/transaction.js";
import "./src/cron/transactionProcessor.js";
import axios from "axios";
import reservedRoutes from "./src/routes/reservedAccounts.js";
import webhookRoutes from "./src/routes/webhook.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/reserved-account", reservedRoutes);
app.use("/api/webhook", webhookRoutes);
app.use(express.json());
app.use(cookieParser());

// ✅ CORS CONFIG

// Debug route logging
app.use((req, res, next) => {
  console.log(`[ROUTE HIT] ${req.method} ${req.path}`);
  next();
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// Health route
app.get("/", (req, res) => {
  res.send("✅ MoneyNest API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ msg: "Server error", error: err.message });
});

// generate monnify access token
app.get("/api/token", async (req, res) => {
  try {
    const credentials = Buffer.from(
      `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

    const response = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
      {},
      { headers: { Authorization: `Basic ${credentials}` } }
    );

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to generate token"});
  }
});

// Initialize payment transaction
app.post("/api/initiate-payment", async (req, res) => {
  const { amount, customerName, customerEmail } = req.body;
  try {
    //Get auth token
    const credentials = Buffer.from(
      `${process.env.MONNIFY_API_KEY}:${process.env.MONNIFY_SECRET_KEY}`
    ).toString("base64");

    const loginRes = await axios.post(
      `${process.env.MONNIFY_BASE_URL}/api/v1/auth/login`,
      {},
      { headers: { Authorization: `Basic ${credentials}`} }
    );

    const token = loginRes.data.responseBody.accessToken;

    // Initiate transaction
    const payload = {
      amount,
      customerName,
      customerEmail,
      paymentReference: `MN-${Date.now()}`,
      paymentDescription: "Moneynest Test Payment",
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

    res.json(txRes.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});


// ✅ Monnify Webhook Endpoint
app.post("/api/webhook", async (req, res) => {
  try {
    const { eventData, eventType } = req.body;
    console.log("📩 Monnify Webhook Event:", eventType);

    if (eventType === "SUCCESSFUL_TRANSACTION") {
      const { paymentReference, amountPaid, customerEmail } = eventData;

      // Find the user and transaction
      const user = await user.findOne({ email: customerEmail });
      const transaction = await transaction.findOne({ reference: paymentReference });

      if (!transaction && user) {
        // Create a completed transaction if not found
        await transaction.create({
          user: user._id,
          type: "deposit",
          amount: amountPaid,
          reference: paymentReference,
          status: "completed",
        });
      }

      // Update user balance
      if (user) {
        user.balance = (user.balance || 0) + amountPaid;
        await user.save();
      }
    }

    res.status(200).send("OK");
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    res.status(500).send("Webhook error");
  }
});

// Fallback 404 JSON handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});


const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected successfully");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};



startServer();
