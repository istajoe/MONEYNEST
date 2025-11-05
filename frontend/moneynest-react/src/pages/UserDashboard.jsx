import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getTransactions } from "../api/api";
import "../components/css/UserDashboard.css";

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, loading, logout } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (err) {6
      console.error("Error fetching transactions:", err);
    }
  };

  if (loading || !user) return <div className="loading">Loading...</div>;

  // Transaction pages you already have
  const transactionTypes = [
    { name: "Deposit", path: "/deposit" },
    { name: "Withdrawal", path: "/withdrawal" },
    { name: "Transfer", path: "/transfer" },
    { name: "Airtime", path: "/airtime" },
    { name: "Data", path: "/data" },
    { name: "Bill", path: "/bill" },
    { name: "Crypto", path: "/crypto" },
    { name: "Forex", path: "/forex" },
    { name: "USD", path: "/usd" },
  ];

  return (
    <div className="dashboard-container">
      {/* ===== HEADER ===== */}
      <header className="dashboard-header">
        <div className="header-left">
          <h2>Welcome, <span className="user-name">{user.name}</span></h2>
          <p className="balance">
            Available Balance:{" "}
            <span className="balance-amount">₦{user.balance?.toLocaleString() || "0.00"}</span>
          </p>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>

      {/* ===== TRANSACTION OPTIONS ===== */}
      <section className="transaction-section">
        <h3>Quick Access</h3>
        <div className="transaction-buttons">
          {transactionTypes.map((t) => (
            <button
              key={t.name}
              className="type-btn"
              onClick={() => navigate(t.path)}
            >
              {t.name}
            </button>
          ))}
        </div>
      </section>

      {/* ===== RECENT TRANSACTIONS ===== */}
      <section className="transactions-list">
        <h3>Recent Transactions</h3>
        {transactions.length > 0 ? (
          <ul>
            {transactions.map((tx) => (
              <li key={tx._id} className={`tx-item ${tx.status}`}>
                <div className="tx-info">
                  <span className="tx-type">{tx.type.toUpperCase()}</span>
                  <span className="tx-amount">₦{tx.amount.toLocaleString()}</span>
                </div>
                <div className={`tx-status ${tx.status}`}>
                  {tx.status === "completed" ? "✅ Completed" : "⏳ Pending"}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-tx">No transactions yet.</p>
        )}
      </section>
    </div>
  );
}
