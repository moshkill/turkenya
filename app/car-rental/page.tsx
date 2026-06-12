export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Icon from '@/components/Icon'
import BookingButton from '@/components/BookingButton'
import HeroVideo from '@/components/HeroVideo'
import HireOptions from '@/components/HireOptions'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Car Hire & VIP Chauffeur Nairobi | Turkenya',
  description: 'Corporate car hire contracts (days to 2 years), executive VIP Prados & Range Rovers, self-drive individual hire, wedding fleets and airport transfers in Nairobi. 200+ vehicles, vetted chauffeurs.',
}

const fleet = [
  { name: 'Toyota Land Cruiser V8', cat: '4x4 Safari', price: 'KES 12,000/day', seats: 7, img: '/images/fleet-v8.jpg', features: ['Self-drive or Chauffeur', 'Roof hatch pop-up', 'All parks rated', 'GPS included'] },
  { name: 'Toyota Prado TX', cat: '4x4 Mid-Range', price: 'KES 8,500/day', seats: 7, img: '/images/fleet-prado.jpg', features: ['4WD', 'Air conditioning', 'Spacious boot', 'Upcountry ready'] },
  { name: 'Toyota Hiace Van', cat: 'Group Shuttle', price: 'KES 7,000/day', seats: 14, img: '/images/fleet-hiace.jpg', features: ['14 seats', 'Airport runs', 'Luggage rack', 'Group bookings'] },
  { name: 'Toyota Corolla', cat: 'City Saloon', price: 'KES 3,500/day', seats: 5, img: '/images/fleet-corolla.jpg', features: ['Fuel efficient', 'Air conditioning', 'City driving', 'Economy rate'] },
  { name: 'Toyota RAV4', cat: 'Compact 4x4', price: 'KES 6,000/day', seats: 5, img: 'https://images.unsplash.com/photo-1706509234538-9831b1b33d66?w=600&q=80&fit=crop', features: ['AWD', 'Business travel', 'Comfortable ride', 'Semi off-road'] },
  { name: 'Rosa Coaster Bus', cat: 'Large Group', price: 'KES 15,000/day', seats: 29, img: 'https://images.unsplash.com/photo-1642325017820-d081feea1969?w=600&q=80&fit=crop', features: ['29 seats', 'Church groups', 'School trips', 'Luggage hold'] },
]

const corporatePerks = [
  'Contracts from 3 days to 2 years',
  'Dedicated, vetted chauffeurs',
  'Guaranteed relief vehicle on breakdown',
  'Monthly consolidated invoicing',
  'Optional company branding',
  'Nationwide pickup & delivery',
]

export default function CarRentalPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero — image placeholder first, fleet video fades in once fully loaded */}
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <HeroVideo src="/videos/car-hire.mp4" poster="/images/hire-corporate.jpg" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Car Hire</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>
            Executive Fleet,<br />On Your Terms
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: '0 0 32px' }}>
            Corporate contracts, VIP chauffeur, self-drive, weddings & airport transfers — 200+ vehicles across Kenya.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <BookingButton flowKey="car-hire" label="Get a Quote" className="glass-cta" style={{ padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }} />
            <a href="tel:+254722666644" className="glass-ghost" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>Call Us</a>
          </div>
        </div>
      </section>

      {/* Stats — Glassmorphism */}
      <div style={{ position: 'relative', marginTop: -48, zIndex: 5, padding: '0 24px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          background: 'rgba(255,240,0,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,240,0,0.2)', borderRadius: 20, padding: '0 20px',
          display: 'flex', flexWrap: 'wrap',
        }}>
          {[{ v: '200+', l: 'Vehicles' }, { v: '15+', l: 'Years Experience' }, { v: '24/7', l: 'Breakdown Support' }, { v: 'Insured', l: 'Comprehensive Cover' }].map((s, i) => (
            <div key={i} style={{ flex: '1 1 140px', minWidth: 0, padding: '28px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,240,0,0.15)' : 'none' }}>
              <div style={{ fontSize: 'clamp(24px, 2.5vw, 38px)', fontWeight: 900, lineHeight: 1, fontFamily: "'Urbanist', sans-serif", color: 'rgb(235,235,235)' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Ways to Hire */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '130px 40px 0' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Ways to Hire</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 12px' }}>How Would You Like to Ride?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 560, lineHeight: 1.7, margin: 0 }}>Tap an option for the details — corporate is what we do best.</p>
        </div>
        <HireOptions />
      </section>

      {/* Fleet */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Fleet</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Choose Your Vehicle</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {fleet.map(v => (
            <div key={v.name} className="hover-lift" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <img src={v.img} alt={v.name} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
                  <span style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '4px 12px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, borderRadius: 100 }}>{v.cat}</span>
                  <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px', fontSize: 10, fontWeight: 700, borderRadius: 100, backdropFilter: 'blur(4px)' }}>{v.seats} seats</span>
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>{v.name}</h3>
                  <span style={{ color: '#fff000', fontWeight: 800, fontSize: 16 }}>{v.price}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                  {v.features.map(f => <li key={f} style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: '#fff000', fontSize: 14 }}>&#10003;</span>{f}</li>)}
                </ul>
                <BookingButton flowKey="car-hire" label="Book This Vehicle" initial={{ vehicle: v.name }} className="glass-cta" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '13px', fontWeight: 700, fontSize: 14, letterSpacing: 2, borderRadius: 100, textTransform: 'uppercase' }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Divider */}
      <div style={{ position: 'relative', height: 350, overflow: 'hidden' }}>
        <img src="/images/open-road.jpg" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-20%', width: '100%', height: '140%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.65) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
          <p style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            &ldquo;The open road is the best way to experience Kenya&rdquo;
          </p>
        </div>
      </div>

      {/* Corporate & Long-Term Hire */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ height: 1, width: 32, background: '#fff000' }} />
                <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Corporate Fleet</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px' }}>Long-Term Hire for Businesses</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.8, margin: '0 0 32px', maxWidth: 520 }}>
                Prados, Land Cruiser V8s, executive Range Rovers and Mercedes, crew vans and field pickups — on flexible contracts from a few days to multi-year. We keep your people moving with vetted chauffeurs and a guaranteed relief vehicle if anything goes wrong.
              </p>
              <BookingButton flowKey="car-hire" label="Request a Corporate Quote" className="glass-cta" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {corporatePerks.map((c, i) => (
                <div key={i} data-reveal style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#fff000', flexShrink: 0, fontSize: 16 }}><Icon name="check" size={14} stroke={2.5} style={{display:"inline",verticalAlign:"-2px"}} /></span>
                  <span style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', fontWeight: 600, lineHeight: 1.4 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Need Wheels in Kenya?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Tell us your vehicle, dates and pickup point — we confirm availability and the best rate within 2 hours.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BookingButton flowKey="car-hire" label="Get a Quote" className="glass-cta" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
