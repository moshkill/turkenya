export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Car Hire Nairobi — Self-Drive & Chauffeur | Turkenya Tours & Safaris',
  description: 'Self-drive and chauffeur car hire in Nairobi and across Kenya. Safari 4x4s, saloons, vans & buses. From KES 3,500/day. 200+ vehicles.',
}

const fleet = [
  { name: 'Toyota Land Cruiser V8', cat: '4x4 Safari', price: 'KES 12,000/day', seats: 7, img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80&fit=crop', features: ['Self-drive or Chauffeur', 'Roof hatch pop-up', 'All parks rated', 'GPS included'] },
  { name: 'Toyota Prado TX', cat: '4x4 Mid-Range', price: 'KES 8,500/day', seats: 7, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80&fit=crop', features: ['4WD', 'Air conditioning', 'Spacious boot', 'Upcountry ready'] },
  { name: 'Toyota Hiace Van', cat: 'Group Shuttle', price: 'KES 7,000/day', seats: 14, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80&fit=crop', features: ['14 seats', 'Airport runs', 'Luggage rack', 'Group bookings'] },
  { name: 'Toyota Corolla', cat: 'City Saloon', price: 'KES 3,500/day', seats: 5, img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80&fit=crop', features: ['Fuel efficient', 'Air conditioning', 'City driving', 'Economy rate'] },
  { name: 'Toyota RAV4', cat: 'Compact 4x4', price: 'KES 6,000/day', seats: 5, img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fit=crop', features: ['AWD', 'Business travel', 'Comfortable ride', 'Semi off-road'] },
  { name: 'Rosa Coaster Bus', cat: 'Large Group', price: 'KES 15,000/day', seats: 29, img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80&fit=crop', features: ['29 seats', 'Church groups', 'School trips', 'Luggage hold'] },
]

export default function CarRentalPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Car Hire</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>
            Go Where You Want,<br />When You Want
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: '0 0 32px' }}>
            Self-drive or chauffeur-driven. Safari 4x4s to city saloons. Pick up anywhere in Kenya.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase' }}>Get a Quote</Link>
            <a href="tel:+254729888666" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>Call Us</a>
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
              <div style={{ fontSize: 'clamp(24px, 2.5vw, 38px)', fontWeight: 900, lineHeight: 1, fontFamily: "'Abel', sans-serif", color: '#fff000' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Fleet */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '100px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Fleet</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Choose Your Vehicle</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {fleet.map(v => (
            <div key={v.name} className="hover-lift" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <img src={v.img} alt={v.name} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 8 }}>
                  <span style={{ background: '#fff000', color: '#0D0D0D', padding: '4px 12px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, borderRadius: 100 }}>{v.cat}</span>
                  <span style={{ background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 12px', fontSize: 10, fontWeight: 700, borderRadius: 100, backdropFilter: 'blur(4px)' }}>{v.seats} seats</span>
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>{v.name}</h3>
                  <span style={{ color: '#fff000', fontWeight: 800, fontSize: 16 }}>{v.price}</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
                  {v.features.map(f => <li key={f} style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 10, alignItems: 'center' }}><span style={{ color: '#fff000', fontSize: 13 }}>&#10003;</span>{f}</li>)}
                </ul>
                <Link href="/contact" style={{ display: 'block', textAlign: 'center', background: '#fff000', color: '#0D0D0D', padding: '13px', fontWeight: 700, fontSize: 13, letterSpacing: 2, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Book This Vehicle</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Self-drive vs Chauffeur */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '100px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Your Choice</span>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, margin: 0 }}>Self-Drive or Chauffeur?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {[
              { t: 'Self-Drive', items: ['Valid driving licence required', 'Explore at your own pace', 'GPS + offline maps provided', '24/7 breakdown line'] },
              { t: 'Chauffeur-Driven', items: ['Licensed professional driver', 'Local knowledge of all routes', 'Ideal for business travel', 'Airport pickup included'] },
            ].map(o => (
              <div key={o.t} className="card-hover" style={{ padding: '36px 28px', background: 'rgba(255,255,255,0.03)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff000', marginBottom: 24 }}>{o.t}</h3>
                {o.items.map(item => <div key={item} style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 12, alignItems: 'center' }}><span style={{ color: '#fff000', flexShrink: 0 }}>&#10003;</span>{item}</div>)}
                <Link href="/contact" style={{ display: 'block', textAlign: 'center', marginTop: 28, background: '#fff000', color: '#0D0D0D', padding: '14px', fontWeight: 700, fontSize: 13, letterSpacing: 2, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Enquire Now</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
