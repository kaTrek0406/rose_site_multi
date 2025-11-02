import { useState } from 'react';
import './Clients.css';

// Import client logos (SVG для идеального качества)
import cdHomeLogo from '../../assets/clients/cdi home.svg';
import colinaVerdeLogo from '../../assets/clients/cokina_verde.svg';
import jomaLogo from '../../assets/clients/joma.svg';
import epilBarLogo from '../../assets/clients/epilbar.svg';
import golbanTradeLogo from '../../assets/clients/golban trade.svg';
import getmancarLogo from '../../assets/clients/getmancarr.svg';

const Clients = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: 'EVELYN CARTER',
      position: 'SEO',
      company: 'CD Home',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      clientIndex: 0
    },
    {
      name: 'MICHAEL JOHNSON',
      position: 'Marketing Director',
      company: 'Colina Verde',
      text: 'Работа с агентством Rose была превосходной! Они создали потрясающую рекламную кампанию для нашего жилого комплекса. Продажи выросли на 40% за первые 3 месяца. Рекомендую!',
      clientIndex: 1
    },
    {
      name: 'SOFIA MARTINEZ',
      position: 'Brand Manager',
      company: 'Joma',
      text: 'Креативная команда, которая действительно понимает наш бренд. Фотосессия и рекламная кампания получились именно такими, как мы хотели. Очень довольны результатом!',
      clientIndex: 2
    },
    {
      name: 'ANNA POPESCU',
      position: 'CEO',
      company: 'Epil Bar',
      text: 'Rose помогли нам создать яркий и запоминающийся образ для нашей студии. Разработка фирменного стиля и дизайн интерьера превзошли все ожидания. Спасибо за профессионализм!',
      clientIndex: 3
    },
    {
      name: 'DMITRI GOLBAN',
      position: 'Director',
      company: 'Golban Trade',
      text: 'Отличная работа по брендингу и маркетингу! Команда Rose реализовала проект в сжатые сроки и с высоким качеством. Наш бизнес получил мощный импульс для развития.',
      clientIndex: 4
    },
    {
      name: 'ALEX GETMAN',
      position: 'Owner',
      company: 'Getmancar',
      text: 'Комплексное продвижение автосервиса было выполнено на высшем уровне. Сайт, соцсети, таргетированная реклама - все работает отлично. Узнаваемость бренда значительно выросла!',
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
        <h2 className="clients-title">КЛИЕНТЫ И ОТЗЫВЫ</h2>

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
