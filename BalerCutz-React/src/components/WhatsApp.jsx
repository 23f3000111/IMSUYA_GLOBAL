import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_NUMBER = '60126061715'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=`

const FLOWS = {
  start: {
    msg: "Hi! 👋 Welcome to BalrCutz. How can I help you today?",
    options: [
      { label: '📅 Book an Appointment', next: 'pickBranch' },
      { label: '✂️ View Services', next: 'services' },
      { label: '📍 Our Locations', next: 'locations' },
      { label: '💬 Talk to Us Directly', next: 'talkDirect' },
    ],
  },
  pickBranch: {
    msg: "Which branch would you like to book at?",
    options: [
      { label: '📍 Jaya One (Petaling Jaya)', next: 'bookJayaOne' },
      { label: '📍 Sri Hartamas (KL)', next: 'bookHartamas' },
      { label: '← Back', next: 'start' },
    ],
  },
  bookJayaOne: {
    msg: "Great! Tap below to book your appointment at our Jaya One branch.",
    options: [
      { label: '🗓️ Open Booking — Jaya One', href: 'https://balrcutz.setmore.com/', external: true },
      { label: '← Back', next: 'pickBranch' },
    ],
  },
  bookHartamas: {
    msg: "Perfect! Tap below to book at our Sri Hartamas branch.",
    options: [
      { label: '🗓️ Open Booking — Sri Hartamas', href: 'https://balrcutzhartamas.setmore.com/', external: true },
      { label: '← Back', next: 'pickBranch' },
    ],
  },
  services: {
    msg: "We offer:\n\n✂️ Haircut — From RM35\n⚡ MVP Package — From RM65\n🧔 Beard Design — From RM25\n🎨 Hair Colouring — From RM80\n🌿 Scalp Care — From RM55\n💆 Face Care — From RM45",
    options: [
      { label: '📅 Book Now', next: 'pickBranch' },
      { label: '← Back', next: 'start' },
    ],
  },
  locations: {
    msg: "📍 Jaya One: D-55-P2, Block D, Jaya One, PJ (4.96★)\n\n📍 Sri Hartamas: No.1, 2nd Floor, Jalan 26A/70A, KL (4.93★)\n\n⏰ Wed–Mon: 10AM–9PM · Tuesday: Closed\n📞 +60 12-606 1715",
    options: [
      { label: '📅 Book an Appointment', next: 'pickBranch' },
      { label: '← Back', next: 'start' },
    ],
  },
  talkDirect: {
    msg: "Want to chat directly with our team on WhatsApp?",
    options: [
      { label: '💬 Open WhatsApp', href: `${WA_URL}${encodeURIComponent("Hi BalrCutz! I'd like to know more.")}`, external: true },
      { label: '← Back', next: 'start' },
    ],
  },
}

const WhatsApp = () => {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState('start')
  const [history, setHistory] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [open, step])

  const goTo = (next) => {
    setHistory((h) => [...h, step])
    setStep(next)
  }

  const flow = FLOWS[step]

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="WhatsApp Chat"
        className="fixed bottom-7 right-7 z-50 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <svg width="26" height="26" fill="white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
      </button>

      {/* Chat popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-7 z-50 w-[340px] max-w-[calc(100vw-28px)] rounded-xl overflow-hidden shadow-2xl border border-white/10"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="bg-[#1a1a1a] border-b border-white/10 px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="text-white text-sm font-semibold">BalrCutz</div>
                <div className="text-[#25D366] text-xs">Online · Typically replies fast</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-white/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="bg-[#111] px-4 py-5 space-y-4 max-h-[300px] overflow-y-auto">
              {/* Bot message */}
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0 mt-1">
                  <svg width="13" height="13" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </div>
                <div className="bg-[#1e1e1e] rounded-lg rounded-tl-none px-4 py-3 max-w-[85%]">
                  <p className="text-white/80 text-sm whitespace-pre-line leading-relaxed">{flow.msg}</p>
                </div>
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Options */}
            <div className="bg-[#0d0d0d] border-t border-white/[0.06] p-3 flex flex-col gap-2">
              {flow.options.map((opt) =>
                opt.external ? (
                  <a
                    key={opt.label}
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-[#25D366] border border-[#25D366]/30 bg-[#25D366]/10 rounded-lg px-4 py-2.5 text-sm hover:bg-[#25D366]/20 transition-colors duration-200"
                  >
                    {opt.label}
                  </a>
                ) : (
                  <button
                    key={opt.label}
                    onClick={() => goTo(opt.next)}
                    className="text-left text-white/60 border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm hover:border-gold/40 hover:text-gold transition-all duration-200"
                  >
                    {opt.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default WhatsApp
