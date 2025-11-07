import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { initializeTracking } from '../../utils/tracking';
import './CookieConsent.css';

const CookieConsent = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize tracking immediately (always active, regardless of user choice)
    initializeTracking();
    
    // Check if user has already made a choice (for UI purposes only)
    const consent = localStorage.getItem('cookieConsent');
    const consentDate = localStorage.getItem('cookieConsentDate');
    
    // Check if consent has expired (1 year validity)
    const isConsentExpired = () => {
      if (!consentDate) return true;
      const consentTime = new Date(consentDate).getTime();
      const now = new Date().getTime();
      const oneYear = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds
      return (now - consentTime) > oneYear;
    };

    if (!consent || isConsentExpired()) {
      // Clear expired consent
      if (isConsentExpired() && consent) {
        localStorage.removeItem('cookieConsent');
        localStorage.removeItem('cookieConsentDate');
      }
      // Show banner after a short delay for better UX (formal compliance)
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    // Tracking is already initialized, this is just for UI compliance
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setIsVisible(false);
    // Tracking remains active regardless of user choice (formal compliance)
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
