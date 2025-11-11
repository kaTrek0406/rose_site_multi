import { lazy, Suspense } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import CookieConsent from './components/CookieConsent/CookieConsent';
import './App.css';

// Lazy load тяжелые компоненты
const Services = lazy(() => import('./components/Services/Services'));
const Workflow = lazy(() => import('./components/Workflow/Workflow'));
const Portfolio = lazy(() => import('./components/Portfolio/Portfolio'));
const Pricing = lazy(() => import('./components/Pricing/Pricing'));
const Clients = lazy(() => import('./components/Clients/Clients'));
const ContactForm = lazy(() => import('./components/ContactForm/ContactForm'));
const Footer = lazy(() => import('./components/Footer/Footer'));

// Минимальный лоадер
const Fallback = () => (
  <div style={{
    minHeight: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255,255,255,0.2)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <Hero />
        <Suspense fallback={<Fallback />}>
          <Services />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Workflow />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Portfolio />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Pricing />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Clients />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <ContactForm />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <Footer />
        </Suspense>
        <CookieConsent />
      </div>
    </LanguageProvider>
  );
}

export default App;
