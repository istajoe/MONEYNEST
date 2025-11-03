import React from "react";
import "./css/bankingFeatures.css";

const BankingFeature = () => {
  return (
    <section className="banking-feature">
      <div className="banking-text">
        <h2>
          <span className="highlight">Free</span> bank accounts
        </h2>
        <p>
          We offer business owners and their customers a free bank account to
          manage their finances with ease, speed and efficiency.
        </p>
      </div>

      {/* Optional image — if your page includes one */}
      <div className="banking-image">
        <img
          src="/banking-lady.png"
          alt="Banking illustration"
        />
      </div>
    </section>
  );
};

export default BankingFeature;
