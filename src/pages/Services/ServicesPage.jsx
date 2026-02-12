import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import './ServicesPage.css';

const serviceKeys = [
  { slug: 'smm', icon: '/assets/services/smm.webp', key: 'smm', featureCount: 6 },
  { slug: 'design', icon: '/assets/services/design.webp', key: 'design', featureCount: 6 },
  { slug: 'photo', icon: '/assets/services/photo.webp', key: 'photo', featureCount: 6 },
  { slug: 'target', icon: '/assets/services/target.webp', key: 'target', featureCount: 6 },
  { slug: 'video', icon: '/assets/services/video.webp', key: 'video', featureCount: 6 },
  { slug: 'illustration', icon: '/assets/services/ilustration.webp', key: 'illustration', featureCount: 6 },
];

const ServicesPage = () => {
  const { t } = useLanguage();

  const services = serviceKeys.map(s => ({
    slug: s.slug,
    icon: s.icon,
    titleKey: `services.${s.key}.title`,
    descKey: `services.${s.key}.description`,
    features: Array.from({ length: s.featureCount }, (_, i) => t(`services.${s.key}.feature${i + 1}`)),
    longDesc: t(`services.${s.key}.longDesc`)
  }));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.srv-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-content srv-animate">
          <span className="services-badge">{t('services_page.badge')}</span>
          <h1 className="services-hero-title">{t('services_page.title')} <span className="text-pink">{t('services_page.title_accent')}</span></h1>
          <p className="services-hero-subtitle">
            {t('services_page.subtitle')}
          </p>
        </div>
      </section>

      <section className="services-list">
        {services.map((service, i) => (
          <div key={service.slug} className={`service-row srv-animate ${i % 2 !== 0 ? 'service-row-reverse' : ''}`}>
            <div className="service-info">
              <div className="service-icon-large">
                <img src={service.icon} alt={t(service.titleKey)} />
              </div>
              <h2>{t(service.titleKey)}</h2>
              <p className="service-long-desc">{service.longDesc}</p>
              <ul className="service-features">
                {service.features.map((f, j) => (
                  <li key={j}><FaCheck className="feature-check" /> {f}</li>
                ))}
              </ul>
              <Link to={`/services/${service.slug}`} className="service-link">
                {t('services_page.more')} <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </section>

      <section className="services-cta srv-animate">
        <h2>{t('services_page.cta_title')}</h2>
        <p>{t('services_page.cta_subtitle')}</p>
        <Link to="/contact" className="btn-primary btn-lg">{t('services_page.cta_btn')}</Link>
      </section>
    </div>
  );
};

export { serviceKeys as services };
export default ServicesPage;
