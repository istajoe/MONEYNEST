import React from "react";
import ResourceNavbar from "./resourcesNavbar.jsx";
import ResourceBlogGrid from "./resourceBlogGrid.jsx";
import "./resourcesHome.css";
import SubscribeSection from "./resourceSubscribeSection.jsx";

const ResourceHome = () => {
  return (
    <div className="blog-home">
      <ResourceNavbar />

      <section className="blog-hero">
        <h1>Moneynest Blog</h1>
        <p>
          Get behind the scenes on our process, exciting news, and the people
          making dreams come true for millions of businesses.
        </p>
      </section>

      <section className="featured-story">
        <div className="featured-left">
          <div className="tag-group">
            <span className="tag-blue">Business Life</span>
            <span className="tag-yellow">Top Stories</span>
          </div>
          <h2>
            Business Life - Ep 1: The 9-5er who almost sold his business
          </h2>
          <p>
            Discover how an entrepreneur nearly gave up his dream and what saved his journey. Inspiring stories of growth, failure, and comeback.
          </p>
        </div>

        <div className="featured-right">
          <div className="color-box gold"></div>
          <div className="color-box navy"></div>
          <div className="color-box red"></div>
          <div className="color-box yellow"></div>
        </div>
      </section>
      <ResourceBlogGrid />
      <SubscribeSection />
    </div>
  );
};

export default ResourceHome;
