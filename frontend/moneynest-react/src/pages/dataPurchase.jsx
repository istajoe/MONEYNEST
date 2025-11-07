import React, { useState, useContext } from "react";
import "./dataPurchase.css";
import { AuthContext } from "../context/AuthContext";

const DataPurchase = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [dataPlan, setDataPlan] = useState("");
  const [telecom, setTelecom] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validate form
    if (!phone || !amount || !dataPlan || !telecom) {
      alert("Please fill all fields");
      return;
    }

    if (parseFloat(amount) < 100) {
      alert("Minimum amount is ₦100");
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
          paymentType: "data",
          metadata: { phone, telecom, dataPlan },
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Payment initiation failed");

      //  Redirect user to Monnify payment page
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
      console.error(" Payment error:", err);
      alert("Unable to start data purchase. Please try again.");
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
          Amount (₦)
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

export default DataPurchase;
