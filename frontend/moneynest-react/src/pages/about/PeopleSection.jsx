import React from "react";
import "./PeopleSection.css";
 // 🖼️ replace with your actual image path

const PeopleSection = () => {
  return (
    <section className="people-section">
      <div className="people-container">
        {/* Left side text */}
        <div className="people-text">
          <h2>
            <span className="highlight">Awesome people</span> building for people
          </h2>
          <p>
            MoneyNest is run by a team of veteran bankers and technologists
            working to provide the most seamless and secure experience for
            everyone using our platform.
          </p>
        </div>

        {/* Right side image */}
        <div className="people-image">
          <img src="/team-photo.png" alt="Our team" />
        </div>
      </div>
    </section>
  );
};

export default PeopleSection;
