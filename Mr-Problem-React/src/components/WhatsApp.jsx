import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, MapPin } from 'lucide-react'

const WA_NUMBER = '60187888677'

const KB = [
  {
    re: /hello|hi\b|hey|salam|hai/i,
    msg: "Hello! 👋 Welcome to Mr Problem!\nI'm your virtual assistant — here to help with services, pricing & bookings.",
    qr: ['Our Services', 'Pricing', 'Book Now', 'Contact Us'],
  },
  {
    re: /service|what.*offer|do you do|available/i,
    msg: "We offer 6 main services:\n🧊 Aircond (clean, repair, install)\n🧹 Home & Office Cleaning\n🛋️ Sofa & Upholstery\n🔧 Plumbing\n⚡ Electrical\n🔨 Handyman",
    qr: ['Pricing', 'Book Now', 'Which Area?'],
  },
  {
    re: /price|cost|how much|rm\b|rate|fee|cheap|afford/i,
    msg: "Starting prices:\n🧊 Aircond Chemical Wash: RM89\n🧹 Basic Home Cleaning: RM120\n🛋️ Sofa Cleaning: RM180\n🔧 Plumbing: from RM80\n⚡ Electrical: from RM80\n🔨 Handyman: RM60/hr\n\nFinal quotes at mrproblemshop.com",
    qr: ['Book Now', 'Our Services', 'Contact Us'],
  },
  {
    re: /book|booking|schedule|appointment|order|reserve/i,
    msg: "Easy to book! 😊\n1️⃣ Book online at mrproblemshop.com\n2️⃣ Call: 018-7888 677\n3️⃣ WhatsApp us directly!\n\nSame-day slots often available!",
    qr: ['Go to Website ↗', 'Call Now 📞', 'WhatsApp Us 💬'],
  },
  {
    re: /area|location|cover|klang|kl\b|petaling|pj\b|subang|shah alam|damansara|ampang|cheras|puchong/i,
    msg: "We cover all of Klang Valley! 📍\n✅ Kuala Lumpur\n✅ Petaling Jaya (HQ)\n✅ Subang Jaya\n✅ Shah Alam\n✅ Damansara\n✅ Ampang, Cheras & more!",
    qr: ['Book Now', 'Our Services', 'Pricing'],
  },
  {
    re: /hour|time|when|open|available|operate|day|weekend/i,
    msg: "We're open 7 days a week ⏰\n🕗 8:00 AM – 9:00 PM daily\n\nWeekend & public holiday slots available!\nBook early for your preferred time.",
    qr: ['Book Now', 'Call Now 📞'],
  },
  {
    re: /insure|guarantee|warranty|trust|safe|certif|quality/i,
    msg: "We're fully trustworthy! 💯\n✅ All workers verified & insured\n✅ 30-day workmanship guarantee\n✅ Kaodim #1 Vendor\n✅ 4.8★ on Google (1,200+ reviews)",
    qr: ['Book Now', 'Our Services'],
  },
  {
    re: /aircond|aircon|ac\b/i,
    msg: "Aircond Services:\n❄️ Chemical Wash: RM89/unit\n❄️ General Service: RM69/unit\n❄️ Gas Top-up: from RM120\n❄️ New Installation: from RM280\n❄️ Diagnosis: RM69",
    qr: ['Book Now', 'Other Services', 'Pricing'],
  },
  {
    re: /clean|cleaning|mop|deep|house.*clean|home.*clean/i,
    msg: "Cleaning Services:\n🧹 Basic Home: from RM120\n🧹 Deep Clean: from RM280\n🧹 Move In/Out: from RM350\n🏢 Office: from RM180\n🛋️ Sofa/Upholstery: from RM180",
    qr: ['Book Now', 'Other Services'],
  },
  {
    re: /plumb|pipe|leak|drain|toilet|sink|tap|water/i,
    msg: "Plumbing Services:\n🔧 Leaky tap: from RM80\n🔧 Pipe repair: from RM100\n🔧 Drain unblock: from RM120\n🔧 Toilet repair: from RM80\n\nFast response available!",
    qr: ['Book Now', 'Other Services'],
  },
  {
    re: /electr|wiring|socket|switch|power|lighting|fuse/i,
    msg: "Electrical Services:\n⚡ Socket/switch: from RM80\n⚡ Wiring: from RM150\n⚡ Light install: from RM80\n⚡ DB box: from RM200\n\nAll work certified & safe!",
    qr: ['Book Now', 'Other Services'],
  },
  {
    re: /handyman|repair|fix|install|furniture|assembl|drill|mount/i,
    msg: "Handyman Services:\n🔨 Furniture assembly: RM60/hr\n🔨 Wall drilling: from RM50\n🔨 Door/window fix: from RM80\n🔨 TV wall mount: from RM80",
    qr: ['Book Now', 'Other Services'],
  },
  {
    re: /review|rating|star|google|feedback|recommend/i,
    msg: "Our customers love us! ⭐\n\n\"Aircond jadi lebih sejuk selepas servis. Highly recommend!\" — Petaling Jaya\n\n4.8★ on Google · 1,200+ verified reviews 💜",
    qr: ['Book Now', 'Our Services'],
  },
  {
    re: /contact|phone|call|number|reach|whatsapp|email/i,
    msg: "Reach us anytime! 📞\n\n📱 Call/WhatsApp: 018-7888 677\n🌐 mrproblemshop.com\n📍 Petaling Jaya, Klang Valley\n\nHours: 8AM – 9PM daily",
    qr: ['Call Now 📞', 'WhatsApp Us 💬', 'Book Now'],
  },
]

