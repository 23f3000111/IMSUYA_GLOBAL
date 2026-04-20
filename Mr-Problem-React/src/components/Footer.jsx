import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube, Twitter, ArrowUpRight } from 'lucide-react'

const SERVICES_LIST = [
  'House Cleaning', 'Aircond Service', 'Deep Cleaning',
  'Plumbing', 'Electrical', 'Handyman',
  'Sofa Cleaning', 'Office Cleaning',
]

const QUICK_LINKS = [
  { label: 'About Us',        href: 'https://mrproblemshop.com/' },
  { label: 'Our Services',    href: '#services'                  },
  { label: 'How It Works',    href: '#how-it-works'              },
  { label: 'Reviews',         href: '#testimonials'              },
  { label: 'FAQ',             href: '#faq'                       },
  { label: 'Book a Service',  href: 'https://mrproblemshop.com/' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#07001A' }}>

      {/* Main grid */}
      <div className="section-wrap pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >

          {/* Brand column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
                <img src="/images/logo.avif" alt="Mr Problem" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-display font-black text-lg">Mr Problem</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Klang Valley's most trusted home services brand. Professional, insured, and always on time.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-1">
              {[
                { icon: Facebook,  href: 'https://www.facebook.com/mrproblemsdnbhd',   label: 'Facebook'  },
                { icon: Instagram, href: 'https://www.instagram.com/mrproblemshopcom/', label: 'Instagram' },
                { icon: Youtube,   href: 'https://www.youtube.com/@mrproblemshopcom',   label: 'YouTube'   },
                { icon: Twitter,   href: 'https://x.com/mrproblemshop',                 label: 'X'         },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href}
                  className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/50
                             hover:border-purple-500 hover:text-purple-400 transition-all duration-300">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {SERVICES_LIST.map(s => (
                <li key={s}>
                  <a href="https://mrproblemshop.com/"
                    className="text-white/45 text-sm hover:text-purple-400 transition-colors duration-200 flex items-center gap-1.5 group">
                    {s}
                    <ArrowUpRight size={11}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    className="text-white/45 text-sm hover:text-purple-400 transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest">Contact</h4>
            <div className="flex flex-col gap-4">
              {/* Location - clickable Google Maps link */}
              <a
                href="https://www.google.com/maps/place/Mr+Problem+(Petaling+Jaya+HQ)/@3.1167847,101.5946434,754m/data=!3m2!1e3!4b1!4m6!3m5!1s0x31cc4dd9f431674f:0x9b933192d8f07fca!8m2!3d3.1167847!4d101.5946434!16s%2Fg%2F11kfg_xr0q"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(124,58,237,0.2)' }}>
                  <MapPin size={14} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-white/30 text-[11px] uppercase tracking-wider">Petaling Jaya HQ</div>
                  <div className="text-white/70 text-sm mt-0.5 group-hover:text-purple-300 transition-colors duration-200">
                    Klang Valley, Malaysia
                  </div>
                  <div className="text-purple-400/70 text-[11px] mt-0.5 flex items-center gap-1">
                    <span>View on Google Maps</span>
                    <span className="text-[10px]">↗</span>
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a href="tel:0187888677" className="flex gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(124,58,237,0.2)' }}>
                  <Phone size={14} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-white/30 text-[11px] uppercase tracking-wider">WhatsApp / Call</div>
                  <div className="text-white/70 text-sm mt-0.5 group-hover:text-purple-300 transition-colors duration-200">018-7888 677</div>
                </div>
              </a>

              {/* Email */}
              <a href="mailto:hello@mrproblem.my" className="flex gap-3 group">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(124,58,237,0.2)' }}>
                  <Mail size={14} className="text-purple-400" />
                </div>
                <div>
                  <div className="text-white/30 text-[11px] uppercase tracking-wider">Email Us</div>
                  <div className="text-white/70 text-sm mt-0.5 group-hover:text-purple-300 transition-colors duration-200">hello@mrproblem.my</div>
                </div>
              </a>
            </div>

            {/* Book CTA */}
            <a href="https://mrproblemshop.com/"
              className="mt-2 flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #A855F7)' }}>
              Book a Service
              <ArrowUpRight size={14} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="section-wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Mr Problem (M) Sdn Bhd. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service'].map(t => (
              <a key={t} href="https://mrproblemshop.com/"
                className="text-white/25 text-xs hover:text-white/50 transition-colors">
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
