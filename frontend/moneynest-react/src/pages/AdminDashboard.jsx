// src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { getProfile } from "../api/api";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getProfile()
      .then(setUser)
      .catch((err) => console.error("Error fetching profile:", err));
  }, []);

  if (!user) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
      <h1>Welcome, {user.name} (Admin)</h1>
      <h2>Admin Dashboard</h2>
      <p>Here you can manage all users’ contributions and cashouts.</p>
    </div>
  );
}
