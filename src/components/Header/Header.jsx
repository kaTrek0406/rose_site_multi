import { useState } from 'react';
import './Header.css';
import facebookIcon from '../../assets/social/facebook.svg';
import instagramIcon from '../../assets/social/instagram.svg';
import linkedinIcon from '../../assets/social/linkedin.svg';
import languageIcon from '../../assets/icons/language.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">RU</span>
          <img src={languageIcon} alt="Language" className="logo-icon" />
        </div>

        <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className="nav-wrapper">
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className="nav-link" onClick={closeMenu}>Главная</a>
            <a href="#services" className="nav-link" onClick={closeMenu}>Услуги</a>
            <a href="#portfolio" className="nav-link" onClick={closeMenu}>Портфолио</a>
            <a href="#clients" className="nav-link" onClick={closeMenu}>Клиенты</a>
            <a href="#contact" className="nav-link" onClick={closeMenu}>Контакты</a>

            <div className="social-links-mobile">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className="social-icon" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" className="social-icon" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
              </a>
            </div>
          </nav>

          <div className="social-links social-links-desktop">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <img src={facebookIcon} alt="Facebook" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <img src={instagramIcon} alt="Instagram" className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
