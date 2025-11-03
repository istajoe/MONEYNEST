import React from "react";
import "./InsideNews.css";

const insideNews = [
  { id: 1, src: "/british.png", alt: "British International Investment" },
  { id: 2, src: "/FMO.png", alt: "FMO" },
  { id: 3, src: "/QED.png", alt: "QED Investors" }, 
];

const InsideNews = () => {
  return (
    <section className="inside-news1">
      <div className="inside-news-container1">
        <div className="inside-news-header1">
          <h2>Inside The News</h2>
          <p>
            Moneynest has been featured and recognized by global investors and
            leading financial institutions for revolutionizing the way Nigerians
            bank, invest, and grow wealth.
          </p>
        </div>

        <div className="inside-news-logos1">
          {insideNews.map((item) => (
            <div className="news-logo1" key={item.id}>
              <img src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsideNews;
