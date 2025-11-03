import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";
import "../components/css/Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await registerUser(form);
      alert("🎉 Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {/* Left Hero Section */}
      <div className="register-page-hero">
        <div className="register-page-overlay"></div>
        <div className="register-page-hero-content">
          <h1>Moneynest</h1>
          <p>Join the next generation of digital banking, forex and crypto services — all in one place.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="register-page-form">
        <div className="register-page-box">
          <h2>Create Your Account</h2>
          <p className="register-page-login">Sign up to start managing your money smarter.</p>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+234 812 345 6789"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Minimum 6 characters"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login" className="login-text">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
