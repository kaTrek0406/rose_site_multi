import { LanguageProvider } from './contexts/LanguageContext';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import Services from './components/Services/Services';
import Workflow from './components/Workflow/Workflow';
import Portfolio from './components/Portfolio/Portfolio';
import Clients from './components/Clients/Clients';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';
import CookieConsent from './components/CookieConsent/CookieConsent';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Hero />
        <Header />
        <Services />
        <Workflow />
        <Portfolio />
        <Clients />
        <ContactForm />
        <Footer />
        <CookieConsent />
      </div>
    </LanguageProvider>
  );
}

export default App;
