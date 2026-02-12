import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendToTelegram } from '../../services/telegramService';
import { FaCheck, FaStar } from 'react-icons/fa';
import SuccessNotification from '../../components/SuccessNotification/SuccessNotification';
import './PricingPage.css';

const plans = [
  {
    nameKey: 'pricing.starter.name',
    price: '600',
    descKey: 'pricing.starter.description',
    features: [
      'pricing.starter.feature1',
      'pricing.starter.feature2',
      'pricing.starter.feature3',
      'pricing.starter.feature4',
      'pricing.starter.feature5',
    ],
    popular: false,
  },
  {
    nameKey: 'pricing.professional.name',
    price: '850',
    descKey: 'pricing.professional.description',
    features: [
      'pricing.professional.feature1',
      'pricing.professional.feature2',
      'pricing.professional.feature3',
    ],
    popular: true,
  },
  {
    nameKey: 'pricing.premium.name',
    price: '1200',
    descKey: 'pricing.premium.description',
    features: [
      'pricing.premium.feature1',
      'pricing.premium.feature2',
      'pricing.premium.feature3',
      'pricing.premium.feature4',
      'pricing.premium.feature5',
    ],
    popular: false,
  },
];

const PricingPage = () => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '+373', email: '', message: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.price-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      let cleaned = value.replace(/\D/g, '');
      if (cleaned.startsWith('373')) cleaned = cleaned.slice(3);
      if (cleaned.length > 8) cleaned = cleaned.slice(0, 8);
      setFormData({ ...formData, phone: '+373' + cleaned });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const result = await sendToTelegram({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      source: 'Страница тарифов',
      plan: selectedPlan ? t(selectedPlan.nameKey) + ' (' + selectedPlan.price + '€)' : null,
    });

    if (result.success) {
      setFormData({ name: '', phone: '+373', email: '', message: '' });
      setSelectedPlan(null);
      setShowSuccess(true);
    } else {
      alert(t('pricing.modal.error_message'));
    }
    setIsSubmitting(false);
  };

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-hero-content price-animate">
          <span className="pricing-badge">ТАРИФЫ</span>
          <h1 className="pricing-hero-title">Прозрачные <span className="text-pink">цены</span></h1>
          <p className="pricing-hero-subtitle">
            {t('pricing.subtitle')}
          </p>
        </div>
      </section>

      <section className="pricing-cards">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`pricing-card price-animate ${plan.popular ? 'pricing-card-popular' : ''}`}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {plan.popular && <span className="popular-badge"><FaStar /> {t('pricing.popular_badge')}</span>}
            <h3>{t(plan.nameKey)}</h3>
            <p className="pricing-desc">{t(plan.descKey)}</p>
            <div className="pricing-price">
              <span className="price-amount">{plan.price}</span>
              <span className="price-currency">€</span>
              <span className="price-period">/ {t('pricing.period')}</span>
            </div>
            <ul className="pricing-features">
              {plan.features.map((f, j) => (
                <li key={j}><FaCheck className="pricing-check" /> {t(f)}</li>
              ))}
            </ul>
            <button
              className={`pricing-btn ${plan.popular ? 'pricing-btn-popular' : ''}`}
              onClick={() => setSelectedPlan(plan)}
            >
              {t('pricing.button_text')}
            </button>
          </div>
        ))}
      </section>

      <p className="pricing-note price-animate">{t('pricing.note')}</p>

      {selectedPlan && (
        <div className="pricing-modal-overlay" onClick={() => setSelectedPlan(null)}>
          <div className="pricing-modal" onClick={e => e.stopPropagation()}>
            <button className="pricing-modal-close" onClick={() => setSelectedPlan(null)}>&times;</button>
            <h2>{t('pricing.modal.title')}: {t(selectedPlan.nameKey)} ({selectedPlan.price}€)</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder={t('pricing.modal.name_placeholder')} value={formData.name} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder={t('pricing.modal.phone_placeholder')} value={formData.phone} onChange={handleChange} required />
              <input type="email" name="email" placeholder={t('pricing.modal.email_placeholder')} value={formData.email} onChange={handleChange} />
              <textarea name="message" placeholder={t('pricing.modal.message_placeholder')} value={formData.message} onChange={handleChange} rows="3"></textarea>
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? t('pricing.modal.sending_button') : t('pricing.modal.submit_button')}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="pricing-comparison price-animate">
        <h2 className="section-title">Сравнение тарифов</h2>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Услуга</th>
                <th>Стартовый</th>
                <th className="highlight-col">Профессиональный</th>
                <th>Премиум</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Анализ бизнеса</td><td><FaCheck className="table-check" /></td><td className="highlight-col"><FaCheck className="table-check" /></td><td><FaCheck className="table-check" /></td></tr>
              <tr><td>Контент-план (постов)</td><td>9</td><td className="highlight-col">12</td><td>20+</td></tr>
              <tr><td>Фото/Видеосъёмка</td><td>1 час</td><td className="highlight-col">3 часа</td><td>6+ часов</td></tr>
              <tr><td>Reels/видео</td><td>-</td><td className="highlight-col">2-3 шт.</td><td>5+ шт.</td></tr>
              <tr><td>Stories</td><td>-</td><td className="highlight-col">-</td><td>20 слайдов</td></tr>
              <tr><td>Дизайн макеты</td><td>-</td><td className="highlight-col">-</td><td><FaCheck className="table-check" /></td></tr>
              <tr><td>Стратегия таргета</td><td>-</td><td className="highlight-col">-</td><td><FaCheck className="table-check" /></td></tr>
              <tr><td>Отчётность</td><td><FaCheck className="table-check" /></td><td className="highlight-col"><FaCheck className="table-check" /></td><td><FaCheck className="table-check" /></td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="pricing-faq price-animate">
        <h2 className="section-title">Вопросы о ценах</h2>
        <div className="pricing-faq-grid">
          <div className="pricing-faq-item">
            <h3>Можно ли настроить пакет индивидуально?</h3>
            <p>Да, мы можем подобрать набор услуг под ваши конкретные задачи и бюджет. Свяжитесь с нами для обсуждения.</p>
          </div>
          <div className="pricing-faq-item">
            <h3>Рекламный бюджет включён?</h3>
            <p>Нет, рекламный бюджет оплачивается отдельно напрямую платформам (Facebook, Instagram). Мы помогаем определить оптимальный бюджет.</p>
          </div>
          <div className="pricing-faq-item">
            <h3>Какой минимальный срок контракта?</h3>
            <p>Минимальный срок — 3 месяца. Для достижения лучших результатов рекомендуем сотрудничество от 6 месяцев.</p>
          </div>
          <div className="pricing-faq-item">
            <h3>Есть ли скидки?</h3>
            <p>Для долгосрочных клиентов (от 6 месяцев) и при оплате за несколько месяцев вперёд предусмотрены специальные условия.</p>
          </div>
        </div>
      </section>

      <section className="pricing-cta price-animate">
        <h2>Не уверены, какой тариф выбрать?</h2>
        <p>Мы поможем подобрать оптимальный вариант на бесплатной консультации</p>
        <Link to="/contact" className="btn-primary btn-lg">Получить консультацию</Link>
      </section>

      {showSuccess && (
        <SuccessNotification
          message={t('pricing.modal.success_message')}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default PricingPage;
