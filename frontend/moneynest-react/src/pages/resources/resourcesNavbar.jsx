import React from "react";
import "./resourcesNavbar.css";

const ResourceNavbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">M</div>
        <span className="navbar-title">
          <a href="/">Moneynest </a>
          <span className="blog-text">BLOG</span>
        </span>
      </div>

      <ul className="navbar-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Business Tips</a></li>
        <li><a href="#">Education Series</a></li>
        <li><a href="#">Impact Stories</a></li>
        <li><a href="#">News</a></li>
        <li><a href="#">People</a></li>
        <li><a href="#">Product Updates</a></li>
        <li><a href="#">Tech & Processes</a></li>
      </ul>

      <button className="subscribe-btn">Subscribe →</button>
    </nav>
  );
};

export default ResourceNavbar;
