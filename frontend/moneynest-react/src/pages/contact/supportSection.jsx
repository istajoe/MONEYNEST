import React from "react";
import "./supportSection.css";

const supportCards = [
  {
    id: 1,
    title: "Trouble signing in?",
    description:
      "If you’ve got trouble signing in, you might need to reset your password or recover your username. Click learn more for a step-by-step guide on how to manage your account.",
    tags: ["Account", "Sign In", "Dashboard"],
  },
  {
    id: 2,
    title: "Need help with KYC?",
    description:
      "Having trouble with the KYC verification process? Click below to learn about the different KYC levels, and the step-by-step requirements for each.",
    tags: ["Verification", "Transactions", "Security"],
  },
  {
    id: 3,
    title: "Compromised account?",
    description:
      "For any issues, including fraud, click the link below to submit a request, and our support team will respond to you as soon as possible.",
    tags: ["Fraud", "Security", "Account"],
  },
];

const SupportSection = () => {
  return (
    <section className="support-section">
      <h2 className="support-title">Get quick support on popular issues</h2>

      <div className="support-cards">
        {supportCards.map((card) => (
          <div className="support-card" key={card.id}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>

            <div className="tags">
              {card.tags.map((tag, index) => (
                <span className="tag" key={index}>
                  {tag}
                </span>
              ))}
            </div>

            <a href="#" className="learn-more">
              Learn more →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SupportSection;
