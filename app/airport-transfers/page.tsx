export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JKIA Airport Transfer Nairobi — Meet & Greet from KES 2,500 | Turkenya',
  description: 'Airport transfers in Nairobi from KES 2,500. JKIA pickup, Wilson Airport, Mombasa MBA. Meet & greet, fixed rates, flight tracking, 24/7 service. Book online or WhatsApp.',
}

const vehicles = [
  { type: 'Economy Sedan', capacity: '1–3 passengers', examples: 'Toyota Corolla, VW Polo', price: 'From KES 2,500', img: 'photo-1549317661-bd32c8ce0db2' },
  { type: 'Premium SUV', capacity: '1–4 passengers', examples: 'Toyota Prado, Ford Explorer', price: 'From KES 4,500', img: 'photo-1519641471654-76ce0107ad1b' },
  { type: 'Minivan', capacity: '5–8 passengers', examples: 'Toyota Hiace, VW Transporter', price: 'From KES 5,500', img: 'photo-1558618666-fcd25c85cd64' },
  { type: 'Executive Van', capacity: '8–14 passengers', examples: 'Mercedes Sprinter, Toyota Coaster', price: 'From KES 8,000', img: 'photo-1544620347-c4fd4a3d5957' },
]

const features = ['Flight Tracking', 'Meet & Greet Sign', '24/7 Availability', 'Fixed Rates', 'No Hidden Charges', 'All Airports Covered']

export default function AirportTransfers() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Meet & Greet Service</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Airport Transfers</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: '0 0 32px' }}>Professional airport pick-up and drop-off across Kenya — JKIA, Wilson, Mombasa and more. Fixed rates, no surprises.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/quote?service=airport-transfer" style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase' }}>Book Transfer</Link>
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-ghost" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Vehicles</span></div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Choose Your Transfer</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {vehicles.map((v) => (
            <div key={v.type} className="hover-lift" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ height: 200, overflow: 'hidden' }}><img src={`https://images.unsplash.com/${v.img}?w=600&q=80&fit=crop`} alt={v.type} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>{v.type}</h3>
                  <span style={{ color: '#fff000', fontWeight: 800, fontSize: 16 }}>{v.price}</span>
                </div>
                <p style={{ color: '#fff000', fontSize: 13, fontWeight: 600, margin: '0 0 4px' }}>{v.capacity}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: '0 0 20px' }}>{v.examples}</p>
                <Link href="/quote?service=airport-transfer" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '13px', fontWeight: 700, fontSize: 13, letterSpacing: 2, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Book Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {features.map((f) => (
              <div key={f} style={{ padding: '28px 20px', background: '#0a0a0a', textAlign: 'center' }}>
                <div style={{ color: '#fff000', fontSize: 16, marginBottom: 8 }}>&#10003;</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{f}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
