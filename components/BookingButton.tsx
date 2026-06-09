'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import SmartBooking from './SmartBooking'

// A button that opens the conversational SmartBooking in a focused modal.
// Drop-in anywhere: <BookingButton flowKey="flights" label="Get a Quote" />
export default function BookingButton({
  flowKey = 'flights', label = 'Get a Quote', className = 'glass-cta', style, initial,
}: { flowKey?: string; label?: string; className?: string; style?: React.CSSProperties; initial?: Record<string, string> }) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', open)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    if (open) window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open'); window.removeEventListener('keydown', onKey) }
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(true)} className={className} style={{ cursor: 'pointer', ...style }}>{label}</button>
      {open && createPortal(
        <div className="sb-modal" onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100002, background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 600, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 'clamp(30px,4.5vw,48px)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ position: 'absolute', top: 16, right: 16, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            <SmartBooking flowKey={flowKey} initial={initial} onDone={() => setOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