const FALLBACK = {
  msg: "Hmm, I'm not sure about that 🤔\n\nFor specific questions, call 018-7888 677 or visit mrproblemshop.com — we're happy to help!",
  qr: ['Our Services', 'Pricing', 'Book Now', 'Contact Us'],
}

const GREETING_MSG = "Hi there! 👋 I'm the Mr Problem assistant.\n\nHow can I help you today?"
const GREETING_QR = ['Our Services', 'Pricing', 'Book Now', 'Contact Us']

function getReply(text) {
  const t = text.toLowerCase().trim()
  if (t === 'go to website ↗' || t === 'book now') {
    window.open('https://mrproblemshop.com/', '_blank', 'noopener,noreferrer')
    return null
  }
  if (t === 'call now 📞') {
    window.location.href = 'tel:0187888677'
    return null
  }
  if (t === 'whatsapp us 💬') {
    const msg = encodeURIComponent("Hi! I'd like to book a service from Mr Problem. Can you help me?")
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer')
    return null
  }
  if (t === 'other services') return KB.find(r => /service/.test(r.re.source)) || FALLBACK
  for (const r of KB) {
    if (r.re.test(t)) return r
  }
  return FALLBACK
}

export default function WhatsApp() {
  const [open, setOpen]         = useState(false)
  const [messages, setMessages] = useState([])
  const [chips, setChips]       = useState([])
  const [inputVal, setInputVal] = useState('')
  const [typing, setTyping]     = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const msgsRef  = useRef(null)
  const inputRef = useRef(null)

  const scrollBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
    })
  }, [])

  const addBot = useCallback((text, qr = []) => {
    setMessages(prev => [...prev, { who: 'bot', text, id: Date.now() + Math.random() }])
    setChips(qr)
    scrollBottom()
  }, [scrollBottom])

  // Greeting on first open
  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true)
      setTyping(true)
      const t = setTimeout(() => {
        setTyping(false)
        addBot(GREETING_MSG, GREETING_QR)
      }, 900)
      return () => clearTimeout(t)
    }
  }, [open, hasOpened, addBot])

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 400)
  }, [open])

  const handleSend = useCallback((text) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { who: 'user', text, id: Date.now() + Math.random() }])
    setChips([])
    setInputVal('')
    setTyping(true)
    scrollBottom()
    const delay = 900 + Math.random() * 600
    const t = setTimeout(() => {
      setTyping(false)
      const reply = getReply(text)
      if (reply) {
        addBot(reply.msg, reply.qr)
      } else {
        // Navigation action happened — show a follow-up
        addBot('Anything else I can help you with? 😊', ['Our Services', 'Pricing', 'Contact Us'])
      }
    }, delay)
    return () => clearTimeout(t)
  }, [addBot, scrollBottom])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 select-none">

      {/* ── Chat Window ── */}
      <AnimatePresence mode="popLayout">
        {open && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.82, y: 24 }}
            transition={{ duration: 0.38, ease: [0.34, 1.22, 0.64, 1] }}
            style={{
              width: 'min(340px, calc(100vw - 24px))',
              maxHeight: '520px',
              boxShadow: '0 24px 70px rgba(124,58,237,0.22), 0 4px 20px rgba(0,0,0,0.12)',
            }}
            className="bg-white rounded-[20px] border border-purple-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
              <div className="relative w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <span className="text-purple-700 font-black text-[13px] font-display leading-none">MP</span>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-display font-bold text-sm">Mr Problem</div>
                <div className="text-white/75 text-[11px] mt-0.5">Online · Replies in minutes</div>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors duration-200">
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div ref={msgsRef}
              className="flex-1 overflow-y-auto px-3.5 py-3 flex flex-col gap-2"
              style={{ minHeight: '200px', maxHeight: '260px' }}>

              {messages.length === 0 && !typing && (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-gray-300 text-xs">Starting conversation…</p>
                </div>
              )}

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
                  className={`max-w-[82%] px-3.5 py-2.5 text-[12.5px] leading-relaxed whitespace-pre-line word-break-break-word rounded-2xl ${
                    msg.who === 'bot'
                      ? 'bg-purple-50 text-gray-700 self-start rounded-tl-[4px] border border-purple-100/70'
                      : 'text-white self-end rounded-tr-[4px]'
                  }`}
                  style={msg.who === 'user' ? { background: 'linear-gradient(135deg, #7C3AED, #A855F7)' } : {}}
                >
                  {msg.text}
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-1.5 px-3.5 py-3 bg-purple-50 rounded-2xl rounded-tl-[4px] border border-purple-100/70 self-start"
                  >
                    {[0, 1, 2].map(i => (
                      <span key={i}
                        className="w-1.5 h-1.5 rounded-full bg-purple-400 inline-block"
                        style={{ animation: `typeBounce 1.2s ease-in-out infinite ${i * 0.2}s` }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick reply chips */}
            <AnimatePresence>
              {chips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-wrap gap-1.5 px-3.5 pb-2 flex-shrink-0"
                >
                  {chips.map(chip => (
                    <button key={chip} onClick={() => handleSend(chip)}
                      className="text-[11px] font-semibold font-display px-3 py-1.5 rounded-full border border-purple-200
                                 bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white hover:border-purple-600
                                 active:scale-95 transition-all duration-200 whitespace-nowrap">
                      {chip}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input row */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-t border-gray-100 flex-shrink-0">
              <input
                ref={inputRef}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(inputVal)}
                placeholder="Type a message…"
                className="flex-1 text-[12.5px] px-3.5 py-2.5 rounded-full border border-gray-200 outline-none
                           focus:border-purple-400 focus:ring-2 focus:ring-purple-100
                           bg-gray-50 text-gray-700 placeholder-gray-400 transition-all duration-200"
              />
              <button onClick={() => handleSend(inputVal)}
                disabled={!inputVal.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0
                           hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                           transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
                <Send size={14} />
              </button>
            </div>

            {/* Location strip */}
            <a
              href="https://www.google.com/maps/place/Mr+Problem+(Petaling+Jaya+HQ)/@3.1167847,101.5946434,754m"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border-t border-gray-100 text-gray-400 hover:text-purple-600 transition-colors duration-200 flex-shrink-0"
              style={{ background: 'rgba(124,58,237,0.03)' }}
            >
              <MapPin size={11} className="flex-shrink-0" />
              <span className="text-[10.5px]">Petaling Jaya HQ, Klang Valley · View on Maps</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Toggle Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="relative w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl
                   transition-transform duration-200 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(145deg, #7C3AED, #A855F7)',
          boxShadow: '0 8px 28px rgba(124,58,237,0.5)',
        }}
        aria-label="Chat with Mr Problem"
      >
        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ background: '#7C3AED' }} />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'close' : 'chat'}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {open
              ? <X size={22} className="text-white" />
              : <MessageCircle size={24} className="text-white" fill="white" />}
          </motion.div>
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {!open && !hasOpened && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white
                         text-[10px] font-bold flex items-center justify-center border-2 border-white"
            >
              1
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  )
}
