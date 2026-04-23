import React, { useState, useEffect } from 'react'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyChooseUs from './components/WhyChooseUs'
import PracticeAreas from './components/PracticeAreas'
import Founder from './components/Founder'
import TrustMetrics from './components/TrustMetrics'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import ContactCTA from './components/ContactCTA'
import Footer from './components/Footer'
import Preloader from './components/Preloader'

import WhatsApp from './components/WhatsApp'

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setPreloaderDone(true)
      document.body.style.overflow = ''
    }, 2400)
    return () => {
      clearTimeout(timer)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Preloader done={preloaderDone} />
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <WhyChooseUs />
        <PracticeAreas />
        <Founder />
        <TrustMetrics />
        <Process />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
      <WhatsApp />
    </div>
  )
}

export default App
