import React from "react";
import "./ImpactBanner.css";

const ImpactBanner = () => {
  return (
    <section className="impact-banner">
      <div className="impact-container">
        <p>
          <strong>MoneyNest</strong> provides over{" "}
          <span className="highlight">10 million people and businesses</span> across Nigeria
          with access to banking, credit and business management tools.
        </p>
      </div>
    </section>
  );
};

export default ImpactBanner;
