import { useState, useEffect, useRef } from 'react';
import './Portfolio.css';

// Import portfolio images (PNG для чистого изображения без текста)
import golbanTradeImg from '../../assets/portfolio/golban-trade.png';
import jomaImg from '../../assets/portfolio/joma.png';
import heelImg from '../../assets/portfolio/heel.png';
import colinaVerdeImg from '../../assets/portfolio/colina-verde.png';
import getmancarImg from '../../assets/portfolio/getmancar.png';
import epilBarImg from '../../assets/portfolio/epil-bar.png';

const Portfolio = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  const allPortfolioItems = [
    {
      title: 'GOLBAN TRADE',
      client: 'Golban Trade Corporation',
      image: golbanTradeImg,
      description: 'Разработка комплексного брендинга и маркетинговой стратегии для строительной компании. Включает создание фирменного стиля, разработку веб-сайта и продвижение в социальных сетях. Проект был реализован в сжатые сроки с учетом всех требований клиента.',
      year: '2024',
      services: ['Брендинг', 'Веб-дизайн', 'SMM']
    },
    {
      title: 'JOMA',
      client: 'JOMA Sports Brand',
      image: jomaImg,
      description: 'Создание рекламной кампании для спортивного бренда JOMA. Включает фотосъемку продукции, создание креативных концепций и запуск таргетированной рекламы. Результат превзошел ожидания клиента по показателям охвата и вовлеченности.',
      year: '2024',
      services: ['Фотосъемка', 'Реклама', 'Таргет']
    },
    {
      title: 'HEEL',
      client: 'HEEL Cosmetics',
      image: heelImg,
      description: 'Полный цикл маркетинговых услуг для косметического бренда HEEL. От разработки упаковки до создания контента для социальных сетей. Проект включал профессиональную фотосъемку продукции и создание визуального стиля бренда.',
      year: '2023',
      services: ['Дизайн упаковки', 'Фотосъемка', 'SMM']
    },
    {
      title: 'COLINA VERDE',
      client: 'Colina Verde Residence',
      image: colinaVerdeImg,
      description: 'Разработка маркетинговой стратегии для жилого комплекса Colina Verde. Создание промо-материалов, организация фотосессий, запуск рекламных кампаний. Проект помог увеличить продажи квартир на 40% за первые 3 месяца.',
      year: '2023',
      services: ['Маркетинг', 'Фотосъемка', 'Дизайн']
    },
    {
      title: 'GETMANCAR',
      client: 'Getmancar Auto',
      image: getmancarImg,
      description: 'Комплексное продвижение автосервиса Getmancar. Разработка фирменного стиля, создание сайта, ведение социальных сетей и запуск таргетированной рекламы. Проект значительно увеличил узнаваемость бренда в регионе.',
      year: '2024',
      services: ['Брендинг', 'Веб-дизайн', 'Таргет']
    },
    {
      title: 'EPIL BAR',
      client: 'Epil Bar Studio',
      image: epilBarImg,
      description: 'Создание яркого и запоминающегося образа для студии эпиляции Epil Bar. Разработка логотипа, фирменного стиля, дизайна интерьера и рекламных материалов. Проект получил признание в индустрии красоты.',
      year: '2023',
      services: ['Брендинг', 'Дизайн интерьера', 'SMM']
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
        <h2 className="portfolio-title">ПОРТФОЛИО</h2>
        <div className="portfolio-grid">
          {displayedItems.map((item, index) => (
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
                  alt={item.title}
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-item-title">{item.title}</h3>
                  <p className="portfolio-description">{item.description.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="portfolio-button" onClick={toggleShowAll}>
          {showAll ? 'СКРЫТЬ' : 'СМОТРЕТЬ ВСЕ'}
        </button>
      </div>

      {/* Модальное окно */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>
            <div className="modal-info">
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-client">Клиент: {selectedProject.client}</p>
              <p className="modal-year">Год: {selectedProject.year}</p>
              <div className="modal-services">
                {selectedProject.services.map((service, idx) => (
                  <span key={idx} className="service-tag">{service}</span>
                ))}
              </div>
              <p className="modal-description">{selectedProject.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
