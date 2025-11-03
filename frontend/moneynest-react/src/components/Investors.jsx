import React from "react";
import "./css/Investors.css";

const investors = [
  { id: 1, src: "/british.png", alt: "British International Investment" },
  { id: 2, src: "/FMO.png", alt: "Novastar Ventures" },
  { id: 3, src: "/QED.png", alt: "QED Investors" },
  { id: 4, src: "/novaster.png", alt: "FMO" },
  { id: 5, src: "/british.png", alt: "British International Investment" },
  { id: 6, src: "/novaster.png", alt: "Novastar Ventures" },
];

const Investors = () => {
  return (
    <section className="investors">
      <div className="investors-header">
        <h2>Our Investors</h2>
        <p>
          We're backed by leading investors from around the globe, all of whom
          believe in our dream.
        </p>
      </div>

      <div className="slider">
        <div className="slide-track">
          {investors.map((logo) => (
            <div className="slide" key={logo.id}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
          {/* Duplicate for infinite effect */}
          {investors.map((logo) => (
            <div className="slide" key={`dup-${logo.id}`}>
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Investors;
