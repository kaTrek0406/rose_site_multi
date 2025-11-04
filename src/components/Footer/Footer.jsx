import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  const address = "Str. Mitropolit Varlaam 78, Chișinău, Moldova";
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Str.+Mitropolit+Varlaam+78,+Chișinău,+Moldova";
  const email = "rosecreative13@gmail.com";
  const phone = "+373 69 200 775";
  const phoneClean = "+37369200775";

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <div className="footer-section">
              <h3 className="footer-title">{t('footer.address.title')}</h3>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                {address}
              </a>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">{t('footer.email.title')}</h3>
              <a href={`mailto:${email}`} className="footer-link">
                {email}
              </a>
            </div>

            <div className="footer-section">
              <h3 className="footer-title">{t('footer.phone.title')}</h3>
              <a href={`tel:${phoneClean}`} className="footer-link">
                {phone}
              </a>
            </div>
          </div>

          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.8576840384384!2d28.843511!3d47.024847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c97c3628b769a1%3A0x37d1e6f47a65b07a!2sStrada%20Mitropolit%20Varlaam%2078%2C%20Chi%C8%99in%C4%83u%2C%20Moldova!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: '15px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Rose Creative Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
