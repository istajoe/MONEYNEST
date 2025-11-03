import React from "react";
import SolutionBankingHero from "./solutionBankingHero";
import BankingFeature from "./bankingFeatures";
import BankingPhoto from "./bankingPhoto";
import SpendingInsights from "./spendingInsights";
import PeopleImpact from "../inside-moneynest/peopleImpact";

const BankingHome = () => {
  return (
    <div className="blog-home">
        <SolutionBankingHero />
        <BankingFeature />
        <BankingPhoto />
        <SpendingInsights />
        <PeopleImpact />
      
    </div>
  );
};

export default BankingHome;
