import { createContext, useEffect, useState } from "react";
import { getProfile, logoutUser } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await getProfile();
      setUser(res.data.user);
    } catch (err) {
      console.log("Error fetching user:", err.response?.data || err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ✅ Only run once on mount
    fetchUser();
  }, []); // <-- Empty dependency array prevents infinite loop

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
