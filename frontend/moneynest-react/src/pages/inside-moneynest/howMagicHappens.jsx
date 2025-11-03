import React from "react";
import "./css/howMagicHappens.css";

const sections = [
  {
    title: "We go for the best and nothing less",
    text: "Every member of our team is a master at what they do. We give 100% and push our limits every day to create the best experiences for our users.",
    img: "/team-photo.png",
  },
  {
    title: "Collaboration makes us stronger",
    text: "Ideas grow better when shared. At MoneyNest, collaboration is the heartbeat of our culture — we listen, build, and innovate together.",
    img: "/brainstorming.png",
  },
  {
    title: "We innovate with purpose",
    text: "Our solutions are designed to solve real problems. Every project starts with ‘why’ — we innovate to make finance simpler, faster, and more human.",
    img: "/startup.png",
  },
  {
    title: "Growth is our constant",
    text: "We never stop learning. From internal mentorships to global conferences, growth is woven into how we work and how we win.",
    img: "/adult.png",
  },
  {
    title: "We celebrate every win",
    text: "Small or big, wins matter. We take time to celebrate milestones, give shoutouts, and remind ourselves how far we’ve come.",
    img: "/celebration.png",
  },
  {
    title: "We play to win, always",
    text: "Every day is like a game — we stay competitive, challenge ourselves, and go the extra mile to stay on top of our goals.",
    img: "/people-value.png",
  },
];

const HowMagicHappens = () => {
  return (
    <section className="magic-section">
      <div className="magic-header">
        <h2>How the magic happens</h2>
        <p>
          We see ourselves as the best team to ever do it. Everyday is like a game and we play to win. Always.
        </p>
      </div>

      <div className="magic-list">
        {sections.map((item, index) => (
          <div
            key={index}
            className={`magic-item ${index % 2 === 1 ? "reverse" : ""}`}
          >
            <div className="magic-text">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="magic-image">
              <img src={item.img} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowMagicHappens;
