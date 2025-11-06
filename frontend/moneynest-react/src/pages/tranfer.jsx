// src/pages/Transfer.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./transfer.css";

export default function Transfer() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    recipientName: "",
    recipientAccount: "",
    bank: "",
    amount: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit transfer request
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { recipientName, recipientAccount, bank, amount } = formData;

    if (!recipientName || !recipientAccount || !bank || !amount) {
      alert("Please fill all fields.");
      return;
    }

    if (amount <= 0) {
      alert("Amount must be greater than ₦0.");
      return;
    }

    try {
      setLoading(true);

      // ✅ Include Monnify-required customer details
      const res = await fetch("http://127.0.0.1:5000/api/initiate-payment", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          customerName: user.fullName || recipientName,
          customerEmail: user.email, // must not be empty!
        }),
      });

      const data = await res.json();

      if (res.ok && data.requestSuccessful) {
        // ✅ Redirect user to Monnify checkout page
        window.location.href = data.responseBody.checkoutUrl;
      } else {
        alert(`❌ ${data.responseMessage || data.error || "Payment initiation failed"}`);
      }
    } catch (err) {
      console.error("Error during transfer:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-container">
      <h2>Transfer Funds</h2>
      <form className="deposit-form" onSubmit={handleSubmit}>
        <label>Recipient Name</label>
        <input
          type="text"
          name="recipientName"
          placeholder="e.g. Jane Doe"
          value={formData.recipientName}
          onChange={handleChange}
          required
        />

        <label>Recipient Account Number</label>
        <input
          type="text"
          name="recipientAccount"
          placeholder="e.g. 0123456789"
          value={formData.recipientAccount}
          onChange={handleChange}
          required
        />

        <label>Bank</label>
        <select
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          required
        >
          <option value="">Select Bank</option>
          <option value="Access Bank">Access Bank</option>
          <option value="GTBank">GTBank</option>
          <option value="Zenith Bank">Zenith Bank</option>
          <option value="UBA">UBA</option>
          <option value="First Bank">First Bank</option>
          <option value="Wema Bank">Wema Bank</option>
          <option value="Fidelity Bank">Fidelity Bank</option>
          <option value="Union Bank">Union Bank</option>
          <option value="Sterling Bank">Sterling Bank</option>
        </select>

        <label>Amount (₦)</label>
        <input
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={formData.amount}
          onChange={handleChange}
          required
          min="1"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Send Money"}
        </button>
      </form>
    </div>
  );
}
