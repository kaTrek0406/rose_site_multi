import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">АДРЕС</h3>
          <p className="footer-text">Str. Mitropolit Varlaam 78, Chișinău, RM</p>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">EMAIL</h3>
          <a href="mailto:rosecreative13@gmail.com" className="footer-link">
            rosecreative13@gmail.com
          </a>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">ТЕЛЕФОН</h3>
          <a href="tel:+37369200775" className="footer-link">
            +373 69 200 775
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
