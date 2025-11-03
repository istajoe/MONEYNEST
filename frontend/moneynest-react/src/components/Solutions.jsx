// src/components/Solutions.js
import React from "react";
import "./css/Solutions.css";

function Solutions() {
  return (
    <section className="solutions">
      <div className="solutions-header">
        <h1>Simple financial solutions for businesses and their customers.</h1>
        <p>Here's how we help them grow without limits</p>
      </div>

      <div className="solutions-cards">
        <div className="card">
          <h2>Payments</h2>
          <p>
            We build infrastructure and distribution networks that democratise payment
            acceptance, and provide merchants with payment solutions to power their businesses.
          </p>
          <a href="#">Learn more</a>
        </div>

        <div className="card">
          <h2>Banking</h2>
          <p>
            Our business and personal banking solutions enable millions of people to perform
            instant transactions, pay bills and manage their finance with ease.
          </p>
          <a href="#">Learn more</a>
        </div>

        
        <div className="card">
          <h2>Business Management</h2>
          <p>
           We provide operational tools like expense cards,
           accounting and book-keeping solutions for businesses to run seamlessly.
          </p>
          <a href="#">Learn more</a>
        </div>

        <div className="card">
          <h2>Credit</h2>
          <p>
            We provide loans to business owners to help them finance
            additional inventory purchases and expand their businesses.
          </p>
          <a href="#">Learn more</a>
        </div>
      </div>
    </section>
  );
}

export default Solutions;
