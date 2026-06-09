export const dynamic = 'force-dynamic'
import Link from 'next/link'
import BookingButton from '@/components/BookingButton'
import FlightMap from '@/components/FlightMap'
import AnimatedStats from '@/components/AnimatedStats'
import RouteCategories from '@/components/RouteCategories'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cheap Flights from Nairobi — IATA Agent | Turkenya Tours & Safaris',
  description: 'Book cheap flights from Nairobi on Jambojet, Kenya Airways, Emirates, Qatar Airways & 30+ airlines. IATA accredited. Domestic flights to Mombasa, Kisumu. International to Dubai, London. Corporate group bookings.',
}

const airlines = [
  { name: 'Kenya Airways', logo: '/logos/airlines/kenya-airways-logo.png' },
  { name: 'Emirates', logo: '/logos/airlines/emirates-logo.png' },
  { name: 'Qatar Airways', logo: '/logos/airlines/qatar-airways-logo.png' },
  { name: 'Turkish Airlines', logo: '/logos/airlines/turkish-airlines-logog.png' },
  { name: 'Ethiopian Airlines', logo: '/logos/airlines/ethiopian-airlines-logo.png' },
  { name: 'RwandAir', logo: '/logos/airlines/rwanda-air-logo.png' },
  { name: 'KLM', logo: '/logos/airlines/klm-logo.jpg' },
  { name: 'British Airways', logo: '/logos/airlines/british-airways-logo.jpg' },
  { name: 'Swiss Air', logo: '/logos/airlines/swiss-air-logo.png' },
  { name: 'South African Airways', logo: '/logos/airlines/south-african-airways-logo.jpg' },
  { name: 'Saudia', logo: '/logos/airlines/saudia-logo.png' },
  { name: 'Gulf Air', logo: '/logos/airlines/gulf-air-logo.png' },
  { name: 'Etihad Airways', logo: '/logos/airlines/etihad-airways-logo.png' },
  { name: 'Egypt Air', logo: '/logos/airlines/egypt-air-logo.png' },
  { name: 'Brussels Airlines', logo: '/logos/airlines/brussels-logo.png' },
  { name: 'Fly 540', logo: '/logos/airlines/air-Fly-540_logo-1.png' },
  { name: 'Air Kenya', logo: '/logos/airlines/air-kenya-logo.png' },
  { name: 'Precision Air', logo: '/logos/airlines/precision-air-logo.png' },
  { name: 'African Express', logo: '/logos/airlines/african-express-logo.png' },
  { name: 'Air SafariLink', logo: '/logos/airlines/air-safarilink-logo.jpg' },
]

const whyUs = [
  { icon: '🎫', title: 'IATA Licensed', desc: 'Tickets issued direct & protected.' },
  { icon: '💸', title: 'Wholesale Fares', desc: '10–30% below online prices.' },
  { icon: '🏢', title: 'Corporate Desk', desc: 'Account manager for 50–200+ staff.' },
  { icon: '🌙', title: '24/7 Rebooking', desc: 'Cancelled at 3am? We fix it.' },
  { icon: '🗺️', title: 'Complex Routes', desc: 'Multi-city, optimised itineraries.' },
  { icon: '🛂', title: 'Visa Guidance', desc: 'We know the paperwork.' },
]

const routes = [
  { from: 'Nairobi', to: 'Dubai', code: 'NBO–DXB', fare: 'from $480', tag: 'Most booked' },
  { from: 'Nairobi', to: 'London', code: 'NBO–LHR', fare: 'from $650' },
  { from: 'Nairobi', to: 'Doha', code: 'NBO–DOH', fare: 'from $520' },
  { from: 'Nairobi', to: 'Istanbul', code: 'NBO–IST', fare: 'from $510' },
  { from: 'Nairobi', to: 'Guangzhou', code: 'NBO–CAN', fare: 'from $720' },
  { from: 'Nairobi', to: 'New York', code: 'NBO–JFK', fare: 'from $980' },
]

const steps = [
  { n: '01', t: 'Tell us your trip', d: 'Route, dates, passengers and class — send it in 30 seconds via the quote form or WhatsApp.' },
  { n: '02', t: 'We hunt wholesale fares', d: 'As an IATA agent we compare 30+ airlines and confidential fares you won’t find online.' },
  { n: '03', t: 'Confirm & fly', d: 'Approve the best option, we issue your ticket instantly, and we handle any changes 24/7.' },
]

const corporate = ['Dedicated account manager', 'Negotiated corporate fares', 'Invoice & credit billing', 'Travel-policy compliance', 'Duty-of-care reporting', '24/7 rebooking desk']

