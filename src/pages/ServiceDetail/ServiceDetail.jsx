import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaCheck, FaArrowLeft } from 'react-icons/fa';
import { services } from '../Services/ServicesPage';
import './ServiceDetail.css';

const ServiceDetail = () => {
  const { serviceSlug } = useParams();
  const { t } = useLanguage();

  const service = services.find(s => s.slug === serviceSlug);

  // Dynamic details based on current slug and language
  const details = service ? {
    process: [
      { step: '01', title: t(`service_detail.${serviceSlug}.process.step1.title`), desc: t(`service_detail.${serviceSlug}.process.step1.desc`) },
      { step: '02', title: t(`service_detail.${serviceSlug}.process.step2.title`), desc: t(`service_detail.${serviceSlug}.process.step2.desc`) },
      { step: '03', title: t(`service_detail.${serviceSlug}.process.step3.title`), desc: t(`service_detail.${serviceSlug}.process.step3.desc`) },
      { step: '04', title: t(`service_detail.${serviceSlug}.process.step4.title`), desc: t(`service_detail.${serviceSlug}.process.step4.desc`) },
      // SMM and Target have 5 steps
      ...(serviceSlug === 'smm' || serviceSlug === 'target' ? [
        { step: '05', title: t(`service_detail.${serviceSlug}.process.step5.title`), desc: t(`service_detail.${serviceSlug}.process.step5.desc`) }
      ] : [])
    ],
    faq: [
      { q: t(`service_detail.${serviceSlug}.faq.q1`), a: t(`service_detail.${serviceSlug}.faq.a1`) },
      { q: t(`service_detail.${serviceSlug}.faq.q2`), a: t(`service_detail.${serviceSlug}.faq.a2`) },
      { q: t(`service_detail.${serviceSlug}.faq.q3`), a: t(`service_detail.${serviceSlug}.faq.a3`) }
    ]
  } : null;

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

    const elements = document.querySelectorAll('.sd-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [serviceSlug]);

  if (!service || !details) return <Navigate to="/services" />;

  // Get service features usage t() from ServicesPage logic (re-implemented here for safety or we can import if we want, but better to just use t() directly if we know the keys)
  // Actually service object comes from services imported from ServicesPage, which already uses t() inside the component but Wait.
  // services in ServicesPage is defined INSIDE the component. The export is `serviceKeys`.
  // So `services` imported here is `serviceKeys`.
  // I need to reconstruct the `service` object with translations here too.

  const translatedService = {
    ...service,
    title: t(`services.${service.key}.title`),
    longDesc: t(`services.${service.key}.longDesc`),
    features: Array.from({ length: service.featureCount }, (_, i) => t(`services.${service.key}.feature${i + 1}`))
  };

  return (
    <div className="service-detail-page">
      <section className="sd-hero">
        <div className="sd-hero-content sd-animate">
          <Link to="/services" className="sd-back"><FaArrowLeft /> {t('service_detail.back')}</Link>
          <div className="sd-hero-icon">
            <img src={translatedService.icon} alt={translatedService.title} />
          </div>
          <h1>{translatedService.title}</h1>
          <p>{translatedService.longDesc}</p>
          <Link to="/contact" className="btn-primary">{t('service_detail.order')}</Link>
        </div>
      </section>

      <section className="sd-features sd-animate">
        <h2 className="section-title">{t('service_detail.features_title')}</h2>
        <div className="sd-features-grid">
          {translatedService.features.map((f, i) => (
            <div key={i} className="sd-feature-card sd-animate" style={{ animationDelay: `${i * 0.1}s` }}>
              <FaCheck className="sd-feature-icon" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="sd-process">
        <h2 className="section-title sd-animate">{t('service_detail.process_title')}</h2>
        <div className="sd-process-steps">
          {details.process.map((step, i) => (
            <div key={i} className="sd-step sd-animate" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="sd-step-number">{step.step}</div>
              <div className="sd-step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sd-faq sd-animate">
        <h2 className="section-title">{t('service_detail.faq_title')}</h2>
        <div className="sd-faq-list">
          {details.faq.map((item, i) => (
            <div key={i} className="sd-faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sd-cta sd-animate">
        <h2>{t('service_detail.cta_title')}</h2>
        <p>{t('service_detail.cta_subtitle')}</p>
        <div className="sd-cta-actions">
          <Link to="/contact" className="btn-primary btn-lg">{t('service_detail.cta_btn')}</Link>
          <Link to="/pricing" className="btn-outline btn-lg">{t('service_detail.cta_pricing')}</Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
