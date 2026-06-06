'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'

type Service = {
  key: string
  label: string
  unit: string // how estimate is calculated
  base: number // base price per unit (KES unless usd:true)
  usd?: boolean
  perPerson?: boolean
}

const SERVICES: Service[] = [
  { key: 'safari', label: 'Kenya Safari', unit: 'per person', base: 22000, perPerson: true },
  { key: 'flight', label: 'Air Ticket', unit: 'per ticket', base: 0, perPerson: true },
  { key: 'car', label: 'Car Hire', unit: 'per day', base: 6000 },
  { key: 'hotel', label: 'Hotel Booking', unit: 'per night', base: 8000 },
  { key: 'international', label: 'International Holiday', unit: 'per person', base: 1200, usd: true, perPerson: true },
  { key: 'pilgrimage', label: 'Umrah / Pilgrimage', unit: 'per person', base: 1800, usd: true, perPerson: true },
  { key: 'medical', label: 'Medical Tourism', unit: 'per person', base: 0, usd: true, perPerson: true },
  { key: 'conference', label: 'Conference / MICE', unit: 'per delegate', base: 0 },
  { key: 'transfer', label: 'Airport Transfer', unit: 'per trip', base: 2500 },
  { key: 'logistics', label: 'Cargo / Logistics', unit: 'per trip', base: 0 },
]

const BUDGET_TIERS = [
  { key: 'budget', label: 'Budget', mult: 1, desc: 'Best value, essentials covered' },
  { key: 'standard', label: 'Standard', mult: 1.6, desc: 'Comfortable mid-range' },
  { key: 'luxury', label: 'Luxury', mult: 2.8, desc: 'Premium, top-tier experience' },
]

const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel', sans-serif" }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, marginBottom: 8, textTransform: 'uppercase' }

