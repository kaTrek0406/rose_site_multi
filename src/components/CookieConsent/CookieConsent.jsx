import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { initializeTracking } from '../../utils/tracking';
import './CookieConsent.css';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    } else if (consent === 'accepted') {
      // If user accepted, initialize tracking scripts
      initializeTracking();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    initializeTracking();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <h3 className="cookie-consent-title">{t('cookies.title')}</h3>
          <p className="cookie-consent-description">
            {t('cookies.description')}
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button
            className="cookie-btn cookie-btn-accept"
            onClick={handleAccept}
            aria-label={t('cookies.accept')}
          >
            {t('cookies.accept')}
          </button>
          <button
            className="cookie-btn cookie-btn-decline"
            onClick={handleDecline}
            aria-label={t('cookies.decline')}
          >
            {t('cookies.decline')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
