import React, { useState } from "react";
import "./billPayment.css";

const BillPayment = () => {
  const [billerType, setBillerType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!billerType || !accountNumber || !amount || !provider) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Replace this with actual API call to pay the bill
      alert(`Paying ₦${amount} for ${billerType} (Account: ${accountNumber}) on ${provider}`);

      // Reset form
      setBillerType("");
      setAccountNumber("");
      setAmount("");
      setProvider("");
    } catch (err) {
      console.error("Bill payment failed:", err);
      alert("Failed to pay bill. Try again.");
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
          Amount
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
          {loading ? "Processing..." : "Pay Bill"}
        </button>
      </form>
    </div>
  );
};

export default BillPayment;
