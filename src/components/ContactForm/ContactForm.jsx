import { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { sendToTelegram } from '../../services/telegramService';
import './ContactForm.css';

const ContactForm = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      alert(t('contact_form.success_message'));
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    } else {
      alert(t('contact_form.error_message'));
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

          <button type="submit" className="submit-button">
            {t('contact_form.submit_button')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
