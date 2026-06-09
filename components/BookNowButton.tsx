'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import SmartBooking from './SmartBooking'

const SERVICES = [
  { key: 'flights', label: 'Flights', icon: '✈️', sub: 'Domestic & international' },
  { key: 'safari', label: 'Safari', icon: '🦁', sub: 'Parks & wildlife' },
  { key: 'international', label: 'International', icon: '🌍', sub: 'Holiday packages' },
  { key: 'car-hire', label: 'Car Hire', icon: '🚗', sub: 'Corporate & individual' },
  { key: 'logistics', label: 'Logistics', icon: '🚛', sub: 'Cargo & haulage' },
]

// "Book Now" entry point: a closable modal that first asks what to book,
// then drops into the matching conversational flow.
export default function BookNowButton({
  label = 'Book Now', className = 'book-btn desktop-nav', style, onOpen,
}: { label?: string; className?: string; style?: React.CSSProperties; onOpen?: () => void }) {
  const [open, setOpen] = useState(false)
  const [svc, setSvc] = useState<string | null>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', open)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    if (open) window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open'); window.removeEventListener('keydown', onKey) }
  }, [open])

  function start() { onOpen && onOpen(); setSvc(null); setOpen(true) }
  function close() { setOpen(false); setSvc(null) }

  return (
    <>
      <button onClick={start} className={className} style={{ cursor: 'pointer', ...style }}>{label}</button>
      {open && createPortal(
        <div className="sb-modal" onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 100002, background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 600, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 'clamp(30px,4.5vw,48px)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            {/* top controls */}
            <div style={{ position: 'absolute', top: 16, left: 16, right: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {svc ? (
                <button onClick={() => setSvc(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.8)', borderRadius: 100, padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>← Services</button>
              ) : <span />}
              <button onClick={close} aria-label="Close" style={{ width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            </div>

            <div style={{ height: 14 }} />

            {svc ? (
              <SmartBooking flowKey={svc} onDone={close} />
            ) : (
              <div className="sb-step">
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 22 }}>
                  <div className="sb-orb">✦</div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Urbanist', sans-serif", letterSpacing: '-0.01em' }}>What can we book for you?</div>
                    <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, marginTop: 4 }}>Pick one to get started — a few quick questions and we’re done.</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                  {SERVICES.map(s => (
                    <button key={s.key} onClick={() => setSvc(s.key)} className="card-hover" style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start', textAlign: 'left', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '18px 18px', color: '#fff', cursor: 'pointer', transition: 'all 0.18s' }}>
                      <span style={{ fontSize: 26 }}>{s.icon}</span>
                      <span style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Urbanist', sans-serif" }}>{s.label}</span>
                      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{s.sub}</span>
                    </button>
                  ))}
                </div>
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 12, marginTop: 22 }}>Press Esc or tap outside to close.</p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
