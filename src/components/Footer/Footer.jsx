import { useLanguage } from '../../contexts/LanguageContext';
import './Footer.css';

const Footer = () => {
  const { t } = useLanguage();

  const address = "Valea Trandafirilor 20, Chișinău, Moldova";
  const googleMapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Valea+Trandafirilor+20,+Chișinău,+Moldova";
  const email = "rosecreative13@gmail.com";
  const phone1 = "+373 69 200 775";
  const phone1Clean = "+37369200775";
  const phone2 = "+373 78 329 518";
  const phone2Clean = "+37378329518";

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
              <div className="footer-phones">
                <div className="footer-phone-item">
                  <a href={`tel:${phone1Clean}`} className="footer-link phone-number">
                    {phone1}
                  </a>
                  <div className="footer-social-icons">
                    <a
                      href={`viber://add?number=${phone1Clean}`}
                      className="footer-icon viber-icon"
                      title="Viber"
                      onClick={(e) => {
                        if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                          e.preventDefault();
                          window.open(`viber://chat?number=${phone1Clean}`, '_blank');
                        }
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.398,0.561c-6.197,0-11.233,4.925-11.233,10.995c0,1.924,0.505,3.729,1.388,5.302L0.561,23.439l6.862-0.928c1.455,0.753,3.103,1.176,4.844,1.176c6.197,0,11.232-4.925,11.232-10.995S17.594,0.561,11.398,0.561z M17.789,15.875c-0.294,0.827-1.734,1.508-2.426,1.598c-0.625,0.082-1.435,0.117-2.314-0.145c-0.534-0.159-1.22-0.37-2.099-0.724c-3.684-1.484-6.088-5.219-6.272-5.461c-0.176-0.242-1.449-1.938-1.449-3.697c0-1.759,0.918-2.626,1.244-2.983c0.326-0.357,0.712-0.446,0.949-0.446c0.237,0,0.475,0.002,0.682,0.012c0.219,0.01,0.512-0.083,0.801,0.611c0.297,0.712,1.015,2.471,1.104,2.649c0.089,0.178,0.148,0.386,0.03,0.628c-0.119,0.242-0.178,0.393-0.356,0.595c-0.178,0.202-0.374,0.451-0.534,0.605c-0.178,0.171-0.363,0.356-0.156,0.698c0.207,0.342,0.918,1.515,1.97,2.453c1.353,1.206,2.493,1.581,2.846,1.759c0.356,0.178,0.564,0.148,0.771-0.089c0.207-0.237,0.889-1.044,1.126-1.401c0.237-0.357,0.475-0.297,0.801-0.178c0.326,0.119,2.073,0.979,2.429,1.156c0.356,0.178,0.594,0.267,0.682,0.416C18.082,14.489,18.082,15.048,17.789,15.875z"/>
                      </svg>
                    </a>
                    <a
                      href={`https://wa.me/${phone1Clean}`}
                      className="footer-icon whatsapp-icon"
                      title="WhatsApp"
                      onClick={(e) => {
                        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                          e.preventDefault();
                          window.location.href = `whatsapp://send?phone=${phone1Clean}`;
                        }
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472,14.382c-0.297-0.149-1.758-0.868-2.031-0.967c-0.272-0.099-0.47-0.149-0.669,0.148s-0.767,0.967-0.941,1.165c-0.173,0.198-0.347,0.223-0.644,0.074c-0.297-0.149-1.255-0.462-2.39-1.475c-0.883-0.788-1.48-1.761-1.653-2.059s-0.018-0.458,0.13-0.606c0.134-0.133,0.297-0.347,0.446-0.521c0.149-0.173,0.198-0.297,0.297-0.495c0.099-0.198,0.05-0.371-0.025-0.52c-0.074-0.149-0.669-1.611-0.916-2.207c-0.242-0.579-0.487-0.5-0.669-0.51c-0.173-0.008-0.371-0.01-0.57-0.01s-0.52,0.074-0.792,0.372c-0.272,0.297-1.04,1.016-1.04,2.479c0,1.462,1.065,2.875,1.213,3.074c0.149,0.198,2.096,3.2,5.077,4.487c0.709,0.306,1.262,0.489,1.694,0.625c0.712,0.227,1.36,0.195,1.871,0.118c0.571-0.085,1.758-0.719,2.006-1.413c0.248-0.694,0.248-1.289,0.173-1.413C18.098,14.79,17.9,14.715,17.472,14.382z M12.068,21.584c-1.792,0-3.543-0.481-5.073-1.391l-0.364-0.216l-3.771,0.989l1.006-3.675l-0.237-0.377c-0.999-1.588-1.526-3.422-1.526-5.307c0-5.505,4.481-9.987,9.987-9.987c2.666,0,5.17,1.039,7.052,2.923c1.882,1.883,2.919,4.388,2.918,7.055C21.055,17.103,16.574,21.584,12.068,21.584z M20.439,3.56C18.246,1.367,15.283,0.178,12.068,0.178C5.545,0.178,0.248,5.474,0.248,11.997c0,2.009,0.521,3.972,1.516,5.723L0.186,23.818l6.263-1.644c1.691,0.921,3.594,1.407,5.541,1.407h0.005c6.523,0,11.819-5.297,11.819-11.819C23.814,8.738,22.632,5.754,20.439,3.56z"/>
                      </svg>
                    </a>
                  </div>
                </div>
                <div className="footer-phone-item">
                  <a href={`tel:${phone2Clean}`} className="footer-link phone-number">
                    {phone2}
                  </a>
                  <div className="footer-social-icons">
                    <a
                      href={`https://t.me/${phone2Clean}`}
                      className="footer-icon telegram-icon"
                      title="Telegram"
                      onClick={(e) => {
                        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
                          e.preventDefault();
                          window.location.href = `tg://resolve?phone=${phone2Clean}`;
                        }
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.417,15.181l-0.397,5.584c0.568,0,0.814-0.244,1.109-0.537l2.663-2.545l5.518,4.041c1.012,0.564,1.725,0.267,1.998-0.931l3.622-16.972c0.321-1.496-0.541-2.081-1.527-1.714l-21.29,8.151c-1.453,0.564-1.431,1.374-0.247,1.741l5.443,1.693L18.953,5.753c0.595-0.394,1.136-0.176,0.691,0.218"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps?q=Valea+Trandafirilor+20,+Chișinău,+Moldova&output=embed"
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