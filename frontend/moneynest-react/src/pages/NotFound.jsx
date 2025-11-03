// src/pages/NotFound.jsx
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for doesn’t exist.</p>
      <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>
        Go back to Home
      </Link>
    </div>
  );
}
