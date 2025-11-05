import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendToTelegram } from '../../services/telegramService';
import SuccessNotification from '../SuccessNotification/SuccessNotification';
import './Pricing.css';

const Pricing = () => {
  const { t } = useLanguage();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '+373',
    email: '',
    message: ''
  });


  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPlan(null);
    setIsSubmitting(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
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

    if (isSubmitting) return; // Предотвращаем повторную отправку

    setIsSubmitting(true);

    const telegramData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || '-',
      message: formData.message || '-',
      source: `Форма тарифа "${selectedPlan.name}"`,
      plan: `${selectedPlan.name} - €${selectedPlan.price}/${selectedPlan.period}`
    };

    const result = await sendToTelegram(telegramData);

    if (result.success) {
      handleCloseModal();
      setShowSuccess(true);
    } else {
      alert(t('pricing.modal.error_message'));
      setIsSubmitting(false);
    }
  };

  const pricingPlans = [
    {
      id: 'starter',
      name: t('pricing.starter.name'),
      price: '600',
      period: t('pricing.period'),
      description: t('pricing.starter.description'),
      features: [
        t('pricing.starter.feature1'),
        t('pricing.starter.feature2'),
        t('pricing.starter.feature3'),
        t('pricing.starter.feature4'),
        t('pricing.starter.feature5')
      ],
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      popular: false
    },
    {
      id: 'professional',
      name: t('pricing.professional.name'),
      price: '800',
      period: t('pricing.period'),
      description: t('pricing.professional.description'),
      features: [
        t('pricing.professional.feature1'),
        t('pricing.professional.feature2'),
        t('pricing.professional.feature3'),
        t('pricing.professional.feature4'),
        t('pricing.professional.feature5'),
        t('pricing.professional.feature6')
      ],
      color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      popular: true
    },
    {
      id: 'premium',
      name: t('pricing.premium.name'),
      price: '1200',
      period: t('pricing.period'),
      description: t('pricing.premium.description'),
      features: [
        t('pricing.premium.feature1'),
        t('pricing.premium.feature2'),
        t('pricing.premium.feature3'),
        t('pricing.premium.feature4'),
        t('pricing.premium.feature5'),
        t('pricing.premium.feature6'),
        t('pricing.premium.feature7')
      ],
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      popular: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="pricing-container">
        <div className="pricing-header">
          <h2 className="pricing-title">{t('pricing.title')}</h2>
          <p className="pricing-subtitle">{t('pricing.subtitle')}</p>
        </div>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''} ${hoveredCard === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ '--card-delay': `${index * 0.1}s`, '--card-color': plan.color }}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <span>{t('pricing.popular_badge')}</span>
                </div>
              )}

              <div className="pricing-card-header">
                <div className="pricing-icon-wrapper">
                  <div className="pricing-icon" style={{ background: plan.color }}>
                    <span className="icon-glow"></span>
                  </div>
                </div>
                <h3 className="pricing-plan-name">{plan.name}</h3>
                <p className="pricing-plan-description">{plan.description}</p>
              </div>

              <div className="pricing-price-wrapper">
                <div className="pricing-price">
                  <span className="currency">€</span>
                  <span className="amount">{plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>

              <ul className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="pricing-feature">
                    <svg className="feature-icon" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className="pricing-button"
                style={{ background: plan.color }}
                onClick={() => handleOpenModal(plan)}
              >
                <span>{t('pricing.button_text')}</span>
                <svg className="button-arrow" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Form */}
      {showModal && selectedPlan && (
        <div className="pricing-modal-overlay" onClick={handleCloseModal}>
          <div className="pricing-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pricing-modal-close" onClick={handleCloseModal}>×</button>
            <h2 className="pricing-modal-title">
              {t('pricing.modal.title')} "{selectedPlan.name}"
            </h2>
            <p className="pricing-modal-price">
              €{selectedPlan.price}/{selectedPlan.period}
            </p>
            <form className="pricing-modal-form" onSubmit={handleSubmit}>
              <div className="pricing-modal-form-group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('pricing.modal.name_placeholder')}
                  required
                />
              </div>
              <div className="pricing-modal-form-group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder={t('pricing.modal.phone_placeholder')}
                  maxLength={12}
                  pattern="^\+373(60|61|65|67|68|69|78|79)\d{6}$"
                  title="+373 и 8 цифр, начиная с 60,61,65,67,68,69,78,79"
                  required
                />

              </div>
              <div className="pricing-modal-form-group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t('pricing.modal.email_placeholder')}
                />
              </div>
              <div className="pricing-modal-form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('pricing.modal.message_placeholder')}
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" className="pricing-modal-submit" disabled={isSubmitting}>
                {isSubmitting ? t('pricing.modal.sending_button') : t('pricing.modal.submit_button')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showSuccess && (
        <SuccessNotification
          message={t('pricing.modal.success_message')}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </section>
  );
};

export default Pricing;
