import React, { useState, useEffect } from "react";
import "./cryptoWallet.css";

const CryptoWallet = () => {
  const [walletAddress, setWalletAddress] = useState("0x1234...abcd");
  const [cryptoBalance, setCryptoBalance] = useState(2.5); // Example BTC balance
  const [nairaRate, setNairaRate] = useState(30000000); // 1 BTC = 30M NGN
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [transactionType, setTransactionType] = useState("pay"); // pay, withdraw, swap
  const [transactions, setTransactions] = useState([]);

  const handleTransaction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const newTransaction = {
      type: transactionType,
      amount: parseFloat(amount),
      recipient: transactionType === "pay" ? recipient : "self",
      date: new Date().toLocaleString(),
    };

    setTransactions([newTransaction, ...transactions]);

    if (transactionType !== "swap") {
      setCryptoBalance((prev) =>
        transactionType === "withdraw" || transactionType === "pay"
          ? prev - parseFloat(amount)
          : prev + parseFloat(amount)
      );
    }

    setAmount("");
    setRecipient("");
  };

  const cryptoInNaira = (cryptoBalance * nairaRate).toLocaleString();

  return (
    <div className="crypto-wallet">
      <h1>My Crypto Wallet</h1>

      <div className="wallet-info">
        <p><strong>Wallet Address:</strong> {walletAddress}</p>
        <p><strong>Balance:</strong> {cryptoBalance} BTC (~₦{cryptoInNaira})</p>
      </div>

      <div className="transaction-panel">
        <div className="transaction-type">
          <button
            className={transactionType === "pay" ? "active" : ""}
            onClick={() => setTransactionType("pay")}
          >
            Pay
          </button>
          <button
            className={transactionType === "withdraw" ? "active" : ""}
            onClick={() => setTransactionType("withdraw")}
          >
            Withdraw
          </button>
          <button
            className={transactionType === "swap" ? "active" : ""}
            onClick={() => setTransactionType("swap")}
          >
            Swap
          </button>
        </div>

        {transactionType === "pay" && (
          <input
            type="text"
            placeholder="Recipient Wallet Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        )}

        <input
          type="number"
          placeholder="Amount (BTC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

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
                <th>Amount (BTC)</th>
                <th>Amount (₦)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.type}</td>
                  <td>{tx.recipient}</td>
                  <td>{tx.amount}</td>
                  <td>{(tx.amount * nairaRate).toLocaleString()}</td>
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

export default CryptoWallet;
