import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendToTelegram } from '../../services/telegramService';
import SuccessNotification from '../SuccessNotification/SuccessNotification';
import './ContactForm.css';

const ContactForm = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
  name: '',
  phone: '+373',
  email: '',
  message: ''
});


  const allowedPrefixes = ['60', '61', '62', '65', '67', '68', '69', '78', '79'];

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === 'phone') {
    let cleaned = value.replace(/\D/g, ''); // только цифры
    if (cleaned.startsWith('373')) cleaned = cleaned.slice(3); // убираем повторный ввод префикса
    if (cleaned.length > 8) cleaned = cleaned.slice(0, 8); // максимум 8 цифр

    const prefix = cleaned.slice(0, 2);
    if (cleaned.length >= 2 && !allowedPrefixes.includes(prefix)) {
      return; // если первые 2 цифры недопустимы, не обновляем поле
    }

    setFormData({ ...formData, phone: '+373' + cleaned });
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Предотвращаем повторную отправку

    setIsSubmitting(true);

    const telegramData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      source: 'Форма обратной связи (конец сайта)',
      plan: null
    };

    const result = await sendToTelegram(telegramData);

    if (result.success) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
      setShowSuccess(true);
    } else {
      alert(t('contact_form.error_message'));
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-form" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">{t('contact_form.title')}</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">{t('contact_form.name_label')}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('contact_form.phone_label')}</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={12} // +373 + 8 цифр = 12
                pattern="^\+373(60|61|62|65|67|68|69|78|79)\d{6}$"
                title="+373 и 8 цифр, начиная с 60,61,65,67,68,69,78,79"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('contact_form.email_label')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('contact_form.message_label')}</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? t('contact_form.sending_button') : t('contact_form.submit_button')}
          </button>
        </form>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <SuccessNotification
          message={t('contact_form.success_message')}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </section>
  );
};

export default ContactForm;
