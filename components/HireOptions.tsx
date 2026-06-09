'use client'
import { useState, useEffect } from 'react'
import BookingButton from './BookingButton'

type Opt = { title: string; tag: string; need: string; img: string; blurb: string; listTitle: string; list: string[] }

const opts: Opt[] = [
  {
    title: 'Corporate Contracts', tag: 'Days to 2 years', need: 'Corporate contract',
    img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=900&q=80&fit=crop',
    blurb: 'Keep your executives and teams moving on flexible long-term contracts — our biggest specialism.',
    listTitle: 'Included', list: ['Executive Prados & Land Cruiser V8', 'Range Rover & Mercedes options', 'Vetted professional chauffeurs', 'Guaranteed relief vehicle', 'Monthly consolidated invoicing', 'Optional company branding'],
  },
  {
    title: 'Executive VIP', tag: 'Chauffeur-driven', need: 'Executive VIP',
    img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80&fit=crop',
    blurb: 'Discreet, punctual VIP transport for dignitaries, directors and special guests.',
    listTitle: 'What you get', list: ['Prado · V8 · Range Rover · Mercedes', 'Professional, suited chauffeurs', 'Airport meet & greet', 'By the hour, day or trip'],
  },
  {
    title: 'Self-Drive & Individual', tag: 'You drive', need: 'Self-drive',
    img: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80&fit=crop',
    blurb: 'Take the wheel — a quick vetting unlocks our premium vehicles for individual hire.',
    listTitle: 'Good to know', list: ['Valid licence + quick vetting', 'Saloons, SUVs, vans & buses', 'GPS + offline maps', '24/7 breakdown support', 'Pickup anywhere in Kenya'],
  },
  {
    title: 'Weddings & Airport', tag: 'On demand', need: 'Wedding',
    img: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&q=80&fit=crop',
    blurb: 'Arrive in style — bridal fleets for the big day and reliable airport transfers any time.',
    listTitle: 'Occasions', list: ['Wedding fleet & décor options', 'Airport pickups & drop-offs', 'Meet & greet service', 'Fixed, transparent rates'],
  },
]

export default function HireOptions() {
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    const on = open !== null
    document.body.style.overflow = on ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', on)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open') }
  }, [open])

  const o = open !== null ? opts[open] : null

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {opts.map((opt, i) => (
          <button key={opt.title} onClick={() => setOpen(i)} className="hover-lift" data-reveal style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', minHeight: 330, border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#fff', background: 'none' }}>
            <img src={opt.img} alt={opt.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 14%, rgba(10,10,10,0.55) 48%, rgba(10,10,10,0.2))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '26px 24px' }}>
              <span style={{ alignSelf: 'flex-start', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.45)', borderRadius: 100, padding: '4px 12px', textTransform: 'uppercase', marginBottom: 14, backdropFilter: 'blur(6px)' }}>{opt.tag}</span>
              <h3 style={{ fontSize: 23, fontWeight: 900, margin: '0 0 8px', fontFamily: "'Urbanist', sans-serif" }}>{opt.title}</h3>
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>View →</span>
            </div>
          </button>
        ))}
      </div>

      {o && (
        <div className="sb-modal" onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 620, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            <div style={{ position: 'relative', height: 190 }}>
              <img src={o.img} alt={o.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,15,1) 4%, rgba(15,15,15,0.35) 60%, rgba(15,15,15,0.1))' }} />
              <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>✕</button>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 28px 18px' }}>
                <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.45)', borderRadius: 100, padding: '4px 12px', textTransform: 'uppercase', marginBottom: 10, backdropFilter: 'blur(6px)' }}>{o.tag}</span>
                <h3 style={{ fontSize: 28, fontWeight: 900, margin: 0, fontFamily: "'Urbanist', sans-serif" }}>{o.title}</h3>
              </div>
            </div>
            <div style={{ padding: '30px 34px 38px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, margin: '0 0 22px' }}>{o.blurb}</p>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>{o.listTitle}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 26 }}>
                {o.list.map(item => (
                  <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '8px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    <span style={{ color: '#fff000' }}>✓</span>{item}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <BookingButton flowKey="car-hire" label="Get a Quote" initial={{ need: o.need }} className="glass-cta" style={{ flex: 1, minWidth: 160, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }} />
                <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ flex: 1, minWidth: 140, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
