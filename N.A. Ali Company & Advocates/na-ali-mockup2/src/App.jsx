import React, { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Expertise from './components/Expertise'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="noise">
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsApp />

      {/* Grid overlay lines */}
      <div className="grid-overlay">
        <span /><span /><span /><span /><span />
      </div>
    </div>
  )
}

export default App
