import React from "react";
import About from "../components/About";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <main className="about-page">
      <div className="about-page-header">
        <h1>Our Story</h1>
        <p>Bringing authentic Mediterranean flavors to Chicago since 1995</p>
      </div>
      <About />
      <section className="values-section">
        <div className="values-container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>🍋 Fresh Ingredients</h3>
              <p>
                We source the freshest local and imported ingredients to ensure
                authentic Mediterranean flavors.
              </p>
            </div>
            <div className="value-card">
              <h3>👨‍🍳 Traditional Recipes</h3>
              <p>
                Our recipes are passed down through generations, preserving the
                authentic taste of the Mediterranean.
              </p>
            </div>
            <div className="value-card">
              <h3>❤️ Family Atmosphere</h3>
              <p>
                We treat every guest like family, providing warm hospitality and
                exceptional service.
              </p>
            </div>
            <div className="value-card">
              <h3>🌿 Sustainability</h3>
              <p>
                We're committed to sustainable practices and supporting local
                farmers and suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
