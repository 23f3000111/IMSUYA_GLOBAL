import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import StoryScroll  from './components/StoryScroll';
import NetworkMap   from './components/NetworkMap';
import Services     from './components/Services';
import WhyUs        from './components/WhyUs';
import Awards       from './components/Awards';
import Testimonials from './components/Testimonials';
import CTA          from './components/CTA';
import Footer       from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <StoryScroll />
      <NetworkMap />
      <Services />
      <WhyUs />
      <Awards />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
