const mongoose = require("mongoose");

const CashoutSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true,
      min: [1, "Cashout amount must be at least 1"], // no negatives or zero
      validate: {
        validator: function (value) {
          return value <= 10000; // example limit: max $10,000 per request
        },
        message: "Cashout amount cannot exceed 10,000"
      }
    },
    method: { 
      type: String, 
      enum: ["bank", "mobile"], 
      default: "bank" 
    },
    status: { 
      type: String, 
      enum: ["pending", "completed"], 
      default: "pending" 
    },
    date: { 
      type: Date, 
      default: Date.now 
    },
  },
  { timestamps: true }
);

// 🔒 Pre-save hook: check user balance before saving
CashoutSchema.pre("save", async function (next) {
  try {
    const User = mongoose.model("User");
    const user = await User.findById(this.userId);

    if (!user) {
      return next(new Error("User not found"));
    }

    if (this.amount > user.balance) {
      return next(new Error("Insufficient balance for this cashout"));
    }

    // Deduct balance when cashout is created
    user.balance -= this.amount;
    await user.save();

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Cashout", CashoutSchema);
