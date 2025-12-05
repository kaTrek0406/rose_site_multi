import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Clients.css';

const Clients = () => {
  const { t } = useLanguage();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: t('clients.testimonial0.name'),
      position: t('clients.testimonial0.position'),
      company: t('clients.testimonial0.company'),
      text: t('clients.testimonial0.text')
    },
    {
      name: t('clients.testimonial1.name'),
      position: t('clients.testimonial1.position'),
      company: t('clients.testimonial1.company'),
      text: t('clients.testimonial1.text')
    },
    {
      name: t('clients.testimonial2.name'),
      position: t('clients.testimonial2.position'),
      company: t('clients.testimonial2.company'),
      text: t('clients.testimonial2.text')
    }
  ];

  const clients = [
    { name: 'Colina Verde', logo: '/assets/clients/4 colina.svg', instagram: 'https://www.instagram.com/colina_verde_residence/' },
    { name: 'Caviar', logo: '/assets/clients/Caviar.svg', instagram: 'https://www.instagram.com/caviar.md/' },
    { name: 'Finch', logo: '/assets/clients/Finch logo+bird vector (1).svg', instagram: 'https://www.instagram.com/finch_beer/' },
    { name: 'Aquatoria', logo: '/assets/clients/aquatoria.svg' },
    { name: 'Ciao Cacao', logo: '/assets/clients/ciao cacao.svg', instagram: 'https://www.instagram.com/ciaocacao.md/' },
    { name: 'Claro', logo: '/assets/clients/claro.svg', instagram: 'https://www.instagram.com/claro_md/' },
    { name: 'Connect', logo: '/assets/clients/connect.svg' },
    { name: 'Dinotte', logo: '/assets/clients/dinotte.svg', instagram: 'https://www.instagram.com/dinotte.sleepshop.premium/' },
    { name: 'Element Still', logo: '/assets/clients/element still.svg', instagram: 'https://www.instagram.com/elementstil.md/' },
    { name: 'Epil Bar', logo: '/assets/clients/epil bar.svg', instagram: 'https://www.instagram.com/epilbarmd/' },
    { name: 'Family Market', logo: '/assets/clients/family market.svg', instagram: 'https://www.instagram.com/family_market.md/' },
    { name: 'Getmancar', logo: '/assets/clients/getmancar.svg', instagram: 'https://www.instagram.com/getmancar_md/' },
    { name: 'Golban Trade', logo: '/assets/clients/golban trade.svg', instagram: 'https://www.instagram.com/golbantradeconstruct/' },
    { name: 'Heel', logo: '/assets/clients/heel.svg', instagram: 'https://www.instagram.com/heel.md/' },
    { name: 'Kerashop', logo: '/assets/clients/kerashop.svg', instagram: 'https://www.instagram.com/kerashoppro.md/' },
    { name: 'Kozel', logo: '/assets/clients/kozel.svg', instagram: 'https://www.instagram.com/kozelbeer/' },
    { name: 'JBL', logo: '/assets/clients/logo-2023-white (1).svg' },
    { name: 'Look', logo: '/assets/clients/logo-look.svg', instagram: 'https://www.instagram.com/look.restobar.md/' },
    { name: 'Head', logo: '/assets/clients/logo_head.svg' },
    { name: 'Nani', logo: '/assets/clients/nani.svg', instagram: 'https://www.instagram.com/fabrica.nani/' },
    { name: 'Piesa Ta', logo: '/assets/clients/piesa ta.svg', instagram: 'https://www.instagram.com/piesata.md/' },
    { name: 'Profimax', logo: '/assets/clients/profimax.svg' },
    { name: 'Radler', logo: '/assets/clients/radler.svg', instagram: 'https://www.instagram.com/radlermd/' },
    { name: 'Ritzy', logo: '/assets/clients/ritzy.svg', instagram: 'https://www.instagram.com/ritzy_gifts/' },
    { name: 'Salat', logo: '/assets/clients/salat.svg', instagram: 'https://www.instagram.com/salat.restaurant/' },
    { name: 'Smart Sover', logo: '/assets/clients/smart sover.svg' },
    { name: 'Viva Tur', logo: '/assets/clients/viva tur.svg', instagram: 'https://www.instagram.com/vivatour.md/' },
    { name: 'WGB', logo: '/assets/clients/wgb.svg', instagram: 'https://www.instagram.com/wbg.contabilitate/' },
    { name: 'CDI', logo: '/assets/clients/cdi.svg', instagram: 'https://www.instagram.com/cdihomedesign/' }
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

          {/* Правая часть - Логотипы клиентов (бесконечный бегунок) */}
          <div className="clients-logos">
            <div className="logos-track">
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="client-logo-wrapper"
                >
                  {client.instagram ? (
                    <a
                      href={client.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="client-logo-link"
                    >
                      <img
                        src={client.logo}
                        alt={client.name}
                        className="client-logo"
                      />
                    </a>
                  ) : (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="client-logo"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
