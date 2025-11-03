import React from "react";
import "./css/TopBanner.css";

const TopBanner = () => {
  return (
    <div className="top-banner">
      You are on our Global Page. To view content relevant to your location, select a different country or region.
      <button className="global-btn">🌍 Global</button>
    </div>
  );
};

export default TopBanner;
