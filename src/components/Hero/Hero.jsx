import { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendToTelegram } from '../../services/telegramService';
import './Hero.css';
import roseLogo from '../../assets/logo/rose-logo.png';

const Hero = () => {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
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

  // Show modal once after user clicks and waits 2 minutes
  useEffect(() => {
    let modalTimeout = null;

    const handleUserClick = (e) => {
      // Don't trigger if already shown modal or if clicked submit button or close button
      if (hasShownModal) return;
      if (e.target.closest('.modal-submit') || e.target.closest('.modal-close') || e.target.closest('.modal-overlay')) return;

      // Clear any existing timeout
      if (modalTimeout) {
        clearTimeout(modalTimeout);
      }

      // Set new timeout for 2 minutes (120 seconds)
      modalTimeout = setTimeout(() => {
        setShowModal(true);
        setHasShownModal(true);
      }, 120000); // 2 minutes in milliseconds
    };

    // Add click listener to document
    document.addEventListener('click', handleUserClick);

    return () => {
      document.removeEventListener('click', handleUserClick);
      if (modalTimeout) {
        clearTimeout(modalTimeout);
      }
    };
  }, [hasShownModal]);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
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

    const telegramData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || '-',
      message: formData.message || '-',
      source: 'Всплывающая форма (через 2 минуты после клика)',
      plan: null
    };

    const result = await sendToTelegram(telegramData);

    if (result.success) {
      alert(t('hero.modal.success_message'));
      closeModal();
    } else {
      alert(t('hero.modal.error_message'));
    }
  };

  return (
    <section className="hero" id="home">
      {/* Animated background gradient */}
      <div className="hero-gradient-bg"></div>

      {/* Floating particles */}
      <div className="particles">
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
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
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
        <div className="scroll-indicator">
          <span className="scroll-arrow">▼</span>
        </div>
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
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('hero.modal.email_placeholder')}
                />
              </div>
              <div className="modal-form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('hero.modal.message_placeholder')}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="modal-submit">{t('hero.modal.submit_button')}</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
