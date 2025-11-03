import React from "react";
import "./ResourceBlogGrid.css";

// Sample blog data
const blogPosts = [
  {
    title: "Business Life",
    date: "September 26, 2025",
    description: "Moniepoint named among UK’S leading fintech companies by CNBC",
    name: "by Okeke Joseph",
    image: "/business-life.jpg",
    link: "#",
  },
  {
    title: "News",
    date: "September 24, 2025",
    description: "Needs vs Wants: The Smart Way To Manage Money and Save in Nigeria",
    name: "by Okeke Joseph",
    image: "/news.jpg",
    link: "#",
  },
  {
    title: "Business Tips",
    date: "September 22, 2025",
    description: "How to Save Smarter in Nigeria (and Earn Up to 18% While at It)",
    name: "by Okeke Joseph",
    image: "/business-tip.jpg",
    link: "#",
  },
   {
    title: "Business Life",
    date: "September 26, 2025",
    description: "Needs vs Wants: The Smart Way To Manage Money and Save in Nigeria",
    name: "by Okeke Joseph",
    image: "/business-life.jpg",
    link: "#",
  },
  {
    title: "News",
    date: "September 24, 2025",
    description: "Moniepoint named among UK’S leading fintech companies by CNBC",
    name: "by Fidphina Joseph",
    image: "/news.jpg",
    link: "#",
  },
  {
    title: "Business Tips",
    date: "September 22, 2025",
    description: "How to Save Smarter in Nigeria (and Earn Up to 18% While at It)",
    name: "by Reginald Somtochukwu",
    image: "/business-tip.jpg",
    link: "#",
  },
];

const ResourceBlogGrid = () => {
  return (
    <section className="blog-grid-section">
      <div className="blog-header">
        <h2>All Stories</h2>
        <p>Everything you need to know, about everything we do.</p>
        <div className="blog-search">
          <input type="text" placeholder="Search blog..." />
          <button>Search</button>
        </div>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <a key={index} href={post.link} className="blog-card">
            <div className="blog-image-wrapper">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-info">
              <h3>{post.title}</h3>
              <span>{post.date}</span>
              <h2>{post.description}</h2>
              <br />
              <p>{post.name}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ResourceBlogGrid;
