import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendToTelegram } from '../../services/telegramService';
import SuccessNotification from '../SuccessNotification/SuccessNotification';
import './Hero.css';
import roseLogo from '../../assets/logo/rose-logo.png';

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
    phone: '',
    service: ''
  });

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

  // 3D эффект глубины при скролле
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      const progress = Math.min(scrollPosition / heroHeight, 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Новая логика показа модального окна: 1 раз через 30 сек, 2 раз через 1 мин 20 сек
  useEffect(() => {
    let firstTimeout = null;
    let secondTimeout = null;
    let hasInteracted = false;

    const handleUserInteraction = () => {
      if (hasInteracted) return;
      hasInteracted = true;

      // Первое появление через 30 секунд
      firstTimeout = setTimeout(() => {
        if (modalShowCount === 0) {
          setShowModal(true);
          setModalShowCount(1);
        }
      }, 30000); // 30 секунд

      // Второе появление через 1 минуту 20 секунд
      secondTimeout = setTimeout(() => {
        if (modalShowCount === 1) {
          setShowModal(true);
          setModalShowCount(2);
        }
      }, 80000); // 1 минута 20 секунд (80 секунд)
    };

    // Слушаем первый клик или скролл
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
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsSubmitting(false);
    setFormData({
      name: '',
      phone: '',
      service: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Предотвращаем повторную отправку

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

  return (
    <section
      className="hero"
      id="home"
      style={{
        transform: `perspective(1000px) rotateX(${scrollProgress * 15}deg) scale(${1 - scrollProgress * 0.3})`,
        opacity: 1 - scrollProgress * 0.7,
        transformOrigin: 'center top'
      }}
    >
      {/* Animated background gradient */}
      <div
        className="hero-gradient-bg"
        style={{
          transform: `translateZ(-200px) scale(${1 + scrollProgress * 0.3})`,
          opacity: 1 - scrollProgress * 0.5
        }}
      ></div>

      {/* Floating particles */}
      <div
        className="particles"
        style={{
          transform: `translateZ(-100px) translateY(${scrollProgress * 200}px)`,
          opacity: 1 - scrollProgress
        }}
      >
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 20}s`
          }}></div>
        ))}
      </div>

      <div
        className="hero-content"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) translateZ(${scrollProgress * -300}px) scale(${1 - scrollProgress * 0.2})`,
          opacity: 1 - scrollProgress * 0.8
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

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
        </div>
      )}

      {/* Success Notification */}
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
