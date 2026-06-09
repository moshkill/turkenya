'use client'
import { useState, useEffect, useRef } from 'react'

/* ──────────────────────────────────────────────────────────────────────────
   Scripted conversational booking. Feels like a chat, but it's deterministic:
   asks one short question at a time, collects structured data (incl. passenger
   breakdown), and posts a clean lead to /api/leads for an agent to action.
   It NEVER quotes a price — the agent gives the final, dynamic price.
   ────────────────────────────────────────────────────────────────────────── */

type Pax = { adults: number; children: number; infants: number }
type Step =
  | { type: 'choice'; key: string; q: string; label?: string; options: string[]; allowOther?: boolean; showIf?: (d: any) => boolean }
  | { type: 'text'; key: string; q: string; label?: string; placeholder?: string; suggestions?: string[] | ((d: any) => string[]); showIf?: (d: any) => boolean }
  | { type: 'date'; key: string; q: string; label?: string; showIf?: (d: any) => boolean }
  | { type: 'pax'; key: string; q: string; showIf?: (d: any) => boolean }
  | { type: 'contact'; key: string; q: string; showIf?: (d: any) => boolean }

type Flow = { service: string; intro: string; steps: Step[]; doneCta?: string }

export const FLOWS: Record<string, Flow> = {
  flights: {
    service: 'Air Ticketing', intro: 'Let’s find your flight ✈️',
    steps: [
      { type: 'choice', key: 'purpose', q: 'Who is this trip for?', label: 'Booking', options: ['Just me / Family', 'Corporate / Group'] },
      { type: 'text', key: 'to', q: 'Where are you headed?', label: 'To', placeholder: 'e.g. New York', suggestions: (d) => d.category === 'Domestic' ? ['Mombasa', 'Kisumu', 'Lamu', 'Eldoret', 'Malindi'] : d.category === 'Regional' ? ['Entebbe', 'Dar es Salaam', 'Kigali', 'Addis Ababa', 'Johannesburg'] : ['Dubai', 'London', 'Doha', 'Istanbul', 'New York', 'Guangzhou'] },
      { type: 'text', key: 'from', q: 'Flying from?', label: 'From', placeholder: 'Nairobi', suggestions: ['Nairobi', 'Mombasa', 'Kisumu'] },
      { type: 'choice', key: 'trip', q: 'One-way or return?', label: 'Trip', options: ['Return', 'One-way'] },
      { type: 'date', key: 'depart', q: 'Departure date?', label: 'Depart' },
      { type: 'date', key: 'return', q: 'Return date?', label: 'Return', showIf: d => d.trip === 'Return' },
      // personal
      { type: 'pax', key: 'pax', q: 'Who’s travelling?', showIf: d => d.purpose !== 'Corporate / Group' },
      // corporate
      { type: 'text', key: 'company', q: 'Company name?', label: 'Company', placeholder: 'e.g. Acme Ltd', showIf: d => d.purpose === 'Corporate / Group' },
      { type: 'text', key: 'travellers', q: 'How many travellers?', label: 'Travellers', placeholder: 'e.g. 25', suggestions: ['1–5', '6–20', '21–50', '50+'], showIf: d => d.purpose === 'Corporate / Group' },
      { type: 'choice', key: 'frequency', q: 'How often do you book?', label: 'Frequency', options: ['One-off', 'Regular', 'Annual contract'], showIf: d => d.purpose === 'Corporate / Group' },
      { type: 'choice', key: 'billing', q: 'Billing preference?', label: 'Billing', options: ['Pay per trip', 'Monthly invoice', 'Credit account'], showIf: d => d.purpose === 'Corporate / Group' },
      { type: 'choice', key: 'cabin', q: 'Which cabin?', label: 'Cabin', options: ['Economy', 'Premium', 'Business', 'First'] },
      { type: 'contact', key: 'contact', q: 'Where do we send your fare?' },
    ],
  },
  'car-hire': {
    service: 'Car Hire', intro: 'Let’s sort your ride 🚗',
    steps: [
      { type: 'choice', key: 'need', q: 'What do you need?', label: 'Need', options: ['Corporate contract', 'Executive VIP', 'Self-drive', 'Chauffeur', 'Wedding', 'Airport transfer'] },
      { type: 'choice', key: 'vehicle', q: 'Which vehicle?', label: 'Vehicle', options: ['Prado', 'Land Cruiser V8', 'Range Rover', 'Mercedes', 'Van / Bus', 'Saloon'], allowOther: true },
      { type: 'text', key: 'duration', q: 'For how long?', label: 'Duration', placeholder: 'e.g. 6 months', suggestions: ['1 day', '1 week', '1 month', '6 months', '1 year', '2 years'] },
      { type: 'date', key: 'start', q: 'Start date?', label: 'Start' },
      { type: 'text', key: 'pickup', q: 'Pickup location?', label: 'Pickup', placeholder: 'e.g. JKIA, Nairobi CBD' },
      { type: 'contact', key: 'contact', q: 'Where do we send your quote?' },
    ],
  },
  safari: {
    service: 'Safari', intro: 'Let’s plan your safari 🦁',
    steps: [
      { type: 'choice', key: 'park', q: 'Which safari?', label: 'Park', options: ['Maasai Mara', 'Amboseli', 'Samburu', 'Tsavo', 'Multi-park', 'Help me choose'] },
      { type: 'text', key: 'when', q: 'When are you going?', label: 'When', placeholder: 'e.g. August', suggestions: ['This month', 'Next month', 'Jul–Oct (Migration)'] },
      { type: 'pax', key: 'pax', q: 'Who’s travelling?' },
      { type: 'choice', key: 'style', q: 'Comfort level?', label: 'Style', options: ['Budget', 'Mid-range', 'Luxury'] },
      { type: 'contact', key: 'contact', q: 'Where do we send your plan?' },
    ],
  },
  international: {
    service: 'International', intro: 'Let’s plan your holiday 🌍',
    steps: [
      { type: 'choice', key: 'to', q: 'Where to?', label: 'To', options: ['Dubai', 'Mauritius', 'Maldives', 'Greece', 'Paris', 'New York', 'Hong Kong', 'Bangkok', 'Turkey', 'Israel', 'Egypt'], allowOther: true },
      { type: 'date', key: 'when', q: 'When?', label: 'When' },
      { type: 'text', key: 'nights', q: 'How many nights?', label: 'Nights', placeholder: 'e.g. 5', suggestions: ['3', '5', '7', '10', '14'] },
      { type: 'pax', key: 'pax', q: 'Who’s travelling?' },
      { type: 'contact', key: 'contact', q: 'Where do we send your quote?' },
    ],
  },
  logistics: {
    service: 'Logistics', intro: 'Let’s move your cargo 🚛',
    steps: [
      { type: 'choice', key: 'cargo', q: 'What are you moving?', label: 'Cargo', options: ['Containerised', 'General / palletised', 'Bulk goods', 'Machinery / oversized'], allowOther: true },
      { type: 'text', key: 'load', q: 'How much?', label: 'Load', placeholder: 'e.g. 2×40ft or 30 tonnes', suggestions: ['Under 10t', '10–28t', '28t+', '1×20ft', '1×40ft'] },
      { type: 'text', key: 'from', q: 'Pickup / port of origin?', label: 'From', placeholder: 'e.g. Mombasa port' },
      { type: 'text', key: 'to', q: 'Delivery destination?', label: 'To', placeholder: 'e.g. Nairobi warehouse' },
      { type: 'choice', key: 'frequency', q: 'One-off or ongoing?', label: 'Frequency', options: ['One-off', 'Regular', 'Contract'] },
      { type: 'contact', key: 'contact', q: 'Where do we send your quote?' },
    ],
  },
}

