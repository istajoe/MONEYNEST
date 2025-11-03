import React from "react";
import "./resourceSubscribeSection.css";

const SubscribeSection = () => {
  return (
    <section className="subscribe-section">
      <div className="subscribe-content">
        <div className="subscribe-text">
          <h2>Get more stories like this</h2>
          <p>
            Sign up for exciting updates on Moneynest and how we’re powering
            business dreams.
          </p>

          <form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="email"
              className="subscribe-input"
              required
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
        </div>

        <div className="subscribe-image">
          {/* Placeholder for image or illustration */}
          <div className="newsletter-card">
            <div className="newsletter-header">M</div>
            <div className="newsletter-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
