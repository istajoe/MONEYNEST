import React from "react";
import "./css/HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="tagline">
          Africa's fastest growing financial institution 2023–2025
        </span>
        <h1>
          Financial happiness for <br /> every African, everywhere
        </h1>
        <p>
          MoneyNest provides an all-in-one payments, banking and operations
          platform for businesses and their customers.
        </p>
        <button className="join-btn">Join Us</button>
      </div>
      <div className="hero-image">
        <img
          src="/british.png"
          alt="Hero"
        />
      </div>
    </section>
  );
};

export default HeroSection;
