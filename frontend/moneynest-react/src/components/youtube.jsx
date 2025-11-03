// Home.jsx
import React from "react";
import "./css/youtube.css";

const HomeVideo = () => {
  return (
    <div className="home1">
        <div className="video-container">
            <iframe
            src="https://www.youtube.com/embed/xRABRxJM4yc"
            title="Moneynest Intro Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ></iframe>
        </div>
    </div>
    
  );
};

export default HomeVideo;
