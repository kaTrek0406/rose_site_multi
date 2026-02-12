import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaAward, FaUsers, FaProjectDiagram, FaCoffee } from 'react-icons/fa';
import './About.css';

const About = () => {
  const { t } = useLanguage();
  const statsRef = useRef(null);

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

    const elements = document.querySelectorAll('.about-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const team = [
    { name: t('about.team1_name'), role: t('about.team1_role'), desc: t('about.team1_desc') },
    { name: t('about.team2_name'), role: t('about.team2_role'), desc: t('about.team2_desc') },
    { name: t('about.team3_name'), role: t('about.team3_role'), desc: t('about.team3_desc') },
    { name: t('about.team4_name'), role: t('about.team4_role'), desc: t('about.team4_desc') },
    { name: t('about.team5_name'), role: t('about.team5_role'), desc: t('about.team5_desc') },
    { name: t('about.team6_name'), role: t('about.team6_role'), desc: t('about.team6_desc') },
  ];

  const stats = [
    { icon: <FaUsers />, number: '50+', label: t('about.stat_clients') },
    { icon: <FaProjectDiagram />, number: '200+', label: t('about.stat_projects') },
    { icon: <FaAward />, number: '6+', label: t('about.stat_experience') },
    { icon: <FaCoffee />, number: '∞', label: t('about.stat_coffee') },
  ];

  const values = [
    { title: t('about.value1_title'), desc: t('about.value1_desc') },
    { title: t('about.value2_title'), desc: t('about.value2_desc') },
    { title: t('about.value3_title'), desc: t('about.value3_desc') },
    { title: t('about.value4_title'), desc: t('about.value4_desc') },
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content about-animate">
          <span className="about-badge">{t('about.badge')}</span>
          <h1 className="about-hero-title">
            {t('about.title')}<span className="text-pink">{t('about.title_brand')}</span>
          </h1>
          <p className="about-hero-subtitle">
            {t('about.subtitle')}
          </p>
          <div className="about-hero-actions">
            <Link to="/services" className="btn-primary">{t('about.btn_services')}</Link>
            <Link to="/cases" className="btn-outline">{t('about.btn_cases')}</Link>
          </div>
        </div>
      </section>

      <section className="about-stats" ref={statsRef}>
        {stats.map((stat, i) => (
          <div key={i} className="stat-card about-animate" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="about-story about-animate">
        <div className="about-story-content">
          <h2 className="section-title">{t('about.story_title')}</h2>
          <div className="story-timeline">
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <h3>{t('about.story_2018_title')}</h3>
                <p>{t('about.story_2018_desc')}</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>{t('about.story_2020_title')}</h3>
                <p>{t('about.story_2020_desc')}</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>{t('about.story_2022_title')}</h3>
                <p>{t('about.story_2022_desc')}</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>{t('about.story_2024_title')}</h3>
                <p>{t('about.story_2024_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <h2 className="section-title about-animate">{t('about.values_title')}</h2>
        <div className="values-grid">
          {values.map((value, i) => (
            <div key={i} className="value-card about-animate" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="value-number">0{i + 1}</span>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-team">
        <h2 className="section-title about-animate">{t('about.team_title')}</h2>
        <p className="section-subtitle about-animate">
          {t('about.team_subtitle')}
        </p>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card about-animate" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="team-avatar">
                <span>{member.name[0]}</span>
              </div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p>{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-cta about-animate">
        <h2>{t('about.cta_title')}</h2>
        <p>{t('about.cta_subtitle')}</p>
        <Link to="/contact" className="btn-primary btn-lg">{t('about.cta_btn')}</Link>
      </section>
    </div>
  );
};

export default About;
