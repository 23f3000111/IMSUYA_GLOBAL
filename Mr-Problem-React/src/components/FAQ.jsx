import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const FAQS = [
  {
    q: 'How do I book a service?',
    a: 'Booking is simple — visit our website at mrproblemshop.com, choose your service, select a date and time, and confirm. You can also reach us directly via WhatsApp for instant assistance.',
  },
  {
    q: 'What areas do you cover?',
    a: 'We serve the entire Klang Valley including Kuala Lumpur, Petaling Jaya, Shah Alam, Subang Jaya, Cheras, Ampang, Damansara, Bangsar, and surrounding areas.',
  },
  {
    q: 'Are your professionals verified and trained?',
    a: 'Absolutely. Every technician on our team undergoes a thorough background check, formal skills training, and is required to carry insurance before serving any customer.',
  },
  {
    q: 'What if I am not satisfied with the service?',
    a: "Your satisfaction is our guarantee. If you're not happy with the outcome, contact us within 24 hours and we'll arrange a complimentary re-do or a full refund — no questions asked.",
  },
  {
    q: 'Do you offer same-day or emergency services?',
    a: 'Yes! We offer same-day booking for most services, subject to availability. For plumbing or electrical emergencies, our response team is available around the clock.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept online bank transfer, DuitNow QR, credit/debit cards, and cash on completion. All payments are handled transparently with a receipt provided.',
  },
  {
    q: 'Are the cleaning products safe for children and pets?',
    a: "Yes. We use eco-friendly, hospital-grade cleaning agents that are safe for children, pets, and people with allergies. We're happy to use your preferred products on request.",
  },
  {
    q: 'How long does a typical cleaning session take?',
    a: "A standard home cleaning takes 2\u20134 hours depending on property size. Deep cleans and specialist services may take longer. We'll always give you a clear time estimate upfront.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 lg:py-32 bg-gray-50/60">
      <div className="section-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-badge mb-4">FAQ</span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-gray-900 mt-4 mb-4">
            Got <span className="gradient-text-dark">Questions?</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Everything you need to know before your first booking.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto flex flex-col gap-3"
        >
          {FAQS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-purple-200 bg-white shadow-lg shadow-purple-100/50'
                    : 'border-gray-100 bg-white hover:border-purple-100'
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={`font-display font-semibold text-base transition-colors ${
                    isOpen ? 'text-purple-600' : 'text-gray-900'
                  }`}>
                    {item.q}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen
                      ? 'bg-purple-600 text-white rotate-0'
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="faq-answer"
                    >
                      <div className="px-6 pb-5">
                        <div className="h-px bg-purple-100 mb-4" />
                        <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
          <a href="https://mrproblemshop.com/" className="btn-outline">
            Contact Us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
