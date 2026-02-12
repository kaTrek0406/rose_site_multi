import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import ServicesPage from './pages/Services/ServicesPage';
import ServiceDetail from './pages/ServiceDetail/ServiceDetail';
import Blog from './pages/Blog/Blog';
import BlogArticle from './pages/BlogArticle/BlogArticle';
import Cases from './pages/Cases/Cases';
import FAQ from './pages/FAQ/FAQ';
import PricingPage from './pages/Pricing/PricingPage';
import ContactPage from './pages/Contact/ContactPage';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:serviceSlug" element={<ServiceDetail />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:articleSlug" element={<BlogArticle />} />
          <Route path="cases" element={<Cases />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </LanguageProvider>
  );
}

export default App;
