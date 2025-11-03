import React from "react";
import CareerHero from "./careerHero";
import CareerCultureSection from "./careerCultureSection";
import JobOpenings from "./jobOpening";
import TrainingSection from "./trainingSection";
import CareerCTA from "./careerCTA";
import "./css/careers.css";

const CareersPage = () => {
  return (
    <div className="careers-page">
      <CareerHero />
      <CareerCultureSection />
      <JobOpenings />
      <TrainingSection />
      <CareerCTA />
    </div>
  );
};

export default CareersPage;
