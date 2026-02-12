import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { FaClock, FaArrowLeft, FaCalendar, FaTag, FaTelegram, FaWhatsapp, FaFacebook, FaArrowRight } from 'react-icons/fa';
import { blogArticlesData } from '../Blog/Blog';
import './BlogArticle.css';

const BlogArticle = () => {
  const { articleSlug } = useParams();
  const { language } = useLanguage();

  const articleData = blogArticlesData.find(a => a.slug === articleSlug);

  // Get language-specific content
  const article = articleData ? {
    ...articleData,
    ...(articleData[language] || articleData['ru'])
  } : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [articleSlug]);

  if (!article) return <Navigate to="/blog" />;

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${article.title}`;

  // Helper to render markdown-like content nicely
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('## ')) {
        return <h2 key={index}>{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index}>{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={index}>{line.replace('#### ', '')}</h4>;
      }
      if (line.startsWith('- ')) {
        return <li key={index}>{line.replace('- ', '')}</li>;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index}>{line}</p>;
    });
  };

  // Static translations
  const t = {
    back: language === 'ru' ? 'Все статьи' : 'Toate articolele',
    shared: language === 'ru' ? 'Понравилась статья? Поделитесь с коллегами!' : 'V-a plăcut articolul? Distribuiți colegilor!',
    cta_title: language === 'ru' ? 'Обсудить ваш проект' : 'Discută proiectul tău',
    cta_btn: language === 'ru' ? 'Связаться с нами' : 'Contactează-ne',
    read_more: language === 'ru' ? 'Читайте также' : 'Citește și'
  };

  const relatedArticles = blogArticlesData
    .filter(a => a.slug !== articleSlug)
    .slice(0, 2)
    .map(a => ({
      ...a,
      ...(a[language] || a['ru'])
    }));

  return (
    <div className="blog-article-page">
      <div className="article-container">
        <Link to="/blog" className="back-link">
          <FaArrowLeft /> {t.back}
        </Link>

        <header className="article-header">
          <div className="article-meta">
            <span className="article-category"><FaTag /> {article.category}</span>
            <span className="article-date"><FaCalendar /> {article.date}</span>
            <span className="article-time"><FaClock /> {article.readTime}</span>
          </div>
          <h1 className="article-title">{article.title}</h1>
          <p className="article-excerpt">{article.excerpt}</p>
        </header>

        <div className="article-image">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="article-content">
          {renderContent(article.content)}
        </div>

        <div className="article-share">
          <p>{t.shared}</p>
          <div className="share-buttons">
            <a href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" className="share-btn telegram">
              <FaTelegram /> Telegram
            </a>
            <a href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn whatsapp">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="share-btn facebook">
              <FaFacebook /> Facebook
            </a>
          </div>
        </div>

        <div className="article-cta">
          <h2>{t.cta_title}</h2>
          <Link to="/contact" className="btn-primary">{t.cta_btn}</Link>
        </div>

        {relatedArticles.length > 0 && (
          <div className="related-articles">
            <h3>{t.read_more}</h3>
            <div className="related-grid">
              {relatedArticles.map((related) => (
                <Link key={related.slug} to={`/blog/${related.slug}`} className="related-card">
                  <div className="related-image">
                    <img src={related.image} alt={related.title} />
                  </div>
                  <div className="related-content">
                    <h4>{related.title}</h4>
                    <span className="read-more-link"><FaArrowRight /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogArticle;
