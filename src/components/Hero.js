import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleReservation = () => {
    navigate('/reservations');
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Little Lemon</h1>
          <h2 className="hero-subtitle">Chicago</h2>
          <p className="hero-description">
            We are a family owned Mediterranean restaurant, focused on traditional
            recipes served with a modern twist.
          </p>
          <button
            className="hero-button"
            onClick={handleReservation}
            aria-label="Reserve a table at Little Lemon"
          >
            Reserve a table
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
