import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendToTelegram } from '../../services/telegramService';
import SuccessNotification from '../SuccessNotification/SuccessNotification';
import './Hero.css';
import roseLogo from '../../assets/logo/rose-logo.png';

const enableDepth = true; // ← поставь false, чтобы полностью отключить 3D-эффект

const Hero = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [modalShowCount, setModalShowCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
  name: '',
  phone: '+373',
  service: ''
});


  // фикс: частицы считаем один раз
  const particles = useMemo(() =>
    Array.from({ length: 15 }, () => ({
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      dur: `${10 + Math.random() * 20}s`,
    })), []
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3D эффект глубины при скролле (мягче)
  useEffect(() => {
    if (!enableDepth) return;
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Логика показа модального окна: 30с и 1:20 после первого взаимодействия
  useEffect(() => {
    let firstTimeout = null;
    let secondTimeout = null;
    let hasInteracted = false;

    const handleUserInteraction = () => {
      if (hasInteracted) return;
      hasInteracted = true;

      firstTimeout = setTimeout(() => {
        if (modalShowCount === 0) {
          setShowModal(true);
          setModalShowCount(1);
        }
      }, 30000);

      secondTimeout = setTimeout(() => {
        if (modalShowCount === 1) {
          setShowModal(true);
          setModalShowCount(2);
        }
      }, 80000);
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('scroll', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      if (firstTimeout) clearTimeout(firstTimeout);
      if (secondTimeout) clearTimeout(secondTimeout);
    };
  }, [modalShowCount]);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) portfolioSection.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth' });
  };

  const closeModal = () => {
    setShowModal(false);
    setIsSubmitting(false);
    setFormData({ name: '', phone: '', service: '' });
  };

  const allowedPrefixes = ['60', '61', '62', '65', '67', '68', '69', '78', '79'];

const handleInputChange = (e) => {
  const { name, value } = e.target;

  if (name === 'phone') {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('373')) cleaned = cleaned.slice(3);
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);

    const prefix = cleaned.slice(0, 2);
    if (cleaned.length >= 2 && !allowedPrefixes.includes(prefix)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      phone: '+373' + cleaned
    }));
  } else {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const showTime = modalShowCount === 1 ? '30 секунд' : '1 минута 20 секунд';
    const telegramData = {
      name: formData.name,
      phone: formData.phone,
      email: '-',
      message: formData.service ? `Интересующая услуга: ${formData.service}` : '-',
      source: `Всплывающая форма (${showTime} после взаимодействия)`,
      plan: null
    };

    const result = await sendToTelegram(telegramData);
    if (result.success) {
      closeModal();
      setShowSuccess(true);
    } else {
      alert(t('hero.modal.error_message'));
      setIsSubmitting(false);
    }
  };

  // Мягкие коэффициенты 3D
  const rotate = enableDepth ? Math.min(scrollProgress * 8, 8) : 0;
  const scale  = enableDepth ? Math.max(1 - scrollProgress * 0.08, 0.92) : 1;
  const fade   = enableDepth ? Math.max(1 - scrollProgress * 0.4, 0.6) : 1;

  return (
    <section
      className="hero"
      id="home"
      style={{
        transform: enableDepth ? `perspective(1000px) rotateX(${rotate}deg) scale(${scale})` : 'none',
        opacity: fade,
        transformOrigin: 'center top',
        willChange: enableDepth ? 'transform, opacity' : 'auto'
      }}
    >
      {/* Animated background gradient */}
      <div
        className="hero-gradient-bg"
        style={{
          transform: enableDepth ? `translateZ(-200px) scale(${1 + scrollProgress * 0.15})` : 'none',
          opacity: enableDepth ? 1 - scrollProgress * 0.3 : 1,
          willChange: enableDepth ? 'transform, opacity' : 'auto'
        }}
      />

      {/* Floating particles */}
      <div
        className="particles"
        style={{
          transform: enableDepth ? `translateZ(-100px) translateY(${scrollProgress * 120}px)` : 'none',
          opacity: enableDepth ? 1 - scrollProgress * 0.7 : 1,
          willChange: enableDepth ? 'transform, opacity' : 'auto'
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}
          />
        ))}
      </div>

      <div
        className="hero-content"
        style={{
          transform: enableDepth
            ? `translate(${mousePosition.x}px, ${mousePosition.y}px) translateZ(${scrollProgress * -220}px) scale(${Math.max(1 - scrollProgress * 0.06, 0.94)})`
            : `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          opacity: enableDepth ? Math.max(1 - scrollProgress * 0.5, 0.7) : 1,
          willChange: enableDepth ? 'transform, opacity' : 'auto'
        }}
      >
        <div className="hero-logo">
          <img src={roseLogo} alt="ROSÉ Logo" className="hero-logo-image" />
        </div>
        <h2 className="hero-title">{t('hero.title')}</h2>
        <p className="hero-subtitle">
          {t('hero.subtitle').split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </p>
        <button className="hero-cta" onClick={scrollToPortfolio}>{t('hero.cta_button')}</button>
      </div>

      <div className="scroll-indicator" onClick={scrollToServices}>
        <span className="scroll-arrow">▼</span>
      </div>

      {/* Modal Form через портал — больше не «съезжает» */}
      {showModal && createPortal(
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2 className="modal-title">{t('hero.modal.title')}</h2>
            <p className="modal-subtitle">{t('hero.modal.subtitle')}</p>
            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('hero.modal.name_placeholder')}
                  required
                />
              </div>
              <div className="modal-form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('hero.modal.phone_placeholder')}
                  maxLength={12}
                  pattern="^\+373(60|61|65|67|68|69|78|79)\d{6}$"
                  title="+373 и 8 цифр, начиная с 60,61,65,67,68,69,78,79"
                  required
                />

              </div>
              <div className="modal-form-group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="modal-select"
                >
                  <option value="">{t('hero.modal.service_placeholder')}</option>
                  <option value={t('services.smm.title')}>{t('services.smm.title')}</option>
                  <option value={t('services.design.title')}>{t('services.design.title')}</option>
                  <option value={t('services.photo.title')}>{t('services.photo.title')}</option>
                  <option value={t('services.target.title')}>{t('services.target.title')}</option>
                  <option value={t('services.video.title')}>{t('services.video.title')}</option>
                  <option value={t('services.illustration.title')}>{t('services.illustration.title')}</option>
                </select>
              </div>
              <button type="submit" className="modal-submit" disabled={isSubmitting}>
                {isSubmitting ? t('hero.modal.sending_button') : t('hero.modal.submit_button')}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}

      {showSuccess && (
        <SuccessNotification
          message={t('hero.modal.success_message')}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </section>
  );
};

export default Hero;
