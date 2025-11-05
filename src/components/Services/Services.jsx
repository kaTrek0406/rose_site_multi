import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Services.css';

// Import service icons
import smmIcon from '../../assets/services/smm.png';
import designIcon from '../../assets/services/design.png';
import photoIcon from '../../assets/services/photo.png';
import targetIcon from '../../assets/services/target.png';
import videoIcon from '../../assets/services/video.png';
import ilustrationIcon from '../../assets/services/ilustration.png';

const Services = () => {
  const { t } = useLanguage();
  const [scrollProgress, setScrollProgress] = useState(0);

  const services = [
    {
      icon: smmIcon,
      titleKey: 'services.smm.title',
      descriptionKey: 'services.smm.description'
    },
    {
      icon: designIcon,
      titleKey: 'services.design.title',
      descriptionKey: 'services.design.description'
    },
    {
      icon: photoIcon,
      titleKey: 'services.photo.title',
      descriptionKey: 'services.photo.description'
    },
    {
      icon: targetIcon,
      titleKey: 'services.target.title',
      descriptionKey: 'services.target.description'
    },
    {
      icon: videoIcon,
      titleKey: 'services.video.title',
      descriptionKey: 'services.video.description'
    },
    {
      icon: ilustrationIcon,
      titleKey: 'services.illustration.title',
      descriptionKey: 'services.illustration.description'
    }
  ];

  // 3D эффект появления Services при скролле от Hero
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      // Прогресс от 0 до 1 во время скролла от Hero к Services
      const progress = Math.min(Math.max((scrollPosition - heroHeight * 0.5) / (heroHeight * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      className="services"
      id="services"
      style={{
        transform: `perspective(1500px) translateZ(${(1 - scrollProgress) * -500}px) scale(${0.8 + scrollProgress * 0.2})`,
        opacity: scrollProgress,
        transition: 'transform 0.1s ease-out, opacity 0.1s ease-out'
      }}
    >
      <div className="services-container">
        <h2 className="services-title">{t('services.title')}</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <img src={service.icon} alt={t(service.titleKey)} className="service-icon-image" />
              </div>
              <div className="service-content">
                <h3 className="service-title">{t(service.titleKey)}</h3>
                <p className="service-description">{t(service.descriptionKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
