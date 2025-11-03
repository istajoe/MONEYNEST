import React from "react";
import PressHero from "./pressHero";
import NewsCategories from "./newsCategories";
import PressHighlights from "./pressHighlights";
import NewsletterSection from "./newsLetterSection";
import PressContact from "./pressContacts";
import "./css/press.css";

const PressPage = () => {
  return (
    <div className="press-page">
      <PressHero />
      <NewsCategories />
      <PressHighlights />
      <NewsletterSection />
      <PressContact />
    </div>
  );
};

export default PressPage;
