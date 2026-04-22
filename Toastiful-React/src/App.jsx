import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SignatureShowcase from './components/SignatureShowcase';
import About from './components/About';
import MenuExperience from './components/MenuExperience';
import CoffeeMatcha from './components/CoffeeMatcha';
import Reviews from './components/Reviews';
import Location from './components/Location';
import Gallery from './components/Gallery';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <SignatureShowcase />
      <About />
      <MenuExperience />
      <CoffeeMatcha />
      <Reviews />
      <Location />
      <Gallery />
      <CTA />
      <Footer />
    </div>
  );
}
