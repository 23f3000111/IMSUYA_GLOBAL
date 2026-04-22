import { useState, useEffect } from 'react'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Services from './components/Services'
import Team from './components/Team'
import Testimonials from './components/Testimonials'
import Locations from './components/Locations'
import Gallery from './components/Gallery'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setPreloaderDone(true), 2600)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowBack(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-void font-body overflow-x-hidden">
      <Preloader done={preloaderDone} />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Team />
        <Testimonials />
        <Locations />
        <Gallery />
        <CTA />
      </main>
      <Footer />
      <WhatsApp />
      {showBack && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-7 left-7 w-11 h-11 border border-gold rounded-full flex items-center justify-center text-gold z-50 hover:bg-gold hover:text-void transition-all duration-300"
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
          </svg>
        </button>
      )}
    </div>
  )
}
