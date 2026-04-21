import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustMetrics from './components/TrustMetrics';
import Services from './components/Services';
import Fleet from './components/Fleet';
import NetworkMap from './components/NetworkMap';
import WhyUs from './components/WhyUs';
import ProcessTimeline from './components/ProcessTimeline';
import Industries from './components/Industries';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTABanner from './components/CTABanner';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Awards from './components/Awards';

export default function App() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <TrustMetrics />
      <Services />
      <Fleet />
      <NetworkMap />
      <WhyUs />
      <Awards />
      <ProcessTimeline />
      <Industries />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
      <Chatbot />
    </div>
  );
}
