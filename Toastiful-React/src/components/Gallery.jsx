import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

// Assign images in a masonry pattern
const galleryItems = [
  { src: '/images/Toastiful_2.jpg', alt: 'Toastie close-up', tall: true },
  { src: '/images/Toastiful_5.jpg', alt: 'Matcha latte', tall: false },
  { src: '/images/Toastiful_7.jpg', alt: 'Orange espresso', tall: false },
  { src: '/images/Toastiful_1.jpg', alt: 'Toastie and coffee', tall: false },
  { src: '/images/Toastiful_4.jpg', alt: 'Matcha drink', tall: true },
  { src: '/images/Toastiful_6.jpg', alt: 'Chocolate matcha', tall: false },
  { src: '/images/Toastiful_3.jpg', alt: 'Cafe exterior', tall: false },
];

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-[#FFF8EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[#5BC8C1]" />
            <span className="font-manrope text-xs text-[#5BC8C1] tracking-[0.25em] uppercase font-semibold">
              Instagram
            </span>
            <div className="w-8 h-0.5 bg-[#5BC8C1]" />
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#111827] mb-2">
            From Our Kitchen, to Your Feed.
          </h2>
          <p className="font-manrope text-base text-[#6B7280]">
            Follow us @toastiful
          </p>
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryItems.map((item, i) => (
            <motion.a
              key={i}
              href="https://www.instagram.com/toastiful/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl break-inside-avoid cursor-pointer block"
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  item.tall ? 'h-80 md:h-96' : 'h-52 md:h-64'
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#5BC8C1]/80 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-center">
                <div className="text-center text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                  <Instagram size={28} className="mx-auto mb-2" />
                  <span className="font-manrope text-sm font-semibold">@toastiful</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Follow button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/toastiful/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-outline-teal"
          >
            <Instagram size={16} />
            Follow on Instagram (@toastiful)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
