import React from "react";
import "../components/css/Navbar.css";

const SolutionsDropdown = ({ solutionOpens }) => {
  return (
    <>
      {solutionOpens && (
        <div className="dropdown-menu1">
          <div className="dropdown-menu">
            {/* Personal */}
            <div className="dropdown-column">
              <h4>Personal</h4>
              <a href="/banking" className="dropdown-item">
                <span className="dropdown-icon">🏦</span> Banking
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">💳</span> Credit
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">💰</span> Payments
              </a>
            </div>
            {/* Business */}
            <div className="dropdown-column">
              <h4>Business</h4>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">🏢</span> Business Account
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">📱</span> USSD
              </a>
              <a href="#" className="dropdown-item">
                <span className="dropdown-icon">📈</span> Business Management
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SolutionsDropdown;
