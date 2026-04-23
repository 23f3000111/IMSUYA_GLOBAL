import React from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowRight, Scale } from 'lucide-react'

const practiceLinks = [
  'Company Law',
  'Commercial Law',
  'Family Law & Succession',
  'Legal Advisory',
  'Contracts & Compliance',
  'Dispute Resolution',
]

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Practice Areas', href: '#practice' },
  { label: 'Why Us', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0a111f', color: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
      {/* Gold top border */}
      <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, #C9A227 30%, #E8D9A8 60%, transparent)' }} />

      {/* Decorative */}
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(201,162,39,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Main footer content */}
      <div className="section-wrap py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Logo + about */}
          <div className="lg:col-span-1">
            <img
              src="/N A ALI LOGO.png"
              alt="N.A. Ali & Company Advocates"
              style={{ height: '52px', marginBottom: '20px', filter: 'brightness(1.1)' }}
            />
            <p style={{
              color: 'rgba(248,250,252,0.5)', fontFamily: 'Manrope',
              fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '24px',
            }}>
              Professional legal representation grounded in integrity, client trust, and measurable results across Kenya.
            </p>
            <div className="flex gap-3">
              {['in', 'tw', 'fb'].map((s) => (
                <div
                  key={s}
                  style={{
                    width: 36, height: 36, borderRadius: '8px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.4)',
                    fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(201,162,39,0.1)'
                    e.currentTarget.style.color = '#C9A227'
                    e.currentTarget.style.borderColor = 'rgba(201,162,39,0.3)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.4)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: '20px' }}>
              Quick Links
            </h4>
            <div className="gold-line" style={{ marginBottom: '20px' }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'rgba(248,250,252,0.5)',
                      fontFamily: 'Manrope', fontSize: '0.875rem',
                      textDecoration: 'none',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => { e.target.style.color = '#C9A227' }}
                    onMouseLeave={(e) => { e.target.style.color = 'rgba(248,250,252,0.5)' }}
                  >
                    <ArrowRight size={12} style={{ color: '#C9A227', flexShrink: 0 }} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Practice Areas */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: '20px' }}>
              Practice Areas
            </h4>
            <div className="gold-line" style={{ marginBottom: '20px' }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {practiceLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#practice"
                    style={{
                      color: 'rgba(248,250,252,0.5)',
                      fontFamily: 'Manrope', fontSize: '0.875rem',
                      textDecoration: 'none',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => { e.target.style.color = '#C9A227' }}
                    onMouseLeave={(e) => { e.target.style.color = 'rgba(248,250,252,0.5)' }}
                  >
                    <Scale size={11} style={{ color: '#C9A227', flexShrink: 0 }} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: '1rem', color: '#F8FAFC', marginBottom: '20px' }}>
              Contact Us
            </h4>
            <div className="gold-line" style={{ marginBottom: '20px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: <Phone size={15} />, text: '+254 700 000 000', href: 'tel:+254700000000' },
                { icon: <Mail size={15} />, text: 'info@naali.co.ke', href: 'mailto:info@naali.co.ke' },
                { icon: <MapPin size={15} />, text: 'Nairobi, Kenya', href: '#' },
              ].map((item) => (
                <a
                  key={item.text}
                  href={item.href}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '12px',
                    color: 'rgba(248,250,252,0.5)',
                    fontFamily: 'Manrope', fontSize: '0.875rem',
                    textDecoration: 'none',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#E8D9A8' }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,250,252,0.5)' }}
                >
                  <span style={{ color: '#C9A227', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                  {item.text}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="btn-primary"
              style={{ marginTop: '28px', display: 'inline-flex', width: '100%', justifyContent: 'center', padding: '12px 20px' }}
            >
              Book Consultation
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px 24px' }}>
        <div className="section-wrap flex flex-col md:flex-row items-center justify-between gap-4">
          <p style={{ color: 'rgba(248,250,252,0.3)', fontFamily: 'Manrope', fontSize: '0.8rem' }}>
            © 2026 N.A. Ali Company & Advocates. All rights reserved.
          </p>
          <p style={{ color: 'rgba(248,250,252,0.3)', fontFamily: 'Manrope', fontSize: '0.8rem' }}>
            Trusted Legal Counsel • Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  )
}
