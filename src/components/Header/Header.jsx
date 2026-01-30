import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../utils/tracking';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    closeMenu();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = () => {
    trackEvent('Contact', {
      content_name: 'Header Contact Link',
      content_category: 'navigation',
      method: 'nav_click'
    });
    closeMenu();
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-wrapper">
          <a href="#home" onClick={() => handleNavClick('home')}>
            <img src="/assets/logo/rose-logo.svg" alt="ROSÉ Logo" className="header-logo" loading="eager" />
          </a>
        </div>

        <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className="nav-wrapper">
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <a href="#home" className="nav-link" onClick={() => handleNavClick('home')}>{t('header.nav.home')}</a>
            <a href="#services" className="nav-link" onClick={() => handleNavClick('services')}>{t('header.nav.services')}</a>
            <a href="#workflow" className="nav-link" onClick={() => handleNavClick('workflow')}>{t('header.nav.workflow')}</a>
            <a href="#portfolio" className="nav-link" onClick={() => handleNavClick('portfolio')}>{t('header.nav.portfolio')}</a>
            <a href="#clients" className="nav-link" onClick={() => handleNavClick('clients')}>{t('header.nav.clients')}</a>
            <a href="#contact" className="nav-link" onClick={() => { handleNavClick('contact'); handleContactClick(); }}>{t('header.nav.contact')}</a>

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
              <div className="language-switcher language-switcher-mobile" onClick={toggleLanguage}>
                <span className="logo-text">{language === 'ru' ? 'RU' : 'RO'}</span>
                <img src="/assets/icons/language.webp" alt="Language" className="logo-icon" width="24" height="24" loading="eager" />
              </div>
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

          <div className="language-switcher" onClick={toggleLanguage}>
            <span className="logo-text">{language === 'ru' ? 'RU' : 'RO'}</span>
            <img src="/assets/icons/language.webp" alt="Language" className="logo-icon" width="24" height="24" loading="eager" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
