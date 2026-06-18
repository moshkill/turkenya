'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Icon from '@/components/Icon'

type Result = { ref: number; status: string; service: string; dates: string; createdAt: string }

const STEPS = [
  { label: 'Received', desc: 'We’ve got your request' },
  { label: 'Agent on it', desc: 'An agent is preparing your best price' },
  { label: 'Confirmed', desc: 'Your booking is confirmed' },
]
// map CRM status → timeline position (closed/lost handled separately)
function stepIndex(status: string) {
  if (status === 'converted') return 2
  if (status === 'contacted') return 1
  return 0
}

const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 12, padding: '14px 16px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel', sans-serif" }

export default function TrackPage() {
  const [ref, setRef] = useState('')
  const [phone, setPhone] = useState('')
  const [res, setRes] = useState<Result | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  async function lookup(e?: React.FormEvent) {
    e?.preventDefault()
    if (!ref.trim() || !phone.trim()) { setErr('Enter your reference number and phone.'); return }
    setBusy(true); setErr(''); setRes(null)
    try {
      const r = await fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref, phone }) })
      const d = await r.json()
      if (!r.ok) { setErr(d.error || 'Not found.'); setBusy(false); return }
      setRes(d)
    } catch { setErr('Connection failed — please try again.') }
    setBusy(false)
  }

  const closed = res && (res.status === 'closed' || res.status === 'lost')
  const cur = res ? stepIndex(res.status) : 0

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: "'Abel', system-ui, sans-serif" }}>
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '140px 24px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Track Booking</span></div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px', fontFamily: "'Urbanist', sans-serif" }}>Where’s my booking?</h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, lineHeight: 1.7, margin: '0 0 36px' }}>Enter your reference number and the phone number you booked with — no account needed.</p>

        <form onSubmit={lookup} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(20px, 4vw, 32px)', marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12 }} className="track-grid">
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 7, textTransform: 'uppercase' }}>Reference</label><input style={inp} value={ref} onChange={e => setRef(e.target.value)} placeholder="e.g. 142" inputMode="numeric" /></div>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 7, textTransform: 'uppercase' }}>Phone used</label><input style={inp} value={phone} onChange={e => setPhone(e.target.value)} placeholder="07xx xxx xxx" inputMode="tel" /></div>
          </div>
          {err && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.25)', color: '#ff6b6b', padding: '10px 14px', borderRadius: 10, fontSize: 15, marginTop: 14 }}>{err}</div>}
          <button type="submit" disabled={busy} className="glass-cta" style={{ marginTop: 16, width: '100%', padding: '15px', borderRadius: 100, fontWeight: 800, fontSize: 16, letterSpacing: 1, textTransform: 'uppercase', cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? 'Checking…' : 'Track my booking'}</button>
        </form>

        {res && (
          <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 20, padding: 'clamp(22px, 4vw, 34px)', animation: 'fadeUp 0.5s ease both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 1, textTransform: 'uppercase' }}>Booking #{res.ref}</div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Urbanist', sans-serif", marginTop: 2 }}>{res.service}{res.dates ? ` · ${res.dates}` : ''}</div>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Submitted {new Date(res.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>

            {closed ? (
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 20, color: 'rgba(255,255,255,0.7)', fontSize: 16, lineHeight: 1.6 }}>
                This booking is now closed. If you still need help, reach us on WhatsApp and we’ll pick it right back up.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {STEPS.map((s, i) => {
                  const doneStep = i < cur, active = i === cur
                  const color = doneStep || active ? '#fff000' : 'rgba(255,255,255,0.25)'
                  return (
                    <div key={s.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', alignSelf: 'stretch' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: doneStep ? '#fff000' : active ? 'rgba(255,240,0,0.15)' : 'rgba(255,255,255,0.05)', border: '1px solid ' + (doneStep || active ? 'rgba(255,240,0,0.6)' : 'rgba(255,255,255,0.12)'), color: doneStep ? '#0a0a0a' : color }}>
                          {doneStep ? <Icon name="check" size={16} stroke={2.5} /> : active ? <span className="animate-pulse-yellow" style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff000', display: 'block' }} /> : <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />}
                        </div>
                        {i < STEPS.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 26, background: doneStep ? 'rgba(255,240,0,0.5)' : 'rgba(255,255,255,0.1)' }} />}
                      </div>
                      <div style={{ paddingBottom: i < STEPS.length - 1 ? 22 : 0 }}>
                        <div style={{ fontSize: 17, fontWeight: 800, color: doneStep || active ? '#fff' : 'rgba(255,255,255,0.45)', fontFamily: "'Urbanist', sans-serif" }}>{s.label}{active && <span style={{ color: '#fff000', fontSize: 12, fontWeight: 700, marginLeft: 8, letterSpacing: 1 }}>NOW</span>}</div>
                        <div style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.desc}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
              <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}><Icon name="whatsapp" size={16} /> Chat to your agent</a>
              <a href="tel:+254722666644" className="glass-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}><Icon name="phone" size={15} /> Call us</a>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
