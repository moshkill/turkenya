'use client'
import { useState, useEffect, useCallback } from 'react'

const testimonials = [
  { name: 'Sarah M.', country: 'United Kingdom', text: 'Absolutely incredible. Turkenya handled everything from JKIA pickup to our final sunrise at the Mara. Not a single thing went wrong.', img: 'photo-1494790108377-be9c29b29330', service: 'Safari Tours' },
  { name: 'Ahmed K.', country: 'United Arab Emirates', text: 'Booked our Umrah package and it was flawless. Hotels were steps from the Haram, flights on time, the guide was wonderful.', img: 'photo-1507003211169-0a1dd7228f2d', service: 'Pilgrimage' },
  { name: 'Lisa & Tom B.', country: 'Germany', text: 'Our 10-day Kenya circuit was beyond what we imagined. The team was on call 24/7 and genuinely cared about every detail.', img: 'photo-1438761681033-6461ffad8d80', service: 'Safari Tours' },
  { name: 'Dr. R. Patel', country: 'India', text: 'Turkenya arranged my medical trip to Bangkok — hospital, hotel, flights, transfers. Saved 65% versus Kenya private rates.', img: 'photo-1472099645785-5658abf4ff4e', service: 'Medical Tourism' },
  { name: 'James O.', country: 'United States', text: 'Flew my family of 6 from Houston to Nairobi, then Mara. Turkenya got us business class at economy prices. Unbeatable.', img: 'photo-1500648767791-00dcc994a43e', service: 'Air Ticketing' },
  { name: 'Fatima H.', country: 'Saudi Arabia', text: 'Our corporate retreat for 50 delegates — venue, flights, safari, everything was coordinated perfectly. Will use Turkenya again.', img: 'photo-1580489944761-15a19d654956', service: 'Conferences' },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setActive(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [paused, next])

  const t = testimonials[active]

  return (
    <section style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}>
        <div style={{ maxWidth: 500 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Client Stories</span>
          </div>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
            What Our<br />Clients Say
          </h2>
        </div>
        {/* Navigation arrows */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => { prev(); setPaused(true) }} style={{
            width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent', color: '#fff', fontSize: 20, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }} className="testimonial-arrow">&#8592;</button>
          <button onClick={() => { next(); setPaused(true) }} style={{
            width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)',
            background: 'transparent', color: '#fff', fontSize: 20, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }} className="testimonial-arrow">&#8594;</button>
        </div>
      </div>

      {/* Main testimonial display */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40,
          alignItems: 'center', minHeight: 320,
        }}
        className="testimonial-grid"
      >
        {/* Left: Quote */}
        <div key={active} style={{ animation: 'fadeUp 0.5s ease forwards' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ color: '#fff000', fontSize: 16, letterSpacing: 3 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{t.service}</span>
          </div>
          <p style={{
            fontSize: 'clamp(18px, 2vw, 24px)', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.8)', fontStyle: 'italic',
            margin: '0 0 32px', fontFamily: "'Playfair Display', serif",
          }}>
            &ldquo;{t.text}&rdquo;
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={`https://images.unsplash.com/${t.img}?w=100&h=100&fit=crop&crop=face`}
              alt={t.name}
              style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,240,0,0.3)' }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: 17 }}>{t.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginTop: 2 }}>{t.country}</div>
            </div>
          </div>
        </div>

        {/* Right: Thumbnail grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {testimonials.map((item, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true) }}
              style={{
                padding: 0, border: 'none', cursor: 'pointer', background: 'none',
                position: 'relative', borderRadius: 12, overflow: 'hidden',
                aspectRatio: '1', opacity: i === active ? 1 : 0.4,
                transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                transform: i === active ? 'scale(1)' : 'scale(0.95)',
                outline: i === active ? '2px solid #fff000' : '2px solid transparent',
                outlineOffset: 2,
              }}
            >
              <img
                src={`https://images.unsplash.com/${item.img}?w=200&h=200&fit=crop&crop=face`}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {i === active && (
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '6px 8px' }}>
                  <div style={{ color: '#fff', fontSize: 10, fontWeight: 700, textAlign: 'center' }}>{item.name}</div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 40 }}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); setPaused(true) }}
            style={{
              width: i === active ? 32 : 8, height: 4, borderRadius: 4,
              background: i === active ? '#fff000' : 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ))}
      </div>
    </section>
  )
}
