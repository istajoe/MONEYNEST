import React, { useState } from "react";
import "./css/cultureHero.css";

const CultureHero = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleVideoClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="culture-section">
      <div className="culture-content">
        <div className="culture-tag">Our Culture</div>
        <h1>
          Say hello to the <span className="highlight">dream team</span>
        </h1>
        <p>
          Come meet the team that's making financial happiness possible for
          millions of people.
        </p>

        <div
          className={`video-wrapper ${isExpanded ? "expanded" : ""}`}
          onClick={handleVideoClick}
        >
          <video
            src="/videos/team.mp4" // 👈 replace with your real video path
            className="culture-video"
            controls
          ></video>
          <div className="play-overlay">
            <div className="play-btn">▶</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureHero;
