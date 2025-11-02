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

  return (
    <section className="services" id="services">
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
