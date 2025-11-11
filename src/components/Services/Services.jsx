import { useLanguage } from '../../contexts/LanguageContext';
import './Services.css';

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: '/assets/services/smm.webp',
      titleKey: 'services.smm.title',
      descriptionKey: 'services.smm.description'
    },
    {
      icon: '/assets/services/design.webp',
      titleKey: 'services.design.title',
      descriptionKey: 'services.design.description'
    },
    {
      icon: '/assets/services/photo.webp',
      titleKey: 'services.photo.title',
      descriptionKey: 'services.photo.description'
    },
    {
      icon: '/assets/services/target.webp',
      titleKey: 'services.target.title',
      descriptionKey: 'services.target.description'
    },
    {
      icon: '/assets/services/video.webp',
      titleKey: 'services.video.title',
      descriptionKey: 'services.video.description'
    },
    {
      icon: '/assets/services/ilustration.webp',
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