const inp: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 14, padding: '15px 18px', color: '#fff', fontSize: 16, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel', sans-serif" }
const chip: React.CSSProperties = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.16)', color: 'rgba(255,255,255,0.88)', borderRadius: 100, padding: '11px 20px', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s cubic-bezier(0.16,1,0.3,1)' }

function paxText(p: Pax) {
  const parts = [`${p.adults} adult${p.adults !== 1 ? 's' : ''}`]
  if (p.children) parts.push(`${p.children} child${p.children !== 1 ? 'ren' : ''}`)
  if (p.infants) parts.push(`${p.infants} infant${p.infants !== 1 ? 's' : ''}`)
  return parts.join(', ')
}

export default function SmartBooking({ flowKey, initial, onDone }: { flowKey: string; initial?: Record<string, string>; onDone?: () => void }) {
  const flow = FLOWS[flowKey] || FLOWS.flights
  const [data, setData] = useState<Record<string, any>>({ pax: { adults: 1, children: 0, infants: 0 }, ...(initial || {}) })
  const presetKeys = useRef(new Set(Object.keys(initial || {})))
  const [idx, setIdx] = useState(0)
  const [contact, setContact] = useState({ name: '', phone: '', email: '' })
  const [other, setOther] = useState('')
  const [draft, setDraft] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [refId, setRefId] = useState<number | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const steps = flow.steps.filter(s => !s.showIf || s.showIf(data))
  // If an initial value pre-answered early steps, skip ahead to first unanswered.
  useEffect(() => {
    let i = 0
    while (i < steps.length && steps[i].type !== 'contact' && steps[i].type !== 'pax' && data[steps[i].key]) i++
    setIdx(i)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [idx, status])

  const step = steps[idx]

  function answer(key: string, val: any) {
    const nd = { ...data, [key]: val }
    setData(nd)
    setDraft(''); setOther('')
    // recompute visible steps with new data, advance to next index
    const ns = flow.steps.filter(s => !s.showIf || s.showIf(nd))
    setIdx(Math.min(idx + 1, ns.length - 1) === idx ? idx + 1 : idx + 1)
  }

  async function submit() {
    if (!contact.name.trim() || !contact.phone.trim()) return
    setStatus('sending')
    const lines = [`${flow.service.toUpperCase()} ENQUIRY`]
    if (data.category) lines.push(`Flight type: ${data.category}`)
    steps.forEach(s => {
      if (s.type === 'pax') lines.push(`Passengers: ${paxText(data.pax)}`)
      else if (s.type !== 'contact' && data[s.key]) lines.push(`${(s as any).label || s.key}: ${data[s.key]}`)
    })
    const dateVal = data.depart || data.start || data.when || ''
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name, phone: contact.phone, email: contact.email,
          service: flow.service, dates: dateVal, message: lines.join('\n'),
          source: `smartbook-${flowKey}`,
        }),
      })
      const d = await res.json().catch(() => ({}))
      if (res.ok) { setStatus('done'); setRefId(d.id || null) } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '24px 4px' }}>
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontSize: 28 }}>✓</div>
        <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff000', marginBottom: 10, fontFamily: "'Urbanist', sans-serif" }}>Got it — we’re on it!</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 20px' }}>
          {refId && <>Ref <strong style={{ color: '#fff' }}>#{refId}</strong>. </>}
          An agent will WhatsApp you the best price within 2 hours.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>WhatsApp Us</a>
          {onDone && <button onClick={onDone} className="glass-ghost" style={{ padding: '12px 24px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Close</button>}
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative' }}>
      <div className="sb-aura" />
      {/* progress (exclude preset/hidden steps from the count) */}
      {(() => {
        const presetCount = steps.filter(s => presetKeys.current.has(s.key)).length
        const total = Math.max(1, steps.length - presetCount)
        const cur = Math.min(Math.max(0, idx - presetCount), total)
        return (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>{flow.intro}</span>
              <span style={{ fontSize: 12, color: '#fff000', fontWeight: 700 }}>{Math.min(cur + 1, total)}/{total}</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden', marginBottom: 22 }}>
              <div className="sb-prog-fill" style={{ height: '100%', width: `${(cur / total) * 100}%`, transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)' }} />
            </div>
          </>
        )
      })()}

      {/* answered bubbles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
        {steps.slice(0, idx).filter(s => !presetKeys.current.has(s.key)).map(s => (
          <div key={s.key} className="sb-bubble">
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 5 }}>{s.q}</div>
            <div style={{ display: 'inline-block', background: 'rgba(255,240,0,0.12)', border: '1px solid rgba(255,240,0,0.3)', color: '#fff', borderRadius: 12, padding: '8px 14px', fontSize: 14, fontWeight: 600 }}>
              {s.type === 'pax' ? paxText(data.pax) : (data[s.key] || '—')}
            </div>
          </div>
        ))}
      </div>

      {/* current step */}
      {step && step.type !== 'contact' && (
        <div className="sb-step" key={idx}>
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 18, fontFamily: "'Urbanist', sans-serif", letterSpacing: '-0.01em' }}>{step.q}</div>

          {step.type === 'choice' && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {step.options.map(o => (
                <button key={o} className="sb-chip" style={chip} onClick={() => answer(step.key, o)}>{o}</button>
              ))}
              {step.allowOther && (
                <div style={{ display: 'flex', gap: 8, width: '100%', marginTop: 6 }}>
                  <input style={inp} placeholder="Other…" value={other} onChange={e => setOther(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && other.trim()) answer(step.key, other.trim()) }} />
                  <button className="glass-cta" style={{ padding: '0 22px', borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: 'pointer' }} onClick={() => other.trim() && answer(step.key, other.trim())}>OK</button>
                </div>
              )}
            </div>
          )}

          {step.type === 'text' && (
            <div>
              {(() => {
                const sugg = typeof step.suggestions === 'function' ? step.suggestions(data) : step.suggestions
                return sugg && sugg.length ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                    {sugg.map(o => <button key={o} className="sb-chip" style={chip} onClick={() => answer(step.key, o)}>{o}</button>)}
                  </div>
                ) : null
              })()}
              <div style={{ display: 'flex', gap: 8 }}>
                <input style={inp} placeholder={step.placeholder} value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && draft.trim()) answer(step.key, draft.trim()) }} autoFocus />
                <button className="glass-cta" style={{ padding: '0 22px', borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: 'pointer' }} onClick={() => draft.trim() && answer(step.key, draft.trim())}>Next</button>
              </div>
            </div>
          )}

          {step.type === 'date' && (
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="date" style={{ ...inp, colorScheme: 'dark' }} value={draft} onChange={e => setDraft(e.target.value)} />
              <button className="glass-cta" style={{ padding: '0 22px', borderRadius: 12, fontWeight: 800, fontSize: 13, cursor: 'pointer' }} onClick={() => draft && answer(step.key, draft)}>Next</button>
            </div>
          )}

          {step.type === 'pax' && (
            <div>
              {([['adults', 'Adults', '12+'], ['children', 'Children', '2–11'], ['infants', 'Infants', 'under 2']] as const).map(([k, label, hint]) => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{hint}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <button aria-label={`less ${label}`} style={{ ...chip, width: 38, height: 38, padding: 0, fontSize: 18, lineHeight: 1 }} onClick={() => setData(d => ({ ...d, pax: { ...d.pax, [k]: Math.max(k === 'adults' ? 1 : 0, d.pax[k] - 1) } }))}>−</button>
                    <span style={{ minWidth: 20, textAlign: 'center', fontSize: 16, fontWeight: 700 }}>{data.pax[k]}</span>
                    <button aria-label={`more ${label}`} style={{ ...chip, width: 38, height: 38, padding: 0, fontSize: 18, lineHeight: 1 }} onClick={() => setData(d => ({ ...d, pax: { ...d.pax, [k]: d.pax[k] + 1 } }))}>+</button>
                  </div>
                </div>
              ))}
              <button className="glass-cta" style={{ marginTop: 18, width: '100%', padding: '14px', borderRadius: 100, fontWeight: 800, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer' }} onClick={() => answer('pax', data.pax)}>Continue</button>
            </div>
          )}
        </div>
      )}

      {/* contact (final) */}
      {step && step.type === 'contact' && (
        <div className="sb-step" key="contact">
          <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 18, fontFamily: "'Urbanist', sans-serif", letterSpacing: '-0.01em' }}>{step.q}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input style={inp} placeholder="Full name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} />
            <input style={inp} placeholder="Phone / WhatsApp" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
            <input style={inp} placeholder="Email (optional)" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
          </div>
          {status === 'error' && <div style={{ color: '#ff6b6b', fontSize: 14, marginTop: 12 }}>Something went wrong — please WhatsApp us at +254 722 666 644.</div>}
          <button disabled={status === 'sending' || !contact.name.trim() || !contact.phone.trim()} onClick={submit} className="glass-cta" style={{ marginTop: 18, width: '100%', padding: '15px', borderRadius: 100, fontWeight: 800, fontSize: 15, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', opacity: (status === 'sending' || !contact.name.trim() || !contact.phone.trim()) ? 0.5 : 1 }}>
            {status === 'sending' ? 'Sending…' : 'Send to an Agent'}
          </button>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 12 }}>No payment now. An agent confirms the final price with you.</p>
        </div>
      )}
      <div ref={endRef} />
    </div>
  )
}
