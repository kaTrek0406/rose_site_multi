import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Portfolio from '../../components/Portfolio/Portfolio';
import Clients from '../../components/Clients/Clients';
import './Cases.css';

const Cases = () => {
  const { t } = useLanguage();

  const caseStudies = [
    {
      client: 'Epil Bar',
      category: t('cases.cs1.category'),
      challenge: t('cases.cs1.challenge'),
      solution: t('cases.cs1.solution'),
      results: [t('cases.cs1.result1'), t('cases.cs1.result2'), t('cases.cs1.result3'), t('cases.cs1.result4')],
      years: t('cases.cs1.years')
    },
    {
      client: 'JOMA Moldova',
      category: t('cases.cs2.category'),
      challenge: t('cases.cs2.challenge'),
      solution: t('cases.cs2.solution'),
      results: [t('cases.cs2.result1'), t('cases.cs2.result2'), t('cases.cs2.result3'), t('cases.cs2.result4')],
      years: t('cases.cs2.years')
    },
    {
      client: 'Colina Verde',
      category: t('cases.cs3.category'),
      challenge: t('cases.cs3.challenge'),
      solution: t('cases.cs3.solution'),
      results: [t('cases.cs3.result1'), t('cases.cs3.result2'), t('cases.cs3.result3'), t('cases.cs3.result4')],
      years: t('cases.cs3.years')
    },
    {
      client: 'JBL Store Moldova',
      category: t('cases.cs4.category'),
      challenge: t('cases.cs4.challenge'),
      solution: t('cases.cs4.solution'),
      results: [t('cases.cs4.result1'), t('cases.cs4.result2'), t('cases.cs4.result3'), t('cases.cs4.result4')],
      years: t('cases.cs4.years')
    }
  ];

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

    const elements = document.querySelectorAll('.cases-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="cases-page">
      <section className="cases-hero">
        <div className="cases-hero-content cases-animate">
          <span className="cases-badge">{t('cases.badge')}</span>
          <h1 className="cases-hero-title">{t('cases.title')} <span className="text-pink">{t('cases.title_accent')}</span></h1>
          <p className="cases-hero-subtitle">
            {t('cases.subtitle')}
          </p>
        </div>
      </section>

      <section className="case-studies">
        <h2 className="section-title cases-animate">{t('cases.detail_title')}</h2>
        <div className="case-studies-list">
          {caseStudies.map((cs, i) => (
            <div key={i} className="case-study-card cases-animate" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="cs-header">
                <span className="cs-category">{cs.category}</span>
                <span className="cs-years">{cs.years}</span>
              </div>
              <h3 className="cs-client">{cs.client}</h3>
              <div className="cs-sections">
                <div className="cs-section">
                  <h4>{t('cases.challenge')}</h4>
                  <p>{cs.challenge}</p>
                </div>
                <div className="cs-section">
                  <h4>{t('cases.solution')}</h4>
                  <p>{cs.solution}</p>
                </div>
                <div className="cs-section">
                  <h4>{t('cases.result')}</h4>
                  <ul>
                    {cs.results.map((r, j) => <li key={j}>{r}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Portfolio />
      <Clients />

      <section className="cases-cta cases-animate">
        <h2>{t('cases.cta_title')}</h2>
        <p>{t('cases.cta_subtitle')}</p>
        <Link to="/contact" className="btn-primary btn-lg">{t('cases.cta_btn')}</Link>
      </section>
    </div>
  );
};

export default Cases;
