import React, { useState } from "react";
import "./dataPurchase.css";

const DataPurchase = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [dataPlan, setDataPlan] = useState("");
  const [telecom, setTelecom] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!phone || !amount || !dataPlan || !telecom) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      // Replace this with actual API call to purchase data
      alert(`Purchasing ${dataPlan} for ${phone} on ${telecom} at ₦${amount}`);

      // Reset form
      setPhone("");
      setAmount("");
      setDataPlan("");
      setTelecom("");
    } catch (err) {
      console.error("Data purchase failed:", err);
      alert("Failed to purchase data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="data-container">
      <h2>Buy Data</h2>
      <form className="data-form" onSubmit={handleSubmit}>
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
            min="100"
            required
          />
        </label>

        <label>
          Data Plan
          <select
            value={dataPlan}
            onChange={(e) => setDataPlan(e.target.value)}
            required
          >
            <option value="">Select Plan</option>
            <option value="500MB">500MB</option>
            <option value="1GB">1GB</option>
            <option value="2GB">2GB</option>
            <option value="5GB">5GB</option>
            <option value="10GB">10GB</option>
          </select>
        </label>

        <label>
          Telecom Provider
          <select
            value={telecom}
            onChange={(e) => setTelecom(e.target.value)}
            required
          >
            <option value="">Select Provider</option>
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

export default DataPurchase;
