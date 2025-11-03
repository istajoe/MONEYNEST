import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./forexTrade.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const ForexTrade = () => {
  const [currencyPair, setCurrencyPair] = useState("USD/NGN");
  const [tradeType, setTradeType] = useState("buy");
  const [amount, setAmount] = useState("");
  const [trades, setTrades] = useState([]);
  const [rates] = useState({
    "USD/NGN": 760,
    "EUR/NGN": 820,
    "GBP/NGN": 950,
    "JPY/NGN": 5.5,
  });

  const handleTrade = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }

    const newTrade = {
      type: tradeType,
      pair: currencyPair,
      amount: parseFloat(amount),
      rate: rates[currencyPair],
      date: new Date().toLocaleString(),
    };

    setTrades([newTrade, ...trades]);
    setAmount("");
  };

  // Simple line chart data
  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: currencyPair,
        data: [760, 765, 770, 768, 775], // sample rates
        borderColor: "blue",
        backgroundColor: "lightblue",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="forex-trade">
      <h1>Forex Trading Dashboard</h1>

      <div className="trade-panel">
        <div className="pair-select">
          <label>Currency Pair:</label>
          <select value={currencyPair} onChange={(e) => setCurrencyPair(e.target.value)}>
            {Object.keys(rates).map((pair) => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
        </div>

        <div className="trade-type">
          <button className={tradeType === "buy" ? "active" : ""} onClick={() => setTradeType("buy")}>Buy</button>
          <button className={tradeType === "sell" ? "active" : ""} onClick={() => setTradeType("sell")}>Sell</button>
        </div>

        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <button className="submit-btn" onClick={handleTrade}>Execute Trade</button>
      </div>

      <div className="chart-container">
        <h2>{currencyPair} Price Chart</h2>
        <Line data={chartData} />
      </div>

      <div className="trade-history">
        <h2>Trade History</h2>
        {trades.length === 0 ? (
          <p>No trades yet</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Pair</th>
                <th>Amount</th>
                <th>Rate (NGN)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade, index) => (
                <tr key={index}>
                  <td>{trade.type}</td>
                  <td>{trade.pair}</td>
                  <td>{trade.amount}</td>
                  <td>{trade.rate}</td>
                  <td>{trade.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ForexTrade;
