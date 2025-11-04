import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Loader.css';

const Loader = ({ onLoadingComplete }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const services = [
    t('services.smm.title'),
    t('services.design.title'),
    t('services.photo.title'),
    t('services.target.title'),
    t('services.video.title'),
    t('services.illustration.title')
  ];

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        // Start exit animation at 85%
        if (prev >= 85 && !isExiting) {
          setIsExiting(true);
        }

        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 1000); // Wait for exit animation
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete, isExiting]);

  return (
    <div className={`loader-container ${isExiting ? 'loader-exit' : ''}`}>
      <div className="loader-content">
        {/* Main logo circle */}
        <div className="loader-logo">
          <div className="loader-logo-inner">
            <span className="loader-logo-text">{t('loader.logo')}</span>
          </div>

          {/* Small dots around logo */}
          <div className="loader-dots-ring">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="loader-small-dot"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-100px)`,
                  animationDelay: `${i * 0.08}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="loader-progress">
          <div className="loader-bar-container">
            <div
              className="loader-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="loader-percentage">{Math.round(progress)}%</span>
        </div>

        {/* Services in semicircle arc at top */}
        <div className="loader-services-orbit">
          {services.map((service, index) => {
            // Spread services across 180 degrees arc at the top (-90° to 90°)
            const angle = -90 + (index * 36); // 6 services: -90, -54, -18, 18, 54, 90
            return (
              <div
                key={index}
                className="loader-service-item"
                style={{
                  '--rotation': `${angle}deg`,
                  '--appear-delay': `${0.3 + index * 0.08}s`
                }}
              >
                <div className="loader-service-bubble">
                  <span>{service}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated background */}
      <div className="loader-bg-gradient"></div>
    </div>
  );
};

export default Loader;
