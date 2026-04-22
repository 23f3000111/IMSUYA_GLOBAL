import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="section-pad bg-[#111827] relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-[#5BC8C1]/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D4A373]/10 blur-3xl translate-x-1/2 translate-y-1/2" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#5BC8C1 1px, transparent 1px), linear-gradient(90deg, #5BC8C1 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Toast image floating */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-80 rounded-3xl overflow-hidden opacity-20 hidden lg:block">
        <img
          src="/images/Toastiful_2.jpg"
          alt="Toastie"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#5BC8C1]/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#5BC8C1] animate-pulse" />
            <span className="font-manrope text-xs text-[#5BC8C1] tracking-widest uppercase font-semibold">
              Open Weekdays from 7:30 AM
            </span>
          </div>

          <h2 className="font-playfair text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight mb-6">
            Ready for Your Next
            <span className="block italic text-[#5BC8C1]">Favorite Bite?</span>
          </h2>

          <p className="font-manrope text-lg text-white/60 leading-relaxed max-w-2xl mx-auto mb-10">
            Visit Toastiful for crispy sourdough toasties, rich specialty coffee and premium
            matcha in the heart of Damansara Uptown.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://maps.google.com/?q=Toastiful+Damansara+Uptown"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-teal flex items-center gap-2 text-base px-8 py-4"
            >
              Visit Today <ArrowRight size={18} />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-teal border-white/30 text-white hover:border-[#5BC8C1] text-base px-8 py-4"
            >
              See Menu
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
