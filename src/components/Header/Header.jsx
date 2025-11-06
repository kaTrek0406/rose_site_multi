import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Header.css';
import languageIcon from '../../assets/icons/language.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo" onClick={toggleLanguage}>
          <span className="logo-text">{language === 'ru' ? 'RU' : 'RO'}</span>
          <img src={languageIcon} alt="Language" className="logo-icon" />
        </div>

        <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className="nav-wrapper">
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className="nav-link" onClick={closeMenu}>{t('header.nav.home')}</a>
            <a href="#services" className="nav-link" onClick={closeMenu}>{t('header.nav.services')}</a>
            <a href="#workflow" className="nav-link" onClick={closeMenu}>{t('header.nav.workflow')}</a>
            <a href="#portfolio" className="nav-link" onClick={closeMenu}>{t('header.nav.portfolio')}</a>
            <a href="#clients" className="nav-link" onClick={closeMenu}>{t('header.nav.clients')}</a>
            <a href="#contact" className="nav-link" onClick={closeMenu}>{t('header.nav.contact')}</a>

            <div className="social-links-mobile">
              <a href="https://www.instagram.com/rose__creative/?utm_medium=copy_link" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                <FaInstagram className="social-icon" />
              </a>
              <a href="https://www.facebook.com/RoseCreativeTeam" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                <FaFacebookF className="social-icon" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                <FaLinkedinIn className="social-icon" />
              </a>
            </div>
          </nav>

          <div className="social-links social-links-desktop">
            <a href="https://www.instagram.com/rose__creative/?utm_medium=copy_link" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://www.facebook.com/RoseCreativeTeam" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
              <FaFacebookF className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <FaLinkedinIn className="social-icon" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
