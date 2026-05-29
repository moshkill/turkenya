'use client'
import Link from 'next/link'

const services = [
  ['Safari Tours', '/safaris'],
  ['Air Ticketing', '/air-ticketing'],
  ['Car Hire', '/car-rental'],
  ['Hotel Booking', '/hotel-booking'],
  ['International Tours', '/international'],
  ['Pilgrimage Tours', '/pilgrimage-tours'],
  ['Medical Tourism', '/medical-tourism'],
  ['Airport Transfers', '/airport-transfers'],
  ['Conferences & MICE', '/conferences'],
  ['Logistics & Cargo', '/logistics'],
]

const company = [
  ['About Us', '/about'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
  ['Get a Quote', '/contact'],
]

export default function Footer() {
  return (
    <footer style={{ background: '#080808', fontFamily: "'Abel', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px 48px' }}>

        {/* Top section — CTA banner (glassmorphism) */}
        <div style={{
          background: 'rgba(255,240,0,0.1)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,240,0,0.2)',
          borderRadius: 20, padding: '56px 48px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 32, marginBottom: 80,
        }} className="footer-cta">
          <div>
            <h3 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, margin: 0 }}>
              Ready to Start Your Journey?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, marginTop: 12, marginBottom: 0 }}>
              Let us plan your perfect trip — safaris, flights, hotels, everything.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{
              background: '#fff000', color: '#0D0D0D',
              padding: '15px 36px', borderRadius: 100,
              fontSize: 14, fontWeight: 700, letterSpacing: '1px',
              textDecoration: 'none', textTransform: 'uppercase',
              transition: 'all 0.3s',
            }} className="footer-btn-primary">
              Send an Enquiry
            </Link>
            <a href="https://wa.me/254729888666" target="_blank" rel="noopener noreferrer" style={{
              background: '#25D366', color: '#fff',
              padding: '15px 36px', borderRadius: 100,
              fontSize: 14, fontWeight: 700, letterSpacing: '1px',
              textDecoration: 'none', textTransform: 'uppercase',
              border: 'none',
              transition: 'all 0.3s',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }} className="footer-btn-secondary">
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }} className="footer-grid">

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }} className="footer-brand">
            <img src="/logo.png" alt="Turkenya" style={{ height: 44, width: 'auto', marginBottom: 24 }} />
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, lineHeight: 1.8, maxWidth: 280, marginBottom: 28 }}>
              Creating unforgettable travel memories across East Africa and beyond since 2009.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {[['IATA', 'Licensed'], ['KATO', 'Member'], ['KWS', 'Certified']].map(([badge, sub]) => (
                <div key={badge} style={{
                  background: 'rgba(255,240,0,0.06)', border: '1px solid rgba(255,240,0,0.12)',
                  borderRadius: 8, padding: '8px 14px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: '#fff000', letterSpacing: 1 }}>{badge}</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {services.map(([label, href]) => (
                <Link key={href} href={href} className="footer-link" style={{
                  color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 15, transition: 'color 0.2s',
                }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {company.map(([label, href]) => (
                <Link key={label} href={href} className="footer-link" style={{
                  color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 15, transition: 'color 0.2s',
                }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 24, marginTop: 0 }}>Reach Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, marginBottom: 4 }}>ADDRESS</div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>3rd Floor, T-Mall<br />Nairobi West, Langata Road</p>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, marginBottom: 4 }}>PHONE</div>
                <a href="tel:+254729888666" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 15 }}>+254 729 888 666</a>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, marginBottom: 4 }}>EMAIL</div>
                <a href="mailto:info@turkenya.com" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 15 }}>info@turkenya.com</a>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', letterSpacing: 1, marginBottom: 4 }}>HOURS</div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, margin: 0 }}>Mon – Sat: 8am – 8pm EAT</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          marginTop: 64, paddingTop: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, margin: 0 }}>
            &copy; {new Date().getFullYear()} Turkenya Tours and Safaris Ltd. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: 12, margin: 0 }}>
            IATA Licensed Tour Operator &middot; Nairobi, Kenya
          </p>
        </div>
      </div>

    </footer>
  )
}
