import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section id="about" ref={ref} className="section-pad bg-[#FFF8EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT: Image block */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative h-[460px] md:h-[580px] rounded-3xl overflow-hidden">
              <motion.img
                style={{ y: imgY }}
                src="/images/Toastiful_3.jpg"
                alt="Toastiful cafe exterior"
                className="absolute inset-0 w-full h-[115%] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A3E36]/20 to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl p-5 shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#5BC8C1]/15 flex items-center justify-center">
                  <span className="text-2xl">🧀</span>
                </div>
                <div>
                  <div className="font-playfair font-bold text-xl text-[#111827]">4-Cheese Blend</div>
                  <div className="font-manrope text-xs text-[#6B7280]">In every signature toastie</div>
                </div>
              </div>
            </motion.div>

            {/* Teal decorative shape */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-[#5BC8C1]/20 blur-xl pointer-events-none" />
          </motion.div>

          {/* RIGHT: Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#5BC8C1]" />
              <span className="font-manrope text-xs text-[#5BC8C1] tracking-[0.25em] uppercase font-semibold">
                Our Story
              </span>
            </div>

            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#111827] leading-tight mb-6">
              A Cozy Hidden Gem
              <span className="block italic text-[#5BC8C1]">Worth Finding.</span>
            </h2>

            <p className="font-manrope text-lg text-[#6B7280] leading-relaxed mb-6">
              Tucked in Damansara Uptown, Toastiful has become a local favorite
              for breakfast and lunch lovers seeking crispy sourdough toasties,
              quality coffee, and comforting flavors in a warm intimate space.
            </p>

            <p className="font-manrope text-base text-[#6B7280] leading-relaxed mb-10">
              Every toastie is pressed to golden perfection on thick sourdough,
              filled generously with premium ingredients and our signature four-cheese
              blend that delivers that irresistible molten pull on every bite.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { value: '5.0', label: 'Google Rating' },
                { value: '100+', label: 'Happy Reviews' },
                { value: '8+', label: 'Toastie Flavors' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-playfair text-3xl font-bold text-[#5BC8C1] mb-1">
                    {stat.value}
                  </div>
                  <div className="font-manrope text-xs text-[#6B7280] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
