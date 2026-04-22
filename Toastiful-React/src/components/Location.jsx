import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, Instagram } from 'lucide-react';

const hours = [
  { day: 'Monday – Friday', time: '7:30 AM – 3:30 PM', open: true },
  { day: 'Saturday', time: '9:00 AM – 5:00 PM', open: true },
  { day: 'Sunday', time: 'Closed', open: false },
];

export default function Location() {
  return (
    <section id="location" className="section-pad bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-0.5 bg-[#5BC8C1]" />
              <span className="font-manrope text-xs text-[#5BC8C1] tracking-[0.25em] uppercase font-semibold">
                Find Us
              </span>
            </div>

            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#111827] leading-tight mb-8">
              Come Find Your
              <span className="block italic text-[#5BC8C1]">New Favorite Spot.</span>
            </h2>

            {/* Address */}
            <div className="flex items-start gap-4 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-[#5BC8C1]/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#5BC8C1] transition-colors duration-300">
                <MapPin size={18} className="text-[#5BC8C1] group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="font-manrope font-semibold text-[#111827] mb-1">Address</div>
                <div className="font-manrope text-[#6B7280] leading-relaxed">
                  127, Jalan SS 21/37,<br />
                  Damansara Utama,<br />
                  Petaling Jaya, Malaysia
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#5BC8C1]/15 flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[#5BC8C1]" />
              </div>
              <div className="flex-1">
                <div className="font-manrope font-semibold text-[#111827] mb-3">Opening Hours</div>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div key={h.day} className="flex items-center justify-between py-2 border-b border-[#F3F4F6] last:border-0">
                      <span className="font-manrope text-sm text-[#6B7280]">{h.day}</span>
                      <span
                        className={`font-manrope text-sm font-semibold ${
                          h.open ? 'text-[#5BC8C1]' : 'text-[#EF4444]'
                        }`}
                      >
                        {h.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.google.com/maps/place/Toastiful/@3.132431,101.6176802,15.27z/data=!4m15!1m8!3m7!1s0x31cc49000dc10973:0x9845e5208091467f!2sToastiful!8m2!3d3.1334936!4d101.6239609!10e9!16s%2Fg%2F11w8f8l0rd!3m5!1s0x31cc49000dc10973:0x9845e5208091467f!8m2!3d3.1334936!4d101.6239609!16s%2Fg%2F11w8f8l0rd?entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-teal flex items-center gap-2"
              >
                <Navigation size={16} />
                Get Directions
              </a>
              <a
                href="tel:+60"
                className="btn-outline-teal flex items-center gap-2"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Map embed + visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.12)] h-[400px] md:h-[500px] border-4 border-white">
              <iframe
                title="Toastiful Location"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15935.428535325584!2d101.6176802!3d3.132431!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc49000dc10973%3A0x9845e5208091467f!2sToastiful!5e0!3m2!1sen!2sin!4v1776792011033!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address card overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-5 left-6 right-6 bg-white rounded-2xl p-5 shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-[#5BC8C1] flex items-center justify-center shrink-0">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <div className="font-playfair font-semibold text-[#111827]">Toastiful</div>
                <div className="font-manrope text-xs text-[#6B7280]">
                  127 Jalan SS 21/37, Damansara Uptown, PJ
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="font-manrope text-xs text-green-600 font-semibold">Open Now</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
