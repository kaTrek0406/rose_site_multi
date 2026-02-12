import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAssetPath } from '../../utils/assets';
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
    { name: 'Colina Verde', logo: getAssetPath('/assets/clients/4 colina.svg'), instagram: 'https://www.instagram.com/colina_verde_residence/' },
    { name: 'Caviar', logo: getAssetPath('/assets/clients/Caviar.svg'), instagram: 'https://www.instagram.com/caviar.md/' },
    { name: 'Finch', logo: getAssetPath('/assets/clients/Finch logo+bird vector (1).svg'), instagram: 'https://www.instagram.com/finch_beer/' },
    { name: 'Aquatoria', logo: getAssetPath('/assets/clients/aquatoria.svg') },
    { name: 'Ciao Cacao', logo: getAssetPath('/assets/clients/ciao cacao.svg'), instagram: 'https://www.instagram.com/ciaocacao.md/' },
    { name: 'Claro', logo: getAssetPath('/assets/clients/claro.svg'), instagram: 'https://www.instagram.com/claro_md/' },
    { name: 'Connect', logo: getAssetPath('/assets/clients/connect.svg') },
    { name: 'Dinotte', logo: getAssetPath('/assets/clients/dinotte.svg'), instagram: 'https://www.instagram.com/dinotte.sleepshop.premium/' },
    { name: 'Element Still', logo: getAssetPath('/assets/clients/element still.svg'), instagram: 'https://www.instagram.com/elementstil.md/' },
    { name: 'Epil Bar', logo: getAssetPath('/assets/clients/epil bar.svg'), instagram: 'https://www.instagram.com/epilbarmd/' },
    { name: 'Family Market', logo: getAssetPath('/assets/clients/family market.svg'), instagram: 'https://www.instagram.com/family_market.md/' },
    { name: 'Getmancar', logo: getAssetPath('/assets/clients/getmancar.svg'), instagram: 'https://www.instagram.com/getmancar_md/' },
    { name: 'Golban Trade', logo: getAssetPath('/assets/clients/golban trade.svg'), instagram: 'https://www.instagram.com/golbantradeconstruct/' },
    { name: 'Heel', logo: getAssetPath('/assets/clients/heel.svg'), instagram: 'https://www.instagram.com/heel.md/' },
    { name: 'Kerashop', logo: getAssetPath('/assets/clients/kerashop.svg'), instagram: 'https://www.instagram.com/kerashoppro.md/' },
    { name: 'Kozel', logo: getAssetPath('/assets/clients/kozel.svg'), instagram: 'https://www.instagram.com/kozelbeer/' },
    { name: 'JBL', logo: getAssetPath('/assets/clients/logo-2023-white (1).svg') },
    { name: 'Look', logo: getAssetPath('/assets/clients/logo-look.svg'), instagram: 'https://www.instagram.com/look.restobar.md/' },
    { name: 'Head', logo: getAssetPath('/assets/clients/logo_head.svg') },
    { name: 'Nani', logo: getAssetPath('/assets/clients/nani.svg'), instagram: 'https://www.instagram.com/fabrica.nani/' },
    { name: 'Piesa Ta', logo: getAssetPath('/assets/clients/piesa ta.svg'), instagram: 'https://www.instagram.com/piesata.md/' },
    { name: 'Profimax', logo: getAssetPath('/assets/clients/profimax.svg') },
    { name: 'Radler', logo: getAssetPath('/assets/clients/radler.svg'), instagram: 'https://www.instagram.com/radlermd/' },
    { name: 'Ritzy', logo: getAssetPath('/assets/clients/ritzy.svg'), instagram: 'https://www.instagram.com/ritzy_gifts/' },
    { name: 'Salat', logo: getAssetPath('/assets/clients/salat.svg'), instagram: 'https://www.instagram.com/salat.restaurant/' },
    { name: 'Smart Sover', logo: getAssetPath('/assets/clients/smart sover.svg') },
    { name: 'Viva Tur', logo: getAssetPath('/assets/clients/viva tur.svg'), instagram: 'https://www.instagram.com/vivatour.md/' },
    { name: 'WGB', logo: getAssetPath('/assets/clients/wgb.svg'), instagram: 'https://www.instagram.com/wbg.contabilitate/' },
    { name: 'CDI', logo: getAssetPath('/assets/clients/cdi.svg'), instagram: 'https://www.instagram.com/cdihomedesign/' }
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
