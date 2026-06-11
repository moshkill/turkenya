'use client'
import { useState, useEffect } from 'react'
import Icon from './Icon'
import BookingButton from './BookingButton'

export type OfferCard = {
  id?: number; title: string; image: string; price: string
  duration?: string; tagline?: string; highlights: string[]; featured?: boolean
}

const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.opacity = '0' }

// Compact, clickable "postcard" deck. Offers come from the admin (/api/offers);
// until any exist, the hardcoded fallback keeps the section full.
export default function OfferDeck({ category, flowKey, presetKey, fallback }: {
  category: string; flowKey: string; presetKey: string; fallback: OfferCard[]
}) {
  const [items, setItems] = useState<OfferCard[]>(fallback)
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    let on = true
    fetch('/api/offers?category=' + encodeURIComponent(category))
      .then(r => r.json())
      .then(d => { if (on && Array.isArray(d.offers) && d.offers.length) setItems(d.offers) })
      .catch(() => {})
    return () => { on = false }
  }, [category])

  useEffect(() => {
    const on = open !== null
    document.body.style.overflow = on ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', on)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null) }
    if (on) window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open'); window.removeEventListener('keydown', onKey) }
  }, [open])

  const o = open !== null ? items[open] : null

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 250px), 1fr))', gap: 18 }}>
        {items.map((of, i) => (
          <button key={of.title + i} onClick={() => setOpen(i)} className="postcard" data-reveal style={{
            position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '4 / 5',
            border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer', padding: 0, textAlign: 'left',
            color: '#fff', background: 'linear-gradient(135deg, rgba(255,240,0,0.1), rgba(10,10,10,0.7))',
          }}>
            <img src={of.image} alt={of.title} onError={hideImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} className="postcard-img" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.94) 16%, rgba(8,8,8,0.35) 48%, rgba(8,8,8,0.08))' }} />
            {/* postcard inner frame */}
            <div aria-hidden style={{ position: 'absolute', inset: 9, border: '1px dashed rgba(255,255,255,0.28)', borderRadius: 12, pointerEvents: 'none' }} />
            {/* stamp corner */}
            <div style={{ position: 'absolute', top: 18, right: 18, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              {of.duration && <span style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, borderRadius: 8, padding: '5px 9px' }}>{of.duration}</span>}
              {of.featured && <span style={{ background: '#fff000', color: '#0a0a0a', fontSize: 9.5, fontWeight: 900, letterSpacing: 1.2, borderRadius: 8, padding: '5px 9px', textTransform: 'uppercase' }}>★ Best Value</span>}
            </div>
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 20px 18px' }}>
              <div style={{ fontSize: 19, fontWeight: 900, fontFamily: "'Urbanist', sans-serif", lineHeight: 1.12, marginBottom: 6 }}>{of.title}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ color: '#fff000', fontWeight: 800, fontSize: 13.5 }}>{of.price}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.75)', fontSize: 10.5, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>Book <Icon name="arrow-right" size={12} /></span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {o && (
        <div className="sb-modal" onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 620, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg, rgba(255,240,0,0.15), rgba(10,10,10,0.7))' }}>
              <img src={o.image} alt={o.title} onError={hideImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,15,1) 4%, rgba(15,15,15,0.3) 60%, rgba(15,15,15,0.05))' }} />
              <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', cursor: 'pointer', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="close" size={18} /></button>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 28px 18px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 26, fontWeight: 900, margin: 0, fontFamily: "'Urbanist', sans-serif" }}>{o.title}</h3>
                <span style={{ color: '#fff000', fontWeight: 900, fontSize: 17 }}>{o.price}</span>
              </div>
            </div>
            <div style={{ padding: '26px 32px 36px' }}>
              {(o.duration || o.tagline) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
                  {o.duration && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.05)', borderRadius: 100, padding: '7px 14px', fontSize: 13, color: 'rgba(255,255,255,0.78)', fontWeight: 700 }}><Icon name="calendar" size={14} />{o.duration}</span>}
                  {o.tagline && <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>{o.tagline}</span>}
                </div>
              )}
              {o.highlights.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 26 }}>
                  {o.highlights.map(h => (
                    <span key={h} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '8px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                      <span style={{ color: '#fff000', display: 'flex' }}><Icon name="check" size={13} stroke={2.5} /></span>{h}
                    </span>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <BookingButton flowKey={flowKey} label="Book This Package" initial={{ [presetKey]: o.title }} className="glass-cta" style={{ flex: 1, minWidth: 170, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }} />
                <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ flex: 1, minWidth: 140, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>WhatsApp</a>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, margin: '16px 0 0', textAlign: 'center' }}>Final price confirmed by your agent — park fees, stays, meals &amp; guide included as listed.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
