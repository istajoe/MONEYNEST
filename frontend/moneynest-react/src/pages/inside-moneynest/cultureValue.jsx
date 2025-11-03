import React from "react";
import "./css/cultureValue.css";

const CultureValue = () => {
  const values = [
    {
      id: 1,
      title: "Innovation",
      img: "/bike.png",
      description: "We adhere to all professional standards as we power business dreams. We always give our best shot, but never at the expense of our integrity.",
    },
    {
      id: 2,
      title: "Teamwork",
      img: "/teamvalue.png",
      description: "“I can’t’, “It’s Impossible”. These words don’t exist in our dictionaries. It doesn't matter what the task is, we never give up",
    },
    {
      id: 3,
      title: "Integrity",
      img: "/womenValue.png",
      description: "We put ourselves in people’s shoes. There is no other way to truly understand how they feel and how to help them.",
    },
    {
      id: 4,
      title: "Customer Focus",
      img: "/techvalue.png",
      description: "We believe that every employee should have a solid understanding of what he or she does at Moniepoint, regardless of the role.",
    },
    {
      id: 5,
      title: "Excellence",
      img: "/people-value.png",
      description: "We adhere to all professional standards as we power business dreams. We always give our best shot, but never at the expense of our integrity.",
    },
    {
      id: 6,
      title: "Growth Mindset",
      img: "/business-value.png",
      description: "We prioritise getting the job done over our ego. Everyone is a DreamMaker, irrespective of their level in the organisation, and every voice matters.",
    },
  ];

  return (
    <section className="culture-section">
      <div className="culture-header">
        <h2>Our Values</h2>
        <p>
          At Moneynest, our core values guide the work we do to power the dreams
          of millions.
        </p>
      </div>

      <div className="culture-grid">
        {values.map((item) => (
          <div key={item.id} className="culture-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <h5>{item.description}</h5>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CultureValue;
