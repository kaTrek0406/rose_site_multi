import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaChevronDown } from 'react-icons/fa';
import './FAQ.css';

const FAQ = () => {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState({});

  const faqCategories = [
    {
      title: t('faq.cat1.title'),
      items: [
        { q: t('faq.cat1.q1'), a: t('faq.cat1.a1') },
        { q: t('faq.cat1.q2'), a: t('faq.cat1.a2') },
        { q: t('faq.cat1.q3'), a: t('faq.cat1.a3') },
        { q: t('faq.cat1.q4'), a: t('faq.cat1.a4') },
      ]
    },
    {
      title: t('faq.cat2.title'),
      items: [
        { q: t('faq.cat2.q1'), a: t('faq.cat2.a1') },
        { q: t('faq.cat2.q2'), a: t('faq.cat2.a2') },
        { q: t('faq.cat2.q3'), a: t('faq.cat2.a3') },
        { q: t('faq.cat2.q4'), a: t('faq.cat2.a4') },
        { q: t('faq.cat2.q5'), a: t('faq.cat2.a5') },
      ]
    },
    {
      title: t('faq.cat3.title'),
      items: [
        { q: t('faq.cat3.q1'), a: t('faq.cat3.a1') },
        { q: t('faq.cat3.q2'), a: t('faq.cat3.a2') },
        { q: t('faq.cat3.q3'), a: t('faq.cat3.a3') },
        { q: t('faq.cat3.q4'), a: t('faq.cat3.a4') },
      ]
    },
    {
      title: t('faq.cat4.title'),
      items: [
        { q: t('faq.cat4.q1'), a: t('faq.cat4.a1') },
        { q: t('faq.cat4.q2'), a: t('faq.cat4.a2') },
        { q: t('faq.cat4.q3'), a: t('faq.cat4.a3') },
        { q: t('faq.cat4.q4'), a: t('faq.cat4.a4') },
      ]
    }
  ];

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

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

    const elements = document.querySelectorAll('.faq-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero-content faq-animate">
          <span className="faq-badge">{t('faq.badge')}</span>
          <h1 className="faq-hero-title">{t('faq.title')} <span className="text-pink">{t('faq.title_accent')}</span></h1>
          <p className="faq-hero-subtitle">
            {t('faq.subtitle')}
          </p>
        </div>
      </section>

      <section className="faq-content">
        {faqCategories.map((cat, catIdx) => (
          <div key={catIdx} className="faq-category faq-animate" style={{ animationDelay: `${catIdx * 0.1}s` }}>
            <h2 className="faq-category-title">{cat.title}</h2>
            <div className="faq-items">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isOpen = openItems[key];
                return (
                  <div key={itemIdx} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                    <button className="faq-question" onClick={() => toggleItem(catIdx, itemIdx)}>
                      <span>{item.q}</span>
                      <FaChevronDown className={`faq-chevron ${isOpen ? 'rotated' : ''}`} />
                    </button>
                    <div className={`faq-answer ${isOpen ? 'faq-answer-open' : ''}`}>
                      <p>{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="faq-cta faq-animate">
        <h2>{t('faq.cta_title')}</h2>
        <p>{t('faq.cta_subtitle')}</p>
        <div className="faq-cta-actions">
          <Link to="/contact" className="btn-primary btn-lg">{t('faq.cta_btn')}</Link>
          <a href="https://www.instagram.com/rose__creative/" target="_blank" rel="noopener noreferrer" className="btn-outline btn-lg">{t('faq.cta_instagram')}</a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
