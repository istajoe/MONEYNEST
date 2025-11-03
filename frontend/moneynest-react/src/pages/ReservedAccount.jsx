import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../components/css/ReservedAccount.css";

export default function ReservedAccount() {
  const { user, loading } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) fetchAccounts();
  }, [user]);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("/api/reserved-account", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      setAccounts(data.reservedAccounts || []);
    } catch (err) {
      console.error("fetch accounts:", err);
      setError("Unable to load reserved accounts");
    }
  };

  const createAccounts = async () => {
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/reserved-account/create", {
        method: "POST",
        credentials: "include"
      });
      const data = await res.json();
      if (res.ok) {
        setAccounts(data.reservedAccounts || []);
      } else {
        setError(data.error || "Failed to create");
      }
    } catch (err) {
      console.error("create reserved:", err);
      setError("Network error");
    } finally {
      setCreating(false);
    }
  };

  if (loading || !user) return <div>Loading...</div>;

  return (
    <div className="reserved-page">
      <div className="reserved-card">
        <h2>Your Top-up Accounts</h2>
        <p>Transfer money to any of the bank accounts below to auto-credit your Moneynest wallet.</p>

        {error && <p className="error">{error}</p>}

        {accounts.length === 0 ? (
          <div className="no-accounts">
            <p>You don't have reserved accounts yet.</p>
            <button onClick={createAccounts} disabled={creating}>
              {creating ? "Creating..." : "Create Top-up Account"}
            </button>
          </div>
        ) : (
          <div className="accounts-list">
            {accounts.map((a, idx) => (
              <div className="account" key={idx}>
                <div className="left">
                  <strong>{a.bankName}</strong>
                  <div className="acct">{a.accountNumber}</div>
                </div>
                <div className="right">
                  <div className="ref">Ref: {a.accountReference}</div>
                  <div className="currency">{a.currencyCode || "NGN"}</div>
                </div>
              </div>
            ))}

            <p className="hint">Tip: Use the exact reference when transferring to ensure auto-matching.</p>
          </div>
        )}
      </div>
    </div>
  );
}
