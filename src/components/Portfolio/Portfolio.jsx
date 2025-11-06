import { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Portfolio.css';

import golbanTradeImg from '../../assets/portfolio/golban.svg';
import jomaImg from '../../assets/portfolio/joma1.svg';
import heelImg from '../../assets/portfolio/heel1.svg';
import colinaVerdeImg from '../../assets/portfolio/colina.svg';
import getmancarImg from '../../assets/portfolio/getman.svg';
import epilBarImg from '../../assets/portfolio/epil.svg';

// Joma gallery images
import jomaImg1 from '../../assets/portfolio/Joma/Artboard 2.png';
import jomaImg2 from '../../assets/portfolio/Joma/Artboard 4.png';
import jomaImg3 from '../../assets/portfolio/Joma/Artboard 6.png';
import jomaImg4 from '../../assets/portfolio/Joma/Artboard 8.png';
import jomaImg5 from '../../assets/portfolio/Joma/Artboard 9 (1).png';
import jomaImg6 from '../../assets/portfolio/Joma/DSC02905 копия 2.png';
import jomaImg7 from '../../assets/portfolio/Joma/DSC02978 копия.png';
import jomaImg8 from '../../assets/portfolio/Joma/DSC03117 копия 3.png';
import jomaImg9 from '../../assets/portfolio/Joma/Yandex.Disk.2.png';

// Golban Trade gallery images
import golbanImg1 from '../../assets/portfolio/Golban Trade/2025-01-17 08.58.52.jpg';
import golbanImg2 from '../../assets/portfolio/Golban Trade/2025-01-17 08.59.31.jpg';
import golbanImg3 from '../../assets/portfolio/Golban Trade/2025-01-17 08.59.56.jpg';
import golbanImg4 from '../../assets/portfolio/Golban Trade/2025-01-17 09.00.10.jpg';

// Kerashop images
import kerashopMainImg from '../../assets/portfolio/Kerashop/2025-11-05 17.50.53.png';
import kerashopImg1 from '../../assets/portfolio/Kerashop/2025-11-05 17.50.53.png';
import kerashopImg2 from '../../assets/portfolio/Kerashop/DSC_1413 копия.jpg';
import kerashopImg3 from '../../assets/portfolio/Kerashop/DSC_5596.png';
import kerashopImg4 from '../../assets/portfolio/Kerashop/DSC_5876.png';
import kerashopImg5 from '../../assets/portfolio/Kerashop/DSC_6051.png';
import kerashopImg6 from '../../assets/portfolio/Kerashop/DSC_6105.png';

// JBL Store images
import jblMainImg from '../../assets/portfolio/JBL/DSC_4461 копия (1).jpg';
import jblImg1 from '../../assets/portfolio/JBL/DSC_4461 копия (1).jpg';
import jblImg2 from '../../assets/portfolio/JBL/DSC_4531.jpg';
import jblImg3 from '../../assets/portfolio/JBL/DSC_5736-копия.jpg';
import jblImg4 from '../../assets/portfolio/JBL/DSC_6959.jpg';
import jblImg5 from '../../assets/portfolio/JBL/DSC_8367 копия 2.jpg';
import jblImg6 from '../../assets/portfolio/JBL/DSC_8374 копия.jpg';
import jblImg7 from '../../assets/portfolio/JBL/IMG_9598.JPEG';
import jblImg8 from '../../assets/portfolio/JBL/Снимок экрана 2023-10-31 в 13.31.50.png';
import jblImg9 from '../../assets/portfolio/JBL/Снимок экрана 2023-10-31 в 13.32.07.png';
import jblImg10 from '../../assets/portfolio/JBL/Снимок экрана 2023-10-31 в 13.32.20.png';

// Radler images
import radlerMainImg from '../../assets/portfolio/radler/3.jpg';
import radlerImg1 from '../../assets/portfolio/radler/3.jpg';
import radlerImg2 from '../../assets/portfolio/radler/8.jpg';
import radlerImg3 from '../../assets/portfolio/radler/DSC_2695 копия (1).png';
import radlerImg4 from '../../assets/portfolio/radler/DSC_2734 копия 2 (1) копия (1).png';
import radlerImg5 from '../../assets/portfolio/radler/DSC_44700.png';
import radlerImg6 from '../../assets/portfolio/radler/DSC_5457-(1).png';
import radlerImg7 from '../../assets/portfolio/radler/DSC_8656.png';

// Cocosecret images
import cocosecretMainImg from '../../assets/portfolio/cocosecret/1.jpg';
import cocosecretImg1 from '../../assets/portfolio/cocosecret/1.jpg';
import cocosecretImg2 from '../../assets/portfolio/cocosecret/2025-11-06 13.52.58.png';
import cocosecretImg3 from '../../assets/portfolio/cocosecret/DSC_6546.jpg';
import cocosecretImg4 from '../../assets/portfolio/cocosecret/DSC_6597.jpg';
import cocosecretImg5 from '../../assets/portfolio/cocosecret/DSC_6611.jpg';
import cocosecretImg6 from '../../assets/portfolio/cocosecret/DSC_6867.jpg';
import cocosecretImg7 from '../../assets/portfolio/cocosecret/DSC_6967.jpg';
import cocosecretImg8 from '../../assets/portfolio/cocosecret/DSC_7013.jpg';

// Finch images
import finchMainImg from '../../assets/portfolio/Finch/DSC_4832.jpg';
import finchImg1 from '../../assets/portfolio/Finch/DSC_12655.png';
import finchImg2 from '../../assets/portfolio/Finch/DSC_2147.png';
import finchImg3 from '../../assets/portfolio/Finch/DSC_2194.png';
import finchImg4 from '../../assets/portfolio/Finch/DSC_4832.jpg';
import finchImg5 from '../../assets/portfolio/Finch/DSC_4941.png';
import finchImg6 from '../../assets/portfolio/Finch/DSC_7738.png';
import finchImg7 from '../../assets/portfolio/Finch/DSC_9187.png';
import finchImg8 from '../../assets/portfolio/Finch/finch  копия 3 (1).png';
import finchImg9 from '../../assets/portfolio/Finch/руки_с_бутылкой_восстановлено_копия.png';

// Kvartals images
import kvartalsMainImg from '../../assets/portfolio/Kvartals/1r.png';
import kvartalsImg1 from '../../assets/portfolio/Kvartals/1r.png';
import kvartalsImg2 from '../../assets/portfolio/Kvartals/8 (1).png';
import kvartalsImg3 from '../../assets/portfolio/Kvartals/DSC05472 копия.png';
import kvartalsImg4 from '../../assets/portfolio/Kvartals/DSC05599.png';
import kvartalsImg5 from '../../assets/portfolio/Kvartals/DSC_6581.png';
import kvartalsImg6 from '../../assets/portfolio/Kvartals/DSC_6618.png';
import kvartalsImg7 from '../../assets/portfolio/Kvartals/DSC_6650.png';
import kvartalsImg8 from '../../assets/portfolio/Kvartals/IMG_20221012_191036_825.png';
import kvartalsImg9 from '../../assets/portfolio/Kvartals/красный.jpg';

// Pet Mama images
import petMamaMainImg from '../../assets/portfolio/Pet Mama/DSC_3214 копия.jpg';
import petMamaImg1 from '../../assets/portfolio/Pet Mama/DSC_3214 копия.jpg';
import petMamaImg2 from '../../assets/portfolio/Pet Mama/DSC_3297 копия.jpg';
import petMamaImg3 from '../../assets/portfolio/Pet Mama/DSC_3313 копия.jpg';
import petMamaImg4 from '../../assets/portfolio/Pet Mama/DSC_3325 копия.jpg';
import petMamaImg5 from '../../assets/portfolio/Pet Mama/DSC_3347 копия.jpg';
import petMamaImg6 from '../../assets/portfolio/Pet Mama/DSC_3357 копия.png';
import petMamaImg7 from '../../assets/portfolio/Pet Mama/DSC_3711 копия.png';

const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  laptop: 1200,
};

