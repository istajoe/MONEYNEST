import React from "react";

const NewsCategories = () => {
  const categories = [
    {
      title: "Job News",
      desc: "See the latest openings, promotions, and career stories at Moneynest.",
      color: "#f8d86b"
    },
    {
      title: "Training News",
      desc: "Learn about our workshops, certifications, and staff development programs.",
      color: "#ffe27f"
    },
    {
      title: "Financial News",
      desc: "Updates on financial products, investment opportunities, and company performance.",
      color: "#c5f6ff"
    },
    {
      title: "Event News",
      desc: "Highlights from our fintech conferences, community outreach, and partnerships.",
      color: "#cde5ff"
    },
    {
      title: "Crypto News",
      desc: "Explore Moneynest’s insights and involvement in the crypto and Web3 space.",
      color: "#f4c4ff"
    },
    {
      title: "Forex News",
      desc: "Explore Moneynest’s insights and involvement in the Forex and Trading space.",
      color: "#f4c4ff"
    },
    {
      title: "Investment News",
      desc: "Explore Moneynest’s insights and involvement in the investment and Business space.",
      color: "#f4c4ff"
    },
    {
      title: "Insurance News",
      desc: "Explore Moneynest’s insights and involvement in the insurance and future security space.",
      color: "#f4c4ff"
    }
  ];

  return (
    <section className="news-categories">
      <h2>News Categories</h2>
      <div className="categories-grid">
        {categories.map((item, index) => (
          <div
            key={index}
            className="category-card"
            style={{ backgroundColor: item.color }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsCategories;
