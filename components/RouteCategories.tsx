'use client'
import { useState, useEffect } from 'react'
import Icon from './Icon'
import BookingButton from './BookingButton'

type Cat = { title: string; tag: string; img: string; blurb: string; listTitle: string; list: string[]; routes: string }

const cats: Cat[] = [
  {
    title: 'Domestic', tag: 'Within Kenya', routes: 'NBO · MBA · KIS · LAU',
    img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=900&q=80&fit=crop',
    blurb: 'Hop across Kenya the same day — instant e-tickets on every local carrier.',
    listTitle: 'Where we fly', list: ['Mombasa (MBA)', 'Kisumu (KIS)', 'Malindi (MYD)', 'Lamu (LAU)', 'Eldoret (EDL)', 'Diani (UKA)'],
  },
  {
    title: 'Regional', tag: 'East Africa & beyond', routes: 'NBO · EBB · DAR · ADD',
    img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=900&q=80&fit=crop',
    blurb: 'Across East Africa and the continent on the region’s leading airlines.',
    listTitle: 'Where we fly', list: ['Entebbe (EBB)', 'Dar es Salaam (DAR)', 'Kigali (KGL)', 'Addis Ababa (ADD)', 'Johannesburg (JNB)', 'Zanzibar (ZNZ)'],
  },
  {
    title: 'International', tag: '150+ Cities', routes: 'NBO · DXB · LHR · IST',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&fit=crop',
    blurb: 'Dubai to New York — wholesale fares in every cabin, worldwide.',
    listTitle: 'Popular destinations', list: ['Dubai (DXB)', 'London (LHR)', 'Istanbul (IST)', 'Doha (DOH)', 'Guangzhou (CAN)', 'New York (JFK)'],
  },
  {
    title: 'Corporate & Groups', tag: '10–200+ Travellers', routes: 'Custom schedules',
    img: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&q=80&fit=crop',
    blurb: 'A fully managed travel desk for your whole organisation.',
    listTitle: 'What’s included', list: ['Negotiated group fares', 'Seat blocks & allocation', 'Invoice & credit billing', 'Travel-policy compliance', 'Duty-of-care reporting', '24/7 rebooking desk'],
  },
]

export default function RouteCategories() {
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    const on = open !== null
    document.body.style.overflow = on ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', on)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open') }
  }, [open])

  const c = open !== null ? cats[open] : null

  return (
    <>
      {/* three standard categories */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 16 }}>
        {cats.slice(0, 3).map((cat, i) => (
          <button key={cat.title} onClick={() => setOpen(i)} className="hover-lift" data-reveal style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', minHeight: 300, border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#fff', background: 'none' }}>
            <img src={cat.img} alt={cat.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.95) 12%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.2))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px 22px' }}>
              <span style={{ alignSelf: 'flex-start', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.45)', borderRadius: 100, padding: '4px 12px', textTransform: 'uppercase', marginBottom: 14, backdropFilter: 'blur(6px)' }}>{cat.tag}</span>
              <h3 style={{ fontSize: 23, fontWeight: 900, margin: '0 0 10px', fontFamily: "'Urbanist', sans-serif" }}>{cat.title}</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, letterSpacing: 1.5, fontWeight: 700 }}>{cat.routes}</span>
                <span style={{ color: '#fff000', fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>View <Icon name="arrow-right" size={12} style={{display:"inline",verticalAlign:"-2px"}} /></span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* featured corporate banner */}
      <button onClick={() => setOpen(3)} className="hover-lift" data-reveal style={{ position: 'relative', width: '100%', display: 'block', borderRadius: 18, overflow: 'hidden', minHeight: 220, border: '1px solid rgba(255,240,0,0.3)', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#fff', background: 'none', boxShadow: '0 0 0 1px rgba(255,240,0,0.1)' }}>
        <img src={cats[3].img} alt={cats[3].title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,10,0.96) 35%, rgba(10,10,10,0.6) 68%, rgba(10,10,10,0.25))' }} />
        <div style={{ position: 'relative', padding: 'clamp(28px,4vw,40px)', maxWidth: 620 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: 1.5, color: '#0a0a0a', background: '#fff000', borderRadius: 100, padding: '5px 14px', textTransform: 'uppercase', marginBottom: 14 }}><Icon name="star" size={11} style={{display:"inline",verticalAlign:"-1px",marginRight:4}} />Most Value · Corporate</span>
          <h3 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 900, margin: '0 0 10px', fontFamily: "'Urbanist', sans-serif", lineHeight: 1.05 }}>Corporate &amp; Groups</h3>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, lineHeight: 1.65, margin: '0 0 16px', maxWidth: 480 }}>Managed travel for 10–200+ — negotiated group fares, seat blocks, invoice billing and a 24/7 rebooking desk.</p>
          <span style={{ color: '#fff000', fontSize: 12, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>Explore corporate <Icon name="arrow-right" size={12} style={{display:"inline",verticalAlign:"-2px"}} /></span>
        </div>
      </button>

      {c && (
        <div className="sb-modal" onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 620, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            {/* banner */}
            <div style={{ position: 'relative', height: 190 }}>
              <img src={c.img} alt={c.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,15,1) 4%, rgba(15,15,15,0.35) 60%, rgba(15,15,15,0.1))' }} />
              <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}><Icon name="close" size={18} /></button>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 28px 18px' }}>
                <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.45)', borderRadius: 100, padding: '4px 12px', textTransform: 'uppercase', marginBottom: 10, backdropFilter: 'blur(6px)' }}>{c.tag}</span>
                <h3 style={{ fontSize: 28, fontWeight: 900, margin: 0, fontFamily: "'Urbanist', sans-serif" }}>{c.title}</h3>
              </div>
            </div>
            {/* body */}
            <div style={{ padding: '30px 34px 38px' }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, margin: '0 0 22px' }}>{c.blurb}</p>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>{c.listTitle}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 26 }}>
                {c.list.map(item => (
                  <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '8px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    <span style={{ color: '#fff000' }}><Icon name="check" size={14} stroke={2.5} style={{display:"inline",verticalAlign:"-2px"}} /></span>{item}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <BookingButton flowKey="flights" label="Get a Fare" initial={c.title.startsWith('Corporate') ? { purpose: 'Corporate / Group', category: 'Corporate' } : { purpose: 'Just me / Family', category: c.title }} className="glass-cta" style={{ flex: 1, minWidth: 160, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }} />
                <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ flex: 1, minWidth: 140, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
