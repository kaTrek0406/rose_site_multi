import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import Workflow from '../../components/Workflow/Workflow';
import Portfolio from '../../components/Portfolio/Portfolio';
import Clients from '../../components/Clients/Clients';
import ContactForm from '../../components/ContactForm/ContactForm';

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Workflow />
      <Portfolio />
      <Clients />
      <ContactForm />
    </>
  );
};

export default Home;
