import './Header.css';
import logo from '../assets/images/logo.jpg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img src={logo} alt="Little Lemon Restaurant Logo" className="header-logo" />
        <nav className="header-nav">
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/reservations">Reservations</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
