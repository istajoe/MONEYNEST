import React from "react";
import "./contactOptions.css";
import { FiPhoneCall } from "react-icons/fi";
import { FiHelpCircle } from "react-icons/fi";

const ContactOptions = () => {
  return (
    <section className="contact-options">
      <div className="contact-card">
        <div className="contact-icon">
          <FiPhoneCall size={35} color="#0057FF" />
        </div>
        <h3>Engage Support</h3>
        <p>
          Experiencing problems? Talk to us about it and we will get right on it.
        </p>
        <a href="#" className="contact-link">
          Chat with us →
        </a>
      </div>

      <div className="contact-card">
        <div className="contact-icon">
          <FiHelpCircle size={35} color="#0057FF" />
        </div>
        <h3>Find Answers</h3>
        <p>
          Experiencing problems? Talk to us about it and we will get right on it.
        </p>
        <a href="#" className="contact-link">
          Visit help centre →
        </a>
      </div>
    </section>
  );
};

export default ContactOptions;
