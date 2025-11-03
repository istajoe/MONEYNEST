import React from "react";
import "./css/behindTheScene.css";

const BehindTheScenes = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Tobi",
      role: "VP of Loans",
      img: "/team-photo.png",
    },
    {
      id: 2,
      name: "Amara",
      role: "Product Designer",
      img: "/business-life.jpg",
    },
    {
      id: 3,
      name: "Daniel",
      role: "Software Engineer",
      img: "/people-value.png",
    },
    {
      id: 4,
      name: "Lola",
      role: "Marketing Lead",
      img: "/FMO.png",
    },
     {
      id: 5,
      name: "sandra",
      role: "Marketing Lead",
      img: "/team-photo.png",
    },
     {
      id: 6,
      name: "Emmanuel",
      role: "Marketing Lead",
      img: "/business-life.jpg",
    },
  ];

  return (
    <section className="behind-section">
      <div className="behind-header">
        <div className="behind-left">
          <h2>
            Behind the scenes <br /> with DreamMakers.
          </h2>
          <p>
            What if you had a chance to spill it all with your boss and ask them
            all the questions you could never bring up?
          </p>
        </div>

        <div className="behind-right">
          <p>
            Between laughs and down to earth moments, watch DreamMakers talk
            about the work they do, while having the best time.
          </p>
          <button className="watch-btn">Watch More ↗</button>
        </div>
      </div>

      <div className="behind-grid">
        {teamMembers.map((person) => (
          <div key={person.id} className="behind-card">
            <img src={person.img} alt={person.name} />
            <div className="behind-info">
              <h3>{person.name}</h3>
              <p>{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BehindTheScenes;
