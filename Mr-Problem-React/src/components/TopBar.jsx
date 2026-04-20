import { Facebook, Instagram, Youtube, Twitter, Phone, Mail } from 'lucide-react'

const SOCIALS = [
  { icon: Facebook,  href: 'https://www.facebook.com/mrproblemsdnbhd',   label: 'Facebook'  },
  { icon: Instagram, href: 'https://www.instagram.com/mrproblemshopcom/', label: 'Instagram' },
  { icon: Youtube,   href: 'https://www.youtube.com/@mrproblemshopcom',   label: 'YouTube'   },
  { icon: Twitter,   href: 'https://x.com/mrproblemshop',                 label: 'X'         },
]

export default function TopBar() {
  return (
    <div
      className="fixed top-0 inset-x-0 z-[60] h-9 flex items-center"
      style={{ background: 'linear-gradient(90deg, #1a0550, #2D0B7A, #1a0550)' }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full flex items-center justify-between gap-4">

        {/* Contact — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:0187888677"
            className="flex items-center gap-1.5 text-purple-200 text-[11px] hover:text-white transition-colors duration-200"
          >
            <Phone size={10} />
            018-7888 677
          </a>
          <span className="text-purple-600 text-xs">|</span>
          <a
            href="mailto:hello@mrproblem.my"
            className="flex items-center gap-1.5 text-purple-200 text-[11px] hover:text-white transition-colors duration-200"
          >
            <Mail size={10} />
            hello@mrproblem.my
          </a>
        </div>

        {/* Mobile tagline */}
        <span className="sm:hidden text-purple-300 text-[10px] font-medium tracking-wide">
          Klang Valley&apos;s Trusted Home Services
        </span>

        {/* Social icons */}
        <div className="flex items-center gap-3.5 ml-auto">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-purple-300 hover:text-white transition-colors duration-200"
            >
              <Icon size={13} />
            </a>
          ))}
        </div>

      </div>
    </div>
  )
}
