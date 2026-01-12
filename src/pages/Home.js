import React from 'react';
import Hero from '../components/Hero';
import MenuShowcase from '../components/MenuShowcase';
import About from "../components/About";

const Home = () => {
  return (
    <main>
      <Hero />
      <MenuShowcase />
      <About />
    </main>
  );
};

export default Home;
