import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ContactForm from '../../components/ContactForm/ContactForm';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaInstagram, FaFacebookF, FaLinkedinIn, FaViber, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import './ContactPage.css';

const ContactPage = () => {
  const { t } = useLanguage();

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

    const elements = document.querySelectorAll('.contact-animate');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content contact-animate">
          <span className="contact-badge">СВЯЗАТЬСЯ С НАМИ</span>
          <h1 className="contact-hero-title">Давайте <span className="text-pink">обсудим</span> ваш проект</h1>
          <p className="contact-hero-subtitle">
            Мы всегда рады новым проектам и сотрудничеству. Оставьте заявку или
            свяжитесь с нами любым удобным способом.
          </p>
        </div>
      </section>

      <section className="contact-grid">
        <div className="contact-info contact-animate">
          <h2>Контактная информация</h2>

          <div className="contact-info-item">
            <div className="contact-info-icon"><FaMapMarkerAlt /></div>
            <div>
              <h3>{t('footer.address.title')}</h3>
              <p>{t('footer.address.value')}</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon"><FaEnvelope /></div>
            <div>
              <h3>{t('footer.email.title')}</h3>
              <a href="mailto:rosecreative13@gmail.com">{t('footer.email.value')}</a>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-info-icon"><FaPhone /></div>
            <div>
              <h3>{t('footer.phone.title')}</h3>
              <p>
                <a href="tel:+37369200775">{t('footer.phone.value')}</a>
                <br />
                <a href="tel:+37378329518">{t('footer.phone2.value')}</a>
              </p>
            </div>
          </div>

          <div className="contact-messengers">
            <h3>Мессенджеры</h3>
            <div className="messenger-links">
              <a href="viber://chat?number=%2B37369200775" className="messenger-link viber"><FaViber /></a>
              <a href="https://wa.me/37369200775" target="_blank" rel="noopener noreferrer" className="messenger-link whatsapp"><FaWhatsapp /></a>
              <a href="https://t.me/+37369200775" target="_blank" rel="noopener noreferrer" className="messenger-link telegram"><FaTelegramPlane /></a>
            </div>
          </div>

          <div className="contact-socials">
            <h3>Социальные сети</h3>
            <div className="contact-social-links">
              <a href="https://www.instagram.com/rose__creative/" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <FaInstagram /> Instagram
              </a>
              <a href="https://www.facebook.com/RoseCreativeTeam" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <FaFacebookF /> Facebook
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-social-link">
                <FaLinkedinIn /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper contact-animate">
          <ContactForm />
        </div>
      </section>

      <section className="contact-map contact-animate">
        <h2 className="section-title">Наш офис</h2>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2719.8!2d28.8!3d47.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDAyJzE2LjgiTiAyOMKwNDknMjMuOCJF!5e0!3m2!1sru!2s!4v1"
            width="100%"
            height="400"
            style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rose Creative Office"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
