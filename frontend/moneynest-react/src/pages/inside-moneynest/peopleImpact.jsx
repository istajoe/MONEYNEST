import React from "react";
import "./css/peopleImpact.css";
 // 🖼️ replace with your actual image path

const PeopleImpact = () => {
  return (
    <section className="people-section1">
      <div className="people-container1">
        {/* Left side text */}
        <div className="people-text1">
          <h2>
            <span className="highlight">Ready to live</span>  your dream?
          </h2>
          <p>
            If you’re ready to join us in powering the dreams 
            of millions of people around the world, come claim your spot.
          </p>
        </div>

        {/* Right side image */}
        <div className="people-image1">
          <img src="/team-photo.png" alt="Our team" />
        </div>
      </div>
    </section>
  );
};
''
export default PeopleImpact;
