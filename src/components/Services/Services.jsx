import { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../utils/tracking';
import { getAssetPath } from '../../utils/assets';
import './Services.css';

const Services = () => {
  const { t } = useLanguage();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Track ViewContent when section is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackEvent('ViewContent', {
              content_name: 'Services Section',
              content_category: 'services',
              content_type: 'section'
            });
            hasTracked.current = true;
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const services = [
    {
      icon: getAssetPath('/assets/services/smm.webp'),
      titleKey: 'services.smm.title',
      descriptionKey: 'services.smm.description'
    },
    {
      icon: getAssetPath('/assets/services/design.webp'),
      titleKey: 'services.design.title',
      descriptionKey: 'services.design.description'
    },
    {
      icon: getAssetPath('/assets/services/photo.webp'),
      titleKey: 'services.photo.title',
      descriptionKey: 'services.photo.description'
    },
    {
      icon: getAssetPath('/assets/services/target.webp'),
      titleKey: 'services.target.title',
      descriptionKey: 'services.target.description'
    },
    {
      icon: getAssetPath('/assets/services/video.webp'),
      titleKey: 'services.video.title',
      descriptionKey: 'services.video.description'
    },
    {
      icon: getAssetPath('/assets/services/ilustration.webp'),
      titleKey: 'services.illustration.title',
      descriptionKey: 'services.illustration.description'
    }
  ];

  return (
    <section
      className="services"
      id="services"
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
