import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";  // ✅ use your Navbar component
import "./Home.css";
import AboutHeroSection from "./about/aboutHeroSection";
import WhoWeAre from "./about/WhoWeAre";
import ImpactBanner from "./about/ImpactBanner";
import PeopleSection from "./about/PeopleSection"
import InsideNews from "./about/InsideNews";
import ContactImpactBanner from "./contact/contactImpactBanner";
import HomeVideo from "../components/youtube";

export default function About() {
  return (
    <div>
        <AboutHeroSection /> 
        <WhoWeAre />
        <ImpactBanner />
        <PeopleSection />
        <HomeVideo />
        <InsideNews />
        <ContactImpactBanner />
    </div>
  );
}
