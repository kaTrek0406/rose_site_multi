import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ScrollStack, { ScrollStackItem } from '../ScrollStack/ScrollStack';
import './Workflow.css';

const Workflow = () => {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return; // Не запускаем observer на десктопе

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            setVisibleCards((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px' } // Снижен порог и добавлен rootMargin
    );

    // Небольшая задержка для корректной работы observer
    const timer = setTimeout(() => {
      cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [isMobile]);

  const steps = [
    {
      number: '01',
      title: t('workflow.step1.title'),
      description: t('workflow.step1.description'),
      icon: '🎯',
      color: '#ec4899' // Розовый
    },
    {
      number: '02',
      title: t('workflow.step2.title'),
      description: t('workflow.step2.description'),
      icon: '💡',
      color: '#f5d20bff' // Желтый (изменено с фиолетового)
    },
    {
      number: '03',
      title: t('workflow.step3.title'),
      description: t('workflow.step3.description'),
      icon: '📸',
      color: '#1f69f1ff' // Розовый (изменено с синего)
    },
    {
      number: '04',
      title: t('workflow.step4.title'),
      description: t('workflow.step4.description'),
      icon: '✨',
      color: '#ec4899' // Розовый (оставлен)
    },
    {
      number: '05',
      title: t('workflow.step5.title'),
      description: t('workflow.step5.description'),
      icon: '🚀',
      color: '#f5d20bff' // Желтый (оставлен)
    }
  ];

  return (
    <section className="workflow" id="workflow">
      <div className="workflow-header">
        <h2 className="workflow-main-title">{t('workflow.main_title')}</h2>
        <p className="workflow-subtitle">{t('workflow.subtitle')}</p>
      </div>

      {isMobile ? (
        <div className="workflow-simple-container">
          {steps.map((step, index) => (
            <div
              key={step.number}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`workflow-simple-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              <div className="workflow-card-inner" style={{ borderColor: step.color }}>
                <div className="workflow-card-header">
                  <span className="workflow-icon">{step.icon}</span>
                  <span className="workflow-number" style={{ color: step.color }}>
                    {step.number}
                  </span>
                </div>
                <h3 className="workflow-step-title">{step.title}</h3>
                <p className="workflow-step-description">{step.description}</p>
                <div className="workflow-card-accent" style={{ background: step.color }}></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ScrollStack
          className="workflow-stack"
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={40}
          stackPosition="25%"
          scaleEndPosition="15%"
          baseScale={0.88}
          blurAmount={0}
          useWindowScroll={true}
        >
          {steps.map((step) => (
            <ScrollStackItem key={step.number} itemClassName="workflow-card">
              <div className="workflow-card-inner" style={{ borderColor: step.color }}>
                <div className="workflow-card-header">
                  <span className="workflow-icon">{step.icon}</span>
                  <span className="workflow-number" style={{ color: step.color }}>
                    {step.number}
                  </span>
                </div>
                <h3 className="workflow-step-title">{step.title}</h3>
                <p className="workflow-step-description">{step.description}</p>
                <div className="workflow-card-accent" style={{ background: step.color }}></div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      )}
    </section>
  );
};

export default Workflow;
