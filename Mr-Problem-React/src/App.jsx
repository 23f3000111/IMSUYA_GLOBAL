import TopBar      from './components/TopBar'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import TrustBar     from './components/TrustBar'
import Services     from './components/Services'
import WhyUs        from './components/WhyUs'
import Results      from './components/Results'
import HowItWorks   from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import FAQ          from './components/FAQ'
import CTA          from './components/CTA'
import Footer       from './components/Footer'
import WhatsApp     from './components/WhatsApp'

export default function App() {
  return (
    <div className="font-body">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Results />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}
