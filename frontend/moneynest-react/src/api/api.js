// src/api/index.js
import axios from "axios";

// Use VITE_API_URL from Vite .env or fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ✅ required for cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== AUTH ENDPOINTS =====
export const registerUser = async (user) => {
  try {
    const res = await api.post("/auth/register", user);
    return res.data;
  } catch (err) {
    console.error("Register API error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || "Registration failed");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", { email, password });
    return res.data;
  } catch (err) {
    console.error("Login API error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || "Login failed");
  }
};

export const logoutUser = () => api.post("/auth/logout");
export const getProfile = async () => {
  const res = await api.get("/auth/me");
  return res.data; // now res.data.user will exist
};

// ===== TRANSACTIONS =====

// Fetch all transactions for logged-in user
export const getTransactions = async () => {
  try {
    const res = await api.get("/transactions");
    return res.data; // array of transactions
  } catch (err) {
    console.error("Fetch transactions error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || "Failed to fetch transactions");
  }
};

// Create a new transaction (deposit/withdrawal)
export const createTransaction = async ({ type, amount }) => {
  try {
    const res = await api.post("/transactions", { type, amount });
    return res.data;
  } catch (err) {
    console.error("Create transaction error:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || "Failed to create transaction");
  }
};


// ===== EXPORT AXIOS INSTANCE =====
export default api;
