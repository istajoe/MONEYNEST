import React, { useState } from "react";
import "./airtimePurchase.css";

const AirtimePurchase = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [telecom, setTelecom] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!phone || !amount || !telecom) {
      alert("Please fill all fields");
      return;
    }
    if (amount < 50) {
      alert("Minimum amount is ₦50");
      return;
    }

    setLoading(true);

    try {
      // Replace this with your actual backend API call
      // Example:
      // const res = await fetch("/api/airtime", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ phone, amount, telecom }),
      // });
      // const data = await res.json();

      // For now, just show an alert
      alert(`Purchasing ₦${amount} airtime for ${phone} on ${telecom}`);

      // Reset form
      setPhone("");
      setAmount("");
      setTelecom("");
    } catch (err) {
      console.error("Airtime purchase failed:", err);
      alert("Failed to purchase airtime. Try again.");
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
          Telecommunication
          <select
            value={telecom}
            onChange={(e) => setTelecom(e.target.value)}
            required
          >
            <option value="">Select provider</option>
            <option value="MTN">MTN</option>
            <option value="GLO">GLO</option>
            <option value="Airtel">Airtel</option>
            <option value="9mobile">9mobile</option>
          </select>
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Purchase"}
        </button>
      </form>
    </div>
  );
};

export default AirtimePurchase;
