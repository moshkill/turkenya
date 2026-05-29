export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hotel Booking Kenya — Nairobi, Mombasa, Diani, Mara Lodges | Turkenya',
  description: 'Book hotels in Nairobi, Mombasa, Diani Beach, Maasai Mara lodges & international. Budget to 5-star. Best rate guarantee. Trusted Nairobi travel agency.',
}

const destinations = [
  { city: 'Nairobi', hotels: '250+ properties', range: '$40 – $500 / night', img: 'photo-1611892440504-42a792e24d32' },
  { city: 'Mombasa', hotels: '180+ properties', range: '$35 – $400 / night', img: 'photo-1596436889106-be35e843f974' },
  { city: 'Maasai Mara', hotels: '40+ lodges & camps', range: '$150 – $1,200 / night', img: 'photo-1516426122078-c23e76319801' },
  { city: 'Zanzibar', hotels: '120+ properties', range: '$60 – $800 / night', img: 'photo-1559128010-7c1ad6e1b6a5' },
  { city: 'Dar es Salaam', hotels: '90+ properties', range: '$50 – $350 / night', img: 'photo-1611892440504-42a792e24d32' },
  { city: 'Dubai', hotels: 'International hotels', range: '$80 – $2,000 / night', img: 'photo-1512453979798-5ea266f8880c' },
]

export default function HotelBooking() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Best Rate Guarantee</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Hotel Booking</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: '0 0 32px' }}>
            Handpicked hotels, lodges and resorts across Africa and beyond — budget to 5-star, always at the best rates.
          </p>
          <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase', width: 'fit-content' }}>
            Request Hotel Package
          </Link>
        </div>
      </section>

      {/* Destinations */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Top Destinations</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Where Would You Like to Stay?</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {destinations.map((d, i) => (
            <Link key={i} href="/contact" className="hover-lift" style={{ textDecoration: 'none', color: 'white', background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', display: 'block' }}>
              <div style={{ height: 220, overflow: 'hidden' }}>
                <img src={`https://images.unsplash.com/${d.img}?w=600&q=80&fit=crop`} alt={d.city} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <h3 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 8px' }}>{d.city}</h3>
                <p style={{ color: '#fff000', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>{d.hotels}</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, margin: 0 }}>{d.range}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Need Help Choosing?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>Tell us your destination, budget, and travel dates — we find the perfect stay for you.</p>
          <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Get a Hotel Quote</Link>
        </div>
      </section>
    </main>
  )
}
