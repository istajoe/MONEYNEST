import React, { useState, useContext } from "react";
import "./billPayment.css";
import { createTransaction } from "../api/api";
import { AuthContext } from "../context/AuthContext";

const BillPayment = () => {
  const [billerType, setBillerType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!billerType || !accountNumber || !amount || !provider) {
    alert("Please fill all fields");
    return;
  }

  setLoading(true);
  try {
    // Call your backend to initiate Monnify payment
    const response = await fetch("http://127.0.0.1:5000/api/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: parseFloat(amount),
        customerName: user?.fullName || "Moneynest User",
        customerEmail: user?.email || "test@moneynest.com",
        paymentType: "bill",
        metadata: {
          billerType,
          accountNumber,
          provider,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Payment initiation failed");

    // Redirect user to Monnify payment page
    const paymentUrl =
      data.paymentUrl ||
      data.responseBody?.checkoutUrl ||
      data.responseBody?.paymentLink;

    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      alert("Failed to get Monnify payment link. Try again.");
    }
  } catch (err) {
    console.error("Payment error:", err);
    alert("Bill payment failed. Please try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bill-container">
      <h2>Pay Bill</h2>
      <form className="bill-form" onSubmit={handleSubmit}>
        <label>
          Biller Type
          <select
            value={billerType}
            onChange={(e) => setBillerType(e.target.value)}
            required
          >
            <option value="">Select Biller</option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Cable TV">Cable TV</option>
            <option value="Internet">Internet</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Customer Account / ID
          <input
            type="text"
            placeholder="Enter account number or ID"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
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
          Provider / Service Company
          <input
            type="text"
            placeholder="Enter provider name"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Proceed to Pay"}
        </button>
      </form>
    </div>
  );
};

export default BillPayment;
