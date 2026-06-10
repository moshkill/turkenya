'use client'
import { useState, useEffect } from 'react'
import Icon from './Icon'
import BookingButton from './BookingButton'

type Dest = { city: string; region: string; img: string; blurb: string; best: string; highlights: string[] }

const dests: Dest[] = [
  { city: 'Dubai', region: 'UAE', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&fit=crop', blurb: 'Futuristic skylines, golden dunes and souk glamour — luxury at full throttle.', best: 'Nov – Mar', highlights: ['Burj Khalifa', 'Desert safari & dune dinner', 'Palm Jumeirah & JBR beach', 'Dubai Mall & gold souk', 'Marina yacht cruise'] },
  { city: 'Mauritius', region: 'Indian Ocean', img: 'https://images.unsplash.com/photo-1589979481223-deb893043163?w=900&q=80&fit=crop', blurb: 'Turquoise lagoons, coral reefs and barefoot island luxury.', best: 'May – Dec', highlights: ['Catamaran & snorkelling', 'Île aux Cerfs', 'Seven-coloured earth', 'Black River Gorges', 'Beach spa resorts'] },
  { city: 'Maldives', region: 'Indian Ocean', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&q=80&fit=crop', blurb: 'Overwater villas and crystal lagoons — the honeymoon benchmark.', best: 'Nov – Apr', highlights: ['Overwater bungalows', 'House-reef snorkelling', 'Sandbank picnic', 'Sunset dolphin cruise', 'Underwater dining'] },
  { city: 'Greece', region: 'Santorini & Athens', img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80&fit=crop', blurb: 'Whitewashed cliffs, blue domes and the cradle of civilisation.', best: 'Apr – Oct', highlights: ['Santorini caldera sunsets', 'Oia & Fira', 'Acropolis & Parthenon', 'Island hopping', 'Aegean beaches'] },
  { city: 'Paris', region: 'France', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80&fit=crop', blurb: 'Romance, art and café culture in the City of Light.', best: 'Apr – Jun · Sep – Oct', highlights: ['Eiffel Tower', 'Louvre & Mona Lisa', 'Seine river cruise', 'Palace of Versailles', 'Champs-Élysées'] },
  { city: 'New York', region: 'USA', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80&fit=crop', blurb: 'The city that never sleeps — icons on every corner.', best: 'Apr – Jun · Sep – Nov', highlights: ['Times Square', 'Statue of Liberty', 'Central Park', 'A Broadway show', 'Empire State views'] },
  { city: 'Hong Kong', region: 'China SAR', img: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=900&q=80&fit=crop', blurb: 'Skyscrapers, dim sum and dazzling harbour lights.', best: 'Oct – Dec', highlights: ['Victoria Peak', 'Symphony of Lights', 'Disneyland', 'Star Ferry', 'Dim sum & markets'] },
  { city: 'Bangkok', region: 'Thailand', img: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=900&q=80&fit=crop', blurb: 'Glittering temples, street food and buzzing night markets.', best: 'Nov – Feb', highlights: ['Grand Palace & Wat Arun', 'Floating markets', 'Chao Phraya cruise', 'Street-food tour', 'Island day trips'] },
  { city: 'Turkey', region: 'Istanbul & Cappadocia', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=900&q=80&fit=crop', blurb: 'Where East meets West — empires, bazaars and balloons.', best: 'Apr – Jun · Sep – Nov', highlights: ['Hagia Sophia & Blue Mosque', 'Bosphorus cruise', 'Grand Bazaar', 'Cappadocia balloon ride', 'Turkish bath'] },
  { city: 'Israel', region: 'Holy Land', img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=80&fit=crop', blurb: 'Sacred sites and timeless history across the Holy Land.', best: 'Mar – May · Sep – Nov', highlights: ['Jerusalem Old City', 'Western Wall', 'Bethlehem', 'Float in the Dead Sea', 'Sea of Galilee'] },
  { city: 'Egypt', region: 'North Africa', img: 'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=900&q=80&fit=crop', blurb: 'Pyramids, the Nile and the wonders of the ancient world.', best: 'Oct – Apr', highlights: ['Pyramids of Giza & Sphinx', 'Nile cruise', 'Luxor & Karnak', 'Valley of the Kings', 'Red Sea diving'] },
]

export default function DestinationShowcase() {
  const [open, setOpen] = useState<number | null>(null)
  useEffect(() => {
    const on = open !== null
    document.body.style.overflow = on ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', on)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open') }
  }, [open])

  const d = open !== null ? dests[open] : null
  const hideImg = (e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.opacity = '0' }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {dests.map((dd, i) => (
          <button key={dd.city} onClick={() => setOpen(i)} className="hover-lift" data-reveal style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', minHeight: 280, border: '1px solid rgba(255,255,255,0.07)', cursor: 'pointer', padding: 0, textAlign: 'left', color: '#fff', background: 'linear-gradient(135deg, rgba(255,240,0,0.12), rgba(10,10,10,0.7))' }}>
            <img src={dd.img} alt={dd.city} onError={hideImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.92) 14%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.15))' }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '22px 20px' }}>
              <div style={{ fontSize: 24, fontWeight: 900, fontFamily: "'Urbanist', sans-serif", lineHeight: 1.1 }}>{dd.city}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
                <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>{dd.region}</span>
                <span style={{ color: '#fff000', fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>Explore <Icon name="arrow-right" size={12} style={{display:"inline",verticalAlign:"-2px"}} /></span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {d && (
        <div className="sb-modal" onClick={() => setOpen(null)} style={{ position: 'fixed', inset: 0, zIndex: 100001, background: 'rgba(5,5,5,0.72)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 620, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            <div style={{ position: 'relative', height: 200, background: 'linear-gradient(135deg, rgba(255,240,0,0.15), rgba(10,10,10,0.7))' }}>
              <img src={d.img} alt={d.city} onError={hideImg} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,15,15,1) 4%, rgba(15,15,15,0.3) 60%, rgba(15,15,15,0.05))' }} />
              <button onClick={() => setOpen(null)} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 38, height: 38, borderRadius: '50%', background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.18)', color: '#fff', fontSize: 18, cursor: 'pointer', backdropFilter: 'blur(8px)' }}><Icon name="close" size={18} /></button>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 28px 18px' }}>
                <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.45)', borderRadius: 100, padding: '4px 12px', textTransform: 'uppercase', marginBottom: 10, backdropFilter: 'blur(6px)' }}>{d.region}</span>
                <h3 style={{ fontSize: 30, fontWeight: 900, margin: 0, fontFamily: "'Urbanist', sans-serif" }}>{d.city}</h3>
              </div>
            </div>
            <div style={{ padding: '30px 34px 38px' }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, lineHeight: 1.7, margin: '0 0 18px' }}>{d.blurb}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 100, padding: '7px 14px', fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 22 }}>
                <span style={{ color: '#fff000' }}><Icon name="sun" size={14} style={{display:"inline",verticalAlign:"-2px"}} /></span> Best time: <strong style={{ color: '#fff' }}>{d.best}</strong>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>What you’ll do</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9, marginBottom: 26 }}>
                {d.highlights.map(h => (
                  <span key={h} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '8px 14px', fontSize: 13, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    <span style={{ color: '#fff000' }}><Icon name="sparkle" size={14} style={{display:"inline",verticalAlign:"-2px"}} /></span>{h}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <BookingButton flowKey="international" label={`Plan ${d.city}`} initial={{ to: d.city }} className="glass-cta" style={{ flex: 1, minWidth: 160, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }} />
                <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ flex: 1, minWidth: 140, padding: '15px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', textAlign: 'center' }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
