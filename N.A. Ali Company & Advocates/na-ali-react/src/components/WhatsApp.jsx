import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WA_NUMBER = '254700000000'
const WA_URL = `https://wa.me/${WA_NUMBER}?text=`

const FLOWS = {
  start: {
    text: "Hello! 👋 Welcome to N.A. Ali & Company Advocates.\n\nHow can I assist you today?",
    options: [
      { label: '📋 Book a Consultation', display: 'Book a Consultation', next: 'consultation' },
      { label: '⚖️ Our Practice Areas', display: 'Our Practice Areas', next: 'practiceAreas' },
      { label: '👤 About the Firm', display: 'About the Firm', next: 'about' },
      { label: '💬 Contact Us Directly', display: 'Contact Us Directly', next: 'talkDirect' },
    ],
  },
  consultation: {
    text: "Great choice! 🤝 Our team handles corporate, commercial, family law, and advisory matters.\n\nHow would you like to connect with us?",
    options: [
      { label: '📞 Call Us Now', display: 'Call Us Now', href: 'tel:+254700000000', external: true },
      { label: '💬 Book via WhatsApp', display: 'Book via WhatsApp', href: `${WA_URL}${encodeURIComponent("Hello N.A. Ali & Company, I'd like to book a consultation.")}`, external: true },
      { label: '🏠 Main Menu', display: 'Main Menu', next: 'start' },
    ],
  },
  practiceAreas: {
    text: "We specialise in a wide range of legal areas:\n\n🏢 Company Law\n💼 Commercial Law\n👨‍👩‍👧 Family Law & Succession\n📜 Legal Advisory\n📄 Contracts & Compliance\n⚖️ Dispute Resolution\n\nWould you like to book a consultation?",
    options: [
      { label: '📋 Book a Consultation', display: 'Book a Consultation', next: 'consultation' },
      { label: '🌐 Visit Our Website', display: 'Visit Our Website', href: 'https://naaliadvocates.com/web/', external: true },
      { label: '🏠 Main Menu', display: 'Main Menu', next: 'start' },
    ],
  },
  about: {
    text: "N.A. Ali & Company Advocates is a trusted Kenyan legal firm with a proven track record across corporate, commercial, and family law.\n\nWe deliver strategic, client-centred legal solutions tailored to protect your interests. ⚖️",
    options: [
      { label: '📋 Book a Consultation', display: 'Book a Consultation', next: 'consultation' },
      { label: '🌐 Visit Our Website', display: 'Visit Our Website', href: 'https://naaliadvocates.com/web/', external: true },
      { label: '🏠 Main Menu', display: 'Main Menu', next: 'start' },
    ],
  },
  talkDirect: {
    text: "I'll connect you directly with our team on WhatsApp. They're ready to help you right away! 💬",
    options: [
      { label: '💬 Open WhatsApp', display: 'Open WhatsApp', href: `${WA_URL}${encodeURIComponent("Hello N.A. Ali & Company Advocates! I'd like to know more about your services.")}`, external: true },
      { label: '🏠 Main Menu', display: 'Main Menu', next: 'start' },
    ],
  },
}

const WAIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} fill={color} viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const TypingDots = () => (
  <div style={{ display: 'flex', gap: '4px', padding: '4px 2px', alignItems: 'center' }}>
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.45)' }}
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
      />
    ))}
  </div>
)

const now = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })

