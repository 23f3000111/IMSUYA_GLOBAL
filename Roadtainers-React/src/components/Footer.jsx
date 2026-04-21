import { Truck, Phone, Mail, MapPin, ArrowRight, Linkedin, Twitter, Facebook } from 'lucide-react';

const SITE = 'https://www.roadtainers.co.ke/';

const serviceLinks = [
  'Heavy Transport', 'Container Haulage', 'Transit Yard', 'Warehousing',
  'Tanker Services', 'Cranes & Lifting', 'Cross Border', 'Fleet Workshop',
];

const quickLinks = [
  { label: 'Fleet', href: '#fleet' },
  { label: 'Network', href: '#network' },
  { label: 'Industries', href: '#industries' },
  { label: 'About Us', href: '#why-us' },
  { label: 'Contact', href: SITE },
  { label: 'Request Quote', href: SITE },
];

export default function Footer() {
  return (
    <footer className="bg-[#03150C] text-white">
      {/* Top section */}
      <div className="container-xl py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <a href={SITE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-5 group">
              <img src="/images/Roadtainers_logo.jpg" alt="Roadtainers" className="h-10 w-auto object-contain" />
            </a>

            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Roadtainers is a trusted logistics partner powering cargo movement across East Africa
              since 1998. Heavy transport, containers, tankers and more.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: SITE },
                { icon: Twitter,  href: SITE },
                { icon: Facebook, href: SITE },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-brand-green hover:text-white hover:border-brand-green transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Services</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href={SITE}
                    target="_blank" rel="noopener noreferrer"
                    className="text-white/50 text-sm hover:text-brand-yellow flex items-center gap-2 group transition-colors duration-200"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-200" />
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-white/50 text-sm hover:text-brand-yellow flex items-center gap-2 group transition-colors duration-200"
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all duration-200" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+254000000000" className="flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300">
                    <Phone size={14} />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 mb-0.5 font-medium uppercase tracking-wider">Phone</div>
                    <div className="text-sm">+254 700 000 000</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@roadtainers.co.ke" className="flex items-start gap-3 text-white/50 hover:text-white transition-colors duration-200 group">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-green group-hover:border-brand-green transition-all duration-300">
                    <Mail size={14} />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 mb-0.5 font-medium uppercase tracking-wider">Email</div>
                    <div className="text-sm">info@roadtainers.co.ke</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <div className="text-xs text-white/30 mb-0.5 font-medium uppercase tracking-wider">Location</div>
                    <div className="text-sm">Nairobi, Kenya</div>
                    <div className="text-xs text-white/30">Serving East Africa</div>
                  </div>
                </div>
              </li>
            </ul>

            {/* CTA */}
            <a
              href="#contact"
              className="mt-6 flex items-center justify-center gap-2 bg-brand-green text-white font-bold px-5 py-3 rounded-xl text-sm shine-btn hover:bg-brand-deep transition-all duration-300"
            >
              Request a Quote <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            © {new Date().getFullYear()} Roadtainers Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((l) => (
              <a key={l} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
