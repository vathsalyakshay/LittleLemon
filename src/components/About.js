import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2>Little Lemon</h2>
          <h3>Chicago</h3>
          <p>
            Founded in 1995 by brothers Adrian and Mario, Little Lemon was born
            from a simple dream: to share the authentic flavors of their Italian
            Mediterranean heritage with Chicago. What started as a small family
            kitchen has grown into a beloved neighborhood destination.
          </p>
          <p>
            Nearly three decades later, the brothers still personally oversee
            every aspect of the restaurant. From hand-selecting seasonal
            ingredients to crafting new dishes, their passion for Mediterranean
            cuisine shines through in every meal we serve.
          </p>
        </div>
        <div className="about-images">
          <img
            src="/images/restaurant.jpg"
            alt="Mario and Adrian at the restaurant"
            className="about-image-2"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
