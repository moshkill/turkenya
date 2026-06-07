export const dynamic = 'force-dynamic'
import Link from 'next/link'
import BookingButton from '@/components/BookingButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cheap Flights from Nairobi — IATA Agent | Turkenya Tours & Safaris',
  description: 'Book cheap flights from Nairobi on Jambojet, Kenya Airways, Emirates, Qatar Airways & 30+ airlines. IATA accredited. Domestic flights to Mombasa, Kisumu. International to Dubai, London. Corporate group bookings.',
}

const categories = [
  { num: '01', title: 'Domestic Flights Kenya', desc: 'Nairobi to Mombasa, Kisumu, Malindi, Lamu, Eldoret and all local routes on Jambojet, Kenya Airways, Fly SAX & SafariLink. Same-day booking, instant confirmation.', routes: 'NBO–MBA, NBO–KIS, NBO–EDL, NBO–LAU' },
  { num: '02', title: 'Regional East Africa', desc: 'Nairobi to Entebbe, Dar es Salaam, Kigali, Addis Ababa, Johannesburg and across the continent. Kenya Airways, Ethiopian, RwandAir & more.', routes: 'NBO–EBB, NBO–DAR, NBO–KGL, NBO–ADD' },
  { num: '03', title: 'International Flights', desc: 'Nairobi to Dubai, London, Istanbul, Doha, Amsterdam and 150+ global destinations. Economy, business & first class on Emirates, Qatar, Turkish, BA, KLM.', routes: 'NBO–DXB, NBO–LHR, NBO–IST, NBO–DOH' },
  { num: '04', title: 'Corporate & Group Travel', desc: 'Managing travel for 10 to 200+ employees? We negotiate group fares, handle seat allocation, visa processing, and full itinerary coordination. Invoice billing available.', routes: 'Custom routes & schedules' },
]

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
  { title: 'IATA Licensed Agent', desc: 'We issue tickets directly — not through a middleman. Your booking is protected by international aviation standards with full refund rights.' },
  { title: 'Wholesale Fares You Can\'t Get Online', desc: 'As an IATA agent, we access confidential airline pricing. That means 10-30% savings on most routes vs. booking directly.' },
  { title: 'Corporate Travel Management', desc: 'Dedicated account manager for your company. We handle flights for 50-200+ staff — invoice billing, travel policy compliance, duty of care reporting.' },
  { title: 'Cancelled Flight? We Fix It.', desc: 'Flight cancelled at 3am? We rebook you instantly while you sleep. No waiting on hold with the airline — we handle it.' },
  { title: 'Multi-City & Complex Routes', desc: 'Nairobi–Dubai–London–Nairobi? We build complex itineraries across multiple airlines, optimised for time and cost.' },
  { title: 'Visa & Travel Documents', desc: 'We advise on visa requirements, transit rules, and documentation. For Dubai, Turkey, Schengen, UK, US — we know what you need.' },
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
            Jambojet to Mombasa, Kenya Airways to London, Emirates to Dubai — we book on 30+ airlines at wholesale fares. For individuals, families, and companies managing 200+ travellers.
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
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
            Every Route, Every Class
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
          {categories.map((cat) => (
            <div key={cat.num} className="card-hover" style={{ padding: '40px 32px', background: '#0a0a0a', transition: 'background 0.3s' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: 'rgba(255,240,0,0.12)', marginBottom: 20, fontFamily: "'Urbanist', sans-serif" }}>{cat.num}</div>
              <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.01em' }}>{cat.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{cat.desc}</p>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, letterSpacing: 2, fontWeight: 600 }}>{cat.routes}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Routes */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Popular Routes</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Where Kenya Flies</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {routes.map((r, i) => (
              <Link key={i} href="/quote?service=flights" className="hover-lift" data-reveal style={{ textDecoration: 'none', color: '#fff', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: '28px 26px', display: 'block', position: 'relative', overflow: 'hidden' }}>
                {r.tag && <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.4)', borderRadius: 100, padding: '3px 10px', textTransform: 'uppercase' }}>{r.tag}</span>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Urbanist', sans-serif" }}>{r.from}</span>
                  <span style={{ color: '#fff000', fontSize: 18 }}>✈</span>
                  <span style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Urbanist', sans-serif" }}>{r.to}</span>
                </div>
                <div style={{ fontSize: 12, letterSpacing: 2, color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginBottom: 18 }}>{r.code}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: 'rgb(235,235,235)' }}>{r.fare}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#fff000', textTransform: 'uppercase' }}>Get fare →</span>
                </div>
              </Link>
            ))}
          </div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 13, marginTop: 28, textAlign: 'center' }}>Indicative return economy fares, taxes included — subject to season &amp; availability. Ask for today&apos;s best price.</p>
        </div>
      </section>

      {/* Parallax Divider */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=1920&q=80&fit=crop" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-20%', width: '100%', height: '140%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[{ v: '471', l: 'Flights / Month' }, { v: '30+', l: 'Airlines' }, { v: '150+', l: 'Destinations' }, { v: '2hrs', l: 'Quote Response' }].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, color: 'rgb(235,235,235)', fontFamily: "'Urbanist', sans-serif" }}>{s.v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 3, textTransform: 'uppercase', marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                One dedicated account manager, negotiated corporate fares, and a 24/7 desk that rebooks your staff before they even call. We become your in-house travel team — without the headcount.
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {whyUs.map((item, i) => (
              <div key={i} className="card-hover" style={{
                padding: '32px 28px', background: 'rgba(255,255,255,0.03)',
                borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.3s',
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
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