const WhatsApp = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState('start')
  const [initialized, setInitialized] = useState(false)
  const chatRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages, typing])

  // Init chat on first open
  useEffect(() => {
    if (open && !initialized) {
      setTyping(true)
      const t = setTimeout(() => {
        setTyping(false)
        setMessages([{ type: 'bot', text: FLOWS.start.text, time: now() }])
        setInitialized(true)
      }, 950)
      return () => clearTimeout(t)
    }
  }, [open, initialized])

  const handleOption = (opt) => {
    if (opt.external) return
    const userMsg = { type: 'user', text: opt.display, time: now() }
    setMessages(m => [...m, userMsg])
    const nextStep = opt.next
    const t1 = setTimeout(() => {
      setTyping(true)
      const t2 = setTimeout(() => {
        setTyping(false)
        setCurrentStep(nextStep)
        setMessages(m => [...m, { type: 'bot', text: FLOWS[nextStep].text, time: now() }])
      }, 750)
      return () => clearTimeout(t2)
    }, 200)
    return () => clearTimeout(t1)
  }

  const currentFlow = FLOWS[currentStep]

  return (
    <>
      {/* — FAB BUTTON — */}
      <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999 }}>
        {/* Pulse rings */}
        <span
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: '#25D366', opacity: 0.2,
            animation: 'ping 2.2s cubic-bezier(0,0,0.2,1) infinite',
          }}
        />
        <span
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: '#25D366', opacity: 0.12,
            animation: 'ping 2.2s cubic-bezier(0,0,0.2,1) infinite',
            animationDelay: '0.7s',
          }}
        />
        <motion.button
          onClick={() => setOpen(v => !v)}
          aria-label="Chat with N.A. Ali & Company"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          style={{
            position: 'relative',
            width: 56, height: 56,
            borderRadius: '50%',
            background: '#25D366',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: 'none',
            boxShadow: '0 8px 28px rgba(37,211,102,0.45)',
            cursor: 'pointer',
          }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </motion.span>
            ) : (
              <motion.span key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <WAIcon size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* — CHAT WINDOW — */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '1.5rem',
              zIndex: 9998,
              width: 'min(390px, calc(100vw - 1.5rem))',
              maxHeight: 'min(580px, calc(100svh - 7rem))',
              borderRadius: '18px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.07)',
            }}
          >

            {/* — HEADER — */}
            <div style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #162035 100%)',
              borderBottom: '1px solid rgba(201,162,39,0.12)',
              padding: '14px 16px',
              flexShrink: 0,
            }}>
              {/* Gold top accent line */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #C9A227 40%, #E8D9A8 60%, transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Avatar with online ring */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', background: '#25D366',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 2px rgba(37,211,102,0.3)',
                  }}>
                    <WAIcon size={20} />
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 1, right: 1, width: 10, height: 10,
                    borderRadius: '50%', background: '#25D366',
                    border: '2px solid #0F172A',
                  }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.88rem', color: '#F8FAFC', lineHeight: 1.2 }}>
                    N.A. Ali & Co. Advocates
                  </div>
                  <div style={{ fontFamily: 'Manrope', fontSize: '0.7rem', color: '#25D366', marginTop: '2px' }}>
                    ● Online · Replies instantly
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    width: 30, height: 30,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    flexShrink: 0,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)' }}
                  aria-label="Close chat"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* — CHAT BODY — */}
            <div
              ref={chatRef}
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                background: '#0d1526',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'0.8\' fill=\'rgba(255,255,255,0.015)\'/%3E%3C/svg%3E")',
                padding: '16px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                minHeight: 0,
                scrollBehavior: 'smooth',
              }}
            >
              {/* Empty state */}
              {messages.length === 0 && !typing && (
                <div style={{
                  textAlign: 'center',
                  padding: '6px 14px',
                  background: 'rgba(201,162,39,0.07)',
                  border: '1px solid rgba(201,162,39,0.12)',
                  borderRadius: '8px',
                  alignSelf: 'center',
                }}>
                  <span style={{ fontFamily: 'Manrope', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>🔒 Confidential & Secure</span>
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-end',
                    gap: '8px',
                  }}
                >
                  {/* Bot avatar */}
                  {msg.type === 'bot' && (
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: '#25D366',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <WAIcon size={14} />
                    </div>
                  )}

                  <div style={{ maxWidth: '76%', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: msg.type === 'bot' ? '4px 14px 14px 14px' : '14px 4px 14px 14px',
                      background: msg.type === 'bot'
                        ? 'linear-gradient(135deg, #1e293b 0%, #172032 100%)'
                        : 'linear-gradient(135deg, #C9A227 0%, #b8911e 100%)',
                      boxShadow: msg.type === 'user'
                        ? '0 3px 10px rgba(201,162,39,0.3)'
                        : '0 2px 8px rgba(0,0,0,0.3)',
                    }}>
                      <p style={{
                        fontFamily: 'Manrope',
                        fontSize: '0.84rem',
                        lineHeight: 1.65,
                        color: msg.type === 'bot' ? 'rgba(248,250,252,0.9)' : '#0F172A',
                        whiteSpace: 'pre-line',
                        fontWeight: msg.type === 'user' ? 600 : 400,
                        margin: 0,
                      }}>
                        {msg.text}
                      </p>
                    </div>
                    <div style={{
                      fontFamily: 'Manrope', fontSize: '0.63rem',
                      color: 'rgba(255,255,255,0.28)',
                      textAlign: msg.type === 'user' ? 'right' : 'left',
                      paddingLeft: msg.type === 'bot' ? '2px' : 0,
                      paddingRight: msg.type === 'user' ? '2px' : 0,
                    }}>
                      {msg.time}{msg.type === 'user' ? ' ✔✔' : ''}
                    </div>
                  </div>

                  {/* User avatar placeholder */}
                  {msg.type === 'user' && (
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: 'rgba(201,162,39,0.18)',
                      border: '1.5px solid rgba(201,162,39,0.35)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.7rem', color: '#C9A227',
                    }}>
                      You
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}
                  >
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: '#25D366',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <WAIcon size={14} />
                    </div>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: '4px 14px 14px 14px',
                      background: 'linear-gradient(135deg, #1e293b 0%, #172032 100%)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}>
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* — QUICK REPLY OPTIONS — */}
            <AnimatePresence>
              {!typing && messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{
                    background: '#080f1e',
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    padding: '10px 12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    flexShrink: 0,
                    maxHeight: '240px',
                    overflowY: 'auto',
                  }}
                >
                  <p style={{
                    fontFamily: 'Manrope', fontSize: '0.64rem', fontWeight: 700,
                    letterSpacing: '0.08em', color: 'rgba(255,255,255,0.25)',
                    textTransform: 'uppercase', marginBottom: '2px',
                  }}>
                    Quick Reply
                  </p>

                  {currentFlow.options.map((opt, idx) =>
                    opt.external ? (
                      <a
                        key={idx}
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '9px 13px',
                          borderRadius: '10px',
                          background: 'rgba(37,211,102,0.07)',
                          border: '1px solid rgba(37,211,102,0.22)',
                          color: '#25D366',
                          fontFamily: 'Manrope', fontSize: '0.82rem', fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all 0.18s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,211,102,0.15)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,211,102,0.07)'}
                      >
                        <span style={{ flex: 1 }}>{opt.label}</span>
                        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                        </svg>
                      </a>
                    ) : (
                      <button
                        key={idx}
                        onClick={() => handleOption(opt)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '9px 13px',
                          borderRadius: '10px',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: 'rgba(248,250,252,0.7)',
                          fontFamily: 'Manrope', fontSize: '0.82rem', fontWeight: 500,
                          textAlign: 'left', width: '100%',
                          cursor: 'pointer',
                          transition: 'all 0.18s',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = 'rgba(201,162,39,0.09)'
                          e.currentTarget.style.borderColor = 'rgba(201,162,39,0.35)'
                          e.currentTarget.style.color = '#C9A227'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                          e.currentTarget.style.color = 'rgba(248,250,252,0.7)'
                        }}
                      >
                        {opt.label}
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


export default WhatsApp
