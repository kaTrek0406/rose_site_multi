import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import Pricing from './components/Pricing/Pricing';
import Clients from './components/Clients/Clients';
import ContactForm from './components/ContactForm/ContactForm';
import Footer from './components/Footer/Footer';
import Loader from './components/Loader/Loader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <LanguageProvider>
      {isLoading && <Loader onLoadingComplete={handleLoadingComplete} />}
      <div className="app" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Header />
        <Hero />
        <Services />
        <Portfolio />
        <Pricing />
        <Clients />
        <ContactForm />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
