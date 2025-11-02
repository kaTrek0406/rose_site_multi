import { useState, useEffect } from 'react';
import './Hero.css';
import roseLogo from '../../assets/logo/rose-logo.png';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showModal, setShowModal] = useState(false);
  const [hasShownModal, setHasShownModal] = useState(false);

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
        <h2 className="hero-title">МЫ САМЫЕ СКРОМНЫЕ</h2>
        <p className="hero-subtitle">
          Создаём всё, от логотипов до масштабных<br />
          рекламных кампаний
        </p>
        <button className="hero-cta" onClick={scrollToPortfolio}>Начать проект</button>
        <div className="scroll-indicator">
          <span className="scroll-arrow">▼</span>
        </div>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2 className="modal-title">Начнем ваш проект?</h2>
            <p className="modal-subtitle">Оставьте заявку и мы свяжемся с вами в течение 24 часов</p>
            <form className="modal-form">
              <div className="modal-form-group">
                <input type="text" placeholder="Ваше имя" required />
              </div>
              <div className="modal-form-group">
                <input type="tel" placeholder="Телефон" required />
              </div>
              <div className="modal-form-group">
                <input type="email" placeholder="Email" required />
              </div>
              <div className="modal-form-group">
                <textarea placeholder="Расскажите о вашем проекте" rows="4"></textarea>
              </div>
              <button type="submit" className="modal-submit">Отправить заявку</button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
