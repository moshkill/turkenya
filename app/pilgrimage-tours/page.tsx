export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Icon from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biblical Tours from Kenya — Israel Holy Land & Footsteps of Paul in Turkey | Turkenya',
  description: 'Walk where the Bible happened. Holy Land Israel tours and Footsteps of Paul Turkey tours from Nairobi — Jerusalem, Galilee, Ephesus, the Seven Churches. Plus Rome, Fatima & Lourdes, Umrah and Hajj packages. Flights, hotels, guides & visa included.',
}

// Core: biblical journeys. Israel & Turkey lead — then the rest follow.
const biblical = [
  {
    name: 'Israel — The Holy Land',
    tag: 'Walk Where Jesus Walked',
    duration: '8–12 Days',
    price: 'From $2,200/person',
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80&fit=crop',
    blurb: 'From Bethlehem to the empty tomb — the journey of a lifetime through the land of the Bible, with daily devotions at every site.',
    highlights: ['Jerusalem Old City & Via Dolorosa', 'Bethlehem & Nazareth', 'Sea of Galilee boat ride', 'Jordan River baptism', 'Garden of Gethsemane', 'Mount of Olives & Dead Sea'],
  },
  {
    name: 'Turkey — Footsteps of Paul',
    tag: 'The Apostle’s Missionary Roads',
    duration: '9–12 Days',
    price: 'From $2,400/person',
    img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80&fit=crop',
    blurb: 'Turkey holds more of Paul’s story than anywhere on earth — his birthplace, his mission routes and the churches of Revelation.',
    highlights: ['Tarsus — Paul’s birthplace', 'Antioch — first called “Christians”', 'Ephesus & the great theatre', 'Seven Churches of Revelation', 'Iconium, Lystra & Derbe', 'Cappadocia cave churches'],
  },
]

const others = [
  { name: 'Rome & The Vatican', duration: '7–10 Days', price: 'From $2,500/person', img: 'photo-1552832230-c0197dd311b5', note: 'St. Peter’s, the Catacombs & Paul’s final road' },
  { name: 'Fatima & Lourdes', duration: '10 Days', price: 'From $2,800/person', img: 'photo-1581615621517-5e8536c90c8b', note: 'Portugal & France Marian shrines' },
  { name: 'Umrah Package', duration: '10–14 Days', price: 'From $1,800/person', img: 'photo-1591604129939-f1efa4d9f7fa', note: 'Makkah & Madinah, guided throughout' },
  { name: 'Hajj Arrangements', duration: '21–30 Days', price: 'Contact for pricing', img: 'photo-1591604129939-f1efa4d9f7fa', note: 'Full Hajj logistics, done properly' },
  { name: 'India Sacred Sites', duration: '12 Days', price: 'From $1,600/person', img: 'photo-1524492412937-b28074a5d7da', note: 'Varanasi, Bodh Gaya & the Golden Temple' },
]

export default function PilgrimageTours() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero — biblical journeys lead */}
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Biblical Tours & Pilgrimages</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 700 }}>Walk Where the<br />Bible Happened</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 540, margin: '0 0 32px' }}>The Holy Land and the Footsteps of Paul — journeys of faith planned from Nairobi, with flights, hotels, visas and devoted guides all included. Umrah, Rome and more also available.</p>
          <Link href="/quote?service=pilgrimage" style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase', width: 'fit-content' }}>Plan My Journey</Link>
        </div>
      </section>

      {/* CORE — Biblical Tours, featured wide cards */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px 70px' }}>
        <div style={{ marginBottom: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Core · Biblical Tours</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Journeys of Faith</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, maxWidth: 420, margin: 0, lineHeight: 1.6 }}>Built for churches, fellowships and families — with devotion time at every site, not just photo stops.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {biblical.map((b) => (
            <div key={b.name} className="hover-lift" data-reveal style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,240,0,0.25)', minHeight: 320 }}>
              <img src={b.img} alt={b.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(8,8,8,0.96) 30%, rgba(8,8,8,0.72) 58%, rgba(8,8,8,0.25))' }} />
              <div style={{ position: 'relative', padding: 'clamp(28px, 4vw, 44px)', maxWidth: 720 }}>
                <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: '#0a0a0a', background: '#fff000', borderRadius: 100, padding: '5px 14px', textTransform: 'uppercase', marginBottom: 14 }}>✝ {b.tag}</span>
                <h3 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 900, margin: '0 0 10px', fontFamily: "'Urbanist', sans-serif", lineHeight: 1.08 }}>{b.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.65)', fontSize: 14, fontWeight: 700 }}><Icon name="calendar" size={14} /> {b.duration}</span>
                  <span style={{ color: '#fff000', fontWeight: 800, fontSize: 16 }}>{b.price}</span>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.65, margin: '0 0 18px', maxWidth: 560 }}>{b.blurb}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {b.highlights.map(h => (
                    <span key={h} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '7px 13px', fontSize: 13.5, color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                      <span style={{ color: '#fff000', display: 'flex' }}><Icon name="check" size={13} stroke={2.5} /></span>{h}
                    </span>
                  ))}
                </div>
                <Link href="/quote?service=pilgrimage" className="glass-cta" style={{ display: 'inline-block', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase' }}>Enquire Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The rest follow */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '70px 40px 140px' }}>
        <div style={{ marginBottom: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>More Sacred Journeys</span></div>
          <h2 style={{ fontSize: 'clamp(26px, 3vw, 42px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Every Faith, Thoughtfully Planned</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 20 }}>
          {others.map((p) => (
            <div key={p.name} className="hover-lift" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ height: 180, overflow: 'hidden' }}><img src={`https://images.unsplash.com/${p.img}?w=600&q=80&fit=crop`} alt={p.name} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div style={{ padding: '22px 24px 26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600, letterSpacing: 1.5 }}>{p.duration}</span>
                  <span style={{ color: '#fff000', fontWeight: 800, fontSize: 15 }}>{p.price}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 6px' }}>{p.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.6, margin: '0 0 18px' }}>{p.note}</p>
                <Link href="/quote?service=pilgrimage" className="glass-cta" style={{ display: 'block', textAlign: 'center', padding: '12px', fontWeight: 700, fontSize: 13.5, letterSpacing: 2, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Enquire Now</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Bringing Your Church Group?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 520, margin: '0 auto 40px' }}>We run group pilgrimages for congregations of 10–100+ — group fares, shared rooms, a dedicated coordinator and devotional itineraries. Visas, flights, hotels and guides all handled.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quote?service=pilgrimage" style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Get a Quote</Link>
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
