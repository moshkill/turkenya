'use client'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import SmartBooking from './SmartBooking'

// Homepage hero: type a destination, then a short conversation collects the
// rest and hands a structured lead to an agent. Intent-only — never quotes.
export default function HeroAsk() {
  const [open, setOpen] = useState(false)
  const [dest, setDest] = useState('')
  const [initial, setInitial] = useState<Record<string, string>>({})

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    document.documentElement.classList.toggle('modal-open', open)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    if (open) window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.documentElement.classList.remove('modal-open'); window.removeEventListener('keydown', onKey) }
  }, [open])

  function go() {
    setInitial(dest.trim() ? { to: dest.trim() } : {})
    setOpen(true)
  }

  return (
    <div>
      <div className="quickask">
        <span style={{ color: '#fff000', fontSize: 18, flexShrink: 0 }}>✦</span>
        <input
          value={dest}
          onChange={e => setDest(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') go() }}
          placeholder="Where are you headed? — e.g. New York, Dubai, Maasai Mara"
          aria-label="Where are you headed?"
        />
        <button onClick={go} className="glass-cta" style={{ flexShrink: 0, padding: '14px 30px', borderRadius: 100, fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer' }}>
          Plan it
        </button>
      </div>
      <div style={{ color: 'rgba(255,255,255,0.32)', fontSize: 13, marginTop: 14 }}>
        A few quick questions and an agent sends your best price on WhatsApp. We never auto-quote.
      </div>

      {open && createPortal(
        <div className="sb-modal" onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 100002, background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6vh 16px 16px', overflowY: 'auto' }}>
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: 600, background: 'rgba(15,15,15,0.98)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 'clamp(30px,4.5vw,48px)', boxShadow: '0 40px 100px rgba(0,0,0,0.6)' }}>
            <button onClick={() => setOpen(false)} aria-label="Close" style={{ position: 'absolute', top: 16, right: 16, width: 38, height: 38, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
            <SmartBooking flowKey="flights" initial={initial} onDone={() => setOpen(false)} />
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