export default function QuoteBuilder() {
  const [step, setStep] = useState(1)
  const [service, setService] = useState<Service | null>(null)
  const [details, setDetails] = useState({ destination: '', dates: '', duration: 3, group: 2, budget: 'standard' })
  const [contact, setContact] = useState({ name: '', phone: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [refId, setRefId] = useState<number | null>(null)

  const tier = BUDGET_TIERS.find(t => t.key === details.budget) || BUDGET_TIERS[1]

  // Indicative estimate
  function estimate(): { low: number; high: number; currency: string } | null {
    if (!service || service.base === 0) return null
    const units = service.perPerson ? details.group : (service.unit.includes('day') || service.unit.includes('night') ? details.duration : 1)
    const perUnit = service.base * tier.mult
    const total = perUnit * units * (service.perPerson && (service.unit.includes('day')) ? details.duration : 1)
    return {
      low: Math.round(total * 0.9),
      high: Math.round(total * 1.25),
      currency: service.usd ? 'USD' : 'KES',
    }
  }

  const est = estimate()

  function fmt(n: number, cur: string) {
    return cur + ' ' + n.toLocaleString()
  }

  async function submit() {
    if (!service || !contact.name || !contact.phone) return
    setStatus('sending')
    const message = [
      `QUOTE REQUEST — ${service.label}`,
      details.destination && `Destination/Route: ${details.destination}`,
      details.dates && `Travel dates: ${details.dates}`,
      `Duration: ${details.duration} ${service.unit.includes('night') ? 'nights' : 'days'}`,
      `Group size: ${details.group}`,
      `Budget tier: ${tier.label}`,
      est && `Indicative estimate: ${fmt(est.low, est.currency)} – ${fmt(est.high, est.currency)}`,
    ].filter(Boolean).join('\n')

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          service: service.label,
          dates: details.dates,
          message,
          source: 'quote',
        }),
      })
      const d = await res.json().catch(() => ({}))
      if (res.ok) { setStatus('done'); setRefId(d.id || null) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  const progress = (step / 4) * 100

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ position: 'relative', paddingTop: 140, paddingBottom: 60, textAlign: 'center', padding: '140px 24px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
          <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Instant Quote</span>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 16px', fontFamily: "'Urbanist', sans-serif" }}>
          Build Your Quote
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
          Four quick steps to an indicative price. We confirm the final quote within 2 hours.
        </p>
      </section>

      {/* Builder card */}
      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 24px 120px' }}>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: 'clamp(24px, 4vw, 48px)' }}>

          {status === 'done' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>&#10003;</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, color: '#fff000', marginBottom: 12, fontFamily: "'Urbanist', sans-serif" }}>Quote Request Sent!</h2>
              <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 420, margin: '0 auto 24px' }}>
                {refId && <>Reference <strong style={{ color: '#fff' }}>#{refId}</strong>. </>}
                Our team will send your detailed quote within 2 hours during business hours.
              </p>
              {est && (
                <div style={{ background: 'rgba(255,240,0,0.06)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 12, padding: 20, marginBottom: 24 }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Indicative Estimate</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#fff000', fontFamily: "'Urbanist', sans-serif" }}>{fmt(est.low, est.currency)} – {fmt(est.high, est.currency)}</div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={() => window.print()} style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 700, border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer' }}>Save as PDF</button>
                <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>WhatsApp Us</a>
              </div>
            </div>
          ) : (
          <>
            {/* Progress */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>Step {step} of 4</span>
                <span style={{ fontSize: 12, color: '#fff000', fontWeight: 700 }}>{Math.round(progress)}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: '#fff000', borderRadius: 4, transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            </div>

            {/* Step 1 — Service */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, fontFamily: "'Urbanist', sans-serif" }}>What are you booking?</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 10 }}>
                  {SERVICES.map(s => (
                    <button key={s.key} onClick={() => { setService(s); setStep(2) }} style={{
                      background: service?.key === s.key ? 'rgba(255,240,0,0.12)' : 'rgba(255,255,255,0.04)',
                      border: service?.key === s.key ? '1px solid #fff000' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12, padding: '18px 14px', color: '#fff', cursor: 'pointer',
                      fontSize: 14, fontWeight: 600, textAlign: 'left', transition: 'all 0.2s',
                    }}>{s.label}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — Trip details */}
            {step === 2 && service && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, fontFamily: "'Urbanist', sans-serif" }}>Tell us about your {service.label.toLowerCase()}</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>{service.key === 'flight' ? 'Route (e.g. Nairobi → London)' : 'Destination'}</label>
                    <input style={inputStyle} value={details.destination} onChange={e => setDetails({ ...details, destination: e.target.value })} placeholder={service.key === 'flight' ? 'Nairobi → Dubai' : 'e.g. Maasai Mara'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Travel dates</label>
                    <input style={inputStyle} value={details.dates} onChange={e => setDetails({ ...details, dates: e.target.value })} placeholder="e.g. 15–20 August 2026" />
                  </div>
                  {(service.unit.includes('day') || service.unit.includes('night') || service.perPerson) && (
                    <div>
                      <label style={labelStyle}>{service.unit.includes('night') ? 'Number of nights' : 'Number of days'}</label>
                      <input type="number" min={1} style={inputStyle} value={details.duration} onChange={e => setDetails({ ...details, duration: Math.max(1, parseInt(e.target.value) || 1) })} />
                    </div>
                  )}
                </div>
                <StepNav onBack={() => setStep(1)} onNext={() => setStep(3)} />
              </div>
            )}

            {/* Step 3 — Group + budget */}
            {step === 3 && service && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, fontFamily: "'Urbanist', sans-serif" }}>Group size &amp; budget</h2>
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Number of travellers</label>
                  <input type="number" min={1} style={inputStyle} value={details.group} onChange={e => setDetails({ ...details, group: Math.max(1, parseInt(e.target.value) || 1) })} />
                </div>
                <label style={labelStyle}>Budget tier</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 10, marginBottom: 8 }}>
                  {BUDGET_TIERS.map(t => (
                    <button key={t.key} onClick={() => setDetails({ ...details, budget: t.key })} style={{
                      background: details.budget === t.key ? 'rgba(255,240,0,0.12)' : 'rgba(255,255,255,0.04)',
                      border: details.budget === t.key ? '1px solid #fff000' : '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 12, padding: '16px 14px', color: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                    }}>
                      <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{t.label}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{t.desc}</div>
                    </button>
                  ))}
                </div>
                {est && (
                  <div style={{ background: 'rgba(255,240,0,0.06)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 12, padding: 20, marginTop: 20 }}>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>Indicative Estimate</div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: '#fff000', fontFamily: "'Urbanist', sans-serif" }}>{fmt(est.low, est.currency)} – {fmt(est.high, est.currency)}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>Final price confirmed by our team within 2 hours.</div>
                  </div>
                )}
                <StepNav onBack={() => setStep(2)} onNext={() => setStep(4)} />
              </div>
            )}

            {/* Step 4 — Contact */}
            {step === 4 && service && (
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 24, fontFamily: "'Urbanist', sans-serif" }}>Where do we send your quote?</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Full name</label>
                    <input style={inputStyle} value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} placeholder="John Doe" />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp</label>
                    <input style={inputStyle} value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder="+254 7XX XXX XXX" />
                  </div>
                  <div>
                    <label style={labelStyle}>Email (optional)</label>
                    <input style={inputStyle} value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="your@email.com" />
                  </div>
                </div>
                {status === 'error' && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '14px 18px', borderRadius: 12, fontSize: 14, marginTop: 20 }}>Something went wrong. Please WhatsApp us at +254 722 666 644.</div>}
                <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
                  <button onClick={() => setStep(3)} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back</button>
                  <button onClick={submit} disabled={status === 'sending' || !contact.name || !contact.phone} style={{ flex: 1, background: status === 'sending' || !contact.name || !contact.phone ? 'rgba(255,240,0,0.4)' : '#fff000', color: '#0D0D0D', padding: '15px', borderRadius: 100, fontSize: 15, fontWeight: 800, letterSpacing: 1, border: 'none', cursor: status === 'sending' || !contact.name || !contact.phone ? 'not-allowed' : 'pointer', textTransform: 'uppercase' }}>
                    {status === 'sending' ? 'Sending...' : 'Get My Quote'}
                  </button>
                </div>
              </div>
            )}
          </>
          )}
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 24 }}>
          Prefer to talk? <Link href="/contact" style={{ color: '#fff000', textDecoration: 'none' }}>Contact us</Link> or WhatsApp +254 722 666 644
        </p>
      </section>
    </main>
  )
}

function StepNav({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
      <button onClick={onBack} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)', padding: '14px 28px', borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Back</button>
      <button onClick={onNext} style={{ flex: 1, background: '#fff000', color: '#0D0D0D', padding: '14px', borderRadius: 100, fontSize: 14, fontWeight: 800, letterSpacing: 1, border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>Continue</button>
    </div>
  )
}
