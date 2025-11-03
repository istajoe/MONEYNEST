import React from "react";
import "./solutionBankingHero.css";

const SolutionBankingHero = () => {
  return (
    <section className="banking-hero">
      <div className="banking-content">
        <span className="banking-tag">Banking</span>
        <h1>Reliable banking for everyone</h1>
        <p>
          Businesses in emerging markets often lack access to the banking
          solutions and support they need to grow. That’s where we come in.
        </p>
        <button className="partner-btn">Partner with us →</button>
      </div>

      <div className="banking-image">
        <div className="balance-card">
          <p>Available Balance</p>
          <h2>₦10,050,000.00</h2>
        </div>

        <div className="banking-actions">
          <div className="action-card">💸 Transfer</div>
          <div className="action-card">🔼 Top-Up</div>
          <div className="action-card">💡 Pay Bills</div>
          <div className="action-card">📷 Scan QR</div>
        </div>

        <img
          src="/banking-lady.png"
          alt="Banking lady"
          className="banking-lady"
        />
      </div>
    </section>
  );
};

export default SolutionBankingHero;
