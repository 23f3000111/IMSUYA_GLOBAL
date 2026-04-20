import { motion } from 'framer-motion'
import { CalendarCheck, MapPin, Star } from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: CalendarCheck,
    title: 'Choose & Book',
    desc: 'Select your service, pick a time slot that suits you, and complete your booking in under 2 minutes — online or via WhatsApp.',
    color: 'from-violet-500 to-purple-600',
    highlight: 'No registration needed',
  },
  {
    num: '02',
    icon: MapPin,
    title: 'We Come to You',
    desc: 'A verified professional arrives at your home on time, fully equipped with all the tools and products needed for the job.',
    color: 'from-emerald-500 to-teal-600',
    highlight: 'On-time guarantee',
  },
  {
    num: '03',
    icon: Star,
    title: 'Enjoy & Rate',
    desc: 'Relax while we handle everything. When done, rate your experience and get a summary of the work completed.',
    color: 'from-amber-500 to-orange-500',
    highlight: '100% satisfaction guarantee',
  },
]

const fade = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white">
      <div className="section-wrap">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="section-badge mb-4">How It Works</span>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-gray-900 mt-4 mb-4">
            Simple. Fast. <span className="gradient-text-dark">Stress-Free.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Getting professional home services has never been easier. Three steps to a cleaner, better home.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — shows on sm+ when grid is 3 columns */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden sm:block absolute top-7 left-[calc(16.66%+32px)] right-[calc(16.66%+32px)] h-0.5 origin-left"
            style={{ background: 'linear-gradient(90deg, #7C3AED, #A855F7, #7C3AED)', zIndex: 0 }}
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
          >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={fade}
              className="relative z-10 flex flex-col gap-5"
            >
              {/* Icon */}
              <div className="relative flex justify-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl flex-shrink-0`}>
                  <step.icon size={24} className="text-white" />
                </div>
                <div className="absolute -top-2 left-9 w-6 h-6 rounded-full bg-white border-2 border-purple-600
                                flex items-center justify-center shadow-sm z-10">
                  <span className="text-purple-600 font-black text-[10px] font-display">{i + 1}</span>
                </div>
              </div>

              {/* Card */}
              <div className="rounded-3xl p-6 lg:p-7 border border-gray-100 bg-gray-50/60 flex flex-col gap-3
                              transition-all duration-300 hover:shadow-xl hover:shadow-purple-100/50 hover:bg-white group">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{step.num}</span>
                  <h3 className="font-display font-bold text-gray-900 text-xl mt-1">{step.title}</h3>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.color}`} />
                  <span className="text-xs font-semibold text-purple-600">{step.highlight}</span>
                </div>
              </div>

              {/* Mobile vertical connector between steps */}
              {i < STEPS.length - 1 && (
                <div className="sm:hidden flex justify-center">
                  <div className="w-px h-8 rounded-full bg-gradient-to-b from-purple-500 to-purple-200" />
                </div>
              )}
            </motion.div>
          ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <a href="https://mrproblemshop.com/" className="btn-primary text-base">
            Start Booking Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}
