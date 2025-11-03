import React from "react";

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <h2>Subscribe to Our Updates</h2>
      <p>
        Get the latest Moneynest news, product launches, and events directly to your inbox.
      </p>
      <form className="newsletter-form">
        <input type="email" placeholder="Enter your email address" required />
        <button type="submit">Subscribe</button>
      </form>
    </section>
  );
};

export default NewsletterSection;
