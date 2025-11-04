import { useEffect } from 'react';
import './SuccessNotification.css';

const SuccessNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Автоматически закрывается через 3 секунды

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-notification-overlay">
      <div className="success-notification">
        <div className="success-icon">
          <svg viewBox="0 0 52 52" className="checkmark">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
        </div>
        <h3 className="success-title">{message}</h3>
        <button className="success-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default SuccessNotification;
