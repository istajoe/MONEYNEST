// src/pages/DepositForm.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./DepositForm.css";

export default function DepositForm() {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://127.0.0.1:5000/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          customerName: user.name,
          customerEmail: user.email,
        }),
      });

      const data = await res.json();
      console.log("Monnify init response:", data);

      if (data.requestSuccessful) {
        setSuccess("Redirecting to payment...");
        setTimeout(() => {
          window.location.href = data.responseBody.checkoutUrl;
        }, 1000);
      } else {
        setError(data.responseMessage || "Failed to initialize payment");
      }
    } catch (err) {
      console.error("Error initiating deposit:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-page">
      <div className="deposit-card">
        <h2 className="deposit-title">Deposit Funds</h2>
        <p className="deposit-subtitle">
          Fund your Moneynest wallet securely via Monnify
        </p>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form className="deposit-form" onSubmit={handleSubmit}>
          <label>Enter Amount (₦)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="₦ 5,000"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Pay"}
          </button>
        </form>
      </div>

      <div className="deposit-info">
        <h4>💡 Tip:</h4>
        <p>
          After a successful payment, your wallet balance will update instantly
          on your dashboard.
        </p>
      </div>
    </div>
  );
}
