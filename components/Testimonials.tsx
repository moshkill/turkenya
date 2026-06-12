'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Icon from './Icon'

type Item = { name: string; country: string; text: string; service: string; rating?: number; img?: string }

// Hand-picked fallback shown until featured reviews exist in the DB.
// Avatars: curated free Unsplash portraits (African/Kenyan-appropriate);
// the German couple keeps an initials avatar.
const fallback: Item[] = [
  { name: 'Wanjiru M.', country: 'London, UK', text: 'Absolutely incredible. Turkenya handled everything from JKIA pickup to our final sunrise at the Mara. Not a single thing went wrong.', service: 'Safari Tours', img: 'photo-1645736353780-e70a7d508088' },
  { name: 'Ahmed K.', country: 'Dubai, UAE', text: 'Booked our Umrah package and it was flawless. Hotels were steps from the Haram, flights on time, the guide was wonderful.', service: 'Pilgrimage', img: 'photo-1659422440915-d516c6dc932e' },
  { name: 'Lisa & Tom B.', country: 'Germany', text: 'Our 10-day Kenya circuit was beyond what we imagined. The team was on call 24/7 and genuinely cared about every detail.', service: 'Safari Tours' },
  { name: 'Dr. R. Patel', country: 'Nairobi, Kenya', text: 'Turkenya arranged my medical trip to Bangkok — hospital, hotel, flights, transfers. Saved 65% versus Kenya private rates.', service: 'Medical Tourism', img: 'photo-1778692258270-bc0e80e975c0' },
  { name: 'James Otieno', country: 'Houston, USA', text: 'Flew my family of 6 from Houston to Nairobi, then Mara. Turkenya got us business class at economy prices. Unbeatable.', service: 'Air Ticketing', img: 'photo-1522529599102-193c0d76b5b6' },
  { name: 'Fatima H.', country: 'Mombasa, Kenya', text: 'Our corporate retreat for 50 delegates — venue, flights, safari, everything was coordinated perfectly. Will use Turkenya again.', service: 'Conferences', img: 'photo-1743871698163-a2e470d8eac7' },
]

const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('')

function Avatar({ t, size }: { t: Item; size: number }) {
  if (t.img) return <img src={`https://images.unsplash.com/${t.img}?w=${size * 2}&h=${size * 2}&fit=crop&crop=face`} alt={t.name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,240,0,0.3)' }} />
  return <div style={{ width: size, height: size, borderRadius: '50%', background: 'rgba(255,240,0,0.12)', border: '2px solid rgba(255,240,0,0.3)', color: '#fff000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: size * 0.36, fontFamily: "'Urbanist', sans-serif" }}>{initials(t.name)}</div>
}

export default function Testimonials() {
  const [items, setItems] = useState<Item[]>(fallback)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Pull featured approved reviews and APPEND them to the curated set (an
  // admin review with the same name overrides its curated counterpart).
  useEffect(() => {
    let on = true
    fetch('/api/testimonials?featured=1').then(r => r.json()).then(d => {
      if (!on || !Array.isArray(d.testimonials) || d.testimonials.length === 0) return
      const db: Item[] = d.testimonials.map((x: { name: string; location: string; service: string; rating: number; message: string }) => ({ name: x.name, country: x.location, text: x.message, service: x.service, rating: x.rating }))
      const dbNames = new Set(db.map(x => x.name.trim().toLowerCase()))
      setItems([...fallback.filter(f => !dbNames.has(f.name.trim().toLowerCase())), ...db])
      setActive(0)
    }).catch(() => {})
    return () => { on = false }
  }, [])

  const next = useCallback(() => setActive(p => (p + 1) % items.length), [items.length])
  const prev = useCallback(() => setActive(p => (p - 1 + items.length) % items.length), [items.length])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [paused, next])

  const t = items[active] || items[0]
  const rating = t.rating || 5

  return (
    <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}>
        <div style={{ maxWidth: 500 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Client Stories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>What Our<br />Clients Say</h2>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Link href="/testimonials" className="glass-ghost" style={{ padding: '12px 22px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', marginRight: 8 }}>Read all &amp; review</Link>
          <button onClick={() => { prev(); setPaused(true) }} className="testimonial-arrow" style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><Icon name="chevron-right" size={18} style={{ transform: 'rotate(180deg)' }} /></button>
          <button onClick={() => { next(); setPaused(true) }} className="testimonial-arrow" style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}><Icon name="chevron-right" size={18} /></button>
        </div>
      </div>

      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', minHeight: 320 }} className="testimonial-grid">
        <div key={active} style={{ animation: 'fadeUp 0.5s ease forwards' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ display: 'flex', gap: 2, color: '#fff000' }}>
              {Array.from({ length: 5 }, (_, i) => <span key={i} style={{ color: i < rating ? '#fff000' : 'rgba(255,255,255,0.18)', display: 'flex' }}><Icon name="star" size={15} /></span>)}
            </div>
            {t.service && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{t.service}</span>}
          </div>
          <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic', margin: '0 0 32px', fontFamily: "'Playfair Display', serif" }}>&ldquo;{t.text}&rdquo;</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Avatar t={t} size={52} />
            <div>
              <div style={{ fontWeight: 900, fontSize: 17 }}>{t.name}</div>
              {t.country && <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 15, marginTop: 2 }}>{t.country}</div>}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {items.slice(0, 9).map((item, i) => (
            <button key={i} onClick={() => { setActive(i); setPaused(true) }} style={{ padding: 0, border: 'none', cursor: 'pointer', background: 'none', position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '1', opacity: i === active ? 1 : 0.4, transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)', transform: i === active ? 'scale(1)' : 'scale(0.95)', outline: i === active ? '2px solid #fff000' : '2px solid transparent', outlineOffset: 2 }}>
              {item.img
                ? <img src={`https://images.unsplash.com/${item.img}?w=200&h=200&fit=crop&crop=face`} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,240,0,0.08)', color: '#fff000', fontWeight: 800, fontSize: 22, fontFamily: "'Urbanist', sans-serif" }}>{initials(item.name)}</div>}
              {i === active && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '6px 8px' }}><div style={{ color: '#fff', fontSize: 10, fontWeight: 700, textAlign: 'center' }}>{item.name}</div></div>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 40 }}>
        {items.slice(0, 9).map((_, i) => (
          <button key={i} onClick={() => { setActive(i); setPaused(true) }} style={{ width: i === active ? 32 : 8, height: 4, borderRadius: 4, background: i === active ? '#fff000' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
        ))}
      </div>
    </section>
  )
}
