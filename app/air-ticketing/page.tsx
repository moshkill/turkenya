export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Air Ticketing — IATA Accredited | Turkenya Tours & Safaris',
  description: 'IATA accredited air ticketing for individuals and corporates. Best fares on 30+ airlines — domestic, regional, and international flights from Nairobi.',
}

const categories = [
  { num: '01', title: 'Domestic Flights', desc: 'Nairobi to Mombasa, Kisumu, Malindi, Lamu and all local routes. Same-day booking, instant confirmation.', routes: 'NBO–MBA, NBO–KIS, NBO–LAU' },
  { num: '02', title: 'Regional Africa', desc: 'Uganda, Tanzania, Rwanda, Ethiopia, South Africa and across the continent. Multiple daily departures.', routes: 'NBO–EBB, NBO–DAR, NBO–KGL' },
  { num: '03', title: 'International', desc: 'Dubai, London, Istanbul, Doha, Amsterdam and 150+ global destinations. Economy, business & first class.', routes: 'NBO–DXB, NBO–LHR, NBO–IST' },
  { num: '04', title: 'Group & Corporate', desc: 'Managing travel for 10 to 200+ employees? We negotiate group fares, handle seat allocation, and coordinate full itineraries.', routes: 'Custom routes & schedules' },
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
  { title: 'IATA Accredited', desc: 'Your bookings are protected by international aviation standards. Full refund protection on all tickets.' },
  { title: 'Wholesale Fares', desc: 'We access airline pricing that the public cannot — saving you 10-30% on most routes.' },
  { title: 'Corporate Travel', desc: 'Dedicated account management for companies. Invoice billing, travel policy compliance, duty of care.' },
  { title: '24/7 Rebooking', desc: 'Flight cancelled? We rebook you instantly — even at 3am. No waiting on hold with the airline.' },
  { title: 'Multi-City Routing', desc: 'Complex itineraries across multiple cities and airlines, optimised for time and cost.' },
  { title: 'Visa Guidance', desc: 'We advise on visa requirements, transit rules, and documentation for every destination.' },
]

export default function AirTicketingPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>

      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/airplane.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.6) 40%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <img src="/logos/badges/iata_logoW.png" alt="IATA" style={{ height: 32 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: '#fff000' }}>IATA Accredited Agent</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 700 }}>
            Fly Anywhere<br />in the World
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 32px' }}>
            Best fares on 30+ airlines — economy, business, and first class. For individuals, families, and corporates managing 200+ travellers.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase' }}>
              Get a Quote
            </Link>
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
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
              <div style={{ fontSize: 36, fontWeight: 900, color: 'rgba(255,240,0,0.12)', marginBottom: 20, fontFamily: "'Abel', sans-serif" }}>{cat.num}</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, letterSpacing: '-0.01em' }}>{cat.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{cat.desc}</p>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 12, letterSpacing: 2, fontWeight: 600 }}>{cat.routes}</span>
            </div>
          ))}
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
            <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>
              Request a Quote
            </Link>
            <a href="tel:+254722666644" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              Call +254 722 666 644
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
