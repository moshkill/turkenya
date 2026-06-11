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
  ['Medical Tourism', '/medical-tourism'],
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
    <footer style={{ background: '#060606', fontFamily: "'Abel', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '100px 40px 48px' }}>

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
