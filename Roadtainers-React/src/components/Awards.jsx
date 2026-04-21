import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Star, Globe, Shield, ExternalLink } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

const awards = [
  {
    icon: Shield,
    title: 'Road Safety Award',
    year: '2010',
    body: 'Kenya Roads Board',
    desc: 'Recognised for outstanding commitment to road safety standards, driver training, and accident-free operations across East African corridors.',
    accent: '#0F7B46',
    bg: '#ecfdf5',
  },
  {
    icon: Globe,
    title: 'International Transport Award',
    subtitle: '13th New Millennium Award',
    year: '2010',
    body: 'Trade Leaders Club — Madrid, Spain',
    desc: "Selected through periodic consultation of 14,000 members across 120 countries as one of the world's most deserving transport companies.",
    accent: '#FACC15',
    bg: '#fffbeb',
  },
  {
    icon: Award,
    title: 'Gold Medal for Business Excellence',
    year: 'Oct 5, 2010',
    body: 'Trade Leaders Club — Madrid, Spain',
    desc: 'Founder Mr. Ibrahim Pasta received the Gold Medal for Business in Excellence at the international function in Madrid, Spain.',
    accent: '#F59E0B',
    bg: '#fff7ed',
  },
  {
    icon: Star,
    title: "Kenya's Most Efficient Transport Company",
    year: 'Current',
    body: 'Industry Recognition',
    desc: 'Consistently recognised as the most efficient transport company in Kenya, setting the benchmark for reliability, speed and safety.',
    accent: '#3B82F6',
    bg: '#eff6ff',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Awards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section id="awards" className="section-pad bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-xl relative z-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="badge bg-yellow-100 text-yellow-700 mb-4">
            <Award size={12} fill="currentColor" />
            Awards &amp; Achievements
          </span>
          <h2 className="heading-lg text-brand-dark mb-5">
            Recognised Globally.{' '}
            <span className="text-gradient-yellow">Trusted Locally.</span>
          </h2>
          <p className="text-brand-gray text-lg leading-relaxed">
            Over 25 years of excellence in East African transport — recognised by international
            trade bodies, safety organisations and industry peers.
          </p>
          {/* Decorative line */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-6"
            initial={{ scaleX: 0 }} animate={headerInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-brand-yellow" />
            <Star size={16} className="text-brand-yellow" fill="currentColor" />
            <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-brand-yellow" />
          </motion.div>
        </motion.div>

        {/* Award cards grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {awards.map((award, i) => (
            <motion.div
              key={i}
              variants={card}
              whileHover={{ y: -10, boxShadow: `0 24px 50px ${award.accent}22, 0 6px 16px rgba(0,0,0,0.08)` }}
              transition={{ type: 'spring', stiffness: 280, damping: 18 }}
              className="relative rounded-3xl border border-gray-100 overflow-hidden cursor-pointer"
              style={{ background: award.bg }}
            >
              {/* Top accent bar */}
              <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${award.accent}90, ${award.accent})` }} />

              <div className="p-6">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                  style={{ backgroundColor: `${award.accent}18`, border: `1.5px solid ${award.accent}30` }}>
                  <award.icon size={26} style={{ color: award.accent }} />
                </div>

                {/* Year badge */}
                <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider"
                  style={{ backgroundColor: `${award.accent}15`, color: award.accent }}>
                  {award.year}
                </span>

                {/* Title */}
                <h3 className="font-extrabold text-brand-dark text-base leading-snug mb-1">{award.title}</h3>
                {award.subtitle && (
                  <p className="text-[0.8rem] font-semibold mb-2" style={{ color: award.accent }}>{award.subtitle}</p>
                )}

                {/* Body / source */}
                <p className="text-[0.75rem] text-brand-gray font-semibold uppercase tracking-wider mb-3">{award.body}</p>

                {/* Description */}
                <p className="text-brand-gray text-sm leading-relaxed">{award.desc}</p>
              </div>

              {/* Bottom glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl"
                style={{ backgroundColor: award.accent }} />
            </motion.div>
          ))}
        </motion.div>

        {/* Featured quote / highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-deep via-brand-green to-brand-deep p-1"
        >
          <div className="bg-white rounded-[22px] p-8 lg:p-12">
            <div className="max-w-4xl mx-auto text-center">
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-brand-yellow" fill="currentColor" />
                ))}
              </div>

              <blockquote className="text-xl lg:text-2xl font-semibold text-brand-dark leading-relaxed mb-6 italic">
                "It is a big honour for our company to be recognized after 12 years of hard work
                and dedication to offering the best transport solution in the country."
              </blockquote>

              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <Award size={22} className="text-brand-green" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-brand-dark">Mr. Yusuf Pasta</p>
                  <p className="text-brand-gray text-sm">Director, Roadtainers (Mombasa) Ltd</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-brand-green" />
                  <span className="text-sm text-brand-gray">
                    <span className="font-semibold text-brand-dark">Trade Leaders Club</span> — 14,000 Members in 120 Countries
                  </span>
                </div>
                <div className="h-5 w-px bg-gray-200 hidden sm:block" />
                <a href={SITE} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green hover:text-brand-deep transition-colors">
                  Learn More <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
