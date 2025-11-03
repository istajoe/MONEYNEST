import React from "react";

const PressHighlights = () => {
  const articles = [
    {
      title: "Moneynest Secures $10M Series A to Expand Fintech Access",
      date: "Oct 10, 2025",
      source: "TechCrunch",
      link: "#"
    },
    {
      title: "Moneynest Launches Youth Financial Literacy Program",
      date: "Sep 14, 2025",
      source: "Forbes Africa",
      link: "#"
    },
    {
      title: "CEO Talks: The Future of Decentralized Banking in Africa",
      date: "Aug 28, 2025",
      source: "Bloomberg",
      link: "#"
    },
  ];

  return (
    <section className="press-highlights">
      <h2>Press Highlights</h2>
      <div className="press-grid">
        {articles.map((item, i) => (
          <div className="press-card" key={i}>
            <h3>{item.title}</h3>
            <p>{item.date} · {item.source}</p>
            <a href={item.link} className="read-more">Read More →</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PressHighlights;
