import { useLayoutEffect, useRef, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '20%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  rotationAmount = 0,
  // blurAmount пока не используем
  useWindowScroll = false,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const contentRef = useRef(null);        // .scroll-stack-inner
  const lenisRef = useRef(null);
  const lenisScrollRef = useRef(0);       // ВИРТУАЛЬНЫЙ scroll Lenis (wrapper-режим)

  const cardsRef = useRef([]);
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);
  const isUpdatingRef = useRef(false);
  const animationFrameRef = useRef(null);
  const rafIdRef = useRef(null);

  const calculateProgress = useCallback((scrollTop, start, end) => {
    if (end <= start) return 0;
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value, containerHeight) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }, []);

  // Читаем корректный scrollTop и высоту контейнера
  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY || document.documentElement.scrollTop || 0,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        // КРИТИЧНО: в Lenis-режиме берём виртуальный скролл
        scrollTop: lenisScrollRef.current || 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
        scrollContainer: scroller
      };
    }
  }, [useWindowScroll]);

  // Смещение элемента в системе ТЕКУЩЕГО скроллера:
  // - window: rect.top + scrollY
  // - wrapper+Lenis: расстояние от верха content (.scroll-stack-inner), который крутит Lenis
  const getElementOffset = useCallback((el) => {
    if (useWindowScroll) {
      const rect = el.getBoundingClientRect();
      const pageY = window.scrollY || document.documentElement.scrollTop || 0;
      return rect.top + pageY;
    } else {
      const contentEl = contentRef.current;
      if (!contentEl) return 0;
      let y = 0;
      let node = el;
      // Суммируем offsetTop до контента
      while (node && node !== contentEl) {
        y += node.offsetTop || 0;
        node = node.offsetParent;
      }
      return y; // координата в системе контента, которая сопоставляется с lenisScrollRef
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);

    const endElement = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scrollerRef.current?.querySelector('.scroll-stack-end');

    // если end нет — делаем "бесконечный" хвост, чтобы не зажать пин
    const endElementTop = endElement ? getElementOffset(endElement) : Number.POSITIVE_INFINITY;

    cardsRef.current.forEach((card, i) => {
      const cardTop = getElementOffset(card);

      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd   = cardTop - scaleEndPositionPx;

      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd   = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);

      const rotation = rotationAmount ? (i * rotationAmount * scaleProgress) : 0;

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      } // ниже pinStart — 0

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1;

      if (hasChanged) {
        card.style.transform =
          `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        lastTransformsRef.current.set(i, newTransform);
      }

      // коллбек завершения — по последней карточке в пине
      if (i === cardsRef.current.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    rotationAmount,
    useWindowScroll,
    onStackComplete,
    calculateProgress,
    parsePercentage,
    getScrollData,
    getElementOffset
  ]);

  const handleScroll = useCallback(() => {
    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        updateCardTransforms();
        rafIdRef.current = null;
      });
    }
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    if (useWindowScroll) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      updateCardTransforms();
      return;
    } else {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const lenis = new Lenis({
        wrapper: scroller,
        content: scroller.querySelector('.scroll-stack-inner'),
        duration: 1.1,
        easing: t => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        syncTouch: true,
      });

      // КРИТИЧНО: читаем виртуальный скролл Lenis
      lenis.on('scroll', (e) => {
        lenisScrollRef.current = e?.scroll || 0;
        handleScroll();
      });

      const raf = (time) => {
        lenis.raf(time);
        animationFrameRef.current = requestAnimationFrame(raf);
      };
      animationFrameRef.current = requestAnimationFrame(raf);

      lenisRef.current = lenis;
      updateCardTransforms();
      return lenis;
    }
  }, [handleScroll, updateCardTransforms, useWindowScroll]);

  // Старт/очистка
  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    contentRef.current = scroller.querySelector('.scroll-stack-inner');

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    cardsRef.current = cards;

    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      // Отступ только между карточками, у последней — 0
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      } else {
        card.style.marginBottom = '0px';
      }

      card.style.willChange = 'transform';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)'; // старт без дёрганий
    });

    setupLenis();

    return () => {
      if (useWindowScroll) {
        window.removeEventListener('scroll', handleScroll);
      }
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (lenisRef.current) lenisRef.current.destroy();
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);

      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
      lenisScrollRef.current = 0;
    };
  }, [itemDistance, useWindowScroll, setupLenis, handleScroll]);

  // Обновляем на ресайз (проценты завязаны на высоту контейнера)
  useEffect(() => {
    const onResize = () => updateCardTransforms();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
