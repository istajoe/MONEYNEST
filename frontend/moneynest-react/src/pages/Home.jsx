import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";  // ✅ use your Navbar component
import "./Home.css";
import Solutions from "../components/Solutions"
import HeroSection from "../components/HeroSection";
import ChatWidget from "../components/ChatWidget";
import StatsSection from "../components/StatsSection";
import Investors from "../components/Investors";
import HomeVideo from "../components/youtube";

export default function Home() {
  return (
    <div>
        <HeroSection />
        <ChatWidget />
        <Solutions />
        <HomeVideo />
        <StatsSection />
        <Investors />
     
    </div>
  );
}
