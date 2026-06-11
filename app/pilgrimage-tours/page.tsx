export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Umrah Packages from Kenya — Hajj, Holy Land, Rome Pilgrimage | Turkenya',
  description: 'Book Umrah packages from Kenya from $1,800. Hajj arrangements, Holy Land Israel tours, Rome pilgrimage. Flights, hotels, guides & visa included. Nairobi-based.',
}

const packages = [
  { name: 'Umrah Package', duration: '10–14 Days', price: 'From $1,800/person', img: 'photo-1591604129939-f1efa4d9f7fa' },
  { name: 'Holy Land — Israel', duration: '8–12 Days', price: 'From $2,200/person', img: 'photo-1548013146-72479768bada' },
  { name: 'Rome Pilgrimage', duration: '7–10 Days', price: 'From $2,500/person', img: 'photo-1552832230-c0197dd311b5' },
  { name: 'Fatima & Lourdes', duration: '10 Days', price: 'From $2,800/person', img: 'photo-1507003211169-0a1dd7228f2d' },
  { name: 'Hajj Arrangements', duration: '21–30 Days', price: 'Contact for pricing', img: 'photo-1591604129939-f1efa4d9f7fa' },
  { name: 'India Sacred Sites', duration: '12 Days', price: 'From $1,600/person', img: 'photo-1524492412937-b28074a5d7da' },
]

export default function PilgrimageTours() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Spiritual Journeys</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Pilgrimage Tours</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: '0 0 32px' }}>Sacred journeys thoughtfully planned — Umrah, Holy Land, Rome and beyond. Flights, hotels, guides all included.</p>
          <Link href="/quote?service=pilgrimage" style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase', width: 'fit-content' }}>Plan My Journey</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Packages</span></div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Choose Your Pilgrimage</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {packages.map((p) => (
            <div key={p.name} className="hover-lift" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ height: 220, overflow: 'hidden' }}><img src={`https://images.unsplash.com/${p.img}?w=600&q=80&fit=crop`} alt={p.name} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, letterSpacing: 2 }}>{p.duration}</span>
                  <span style={{ color: '#fff000', fontWeight: 800, fontSize: 16 }}>{p.price}</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 20px' }}>{p.name}</h3>
                <Link href="/quote?service=pilgrimage" style={{ display: 'block', textAlign: 'center', background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '13px', fontWeight: 700, fontSize: 14, letterSpacing: 2, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Enquire Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Plan Your Sacred Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>We handle visa, flights, accommodation, ground transport, and spiritual guides — you focus on the journey.</p>
          <Link href="/quote?service=pilgrimage" style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Get a Quote</Link>
        </div>
      </section>
    </main>
  )
}
