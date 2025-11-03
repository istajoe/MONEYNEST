import React from "react";
import CultureHero from "./cultureHero";
import CultureValue from "./cultureValue";
import BehindTheScenes from "./behindTheScene";
import HowMagicHappens from "./howMagicHappens";
import PeopleImpact from "./peopleImpact";


const CultureHome = () => {
  return (
    <div>
        <CultureHero />
        <CultureValue />
        <BehindTheScenes />
        <HowMagicHappens />
        <PeopleImpact />
    </div>
      
    
  );
};

export default CultureHome;
