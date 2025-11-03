import { logoutUser } from "../services/api";

export default function Logout({ onLogout }) {
  const handleLogout = async () => {
    await logoutUser();
    onLogout(); // clear local state in frontend
  };

  return <button onClick={handleLogout}>Logout</button>;
}
