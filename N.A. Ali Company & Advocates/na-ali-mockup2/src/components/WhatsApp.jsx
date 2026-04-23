import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'

const quickReplies = [
  'Schedule a Consultation',
  'Ask About Our Services',
  'Request a Callback',
]

export default function WhatsApp() {
  const [open, setOpen] = useState(false)

  const handleQuick = (msg) => {
    const encoded = encodeURIComponent(msg)
    window.open(`https://wa.me/923001234567?text=${encoded}`, '_blank')
  }

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={s.chatWin}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div style={s.chatHeader}>
              <div style={s.chatHeaderLeft}>
                <div style={s.avatar}>N</div>
                <div>
                  <span style={s.chatName}>N.A. Ali & Company</span>
                  <span style={s.chatStatus}>
                    <span style={s.onlineDot} /> Online now
                  </span>
                </div>
              </div>
              <button onClick={() => setOpen(false)} style={s.closeBtn} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div style={s.chatBody}>
              <div style={s.bubble}>
                <p style={s.bubbleText}>
                  Assalam o Alaikum! 👋<br /><br />
                  Thank you for reaching out to N.A. Ali & Company Advocates. How can we assist you today?
                </p>
                <span style={s.bubbleTime}>Just now</span>
              </div>
            </div>

            {/* Quick replies */}
            <div style={s.quickReplies}>
              {quickReplies.map((msg, i) => (
                <button key={i} style={s.quickBtn} onClick={() => handleQuick(msg)}>
                  {msg}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={s.inputBar}>
              <input
                type="text"
                placeholder="Type a message…"
                style={s.input}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleQuick(e.target.value)
                    e.target.value = ''
                  }
                }}
              />
              <button style={s.sendBtn} aria-label="Send">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        style={s.fab}
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp chat"
      >
        {/* Pulse ring */}
        <span style={s.pulse} />
        {open ? <X size={22} color="#fff" /> : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        )}
      </motion.button>
    </>
  )
}

const s = {
  fab: {
    position: 'fixed',
    bottom: 28,
    right: 28,
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: '#25D366',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1000,
    boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
  },
  pulse: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'rgba(37,211,102,0.3)',
    animation: 'pulse-ring 2s ease-out infinite',
  },
  chatWin: {
    position: 'fixed',
    bottom: 96,
    right: 28,
    width: 360,
    maxHeight: 520,
    background: '#1a1a1a',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
  },
  chatHeader: {
    padding: '16px 20px',
    background: '#222',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  chatHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#10B981',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1rem',
    fontWeight: 600,
    color: '#0a0a0a',
  },
  chatName: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 600,
    color: '#FAFAFA',
  },
  chatStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.65rem',
    color: 'rgba(255,255,255,0.4)',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#25D366',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255,255,255,0.5)',
    cursor: 'pointer',
  },
  chatBody: {
    padding: 20,
    flex: 1,
    overflowY: 'auto',
  },
  bubble: {
    background: '#222',
    padding: '14px 18px',
    borderRadius: '2px 12px 12px 12px',
    maxWidth: '90%',
  },
  bubbleText: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.82rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: 'rgba(255,255,255,0.8)',
  },
  bubbleTime: {
    display: 'block',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.6rem',
    color: 'rgba(255,255,255,0.25)',
    marginTop: 6,
    textAlign: 'right',
  },
  quickReplies: {
    padding: '0 20px 12px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  quickBtn: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 500,
    color: '#10B981',
    background: 'rgba(16,185,129,0.08)',
    border: '1px solid rgba(16,185,129,0.2)',
    borderRadius: 20,
    padding: '6px 14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  inputBar: {
    padding: '12px 16px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    display: 'flex',
    gap: 8,
  },
  input: {
    flex: 1,
    background: '#222',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8,
    padding: '10px 14px',
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.82rem',
    color: '#FAFAFA',
    outline: 'none',
  },
  sendBtn: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#10B981',
    border: 'none',
    borderRadius: 8,
    color: '#0a0a0a',
    cursor: 'pointer',
  },
}
