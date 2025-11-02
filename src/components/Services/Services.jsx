import './Services.css';

// Import service icons
import smmIcon from '../../assets/services/smm.png';
import designIcon from '../../assets/services/design.png';
import photoIcon from '../../assets/services/photo.png';
import targetIcon from '../../assets/services/target.png';
import videoIcon from '../../assets/services/video.png';
import ilustrationIcon from '../../assets/services/ilustration.png';

const Services = () => {
  const services = [
    {
      icon: smmIcon,
      title: 'SMM',
      description: 'Nisl montes dui hendrerit fames molestie ante vel ac nulla sodales ridiculus consequat.'
    },
    {
      icon: designIcon,
      title: 'ДИЗАЙН',
      description: 'Nisl montes dui hendrerit fames molestie ante vel ac nulla sodales ridiculus consequat.'
    },
    {
      icon: photoIcon,
      title: 'ФОТОСЪЕМКА',
      description: 'Nisl montes dui hendrerit fames molestie ante vel ac nulla sodales ridiculus consequat.'
    },
    {
      icon: targetIcon,
      title: 'ТАРГЕТ',
      description: 'Nisl montes dui hendrerit fames molestie ante vel ac nulla sodales ridiculus consequat.'
    },
    {
      icon: videoIcon,
      title: 'ВИДЕОСЪЕМКА',
      description: 'Nisl montes dui hendrerit fames molestie ante vel ac nulla sodales ridiculus consequat.'
    },
    {
      icon: ilustrationIcon,
      title: 'ИЛЛЮСТРАЦИИ',
      description: 'Nisl montes dui hendrerit fames molestie ante vel ac nulla sodales ridiculus consequat.'
    }
  ];

  return (
    <section className="services" id="services">
      <div className="services-container">
        <h2 className="services-title">УСЛУГИ</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <img src={service.icon} alt={service.title} className="service-icon-image" />
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
