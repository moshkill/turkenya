'use client'
import Link from 'next/link'
import Icon from '../Icon'

const services = [
  ['Safari Tours', '/safaris'],
  ['Air Ticketing', '/air-ticketing'],
  ['Car Hire', '/car-rental'],
  ['Hotel Booking', '/hotel-booking'],
  ['International Tours', '/international'],
]

const moreServices = [
  ['Pilgrimage Tours', '/pilgrimage-tours'],
  ['Conferences & MICE', '/conferences'],
  ['Airport Transfers', '/airport-transfers'],
  ['Logistics & Cargo', '/logistics'],
]

const company = [
  ['About Us', '/about'],
  ['Blog', '/blog'],
  ['Reviews', '/testimonials'],
  ['Contact', '/contact'],
  ['Get a Quote', '/quote'],
]

export default function Footer() {
  return (
    <footer style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #060606 0%, #070604 62%, #0c0905 100%)', fontFamily: "'Abel', system-ui, sans-serif" }}>
      {/* warm dusk horizon glow — keeps the base from reading as flat black */}
      <div aria-hidden style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 380, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(125% 100% at 50% 100%, rgba(255,176,52,0.09) 0%, rgba(255,140,24,0.035) 32%, transparent 62%)' }} />
      {/* subtle savanna silhouette */}
      <svg aria-hidden viewBox="0 0 1440 320" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: 320, zIndex: 0, pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="savFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB23E" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#FFB23E" stopOpacity="0.13" />
          </linearGradient>
          <linearGradient id="savFadeSoft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF9E33" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#FF9E33" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        {/* distant hill */}
        <path d="M0,300 C200,286 420,296 640,290 C880,283 1080,298 1440,289 L1440,320 L0,320 Z" fill="url(#savFadeSoft)" />
        {/* small distant acacias */}
        <g fill="url(#savFadeSoft)" stroke="url(#savFadeSoft)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M430,292 L430,256 M430,266 L417,253 M430,263 L444,250" />
          <ellipse cx="430" cy="249" rx="30" ry="7" />
          <path d="M690,293 L690,262 M690,270 L679,259 M690,268 L702,256" />
          <ellipse cx="690" cy="256" rx="24" ry="6" />
        </g>
        {/* foreground ground */}
        <path d="M0,302 C260,280 360,290 560,284 C760,278 900,296 1120,286 C1280,279 1380,290 1440,285 L1440,320 L0,320 Z" fill="url(#savFade)" />
        {/* left acacia */}
        <g fill="url(#savFade)" stroke="url(#savFade)" strokeWidth="3.5" strokeLinecap="round">
          <path d="M250,294 L250,222 M250,240 L228,219 M250,234 L274,212" fill="none" />
          <ellipse cx="251" cy="210" rx="60" ry="13" />
          <ellipse cx="219" cy="217" rx="26" ry="8" />
          <ellipse cx="284" cy="216" rx="26" ry="8" />
        </g>
        {/* giraffe */}
        <g fill="url(#savFade)" stroke="url(#savFade)" strokeLinecap="round">
          <g strokeWidth="6">
            <path d="M958,288 L958,250" /><path d="M972,288 L972,250" />
            <path d="M1002,288 L1002,250" /><path d="M1016,288 L1016,250" />
          </g>
          <ellipse cx="987" cy="244" rx="38" ry="15" />
          <path d="M955,238 L944,232 L918,188 L912,180" fill="none" strokeWidth="11" />
          <path d="M912,182 L900,176 M912,180 L905,168" fill="none" strokeWidth="3" />
          <path d="M912,181 L898,184 L902,191" fill="none" strokeWidth="6" />
          <path d="M1023,240 L1030,262" fill="none" strokeWidth="2.5" />
        </g>
        {/* right acacia (largest) */}
        <g fill="url(#savFade)" stroke="url(#savFade)" strokeWidth="4.5" strokeLinecap="round">
          <path d="M1190,290 L1190,168 M1190,196 L1158,162 M1190,188 L1226,152" fill="none" />
          <ellipse cx="1192" cy="150" rx="94" ry="19" />
          <ellipse cx="1132" cy="160" rx="38" ry="11" />
          <ellipse cx="1256" cy="159" rx="40" ry="11" />
        </g>
        {/* birds */}
        <g fill="none" stroke="url(#savFade)" strokeWidth="2.5" strokeLinecap="round">
          <path d="M300,92 q9,-8 18,0 q9,-8 18,0" />
          <path d="M360,74 q7,-6 14,0 q7,-6 14,0" />
          <path d="M1040,70 q9,-8 18,0 q9,-8 18,0" />
        </g>
      </svg>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '100px 40px 48px' }}>

        {/* CTA Banner — Glassmorphism */}
        <div style={{
          background: 'rgba(255,240,0,0.1)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,240,0,0.2)',
          borderRadius: 24, padding: '56px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 32, marginBottom: 100,
        }} className="footer-cta">
          <div>
            <h3 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: 0 }}>
              Ready to Start Your Journey?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, marginTop: 12, marginBottom: 0 }}>
              Let us plan your perfect trip — safaris, flights, hotels, everything.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/quote" style={{
              background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
              padding: '15px 36px', borderRadius: 100,
              fontSize: 15, fontWeight: 700, letterSpacing: '1px',
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'all 0.3s',
            }} className="footer-btn-primary">
              Send an Enquiry
            </Link>
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{
              background: 'rgba(37,211,102,0.18)', color: '#fff', border: '1px solid rgba(37,211,102,0.5)', backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.16)',
              padding: '15px 36px', borderRadius: 100,
              fontSize: 15, fontWeight: 700, letterSpacing: '1px',
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'all 0.3s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }} className="footer-btn-secondary">
              <Icon name="whatsapp" size={16} /> WhatsApp Us
            </a>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1.2fr',
          gap: 40,
        }} className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <img src="/logo.png" alt="Turkenya" style={{ height: 48, width: 'auto', marginBottom: 20 }} />
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.8, maxWidth: 260, marginBottom: 24 }}>
              Creating unforgettable travel memories across East Africa and beyond since 2009.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['IATA', 'Licensed'], ['KATO', 'Member'], ['KWS', 'Certified']].map(([badge, sub]) => (
                <div key={badge} style={{
                  background: 'rgba(255,240,0,0.06)', border: '1px solid rgba(255,240,0,0.15)',
                  borderRadius: 8, padding: '8px 14px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#fff000', letterSpacing: 1 }}>{badge}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
            {/* quick-contact / social */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {([
                { icon: 'whatsapp', href: 'https://wa.me/254722666644', label: 'WhatsApp' },
                { icon: 'phone', href: 'tel:+254722666644', label: 'Call us' },
                { icon: 'mail', href: 'mailto:info@turkenya.com', label: 'Email us' },
              ] as const).map(s => (
                <a key={s.icon} href={s.href} target={s.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={s.label} title={s.label} className="footer-social" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', transition: 'all 0.2s' }}>
                  <Icon name={s.icon} size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Col 1 */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {services.map(([label, href]) => (
                <Link key={href} href={href} className="footer-link" style={{
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 16, transition: 'color 0.2s',
                }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Services Col 2 */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>More</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {moreServices.map(([label, href]) => (
                <Link key={href} href={href} className="footer-link" style={{
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 16, transition: 'color 0.2s',
                }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {company.map(([label, href]) => (
                <Link key={label} href={href} className="footer-link" style={{
                  color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 16, transition: 'color 0.2s',
                }}>{label}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>Reach Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#fff000', flexShrink: 0, marginTop: 2 }}><Icon name="map-pin" size={18} /></span>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.6, margin: 0 }}>3rd Floor, T-Mall<br />Nairobi West, Langata Road</p>
              </div>
              <a href="tel:+254722666644" style={{ display: 'flex', gap: 12, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 16 }}>
                <span style={{ color: '#fff000', flexShrink: 0 }}><Icon name="phone" size={18} /></span>+254 722 666 644
              </a>
              <a href="mailto:info@turkenya.com" style={{ display: 'flex', gap: 12, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 16 }}>
                <span style={{ color: '#fff000', flexShrink: 0 }}><Icon name="mail" size={18} /></span>info@turkenya.com
              </a>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ color: '#fff000', flexShrink: 0 }}><Icon name="clock" size={18} /></span>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, margin: 0 }}>Mon – Sat: 8am – 8pm EAT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginTop: 80, paddingTop: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14, margin: 0 }}>
            &copy; {new Date().getFullYear()} Turkenya Tours and Safaris Ltd. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, margin: 0 }}>
IATA Travel Agent &middot; KATO Member &middot; Nairobi, Kenya
          </p>
        </div>
      </div>
    </footer>
  )
}
