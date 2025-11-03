// src/components/Footer.js
import React from "react";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left section */}
        <div className="footer-about">
          <div className="footer-logo">💰 MoneyNest</div>
          <p>
            MoneyNest is an all-in-one financial ecosystem, helping businesses
            and individuals access seamless payments, banking, credit, and
            business tools.
          </p>
          <p>
            We process billions in transactions monthly for our customers while
            operating profitably.
          </p>

          <div className="store-buttons">
            <a href="#">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
              />
            </a>
            <a href="#">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
              />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <div>
            <h4>Solutions</h4>
            <ul>
              <li>Credit</li>
              <li>Payments</li>
              <li>Banking</li>
              <li>Business Management</li>
            </ul>
          </div>

          <div>
            <h4>Company</h4>
            <ul>
              <li>About Us</li>
              <li>Culture</li>
              <li>Join Our Team</li>
              <li>Press & Media</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h4>Resources</h4>
            <ul>
              <li>Blog</li>
              <li>Help Centre</li>
              <li>Learning Centre</li>
              <li>Whistleblower Policy</li>
              <li>Report a Vulnerability</li>
              <li>Security Trust Center</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="footer-bottom">
        <div>
          <h4>United Kingdom</h4>
          <p>8th Floor 22 Upper Ground, London</p>
        </div>
        <div>
          <h4>United States</h4>
          <p>Suite 105, 112 S. French Street</p>
        </div>
        <div>
          <h4>Nigeria</h4>
          <p>The Post Square, Lagos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
