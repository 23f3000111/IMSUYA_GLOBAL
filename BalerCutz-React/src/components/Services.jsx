import { motion } from 'framer-motion'
import { fadeUp, stagger } from '../animations'

const services = [
  {
    num: '01',
    name: 'HAIRCUT',
    price: 'From RM 35',
    desc: 'Expert cuts tailored to your face shape and personal style. Consultation, wash, cut, and precision styling included.',
    featured: false,
  },
  {
    num: '02',
    name: 'MVP PACKAGE',
    price: 'From RM 65',
    desc: 'The complete championship experience — precision cut, zero fade mastery, premium product finish. Walk out undefeated.',
    featured: true,
    badge: '★ Signature',
  },
  {
    num: '03',
    name: 'BEARD DESIGN',
    price: 'From RM 25',
    desc: 'Precision sculpting and clean lines to keep your beard sharp, defined, and perfectly proportioned.',
    featured: false,
  },
  {
    num: '04',
    name: 'HAIR COLOURING',
    price: 'From RM 80',
    desc: 'Professional colour from subtle highlights to bold transformations, applied with expert technique.',
    featured: false,
  },
  {
    num: '05',
    name: 'SCALP CARE',
    price: 'From RM 55',
    desc: 'Targeted scalp treatment to nourish, cleanse, and revitalise. Great hair starts at the root.',
    featured: false,
  },
  {
    num: '06',
    name: 'FACE CARE',
    price: 'From RM 45',
    desc: 'Premium facial treatment to hydrate, clean, and refresh. Look sharp from cut to complexion.',
    featured: false,
  },
]

const ServiceCard = ({ s, i }) => (
  <motion.div
    variants={fadeUp}
    custom={i}
    className={`group relative border p-8 flex flex-col gap-3 transition-all duration-400 ${
      s.featured
        ? 'border-gold/50 bg-gradient-to-br from-card to-[#1a1608]'
        : 'border-white/[0.07] bg-card hover:border-gold/30'
    }`}
  >
    {/* Left accent bar that grows on hover */}
    <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-gold transition-all duration-500 ${s.featured ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />

    {s.badge && (
      <span className="self-start bg-gold text-void text-[0.6rem] font-bold tracking-[0.3em] uppercase px-3 py-1">
        {s.badge}
      </span>
    )}

    <span className="section-label text-white/20">{s.num}</span>
    <h3 className={`font-display text-2xl tracking-wide ${s.featured ? 'text-gold' : 'text-white'}`}>
      {s.name}
    </h3>
    <p className={`font-display italic text-base ${s.featured ? 'text-gold/80' : 'text-gold/60'}`}>
      {s.price}
    </p>
    <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
  </motion.div>
)

const Services = () => (
  <section id="services" className="bg-void-2 py-28 lg:py-36">
    <div className="max-w-[1200px] mx-auto px-7">

      {/* Header */}
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16"
      >
        <div>
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-4">
            <span className="section-label">02</span>
            <span className="w-6 h-px bg-gold/40" />
            <span className="section-label">What We Offer</span>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="font-display font-bold text-[clamp(2.4rem,5vw,3.8rem)] leading-tight text-white">
            Our <span className="italic text-gold">Services</span>
          </motion.h2>
        </div>
        <motion.a
          variants={fadeUp}
          custom={2}
          href="https://balrcutz.setmore.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold self-start sm:self-auto whitespace-nowrap"
        >
          Book a Service
        </motion.a>
      </motion.div>

      {/* Grid */}
      <motion.a
        href='https://balrcutz.setmore.com/book'
        target='blanck'
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {services.map((s, i) => <ServiceCard key={s.num} s={s} i={i} />)}
      </motion.a>
    </div>
  </section>
)

export default Services