const getItemsPerPage = (w) => {
  if (w <= BREAKPOINTS.mobile) return 1;
  if (w <= BREAKPOINTS.tablet) return 2;
  if (w <= BREAKPOINTS.laptop) return 3;
  return 4; // десктоп
};

const Portfolio = () => {
  const { t } = useLanguage();

  // ====== ДАННЫЕ ======
  const allPortfolioItems = useMemo(() => ([
    { id: 'golban_trade', image: golbanTradeImg, gallery: [golbanImg1, golbanImg2, golbanImg3, golbanImg4] },
    { id: 'joma',        image: jomaImg,       gallery: [jomaImg1, jomaImg2, jomaImg3, jomaImg4, jomaImg5, jomaImg6, jomaImg7, jomaImg8, jomaImg9] },
    { id: 'kerashop',    image: kerashopMainImg, gallery: [kerashopImg1, kerashopImg2, kerashopImg3, kerashopImg4, kerashopImg5, kerashopImg6] },
    { id: 'jbl_store',   image: jblMainImg,    gallery: [jblImg1, jblImg2, jblImg3, jblImg4, jblImg5, jblImg6, jblImg7, jblImg8, jblImg9, jblImg10] },
    { id: 'radler',      image: radlerMainImg, gallery: [radlerImg1, radlerImg2, radlerImg3, radlerImg4, radlerImg5, radlerImg6, radlerImg7] },
    { id: 'cocosecret',  image: cocosecretMainImg, gallery: [cocosecretImg1, cocosecretImg2, cocosecretImg3, cocosecretImg4, cocosecretImg5, cocosecretImg6, cocosecretImg7, cocosecretImg8] },
    { id: 'finch',       image: finchMainImg,  gallery: [finchImg1, finchImg2, finchImg3, finchImg4, finchImg5, finchImg6, finchImg7, finchImg8, finchImg9] },
    { id: 'kvartals',    image: kvartalsMainImg, gallery: [kvartalsImg1, kvartalsImg2, kvartalsImg3, kvartalsImg4, kvartalsImg5, kvartalsImg6, kvartalsImg7, kvartalsImg8, kvartalsImg9] },
    { id: 'pet_mama',    image: petMamaMainImg, gallery: [petMamaImg1, petMamaImg2, petMamaImg3, petMamaImg4, petMamaImg5, petMamaImg6, petMamaImg7] },
    { id: 'heel',        image: heelImg,       gallery: [heelImg] },
    { id: 'colina_verde',image: colinaVerdeImg,gallery: [colinaVerdeImg] },
    { id: 'getmancar',   image: getmancarImg,  gallery: [getmancarImg] },
    { id: 'epil_bar',    image: epilBarImg,    gallery: [epilBarImg] },
  ]), []);

  // ====== СТЕЙТЫ ======
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const [itemsPerPage, setItemsPerPage] = useState(() =>
    getItemsPerPage(typeof window !== 'undefined' ? window.innerWidth : 1440)
  );

  const totalItems = allPortfolioItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // КОЛЬЦЕВЫЕ СТРАНИЦЫ: каждая страница всегда заполнена itemsPerPage элементами
  const pages = useMemo(() => {
    if (totalItems === 0) return [[]];
    return Array.from({ length: totalPages }, (_, p) => {
      const start = p * itemsPerPage;
      return Array.from({ length: itemsPerPage }, (_, j) => {
        const idx = (start + j) % totalItems;
        return allPortfolioItems[idx];
      });
    });
  }, [allPortfolioItems, itemsPerPage, totalItems, totalPages]);

  // Для бесконечной прокрутки добавляем клоны по краям
  const extendedPages = totalPages > 1 ? [pages[totalPages - 1], ...pages, pages[0]] : pages;

  // Текущий индекс на треке (с учётом клонов): 0..N+1
  const [currentTrackIndex, setCurrentTrackIndex] = useState(totalPages > 1 ? 1 : 0);
  const currentPage = totalPages > 0 ? (currentTrackIndex - 1 + totalPages) % totalPages : 0;

  const [visibleCards, setVisibleCards] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ====== REF'Ы ======
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const cardRefs = useRef([]);            // для IO
  const gridTouchStartXRef = useRef(null);
  const wheelBlockUntilRef = useRef(0);

  // ====== РЕАКЦИЯ НА BREAKPOINTS ======
  useEffect(() => {
    let raf;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const next = getItemsPerPage(window.innerWidth);
        setItemsPerPage((prev) => (prev === next ? prev : next));
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Сбрасываем позицию при изменении кол-ва страниц (без анимации)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.transition = 'none';
    setCurrentTrackIndex(totalPages > 1 ? 1 : 0);
    // Вернуть transition на следующий кадр
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = '';
      });
    });
  }, [totalPages]);

  // ====== IO: появление карточек ======
  useEffect(() => {
    const root = viewportRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.absindex, 10);
            setVisibleCards((prev) => (prev.includes(idx) ? prev : [...prev, idx]));
          }
        });
      },
      {
        root,                // ВАЖНО: наблюдаем внутри viewport, а не всего окна
        threshold: 0.15,
        rootMargin: '120px'  // даём форы, чтобы появлялись заранее
      }
    );

    cardRefs.current.forEach((node) => node && io.observe(node));
    return () => io.disconnect();
  }, [extendedPages, itemsPerPage]);

  // ====== Сразу подсветить текущую (стартовую) страницу ======
  useEffect(() => {
    if (totalItems === 0) return;
    const start = (currentPage * itemsPerPage) % totalItems;
    const firstPageIdxs = Array.from({ length: itemsPerPage }, (_, i) => (start + i) % totalItems);
    setVisibleCards((prev) => Array.from(new Set([...prev, ...firstPageIdxs])));
  }, [itemsPerPage, totalItems, currentPage]);

  // ====== МОДАЛКА ======
  const handleCardClick = (indexOnPage) => {
    const start = (currentPage * itemsPerPage) % totalItems;
    const absoluteIndex = (start + indexOnPage) % totalItems;
    setSelectedItemIndex(absoluteIndex);
    setSelectedPhotoIndex(0);
  };

  const closeModal = () => {
    setSelectedItemIndex(null);
    setSelectedPhotoIndex(0);
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    if (selectedItemIndex === null) return;
    const gallery = allPortfolioItems[selectedItemIndex].gallery || [];
    setSelectedPhotoIndex((p) => (p - 1 + gallery.length) % gallery.length);
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    if (selectedItemIndex === null) return;
    const gallery = allPortfolioItems[selectedItemIndex].gallery || [];
    setSelectedPhotoIndex((p) => (p + 1) % gallery.length);
  };

  useEffect(() => {
    if (selectedItemIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItemIndex]);

  // ====== НАВИГАЦИЯ ПО СТРАНИЦАМ ======
  const goPrevPage = () => {
    if (totalPages <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentTrackIndex((i) => i - 1);
  };

  const goNextPage = () => {
    if (totalPages <= 1 || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentTrackIndex((i) => i + 1);
  };

  const handleWheel = (e) => {
    const now = Date.now();
    if (now < wheelBlockUntilRef.current) return;

    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    const threshold = 20;

    if (delta > threshold) {
      wheelBlockUntilRef.current = now + 280;
      goNextPage();
    } else if (delta < -threshold) {
      wheelBlockUntilRef.current = now + 280;
      goPrevPage();
    }
  };

  const onGridTouchStart = (e) => {
    gridTouchStartXRef.current = e.touches[0].clientX;
  };

  const onGridTouchEnd = (e) => {
    if (gridTouchStartXRef.current == null) return;
    const delta = e.changedTouches[0].clientX - gridTouchStartXRef.current;
    const threshold = 40;
    if (delta < -threshold) goNextPage();
    if (delta > threshold) goPrevPage();
    gridTouchStartXRef.current = null;
  };

  // ====== БЕСШОВНЫЙ ПЕРЕСКОК С КЛОНОВ (без визуального рывка) ======
  useEffect(() => {
    const el = trackRef.current;
    if (!el || totalPages <= 1) return;

    const onEnd = () => {
      // обычное завершение анимации
      if (currentTrackIndex > 0 && currentTrackIndex < totalPages + 1) {
        setIsTransitioning(false);
        return;
      }

      // готовим "телепорт": отключаем анимацию и СРАЗУ ставим transform на реальный слайд
      const jumpTo = currentTrackIndex === 0 ? totalPages : 1; // слева → последняя, справа → первая
      el.style.transition = 'none';
      el.style.transform = `translateX(-${jumpTo * 100}%)`;
      // форсируем reflow, чтобы браузер применил transform без анимации
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight;

      // синхронизируем state, но визуально уже всё на месте
      setCurrentTrackIndex(jumpTo);

      // возвращаем transition на следующий кадр
      requestAnimationFrame(() => {
        el.style.transition = '';
        setIsTransitioning(false);
      });
    };

    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [currentTrackIndex, totalPages]);

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container">
        <h2 className="portfolio-title">{t('portfolio.title')}</h2>

        <button
          className={`grid-nav grid-prev ${totalPages <= 1 ? 'hidden' : ''}`}
          onClick={goPrevPage}
          aria-label="Previous clients"
        >
          ‹
        </button>

        <button
          className={`grid-nav grid-next ${totalPages <= 1 ? 'hidden' : ''}`}
          onClick={goNextPage}
          aria-label="Next clients"
        >
          ›
        </button>

        <div
          ref={viewportRef}
          className="portfolio-viewport"
          onWheel={handleWheel}
          onTouchStart={onGridTouchStart}
          onTouchEnd={onGridTouchEnd}
        >
          <div
            ref={trackRef}
            className="portfolio-track"
            style={{ transform: `translateX(-${currentTrackIndex * 100}%)` }}
          >
            {extendedPages.map((pageItems, pageIdx) => {
              // реальный номер страницы (без клонов)
              const realPage = ((pageIdx - 1 + totalPages) % totalPages + totalPages) % totalPages;
              const pageStartBase = (realPage * itemsPerPage) % totalItems;

              return (
                <div className="portfolio-page" key={`page-${pageIdx}`}>
                  <div className="portfolio-grid">
                    {pageItems.map((item, indexOnPage) => {
                      const absIndex = (pageStartBase + indexOnPage) % totalItems;
                      const title = t(`portfolio.${item.id}.title`);
                      const description = t(`portfolio.${item.id}.description`);
                      return (
                        <div
                          key={`${item.id}-${indexOnPage}-${pageIdx}`}
                          ref={(el) => (cardRefs.current[absIndex] = el)}
                          data-absindex={absIndex}
                          className={`portfolio-card ${visibleCards.includes(absIndex) ? 'visible' : ''}`}
                          onClick={() => handleCardClick(indexOnPage)}
                        >
                          <div className="portfolio-image-wrapper">
                            <img
                              src={(item.gallery && item.gallery[0]) || item.image}
                              alt={title}
                              className="portfolio-image"
                              loading={pageIdx === 1 ? "eager" : "lazy"}
                              decoding="async"
                              fetchpriority={pageIdx === 1 ? "high" : "low"}
                            />
                            <div className="portfolio-overlay">
                              <h3 className="portfolio-item-title">{title}</h3>
                              <p className="portfolio-description">
                                {description.substring(0, 100)}...
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pagination-dots" aria-label="Portfolio pagination">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              className={`dot ${i === currentPage ? 'active' : ''}`}
              onClick={() => {
                if (i === currentPage || isTransitioning) return;
                const diff = i - currentPage;
                setIsTransitioning(true);
                setCurrentTrackIndex((idx) => idx + diff);
              }}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Модалка */}
      {selectedItemIndex !== null && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <button className="modal-nav modal-prev" onClick={showPrev} aria-label="Previous">‹</button>
            <button className="modal-nav modal-next" onClick={showNext} aria-label="Next">›</button>

            <div className="modal-image">
              <img
                src={
                  (allPortfolioItems[selectedItemIndex].gallery ||
                    [allPortfolioItems[selectedItemIndex].image])[selectedPhotoIndex]
                }
                alt={t(`portfolio.${allPortfolioItems[selectedItemIndex].id}.title`)}
                loading="eager"
                decoding="sync"
              />
            </div>

            <div className="modal-info">
              <h2 className="modal-title">
                {t(`portfolio.${allPortfolioItems[selectedItemIndex].id}.title`)}
              </h2>
              <p className="modal-client">
                {t('portfolio.modal.client_label')} {t(`portfolio.${allPortfolioItems[selectedItemIndex].id}.client`)}
              </p>
              <p className="modal-year">
                {t('portfolio.modal.year_label')} {t(`portfolio.${allPortfolioItems[selectedItemIndex].id}.year`)}
              </p>
              <div className="modal-services">
                {[1, 2, 3].map((idx) => (
                  <span key={idx} className="service-tag">
                    {t(`portfolio.${allPortfolioItems[selectedItemIndex].id}.service${idx}`)}
                  </span>
                ))}
              </div>
              <p className="modal-description">
                {t(`portfolio.${allPortfolioItems[selectedItemIndex].id}.description`)}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
