import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">{t('footer.address.title')}</h3>
          <p className="footer-text">{t('footer.address.text')}</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">{t('footer.email.title')}</h3>
          <a href="mailto:rosecreative13@gmail.com" className="footer-link">
            {t('footer.email.text')}
          </a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">{t('footer.phone.title')}</h3>
          <a href="tel:+37369200775" className="footer-link">
            {t('footer.phone.text')}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
