'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SERVICES, type ServiceConfig, type Field } from '@/lib/booking-config'

const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '13px 15px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel', sans-serif" }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 2, marginBottom: 7, textTransform: 'uppercase' }

function visibleFields(service: ServiceConfig, v: Record<string, string>): Field[] {
  return service.fields.filter(f => !f.showIf || f.showIf(v))
}
function initValues(service: ServiceConfig): Record<string, string> {
  const out: Record<string, string> = {}
  service.fields.forEach(f => { if (f.default !== undefined) out[f.name] = String(f.default) })
  return out
}

// The single, reusable smart booking form (used on /quote and /contact).
// Pass initialServiceKey, or it auto-reads ?service= from the URL.
export default function BookingForm({ initialServiceKey }: { initialServiceKey?: string }) {
  const [step, setStep] = useState(1)
  const [service, setService] = useState<ServiceConfig | null>(null)
  const [values, setValues] = useState<Record<string, string>>({})
  const [contact, setContact] = useState({ name: '', phone: '', email: '' })
  const [aiText, setAiText] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [refId, setRefId] = useState<number | null>(null)
  const [err, setErr] = useState('')

  // Pre-select a service from prop or ?service= query param.
  useEffect(() => {
    let key = initialServiceKey
    if (!key && typeof window !== 'undefined') {
      key = new URLSearchParams(window.location.search).get('service') || undefined
    }
    if (key) {
      const s = SERVICES.find(x => x.key === key)
      if (s) { setService(s); setValues(initValues(s)); setStep(2) }
    }
  }, [initialServiceKey])

  function pickService(s: ServiceConfig) {
    setService(s); setValues(initValues(s)); setAiText(''); setErr(''); setStep(2)
  }
  function setVal(name: string, val: string) { setValues(v => ({ ...v, [name]: val })) }
  function toggleMulti(name: string, option: string) {
    const cur = (values[name] || '').split(',').map(s => s.trim()).filter(Boolean)
    const next = cur.includes(option) ? cur.filter(o => o !== option) : [...cur, option]
    setVal(name, next.join(', '))
  }

  async function runAutofill() {
    if (!service || !aiText.trim()) return
    setAiLoading(true); setErr('')
    try {
      const fields = service.fields.map(f => ({ name: f.name, label: f.label, type: f.type, options: f.options }))
      const res = await fetch('/api/parse-trip', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ service: service.label, text: aiText, fields }) })
      const d = await res.json()
      if (d.values && typeof d.values === 'object') {
        const merged: Record<string, string> = { ...values }
        Object.entries(d.values).forEach(([k, val]) => { if (val != null && String(val).length) merged[k] = String(val) })
        setValues(merged)
      }
    } catch { setErr('Could not auto-fill — please fill the form manually.') }
    setAiLoading(false)
  }

  function validate(): boolean {
    if (!service) return false
    for (const f of visibleFields(service, values)) {
      if (f.required && !(values[f.name] || '').trim()) { setErr(`Please fill in: ${f.label}`); return false }
    }
    setErr(''); return true
  }

  function composeMessage(): string {
    if (!service) return ''
    const lines = [`BOOKING REQUEST — ${service.label}`]
    visibleFields(service, values).forEach(f => {
      const val = (values[f.name] || '').trim()
      if (val && f.name !== 'notes') lines.push(`${f.label}: ${val}`)
    })
    if (values.notes) lines.push(`Notes: ${values.notes}`)
    return lines.join('\n')
  }

  async function submit() {
    if (!service || !contact.name || !contact.phone) { setErr('Name and phone are required.'); return }
    setStatus('sending'); setErr('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name, phone: contact.phone, email: contact.email,
          service: service.label, dates: values.departDate || values.startDate || values.checkIn || values.date || '',
          message: composeMessage(), source: 'quote',
        }),
      })
      const d = await res.json().catch(() => ({}))
      if (res.ok) { setStatus('done'); setRefId(d.id || null) } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  const progress = (step / 3) * 100

  function renderField(f: Field) {
    const val = values[f.name] || ''
    if (f.type === 'segmented') {
      return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {f.options!.map(o => (
            <button key={o} type="button" onClick={() => setVal(f.name, o)} style={{
              flex: '1 1 auto', minWidth: 90, padding: '11px 14px', borderRadius: 10, cursor: 'pointer', fontSize: 14, fontWeight: 600,
              background: val === o ? '#fff000' : 'rgba(255,255,255,0.05)', color: val === o ? '#0d0d0d' : 'rgba(255,255,255,0.7)',
              border: val === o ? '1px solid #fff000' : '1px solid rgba(255,255,255,0.12)', transition: 'all 0.15s',
            }}>{o}</button>
          ))}
        </div>
      )
    }
    if (f.type === 'multiselect') {
      const sel = val.split(',').map(s => s.trim()).filter(Boolean)
      return (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {f.options!.map(o => (
            <button key={o} type="button" onClick={() => toggleMulti(f.name, o)} style={{
              padding: '9px 15px', borderRadius: 100, cursor: 'pointer', fontSize: 13, fontWeight: 600,
              background: sel.includes(o) ? 'rgba(255,240,0,0.15)' : 'rgba(255,255,255,0.05)', color: sel.includes(o) ? '#fff000' : 'rgba(255,255,255,0.7)',
              border: sel.includes(o) ? '1px solid #fff000' : '1px solid rgba(255,255,255,0.12)', transition: 'all 0.15s',
            }}>{sel.includes(o) ? '✓ ' : ''}{o}</button>
          ))}
        </div>
      )
    }
    if (f.type === 'select') {
      return (
        <select value={val} onChange={e => setVal(f.name, e.target.value)} style={{ ...inputStyle, background: 'rgba(30,30,30,1)' }}>
          <option value="">Select…</option>
          {f.options!.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )
    }
    if (f.type === 'textarea') {
      return <textarea value={val} onChange={e => setVal(f.name, e.target.value)} placeholder={f.placeholder} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
    }
    return <input type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'} value={val} onChange={e => setVal(f.name, e.target.value)} placeholder={f.placeholder} min={f.type === 'number' ? 0 : undefined} style={inputStyle} />
  }

  return (
    <>
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 'clamp(24px, 4vw, 44px)' }}>
        {status === 'done' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>&#10003;</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff000', marginBottom: 12, fontFamily: "'Urbanist', sans-serif" }}>Request Received!</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 24px' }}>
              {refId && <>Reference <strong style={{ color: '#fff' }}>#{refId}</strong>. </>}
              Our team will send your detailed quote within 2 hours during business hours.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>WhatsApp Us</a>
              <Link href="/" style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>Back Home</Link>
            </div>
          </div>
        ) : (
        <>
          {/* Progress */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>Step {step} of 3{service ? ` · ${service.label}` : ''}</span>
              <span style={{ fontSize: 12, color: '#fff000', fontWeight: 700 }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progress}%`, background: '#fff000', borderRadius: 4, transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
            </div>
          </div>

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 23, fontWeight: 900, marginBottom: 6, fontFamily: "'Urbanist', sans-serif" }}>What can we book for you?</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 24 }}>Choose a service to get started.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
                {SERVICES.map(s => (
                  <button key={s.key} onClick={() => pickService(s)} style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14,
                    padding: '18px 16px', color: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  }} className="card-hover">
                    <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                      {s.label}{s.core && <span style={{ fontSize: 9, color: '#fff000', border: '1px solid rgba(255,240,0,0.4)', borderRadius: 100, padding: '1px 6px', letterSpacing: 1 }}>CORE</span>}
                    </div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{s.tagline}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && service && (
            <div>
              <h2 style={{ fontSize: 23, fontWeight: 900, marginBottom: 18, fontFamily: "'Urbanist', sans-serif" }}>{service.label} details</h2>
              <div style={{ background: 'rgba(255,240,0,0.05)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 14, padding: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#fff000', letterSpacing: 1, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>✦ DESCRIBE IT — AI FILLS THE FORM</div>
                <textarea value={aiText} onChange={e => setAiText(e.target.value)} placeholder={service.key === 'flights' ? 'e.g. "Return flights Nairobi to London, 2 adults 1 child, business class, leaving 15 Dec back 5 Jan"' : service.key === 'car-hire' ? 'e.g. "3 Prados for our company for 6 months with drivers, starting next month"' : 'Describe your trip in your own words…'} rows={2} style={{ ...inputStyle, resize: 'vertical', marginBottom: 10 }} />
                <button onClick={runAutofill} disabled={aiLoading || !aiText.trim()} style={{ background: aiLoading || !aiText.trim() ? 'rgba(255,240,0,0.4)' : '#fff000', color: '#0d0d0d', border: 'none', borderRadius: 100, padding: '9px 20px', fontSize: 13, fontWeight: 800, letterSpacing: 1, cursor: aiLoading || !aiText.trim() ? 'not-allowed' : 'pointer' }}>{aiLoading ? 'Reading…' : '✦ Auto-fill'}</button>
              </div>
              <div className="booking-fields" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {visibleFields(service, values).map(f => (
                  <div key={f.name} style={{ gridColumn: f.half ? 'span 1' : 'span 2' }}>
                    <label style={labelStyle}>{f.label}{f.required && <span style={{ color: '#fff000' }}> *</span>}</label>
                    {renderField(f)}
                  </div>
                ))}
              </div>
              {err && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '12px 16px', borderRadius: 12, fontSize: 14, marginTop: 18 }}>{err}</div>}
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={() => setStep(1)} className="glass-ghost" style={{ color: 'rgba(255,255,255,0.85)', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                <button onClick={() => { if (validate()) setStep(3) }} className="glass-cta" style={{ flex: 1, padding: '14px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, cursor: 'pointer', textTransform: 'uppercase' }}>Continue</button>
              </div>
            </div>
          )}

          {step === 3 && service && (
            <div>
              <h2 style={{ fontSize: 23, fontWeight: 900, marginBottom: 18, fontFamily: "'Urbanist', sans-serif" }}>Where do we send your quote?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div><label style={labelStyle}>Full name *</label><input style={inputStyle} value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="John Doe" /></div>
                <div><label style={labelStyle}>Phone / WhatsApp *</label><input style={inputStyle} value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder="+254 7XX XXX XXX" /></div>
                <div><label style={labelStyle}>Email (optional)</label><input style={inputStyle} value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="your@email.com" /></div>
              </div>
              {err && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '12px 16px', borderRadius: 12, fontSize: 14, marginTop: 18 }}>{err}</div>}
              {status === 'error' && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '12px 16px', borderRadius: 12, fontSize: 14, marginTop: 18 }}>Something went wrong. Please WhatsApp us at +254 722 666 644.</div>}
              <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
                <button onClick={() => setStep(2)} className="glass-ghost" style={{ color: 'rgba(255,255,255,0.85)', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                <button onClick={submit} disabled={status === 'sending' || !contact.name || !contact.phone} className="glass-cta" style={{ flex: 1, padding: '15px', borderRadius: 100, fontSize: 15, fontWeight: 800, letterSpacing: 1, opacity: status === 'sending' || !contact.name || !contact.phone ? 0.5 : 1, cursor: status === 'sending' || !contact.name || !contact.phone ? 'not-allowed' : 'pointer', textTransform: 'uppercase' }}>{status === 'sending' ? 'Sending…' : 'Get My Quote'}</button>
              </div>
            </div>
          )}
        </>
        )}
      </div>
      <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 24 }}>
        Prefer to talk? WhatsApp us at <a href="https://wa.me/254722666644" style={{ color: '#fff000', textDecoration: 'none' }}>+254 722 666 644</a>
      </p>
    </>
  )
}
