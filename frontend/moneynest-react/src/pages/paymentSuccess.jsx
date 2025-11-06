// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    // ✅ Extract Monnify transaction reference (if available)
    const params = new URLSearchParams(location.search);
    const paymentReference = params.get("paymentReference");

    // ✅ Optional: Verify payment via your backend
    async function verifyPayment() {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/verify-payment?paymentReference=${paymentReference}`
        );
        const data = await res.json();

        if (data.requestSuccessful) {
          setStatus("success");
          setTimeout(() => navigate("/dashboard"), 3000);
        } else {
          setStatus("failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
      }
    }

    if (paymentReference) verifyPayment();
    else setStatus("success"); // fallback if no reference found
  }, [navigate, location.search]);

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {status === "verifying" && <h2>⏳ Verifying Payment...</h2>}

      {status === "success" && (
        <>
          <h2 style={{ color: "green" }}>✅ Payment Successful!</h2>
          <p>You’ll be redirected to your dashboard shortly...</p>
        </>
      )}

      {status === "failed" && (
        <>
          <h2 style={{ color: "red" }}>❌ Payment Failed or Unverified</h2>
          <p>
            If money was deducted, please contact support or check your
            transaction history.
          </p>
          <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        </>
      )}
    </div>
  );
}
