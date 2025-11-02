import { useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import './Loader.css';

const Loader = ({ onLoadingComplete }) => {
  const { t } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExiting(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 800); // Wait for exit animation
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className={`loader-container ${isExiting ? 'loader-exit' : ''}`}>
      <div className="loader-content">
        {/* Animated logo particles */}
        <div className="loader-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="loader-particle"
              style={{
                left: `${50 + Math.cos(i * 18 * Math.PI / 180) * 40}%`,
                top: `${50 + Math.sin(i * 18 * Math.PI / 180) * 40}%`,
                animationDelay: `${i * 0.1}s`
              }}
            ></div>
          ))}
        </div>

        {/* Main logo circle */}
        <div className="loader-logo">
          <div className="loader-logo-inner">
            <span className="loader-logo-text">{t('loader.logo')}</span>
          </div>
          <svg className="loader-circle" viewBox="0 0 100 100">
            <circle
              className="loader-circle-bg"
              cx="50"
              cy="50"
              r="45"
            />
            <circle
              className="loader-circle-progress"
              cx="50"
              cy="50"
              r="45"
              style={{
                strokeDashoffset: 283 - (283 * progress) / 100
              }}
            />
          </svg>
        </div>

        {/* Progress percentage */}
        <div className="loader-progress">
          <span className="loader-percentage">{Math.round(progress)}%</span>
          <div className="loader-bar-container">
            <div
              className="loader-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="loader-text">
          <span className="loader-text-word">{t('loader.text')}</span>
          <span className="loader-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      </div>

      {/* Animated background */}
      <div className="loader-bg-gradient"></div>
    </div>
  );
};

export default Loader;
