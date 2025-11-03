// middleware/validateTransaction.js
import Joi from "joi";

// Transaction validation schema
export const transactionSchema = Joi.object({
  //userId: Joi.string().required(), // usually comes from auth token
  type: Joi.string()
    .valid("transfer", "airtime", "data", "bill")
    .required()
    .messages({
      "any.only": "Transaction type must be one of transfer, airtime, data, or bill",
    }),
  amount: Joi.number().min(1).max(100000).required()
    .messages({
      "number.min": "Amount must be at least 1",
      "number.max": "Amount cannot exceed 100,000",
    }),
  details: Joi.object().optional(), // e.g., { phone: "...", provider: "..." }
  status: Joi.string().valid("pending", "success", "failed").optional(),
});

// Generic middleware function
export const validateTransactionRequest = (req, res, next) => {
  const { error } = transactionSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
