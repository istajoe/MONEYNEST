// middleware/validate.js
import Joi from "joi";

// Strong password schema (uppercase, lowercase, number, special char)
const strongPassword = Joi.string()
  .min(8)
  .max(30)
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
  .required()
  .messages({
    "string.pattern.base":
      "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
  });

// Example: schema for user registration
export const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: strongPassword,
});

// Example: schema for login
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Flexible validation middleware
export const validateRequest = (schema, property = "body") => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
