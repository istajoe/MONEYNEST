import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ You can optionally verify payment with backend here later
    setTimeout(() => navigate("/dashboard"), 3000);
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>✅ Payment Successful!</h2>
      <p>Redirecting you back to your dashboard...</p>
    </div>
  );
}
