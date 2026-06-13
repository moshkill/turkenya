'use client'
import { useState } from 'react'
import Icon from './Icon'

const SERVICES = ['Air Ticketing', 'Safari', 'International', 'Car Hire', 'Logistics', 'Hotel Booking', 'Pilgrimage Tours', 'Conferences', 'Airport Transfers']
const input: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '13px 15px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel', sans-serif" }
const label: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 2, marginBottom: 7, textTransform: 'uppercase' }

// Public "leave a review" form. Submits unapproved; an admin approves it before
// it appears on the site.
export default function TestimonialForm() {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [service, setService] = useState('')
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [err, setErr] = useState('')

  async function submit() {
    if (name.trim().length < 2 || message.trim().length < 10) { setErr('Please add your name and a short review (10+ characters).'); return }
    setStatus('sending'); setErr('')
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, service, rating, message }),
      })
      if (res.ok) setStatus('done'); else { setStatus('error'); setErr('Something went wrong. Please try again.') }
    } catch { setStatus('error'); setErr('Connection failed. Please try again.') }
  }

  if (status === 'done') return (
    <div style={{ textAlign: 'center', padding: '36px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24 }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', color: '#22c55e' }}><Icon name="check" size={30} stroke={2.5} /></div>
      <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff000', marginBottom: 10, fontFamily: "'Urbanist', sans-serif" }}>Thank you!</h3>
      <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto' }}>Your review has been received. We&rsquo;ll publish it shortly once our team has had a quick look.</p>
    </div>
  )

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 'clamp(24px, 4vw, 40px)' }}>
      <h3 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 6px', fontFamily: "'Urbanist', sans-serif" }}>Share your experience</h3>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, margin: '0 0 26px' }}>Travelled with us? We&rsquo;d love to hear about it.</p>

      {/* star rating */}
      <div style={{ marginBottom: 22 }}>
        <span style={label}>Your rating</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} type="button" onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)} onClick={() => setRating(n)}
              aria-label={`${n} stars`} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: (hover || rating) >= n ? '#fff000' : 'rgba(255,255,255,0.2)', transition: 'color 0.15s' }}>
              <Icon name="star" size={30} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }} className="booking-fields">
        <div><label style={label}>Your name *</label><input style={input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah M." /></div>
        <div><label style={label}>Where you&rsquo;re from</label><input style={input} value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. London, UK" /></div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label style={label}>Service used</label>
        <select className="tk-select" style={input} value={service} onChange={e => setService(e.target.value)}>
          <option value="">Select…</option>
          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={label}>Your review *</label>
        <textarea style={{ ...input, resize: 'vertical' }} rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us how your trip went…" />
      </div>

      {err && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '12px 16px', borderRadius: 12, fontSize: 15, marginBottom: 16 }}>{err}</div>}

      <button onClick={submit} disabled={status === 'sending'} className="glass-cta" style={{ width: '100%', padding: 15, borderRadius: 100, fontSize: 15, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: status === 'sending' ? 'wait' : 'pointer', opacity: status === 'sending' ? 0.6 : 1 }}>
        {status === 'sending' ? 'Sending…' : 'Submit Review'}
      </button>
    </div>
  )
}