export default function AirTicketingPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>

      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline className="hero-entrance" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/airplane.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <img src="/logos/badges/iata_logoW.png" alt="IATA" style={{ height: 32 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: '#fff000' }}>IATA Accredited — Nairobi</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 700 }}>
            Cheap Flights<br />from Nairobi
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 32px' }}>
30+ airlines at wholesale fares — for individuals, families and corporates.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <BookingButton flowKey="flights" label="Get a Quote" className="glass-cta" style={{ padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }} />
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-ghost" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Flight Categories */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Flight Categories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 12px' }}>
            Every Route, Every Class
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 540, lineHeight: 1.7, margin: 0 }}>From a hop to Mombasa to first class to New York — one desk books it all.</p>
        </div>

        <RouteCategories />
      </section>

      {/* Popular Routes */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Popular Routes</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 12px' }}>We Fly Nairobi to the World</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 540, lineHeight: 1.7, margin: 0 }}>Daily departures to the Gulf, Europe, Asia, the Americas and across Africa.</p>
          </div>

          <FlightMap />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 40 }}>
            {routes.map((r, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '10px 18px', fontSize: 14 }}>
                <strong style={{ fontWeight: 800 }}>{r.to}</strong>
                <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, letterSpacing: 1 }}>{r.code}</span>
                <span style={{ color: '#fff000', fontWeight: 800 }}>{r.fare}</span>
              </span>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 22, textAlign: 'center' }}>Indicative return economy fares, taxes included — subject to season &amp; availability. Ask for today&apos;s best price.</p>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <BookingButton flowKey="flights" label="Find My Fare" className="glass-cta" style={{ padding: '15px 40px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '90px 40px' }}>
          <AnimatedStats stats={[
            { num: 471, label: 'Flights / Month' },
            { num: 30, suffix: '+', label: 'Airlines' },
            { num: 150, suffix: '+', label: 'Destinations' },
            { num: 2, suffix: 'hr', label: 'Quote Response' },
            { display: '24/7', label: 'Support Desk' },
          ]} />
        </div>
      </section>

      {/* Corporate Travel */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ height: 1, width: 32, background: '#fff000' }} />
                <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Corporate Travel</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 46px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 20px' }}>Travel Management for Teams of 10–200+</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.8, margin: '0 0 32px', maxWidth: 520 }}>
Your in-house travel team — without the headcount. One account manager, negotiated fares, 24/7 rebooking.
              </p>
              <BookingButton flowKey="flights" label="Request a Corporate Proposal" className="glass-cta" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {corporate.map((c, i) => (
                <div key={i} data-reveal style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: '20px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#fff000', flexShrink: 0, fontSize: 16 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: 600, lineHeight: 1.4 }}>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ height: 1, width: 32, background: '#fff000' }} />
                <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Why Book With Us</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
                The Turkenya Advantage
              </h2>
            </div>
          </div>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 40, alignItems: 'stretch' }}>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 440, border: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1000&q=80&fit=crop" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-15%', width: '100%', height: '130%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 12%, rgba(10,10,10,0.15))' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 34 }}>
                <img src="/logos/badges/iata_logoW.png" alt="IATA Accredited" style={{ height: 30, marginBottom: 14 }} />
                <p style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.35, margin: 0, fontFamily: "'Urbanist', sans-serif" }}>Tickets issued direct — protected, refundable, at wholesale fares.</p>
              </div>
            </div>
            <div className="booking-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {whyUs.map((item, i) => (
                <div key={i} className="card-hover" style={{ padding: '22px 20px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s' }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 5 }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>How It Works</span>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Booked in Three Simple Steps</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {steps.map((s, i) => (
              <div key={i} data-reveal style={{ position: 'relative', padding: '36px 30px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20 }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: 'rgba(255,240,0,0.14)', fontFamily: "'Urbanist', sans-serif", lineHeight: 1, marginBottom: 18 }}>{s.n}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{s.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Airlines Grid */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Airline Partners</span>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 48, letterSpacing: '-0.02em' }}>We Book On 20+ Airlines</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, maxWidth: 1000, margin: '0 auto' }}>
            {airlines.map((a, i) => (
              <div key={i} className="airline-chip" style={{
                background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: 12, padding: '20px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', minHeight: 70,
              }}>
                <img src={a.logo} alt={a.name} style={{ maxHeight: 36, maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Need a Flight Quote?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Share your route, dates, and number of passengers — we respond within 2 hours with the best available fares.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BookingButton flowKey="flights" label="Request a Quote" className="glass-cta" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
            <a href="tel:+254722666644" className="glass-ghost" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              Call +254 722 666 644
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
