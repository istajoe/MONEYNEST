// src/pages/AirtimePurchase.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./airtimePurchase.css";
import { AuthContext } from "../context/AuthContext";

const AirtimePurchase = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [telecom, setTelecom] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !amount || !telecom) {
      alert("⚠️ Please fill all fields");
      return;
    }

    if (amount < 50) {
      alert("⚠️ Minimum purchase is ₦50");
      return;
    }

    setLoading(true);

    try {
      // ✅ Initiate airtime payment with backend (authenticated)
      const response = await fetch("http://127.0.0.1:5000/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          customerName: user?.fullName || "Moneynest User",
          customerEmail: user?.email || "test@moneynest.com",
          paymentType: "airtime",
          metadata: {
            phone,
            telecom,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Payment initiation failed");

      // ✅ If Monnify payment link is returned
      if (data.paymentUrl) {
        // Save a pending transaction before redirecting
        await fetch("http://127.0.0.1:5000/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            type: "Airtime Purchase",
            amount: parseFloat(amount),
            phone,
            telecom,
            status: "pending",
          }),
        });

        // ✅ Redirect to Monnify hosted payment page
        window.location.href = data.paymentUrl;
      } else {
        alert("❌ Failed to get Monnify payment link. Try again.");
      }
    } catch (err) {
      console.error("Payment error:", err);
      alert("❌ Unable to start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="airtime-container">
      <h2>Buy Airtime</h2>
      <form className="airtime-form" onSubmit={handleSubmit}>
        <label>
          Phone Number
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>

        <label>
          Amount (₦)
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="50"
            required
          />
        </label>

        <label>
          Network Provider
          <select
            value={telecom}
            onChange={(e) => setTelecom(e.target.value)}
            required
          >
            <option value="">Select provider</option>
            <option value="MTN">MTN</option>
            <option value="GLO">GLO</option>
            <option value="AIRTEL">Airtel</option>
            <option value="9MOBILE">9mobile</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      </form>
    </div>
  );
};

export default AirtimePurchase;
