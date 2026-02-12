import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../utils/tracking';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    trackEvent('Contact', {
      content_name: 'Header Contact Link',
      content_category: 'navigation',
      method: 'nav_click'
    });
    closeMenu();
  };

  const navItems = [
    { path: '/', label: t('header.nav.home') },
    { path: '/about', label: t('header.nav.about') },
    { path: '/services', label: t('header.nav.services') },
    { path: '/cases', label: t('header.nav.portfolio') },
    { path: '/blog', label: t('header.nav.blog') },
    { path: '/pricing', label: t('header.nav.pricing') },
    { path: '/contact', label: t('header.nav.contact'), onClick: handleContactClick },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo-wrapper">
          <Link to="/" onClick={closeMenu}>
            <img src="/assets/logo/rose-logo.svg" alt="ROSE Logo" className="header-logo" loading="eager" />
          </Link>
        </div>

        <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className="nav-wrapper">
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
                onClick={() => {
                  closeMenu();
                  if (item.onClick) item.onClick();
                }}
              >
                {item.label}
              </Link>
            ))}

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
