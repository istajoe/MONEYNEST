import React from "react";
import ContactHero from "./contact/ContactHero.jsx";
import ContactOptions from "./contact/contactOptions.jsx";
import SupportSection from "./contact/supportSection.jsx";
import ContactImpactBanner from "./contact/contactImpactBanner.jsx";

const Contact = () => {
  return (
    <>
      <ContactHero />
      <ContactOptions />
      <SupportSection />
      <ContactImpactBanner />
      {/* Other contact page sections here */}
    </>
  );
};

export default Contact;
