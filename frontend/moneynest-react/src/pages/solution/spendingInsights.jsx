import React from "react";
import "./css/spendingInsights.css";

const SpendingInsights = () => {
  return (
    <section className="spending-section">
      <div className="spending-text">
        <h2>
          <span className="highlight">Spending insights</span> for better
          control.
        </h2>
        <p>
          Businesses and individuals on our platform get insights on their
          spending and finance, to help them make better decisions.
        </p>
      </div>

      <div className="spending-image">
        <img
          src="/spending-insight.png"
          alt="Spending insights dashboard"
        />
      </div>
    </section>
  );
};

export default SpendingInsights;
