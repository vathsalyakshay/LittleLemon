import React from 'react';
import Nav from './Nav'; // Import Nav if navigation is inside header

function Header() {
  return (
    <header>
      <h1>Little Lemon</h1>
      <Nav />
    </header>
  );
}

export default Header;
