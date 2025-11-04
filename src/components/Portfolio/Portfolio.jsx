import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Portfolio.css';

// Import portfolio images (SVG для высокого качества)
import golbanTradeImg from '../../assets/portfolio/golban.svg';
import jomaImg from '../../assets/portfolio/joma1.svg';
import heelImg from '../../assets/portfolio/heel1.svg';
import colinaVerdeImg from '../../assets/portfolio/colina.svg';
import getmancarImg from '../../assets/portfolio/getman.svg';
import epilBarImg from '../../assets/portfolio/epil.svg';

const Portfolio = () => {
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const allPortfolioItems = [
    {
      id: 'golban_trade',
      image: golbanTradeImg
    },
    {
      id: 'joma',
      image: jomaImg
    },
    {
      id: 'heel',
      image: heelImg
    },
    {
      id: 'colina_verde',
      image: colinaVerdeImg
    },
    {
      id: 'getmancar',
      image: getmancarImg
    },
    {
      id: 'epil_bar',
      image: epilBarImg
    }
  ];

  const displayedItems = showAll ? allPortfolioItems : allPortfolioItems.slice(0, 6);

  // Intersection Observer для анимации появления карточек
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [displayedItems.length]);

  const handleCardClick = (item) => {
    setSelectedProject(item);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    if (showAll) {
      // Прокрутка к секции портфолио при скрытии
      document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container">
        <h2 className="portfolio-title">{t('portfolio.title')}</h2>
        <div className="portfolio-grid">
          {displayedItems.map((item, index) => {
            const title = t(`portfolio.${item.id}.title`);
            const description = t(`portfolio.${item.id}.description`);
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`portfolio-card ${visibleCards.includes(index) ? 'visible' : ''}`}
                onClick={() => handleCardClick(item)}
              >
                <div className="portfolio-image-wrapper">
                  <img
                    src={item.image}
                    alt={title}
                    className="portfolio-image"
                  />
                  <div className="portfolio-overlay">
                    <h3 className="portfolio-item-title">{title}</h3>
                    <p className="portfolio-description">{description.substring(0, 100)}...</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="portfolio-button" onClick={toggleShowAll}>
          {showAll ? t('portfolio.button_hide') : t('portfolio.button_show_all')}
        </button>
      </div>

      {/* Модальное окно */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={t(`portfolio.${selectedProject.id}.title`)} />
            </div>
            <div className="modal-info">
              <h2 className="modal-title">{t(`portfolio.${selectedProject.id}.title`)}</h2>
              <p className="modal-client">{t('portfolio.modal.client_label')} {t(`portfolio.${selectedProject.id}.client`)}</p>
              <p className="modal-year">{t('portfolio.modal.year_label')} {t(`portfolio.${selectedProject.id}.year`)}</p>
              <div className="modal-services">
                {[1, 2, 3].map((idx) => (
                  <span key={idx} className="service-tag">{t(`portfolio.${selectedProject.id}.service${idx}`)}</span>
                ))}
              </div>
              <p className="modal-description">{t(`portfolio.${selectedProject.id}.description`)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
