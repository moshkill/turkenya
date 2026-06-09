export const dynamic = 'force-dynamic'
import Link from 'next/link'
import BookingButton from '@/components/BookingButton'
import DestinationShowcase from '@/components/DestinationShowcase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'International Holiday Packages from Kenya — Dubai, Istanbul, Maldives | Turkenya',
  description: 'Book international holiday packages from Nairobi. Dubai from $1,200, Istanbul from $1,100, Maldives from $2,500. Visa, flights, hotel & transfers included. IATA accredited.',
}

const included = [
  { title: 'Visa Assistance', desc: 'Full guidance through the visa process for any destination' },
  { title: 'Flight Booking', desc: 'Best fares on all airlines, all routes from Kenya' },
  { title: 'Curated Hotels', desc: 'Hand-picked stays at every budget level' },
  { title: 'All Transfers', desc: 'Airport pickups, hotel check-ins, seamless' },
]

const whyIntl = [
  { t: 'IATA Wholesale Airfares', d: 'As an accredited agent we price your flights at confidential fares — often 10–30% below what you’d find booking the holiday yourself.' },
  { t: 'Visa Expertise', d: 'Schengen, UK, US, Dubai, Turkey, China — we know the paperwork, the appointments and the pitfalls, and we guide you through every one.' },
  { t: 'Group & Honeymoon Departures', d: 'Family reunions, church groups, incentive trips or a private honeymoon — we tailor the package and the pace to your party.' },
  { t: 'Book From Anywhere', d: 'In London, Dubai or New York? Plan and pay securely from abroad while we coordinate flights, hotels and transfers on the ground.' },
]

export default function InternationalPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline className="hero-entrance" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/dubai.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>International Tours</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 700 }}>
            The World<br />is Waiting
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: '0 0 32px' }}>
            Visa. Flights. Hotel. Transfers. You just pack — we handle everything else.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <BookingButton flowKey="international" label="Plan My Trip" className="glass-cta" style={{ padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }} />
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {included.map((item) => (
            <div key={item.title} style={{ padding: '36px 28px', background: '#0a0a0a', textAlign: 'center' }}>
              <h4 style={{ color: '#fff000', fontSize: 12, fontWeight: 700, letterSpacing: 3, margin: '0 0 12px', textTransform: 'uppercase' }}>{item.title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Destinations</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 12px' }}>Where Will You Go?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 560, lineHeight: 1.7, margin: 0 }}>Tap a destination for what to see, the best time to visit, and a tailored package.</p>
        </div>

        <DestinationShowcase />
      </section>

      {/* Why Turkenya */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Why Turkenya</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>One Team, Every Detail</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {whyIntl.map((item, i) => (
              <div key={i} className="card-hover" style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Divider */}
      <div style={{ position: 'relative', height: 350, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&fit=crop" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-20%', width: '100%', height: '140%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.5) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
          <p style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            &ldquo;Travel is the only thing you buy that makes you richer&rdquo;
          </p>
        </div>
      </div>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Dream Destination<br />Not Listed?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
            We package holidays to anywhere in the world. Tell us where you want to go — we make it happen.
          </p>
          <BookingButton flowKey="international" label="Plan My Trip" className="glass-cta" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
        </div>
      </section>
    </main>
  )
}
