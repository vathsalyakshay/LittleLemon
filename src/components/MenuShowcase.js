import React, { useState, useEffect } from 'react';
import './MenuShowcase.css';
import bbqFish from '../assets/images/bbq-fish-grilled.jpg';
import marinaPasta from '../assets/images/marina-pasta.jpg';
import greekSalad from '../assets/images/salad-greek.jpg';
import sushi from '../assets/images/shushi.jpg';
import bruschetta from '../assets/images/tomato-bruschetta.jpg';

const menuItems = [
  {
    id: 1,
    name: 'BBQ Grilled Fish',
    price: '$18.99',
    image: bbqFish,
    alt: 'BBQ grilled fish with vegetables'
  },
  {
    id: 2,
    name: 'Marina Pasta',
    price: '$14.99',
    image: marinaPasta,
    alt: 'Fresh marina pasta'
  },
  {
    id: 3,
    name: 'Greek Salad',
    price: '$12.99',
    image: greekSalad,
    alt: 'Traditional Greek salad'
  },
  {
    id: 4,
    name: 'Sushi Platter',
    price: '$22.99',
    image: sushi,
    alt: 'Fresh sushi platter'
  },
  {
    id: 5,
    name: 'Tomato Bruschetta',
    price: '$9.99',
    image: bruschetta,
    alt: 'Tomato bruschetta appetizer'
  }
];

const MenuShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setItemsPerView(1);
      } else if (window.innerWidth <= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, menuItems.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="menu-showcase">
      <div className="menu-showcase-container">
        <h2 className="menu-showcase-title">This Week's Specials!</h2>

        <div className="menu-carousel">
          <button
            className="carousel-button prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous menu items"
          >
            ‹
          </button>

          <div className="menu-items-wrapper">
            <div
              className="menu-items"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
              }}
            >
              {menuItems.map((item) => (
                <article key={item.id} className="menu-item">
                  <div className="menu-item-image-container">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="menu-item-image"
                    />
                  </div>
                  <div className="menu-item-info">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <p className="menu-item-price">{item.price}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            className="carousel-button next"
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            aria-label="Next menu items"
          >
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuShowcase;
