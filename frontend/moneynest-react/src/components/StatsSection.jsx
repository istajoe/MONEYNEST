// src/components/StatsSection.js
import React from "react";
import "./css/StatsSection.css";

const StatsSection = () => {
  return (
    <section className="stats-section">
      <h2 className="stats-title">
        Trusted by <span className="highlight">10,000,000+</span> business and
        individual accounts
      </h2>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <h3>200M</h3>
          <p>API calls per minute</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <h3>$17B</h3>
          <p>TPV monthly</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <h3>26M</h3>
          <p>Payments processed daily</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
