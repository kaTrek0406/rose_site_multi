import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Clients.css';

// Import client logos (SVG для идеального качества)
import cdHomeLogo from '../../assets/clients/cdi home.svg';
import colinaVerdeLogo from '../../assets/clients/cokina_verde.svg';
import jomaLogo from '../../assets/clients/joma.svg';
import epilBarLogo from '../../assets/clients/epilbar.svg';
import golbanTradeLogo from '../../assets/clients/golban trade.svg';
import getmancarLogo from '../../assets/clients/getmancarr.svg';

const Clients = () => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: t('clients.testimonial0.name'),
      position: t('clients.testimonial0.position'),
      company: t('clients.testimonial0.company'),
      text: t('clients.testimonial0.text'),
      clientIndex: 0
    },
    {
      name: t('clients.testimonial1.name'),
      position: t('clients.testimonial1.position'),
      company: t('clients.testimonial1.company'),
      text: t('clients.testimonial1.text'),
      clientIndex: 1
    },
    {
      name: t('clients.testimonial2.name'),
      position: t('clients.testimonial2.position'),
      company: t('clients.testimonial2.company'),
      text: t('clients.testimonial2.text'),
      clientIndex: 2
    },
    {
      name: t('clients.testimonial3.name'),
      position: t('clients.testimonial3.position'),
      company: t('clients.testimonial3.company'),
      text: t('clients.testimonial3.text'),
      clientIndex: 3
    },
    {
      name: t('clients.testimonial4.name'),
      position: t('clients.testimonial4.position'),
      company: t('clients.testimonial4.company'),
      text: t('clients.testimonial4.text'),
      clientIndex: 4
    },
    {
      name: t('clients.testimonial5.name'),
      position: t('clients.testimonial5.position'),
      company: t('clients.testimonial5.company'),
      text: t('clients.testimonial5.text'),
      clientIndex: 5
    }
  ];

  const clients = [
    { name: 'CD Home', logo: cdHomeLogo },
    { name: 'Colina Verde', logo: colinaVerdeLogo },
    { name: 'Joma', logo: jomaLogo },
    { name: 'Epil Bar', logo: epilBarLogo },
    { name: 'Golban Trade', logo: golbanTradeLogo },
    { name: 'Getmancar', logo: getmancarLogo }
  ];

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const currentClient = testimonials[currentTestimonial];

  return (
    <section className="clients" id="clients">
      <div className="clients-container">
        <h2 className="clients-title">{t('clients.title')}</h2>

        <div className="clients-content">
          {/* Левая часть - Отзыв */}
          <div className="testimonial-section">
            <button className="testimonial-nav prev" onClick={handlePrevTestimonial}>
              ‹
            </button>

            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <span className="avatar-icon">💬</span>
              </div>
              <h3 className="testimonial-name">{currentClient.name}</h3>
              <p className="testimonial-position">{currentClient.position}</p>
              <p className="testimonial-text">{currentClient.text}</p>
            </div>

            <button className="testimonial-nav next" onClick={handleNextTestimonial}>
              ›
            </button>
          </div>

          {/* Правая часть - Логотипы клиентов */}
          <div className="clients-logos">
            {clients.map((client, index) => (
              <div
                key={index}
                className={`client-logo-wrapper ${
                  index === currentClient.clientIndex ? 'active' : ''
                }`}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="client-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
