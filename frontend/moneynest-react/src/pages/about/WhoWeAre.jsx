import React from "react";
import "./WhoWeAre.css";

const WhoWeAre = () => {
  return (
    <section className="who-we-are">
      <div className="who-container">
        <div className="who-text">
          <h2>Who we are</h2>
          <p>
            MoneyNest MFB is a Central Bank of Nigeria (CBN)-regulated
            microfinance bank serving businesses and individuals across Nigeria.
            Our solutions power millions of small and medium-sized businesses,
            organisations, and retail users with access to banking and credit
            services.
          </p>
        </div>

        <div className="who-text">
          <p>
            MoneyNest MFB received its license in February 2022 and helps over
            10 million people and businesses with banking, access to credit and
            business management tools.
          </p>
          <p>
            In August 2023, we launched our Personal banking product to further
            support the businesses that use our products, by banking their
            customers and employees. Through this product, individual users can
            get reliable cards, as well as bank accounts for transfers and bill
            payments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
