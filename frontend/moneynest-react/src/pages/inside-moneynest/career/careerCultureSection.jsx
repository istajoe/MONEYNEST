import React from "react";

const CareerCultureSection = () => {
  return (
    <section className="culture-section">
      <h2>Our Culture</h2>
      <p>
        At Moneynest, we believe innovation thrives in collaboration. Our team
        values transparency, learning, and inclusion. We challenge the norm and
        celebrate creativity.
      </p>
      <div className="culture-grid">
        <div className="culture-card">
          <h3>Innovation</h3>
          <p>We encourage bold ideas that push fintech forward.</p>
        </div>
        <div className="culture-card">
          <h3>Collaboration</h3>
          <p>We win together by sharing knowledge and helping each other grow.</p>
        </div>
        <div className="culture-card">
          <h3>Growth</h3>
          <p>We invest in people who invest in themselves.</p>
        </div>
      </div>
    </section>
  );
};

export default CareerCultureSection;
