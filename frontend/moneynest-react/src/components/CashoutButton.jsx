import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CashoutButton({ userId }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleCashout = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setMessage({ type: "error", text: "Enter a valid amount" });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      const res = await axios.post("http://localhost:5000/api/users/cashout", {
        userId,
        amount,
      });

      setMessage({ type: "success", text: `Cashout request sent: $${res.data.amount}` });
      setAmount("");
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Cashout failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-2xl shadow bg-white w-full max-w-md">
      <h2 className="text-lg font-semibold mb-3">Request Cashout</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded-lg mb-3 focus:ring focus:ring-blue-200"
      />

      <Button
        onClick={handleCashout}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
        {loading ? "Processing..." : "Cashout"}
      </Button>

      {message && (
        <p
          className={`mt-3 text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
}
