import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ adminOnly = false, guestOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // Or your spinner component

  // Redirect logged-in users away from login/register pages
  if (guestOnly && user) {
    return <Navigate to={user.role === "admin" ? "/admin-dashboard" : "/dashboard"} replace />;
  }

  // Block unauthenticated users from protected routes
  if (!user && !guestOnly) return <Navigate to="/login" replace />;

  // Block non-admin users from admin-only routes
  if (adminOnly && user?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return <Outlet />; // Render the nested routes
};

export default PrivateRoute;
