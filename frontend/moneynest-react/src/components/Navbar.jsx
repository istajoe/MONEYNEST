import React, { useState, useRef } from "react";
import "./css/Navbar.css";
import SolutionsDropdown from "../components/SolutionsDropdown";

const Navbar = () => {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [insideOpen, setInsideOpen] = useState(false)

  const solutionsTimer = useRef(null);
  const resourcesTimer = useRef(null);
  const insideTimer = useRef(null);

  // 🧩 Show/hide logic for "Solutions"
  const handleSolutionsEnter = () => {
    clearTimeout(solutionsTimer.current);
    setSolutionsOpen(true);
  };
  const handleSolutionsLeave = () => {
    solutionsTimer.current = setTimeout(() => setSolutionsOpen(false), 200);
  };

  //  Show/hide logic for "Resources"
  const handleResourcesEnter = () => {
    clearTimeout(resourcesTimer.current);
    setResourcesOpen(true);
  };
  const handleResourcesLeave = () => {
    resourcesTimer.current = setTimeout(() => setResourcesOpen(false), 200);
  };

  // Inside MoneyNest handlers
  const handleInsideEnter = () => {
    clearTimeout(insideTimer.current);
    setInsideOpen(true);
  };
  const handleInsideLeave = () => {
    insideTimer.current = setTimeout(() => setInsideOpen(false), 200);
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <div className="logo-box">M</div>
        <span>
          <a href="/">MoneyNest</a>
        </span>
      </div>

      {/* Nav Links */}
      <ul className="nav-links">
        {/* Solutions Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={handleSolutionsEnter}
          onMouseLeave={handleSolutionsLeave}
        >
          <button className="dropdown-btn">Solutions  ▼</button>
          <SolutionsDropdown solutionOpens={solutionsOpen} />

        </li>
g
        {/* Inside MoneyNest Dropdown */}
        <li 
          className="dropdown"
          onMouseEnter= {handleInsideEnter}
          onMouseLeave= {handleInsideLeave}
          >
            <button className="dropdown-btn">Inside MoneyNest ▼</button>
            {insideOpen && (
              <ul className="dropdown-menu">
                <li>
                  <a href="/culture">
                    <span className="icon">🍸</span>
                    Culture
                  </a>
                </li>
                <li>
                  <a href="/career">
                    <span className="icon">💼</span>
                    Career
                  </a>
                </li>
                <li>
                  <a href="/press">
                    <span className="icon">📰</span>
                    Press
                  </a>
                </li>
              </ul>
            )}
        </li>
        <li>
          <a href="/About">About</a>
        </li>
        <li>
          <a href="/Contact">Contact</a>
        </li>

        {/* Resources Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={handleResourcesEnter}
          onMouseLeave={handleResourcesLeave}
        >
          <button className="dropdown-btn">
            Resources <span className="dropdown-arrow">▼</span>
          </button>

          {resourcesOpen && (
            <div className="resources-dropdown">
              <a href="/resources" className="dropdown-item">
                <span className="dropdown-icon">📰</span> Blog
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">💡</span> Engineering Blog
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">📄</span> Informal Report
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">📚</span> Case Studies
              </a>
            </div>
          )}
        </li>
      </ul>

      {/* Sign Up Button */}
      <button className="signup-btn">
        <a href="/register">Sign Up</a>
      </button>
    </nav>
  );
};

export default Navbar;


