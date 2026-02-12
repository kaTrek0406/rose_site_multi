import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { trackEvent } from '../../utils/tracking';
import { FaInstagram } from 'react-icons/fa';
import { getAssetPath } from '../../utils/assets';
import portfolioData from '../../data/portfolioData.json';
import './Portfolio.css';

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
  const allPortfolioItems = useMemo(() =>
    portfolioData.portfolioItems.map(item => ({
      id: item.id,
      image: getAssetPath(item.mainImage),
      gallery: item.gallery ? item.gallery.map(getAssetPath) : [],
      instagram: item.instagram
    }))
    , []);

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
  const modalTouchStartRef = useRef(null);
  const hasTrackedView = useRef(false);

  // ====== TRACK VIEWCONTENT ======
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            trackEvent('ViewContent', {
              content_name: 'Portfolio Section',
              content_category: 'portfolio',
              content_type: 'section'
            });
            hasTrackedView.current = true;
          }
        });
      },
      { threshold: 0.5 }
    );

    const section = document.getElementById('portfolio');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

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
            if (!isNaN(idx)) {
              setVisibleCards((prev) => {
                if (prev.includes(idx)) return prev;
                return [...prev, idx];
              });
            }
          }
        });
      },
      {
        root: null,  // наблюдаем относительно viewport окна для стабильности
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const nodes = cardRefs.current.filter(Boolean);
    nodes.forEach((node) => io.observe(node));

    return () => {
      nodes.forEach((node) => io.unobserve(node));
      io.disconnect();
    };
  }, [extendedPages.length]);

  // ====== Сразу подсветить текущую (стартовую) страницу ======
  useEffect(() => {
    if (totalItems === 0) return;
    const start = (currentPage * itemsPerPage) % totalItems;
    const firstPageIdxs = Array.from({ length: Math.min(itemsPerPage, totalItems) }, (_, i) => (start + i) % totalItems);
    setVisibleCards((prev) => {
      const combined = [...prev, ...firstPageIdxs];
      return Array.from(new Set(combined));
    });
  }, [itemsPerPage, totalItems]);

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

  const showPrev = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (selectedItemIndex === null) return;
    const gallery = allPortfolioItems[selectedItemIndex].gallery || [];
    if (gallery.length === 0) return;
    setSelectedPhotoIndex((p) => (p - 1 + gallery.length) % gallery.length);
  }, [selectedItemIndex, allPortfolioItems]);

  const showNext = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (selectedItemIndex === null) return;
    const gallery = allPortfolioItems[selectedItemIndex].gallery || [];
    if (gallery.length === 0) return;
    setSelectedPhotoIndex((p) => (p + 1) % gallery.length);
  }, [selectedItemIndex, allPortfolioItems]);

  useEffect(() => {
    if (selectedItemIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        return;
      }
      if (selectedItemIndex === null) return;
      const gallery = allPortfolioItems[selectedItemIndex].gallery || [];
      if (e.key === 'ArrowLeft') {
        setSelectedPhotoIndex((p) => (p - 1 + gallery.length) % gallery.length);
      } else if (e.key === 'ArrowRight') {
        setSelectedPhotoIndex((p) => (p + 1) % gallery.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItemIndex, allPortfolioItems]);

  // Обработчики свайпов для модалки
  const handleModalTouchStart = (e) => {
    modalTouchStartRef.current = e.touches[0].clientX;
  };

  const handleModalTouchEnd = (e) => {
    if (modalTouchStartRef.current === null || selectedItemIndex === null) return;
    const delta = e.changedTouches[0].clientX - modalTouchStartRef.current;
    const threshold = 50;
    if (delta > threshold) {
      showPrev(e);
    } else if (delta < -threshold) {
      showNext(e);
    }
    modalTouchStartRef.current = null;
  };

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
                          style={{
                            willChange: visibleCards.includes(absIndex) ? 'auto' : 'opacity, transform',
                            animationDelay: `${indexOnPage * 0.1}s`
                          }}
                          onClick={(e) => {
                            // Ripple эффект
                            const card = e.currentTarget;
                            card.classList.add('ripple');
                            setTimeout(() => card.classList.remove('ripple'), 600);
                            handleCardClick(indexOnPage);
                          }}
                          onMouseMove={(e) => {
                            const card = e.currentTarget;
                            const rect = card.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            const centerX = rect.width / 2;
                            const centerY = rect.height / 2;
                            const rotateX = ((y - centerY) / centerY) * -10;
                            const rotateY = ((x - centerX) / centerX) * 10;
                            card.style.transform = `translate(12px, -12px) scale(1.05) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                          }}
                          onMouseLeave={(e) => {
                            const card = e.currentTarget;
                            card.style.transform = '';
                          }}
                        >
                          <div className="portfolio-image-wrapper">
                            <img
                              src={(item.gallery && item.gallery[0]) || item.image}
                              alt={title}
                              className="portfolio-image"
                              loading={pageIdx === 1 && indexOnPage < 4 ? "eager" : "lazy"}
                              decoding="async"
                              fetchpriority={pageIdx === 1 && indexOnPage < 2 ? "high" : "auto"}
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

            <div
              className="modal-image"
              onTouchStart={handleModalTouchStart}
              onTouchEnd={handleModalTouchEnd}
            >
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
              <div className="modal-title-row">
                <h2 className="modal-title">
                  {t(`portfolio.${allPortfolioItems[selectedItemIndex].id}.title`)}
                </h2>
                {allPortfolioItems[selectedItemIndex].instagram && (
                  <a
                    href={allPortfolioItems[selectedItemIndex].instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-instagram-btn"
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Instagram"
                  >
                    <FaInstagram className="modal-instagram-icon" />
                  </a>
                )}
              </div>
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
