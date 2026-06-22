'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Icon from '@/components/Icon'

type Msg = { sender: string; body: string; price?: string | null; terms?: string | null; author?: string | null; createdAt: string }
type Result = { ref: number; status: string; service: string; dates: string; createdAt: string; messages?: Msg[] }

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

type BookingSummary = { ref: number; status: string; service: string; dates: string; createdAt: string }
const STATUS_LABEL: Record<string, string> = { new: 'Received', contacted: 'Agent on it', converted: 'Confirmed', closed: 'Closed', lost: 'Closed' }

export default function TrackPage() {
  const [ref, setRef] = useState('')
  const [phone, setPhone] = useState('')
  const [res, setRes] = useState<Result | null>(null)
  const [list, setList] = useState<BookingSummary[] | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)

  async function sendReply() {
    if (!reply.trim() || !res) return
    setSending(true)
    try {
      const r = await fetch('/api/track/message', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref: res.ref, phone, body: reply.trim() }) })
      const d = await r.json()
      if (r.ok) { setRes({ ...res, messages: d.messages, status: d.status || res.status }); setReply('') }
    } catch { /* ignore */ }
    setSending(false)
  }

  // accept / decline an offer — drives the booking status automatically
  async function act(action: 'accept' | 'decline') {
    if (!res) return
    if (action === 'accept' && !confirm('Accept this offer and confirm your booking? Your agent will finalise the details with you.')) return
    if (action === 'decline' && !confirm('Mark this enquiry as not interested? Your agent will stop following up — you can always start a new enquiry later.')) return
    setSending(true)
    try {
      const r = await fetch('/api/track/message', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref: res.ref, phone, action }) })
      const d = await r.json()
      if (r.ok) setRes({ ...res, messages: d.messages, status: d.status || res.status })
    } catch { /* ignore */ }
    setSending(false)
  }

  async function lookup(e?: React.FormEvent) {
    e?.preventDefault()
    if (!phone.trim()) { setErr('Enter the phone number you booked with.'); return }
    setBusy(true); setErr(''); setRes(null); setList(null)
    try {
      const r = await fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref: ref.trim() || undefined, phone }) })
      const d = await r.json()
      if (!r.ok) { setErr(d.error || 'Not found.'); setBusy(false); return }
      if (Array.isArray(d.bookings)) {
        // phone-only: one match opens straight away, otherwise show the list
        if (d.bookings.length === 1) { await openBooking(d.bookings[0].ref); setBusy(false); return }
        setList(d.bookings)
      } else {
        setRes(d)
      }
    } catch { setErr('Connection failed — please try again.') }
    setBusy(false)
  }

  // re-show the full phone-only list (e.g. the "All my bookings" back link)
  async function findAll() {
    if (!phone.trim()) return
    setBusy(true); setErr(''); setRes(null); setRef('')
    try {
      const r = await fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone }) })
      const d = await r.json()
      if (!r.ok) { setErr(d.error || 'Not found.'); setBusy(false); return }
      if (Array.isArray(d.bookings)) {
        if (d.bookings.length === 1) { await openBooking(d.bookings[0].ref); setBusy(false); return }
        setList(d.bookings)
      }
    } catch { setErr('Connection failed — please try again.') }
    setBusy(false)
  }

  // open one booking from the phone-only list (uses the same phone for access)
  async function openBooking(refNum: number) {
    setBusy(true); setErr('')
    try {
      const r = await fetch('/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ref: String(refNum), phone }) })
      const d = await r.json()
      if (!r.ok) { setErr(d.error || 'Not found.'); setBusy(false); return }
      setRef(String(refNum)); setList(null); setRes(d)
    } catch { setErr('Connection failed — please try again.') }
    setBusy(false)
  }

  const closed = res && (res.status === 'closed' || res.status === 'lost')
  const cur = res ? stepIndex(res.status) : 0
  const confirmed = res?.status === 'converted'
  const lastOffer = res?.messages?.slice().reverse().find(m => m.sender === 'agent' && m.price)
  const canAct = !!(res && lastOffer && !closed && !confirmed)

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh', fontFamily: "'Abel', system-ui, sans-serif" }}>
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '140px 24px 100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Track Booking</span></div>
        <h1 style={{ fontSize: 'clamp(30px, 5vw, 46px)', fontWeight: 900, lineHeight: 1.1, margin: '0 0 12px', fontFamily: "'Urbanist', sans-serif" }}>Where’s my booking?</h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, lineHeight: 1.7, margin: '0 0 36px' }}>Just enter the phone number you booked with — we’ll show all your bookings. No account, no reference needed.</p>

        <form onSubmit={lookup} style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 'clamp(20px, 4vw, 32px)', marginBottom: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 12 }} className="track-grid">
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 7, textTransform: 'uppercase' }}>Phone used</label><input style={inp} value={phone} onChange={e => setPhone(e.target.value)} placeholder="07xx xxx xxx" inputMode="tel" /></div>
            <div><label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.5, marginBottom: 7, textTransform: 'uppercase' }}>Reference <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>· optional</span></label><input style={inp} value={ref} onChange={e => setRef(e.target.value)} placeholder="e.g. 142" inputMode="numeric" /></div>
          </div>
          {err && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.25)', color: '#ff6b6b', padding: '10px 14px', borderRadius: 10, fontSize: 15, marginTop: 14 }}>{err}</div>}
          <button type="submit" disabled={busy} className="glass-cta" style={{ marginTop: 16, width: '100%', padding: '15px', borderRadius: 100, fontWeight: 800, fontSize: 16, letterSpacing: 1, textTransform: 'uppercase', cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.6 : 1 }}>{busy ? 'Checking…' : 'Find my bookings'}</button>
        </form>

        {list && (
          <div style={{ animation: 'fadeUp 0.5s ease both', marginBottom: 28 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', marginBottom: 14 }}>Your bookings · {list.length}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {list.map(b => (
                <button key={b.ref} onClick={() => openBooking(b.ref)} disabled={busy} style={{ textAlign: 'left', cursor: busy ? 'wait' : 'pointer', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }} className="card-hover">
                  <div>
                    <div style={{ fontSize: 17, fontWeight: 800, fontFamily: "'Urbanist', sans-serif" }}>{b.service}{b.dates ? <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}> · {b.dates}</span> : ''}</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 3 }}>Ref #{b.ref} · {new Date(b.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: (b.status === 'closed' || b.status === 'lost') ? 'rgba(255,255,255,0.4)' : '#fff000', background: (b.status === 'closed' || b.status === 'lost') ? 'rgba(255,255,255,0.06)' : 'rgba(255,240,0,0.1)', border: '1px solid ' + ((b.status === 'closed' || b.status === 'lost') ? 'rgba(255,255,255,0.12)' : 'rgba(255,240,0,0.3)'), borderRadius: 100, padding: '4px 11px' }}>{STATUS_LABEL[b.status] || b.status}</span>
                    <Icon name="chevron-right" size={16} style={{ color: 'rgba(255,255,255,0.4)' }} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {res && (
          <>
          <button onClick={findAll} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 14, padding: 0 }}>
            <Icon name="chevron-right" size={15} style={{ transform: 'rotate(180deg)' }} /> All my bookings
          </button>
          <div style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 20, padding: 'clamp(22px, 4vw, 34px)', animation: 'fadeUp 0.5s ease both' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
              <div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 1, textTransform: 'uppercase' }}>Booking #{res.ref}</div>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Urbanist', sans-serif", marginTop: 2 }}>{res.service}{res.dates ? ` · ${res.dates}` : ''}</div>
              </div>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Submitted {new Date(res.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>

            {confirmed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.35)', borderRadius: 14, padding: '16px 18px', marginBottom: 20 }}>
                <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(34,197,94,0.18)', color: '#4ade80', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="check" size={20} stroke={2.5} /></span>
                <div style={{ fontSize: 15.5, color: '#fff', lineHeight: 1.5 }}><strong>Booking confirmed</strong> — your agent will finalise the details with you shortly. 🎉</div>
              </div>
            )}
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

            {/* conversation thread with the agent */}
            <div style={{ marginTop: 26, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', marginBottom: 16 }}>Conversation with your agent</div>
              {(res.messages && res.messages.length) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
                  {res.messages.map((m, i) => {
                    const mine = m.sender === 'customer'
                    return (
                      <div key={i} style={{ display: 'flex', justifyContent: mine ? 'flex-end' : 'flex-start' }}>
                        <div style={{ maxWidth: '86%', background: mine ? 'rgba(255,240,0,0.1)' : 'rgba(255,255,255,0.05)', border: '1px solid ' + (mine ? 'rgba(255,240,0,0.25)' : 'rgba(255,255,255,0.1)'), borderRadius: 14, padding: '12px 15px' }}>
                          {!mine && <div style={{ fontSize: 11, color: '#fff000', fontWeight: 800, letterSpacing: 0.5, marginBottom: 5 }}>{m.author || 'Turkenya'} · Agent</div>}
                          {m.price && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', background: 'rgba(255,240,0,0.08)', border: '1px solid rgba(255,240,0,0.3)', borderRadius: 10, padding: '10px 12px', marginBottom: m.body ? 10 : 0 }}>
                              <span style={{ fontSize: 20, fontWeight: 900, color: '#fff000', fontFamily: "'Urbanist',sans-serif" }}>{m.price}</span>
                              {m.terms && <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, borderRadius: 100, padding: '3px 9px', background: m.terms === 'fixed' ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)', color: m.terms === 'fixed' ? '#ff8a8a' : '#4ade80', border: '1px solid ' + (m.terms === 'fixed' ? 'rgba(239,68,68,0.3)' : 'rgba(34,197,94,0.3)') }}>{m.terms === 'fixed' ? 'Fixed price' : 'Negotiable'}</span>}
                            </div>
                          )}
                          {m.body && <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{m.body}</div>}
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>{new Date(m.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 16, lineHeight: 1.6 }}>No messages yet. Your agent will post your price here — reply to ask about discounts, confirm, or add notes.</p>
              )}
              {canAct && lastOffer && (
                <div style={{ background: 'rgba(255,240,0,0.06)', border: '1px solid rgba(255,240,0,0.28)', borderRadius: 14, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', marginBottom: 12, lineHeight: 1.55 }}>Your agent offered <strong style={{ color: '#fff000' }}>{lastOffer.price}</strong>{lastOffer.terms === 'negotiable' ? ' — negotiable, so reply below if you’d like to discuss.' : '.'} Ready to go ahead?</div>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button onClick={() => act('accept')} disabled={sending} style={{ background: '#22c55e', color: '#04210f', border: 'none', padding: '12px 22px', borderRadius: 100, fontSize: 15, fontWeight: 800, cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.6 : 1 }}><Icon name="check" size={15} stroke={2.5} style={{ verticalAlign: '-2px', marginRight: 5 }} />Accept &amp; book</button>
                    <button onClick={() => act('decline')} disabled={sending} style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.14)', padding: '12px 22px', borderRadius: 100, fontSize: 15, fontWeight: 600, cursor: sending ? 'wait' : 'pointer' }}>Not interested</button>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 8 }}>
                <input style={inp} placeholder="Reply or ask a question…" value={reply} onChange={e => setReply(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendReply() }} />
                <button onClick={sendReply} disabled={sending || !reply.trim()} className="glass-cta" style={{ padding: '0 22px', borderRadius: 12, fontWeight: 800, fontSize: 14, cursor: 'pointer', opacity: (sending || !reply.trim()) ? 0.5 : 1, flexShrink: 0 }}>{sending ? '…' : 'Send'}</button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
              <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}><Icon name="whatsapp" size={16} /> WhatsApp instead</a>
              <a href="tel:+254722666644" className="glass-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 22px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}><Icon name="phone" size={15} /> Call us</a>
            </div>
          </div>
          </>
        )}
      </section>
    </main>
  )
}
