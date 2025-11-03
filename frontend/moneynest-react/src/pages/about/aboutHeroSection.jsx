import React from "react";
import "../about/aboutHeroSection.css";

const AboutHeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <span className="tagline">
          ABOUT US
        </span>
        <h1>
          Powering Dreams Across
        </h1>
        <p>
          Nigeria
        </p>
        <button className="join-btn">Join Us</button>
      </div>
    </section>
  );
};

export default AboutHeroSection;
