import React, { useState } from "react";
import "./USDAccount.css";

const USDAccount = () => {
  const [usdBalance, setUsdBalance] = useState(1500); // USD balance
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionType, setTransactionType] = useState("send");
  const [transactions, setTransactions] = useState([]);
  const usdToNaira = 760; // example rate 1 USD = 760 NGN

  const handleTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    if (parseFloat(amount) > usdBalance && transactionType !== "receive") {
      alert("Insufficient balance");
      return;
    }

    const newTransaction = {
      type: transactionType,
      recipient: transactionType === "send" ? recipient : "self",
      amount: parseFloat(amount),
      nairaEquivalent: parseFloat(amount) * usdToNaira,
      date: new Date().toLocaleString(),
    };

    setTransactions([newTransaction, ...transactions]);

    if (transactionType === "send" || transactionType === "withdraw") {
      setUsdBalance(prev => prev - parseFloat(amount));
    } else if (transactionType === "receive") {
      setUsdBalance(prev => prev + parseFloat(amount));
    }

    setAmount("");
    setRecipient("");
  };

  return (
    <div className="usd-account">
      <h1>USD Account</h1>

      <div className="account-info">
        <p><strong>Balance:</strong> ${usdBalance.toFixed(2)} (~₦{(usdBalance * usdToNaira).toLocaleString()})</p>
      </div>

      <div className="transaction-panel">
        <div className="transaction-type">
          <button className={transactionType === "send" ? "active" : ""} onClick={() => setTransactionType("send")}>Send</button>
          <button className={transactionType === "receive" ? "active" : ""} onClick={() => setTransactionType("receive")}>Receive</button>
          <button className={transactionType === "withdraw" ? "active" : ""} onClick={() => setTransactionType("withdraw")}>Withdraw</button>
        </div>

        {transactionType === "send" && (
          <input type="text" placeholder="Recipient Email or Account" value={recipient} onChange={(e) => setRecipient(e.target.value)} />
        )}

        <input type="number" placeholder="Amount (USD)" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <button className="submit-btn" onClick={handleTransaction}>
          {transactionType.charAt(0).toUpperCase() + transactionType.slice(1)}
        </button>
      </div>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Recipient</th>
                <th>Amount (USD)</th>
                <th>Amount (₦)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.type}</td>
                  <td>{tx.recipient}</td>
                  <td>{tx.amount.toFixed(2)}</td>
                  <td>{tx.nairaEquivalent.toLocaleString()}</td>
                  <td>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default USDAccount;
