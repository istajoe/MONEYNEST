import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "../components/css/Login.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(form);
      setUser(data.user);
      if (data.user.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left side with hero image */}
      <div className="login-hero">
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Moneynest</h1>
          <p>Securely manage your money, forex, and crypto transactions in one place.</p>
        </div>
      </div>

      {/* Right side with login form */}
      <div className="login-form-section">
        <div className="form-box">
          <h2>Welcome Back 👋</h2>
          <p className="subtitle">Login to your Moneynest account</p>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <div className="form-options">
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="register-link">
            Don’t have an account?{" "}
            <Link to="/register" className="signup-text">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
