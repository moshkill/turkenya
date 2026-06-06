'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import Link from 'next/link'

const services = ['Maasai Mara Safari', 'Amboseli Safari', 'International Travel', 'Air Ticketing', 'Car Hire', 'Hotel Booking', 'Pilgrimage Tours', 'Medical Tourism', 'Conferences & MICE', 'Logistics & Cargo', 'Airport Transfers', 'Custom Package', 'Other']

const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '14px 16px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box', fontFamily: "'Abel', sans-serif", transition: 'border-color 0.2s' }
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, marginBottom: 8, textTransform: 'uppercase' }

export default function ContactPage() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const data = Object.fromEntries(fd)
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) { setStatus('success') } else { setStatus('error') }
    } catch { setStatus('error') }
    setLoading(false)
  }

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '50vh', minHeight: 360, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Get in Touch</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Let&apos;s Plan Your Adventure</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 450, margin: 0 }}>Our team responds within 2 hours during business hours.</p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px 100px' }} className="contact-grid-wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'start' }} className="contact-grid">
          {/* Left — Contact Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Contact Info</span></div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 40, lineHeight: 1.7 }}>Based in Nairobi, serving clients across Kenya, East Africa, and the diaspora worldwide.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {[
                { label: 'Head Office', value: '3rd Floor, T-Mall\nNairobi West, Langata Road' },
                { label: 'Call / WhatsApp', value: '+254 722 666 644' },
                { label: 'Email', value: 'info@turkenya.com' },
                { label: 'Office Hours', value: 'Mon–Sat: 8am – 8pm EAT' },
              ].map(item => (
                <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, color: '#fff000', fontWeight: 700, letterSpacing: 3, marginBottom: 6, textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '16px 28px', fontWeight: 700, textDecoration: 'none', fontSize: 14, letterSpacing: 1, borderRadius: 100 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — Form */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '44px 40px' }}>
            <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.01em' }}>Send an Enquiry</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 36 }}>Fill in the form and we will get back to you within 2 hours.</p>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '60px 24px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: 28 }}>&#10003;</div>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#fff000', marginBottom: 12 }}>Message Received!</h3>
                <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>Thank you for reaching out. Our team will contact you within 2 hours during business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input name="name" type="text" placeholder="John Doe" required style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone / WhatsApp</label>
                    <input name="phone" type="tel" placeholder="+254 7XX XXX XXX" required style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input name="email" type="email" placeholder="your@email.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Service Interested In</label>
                  <select name="service" style={{ ...inputStyle, background: 'rgba(30,30,30,1)' }}>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Travel Dates (Optional)</label>
                  <input name="dates" type="text" placeholder="e.g. 15–20 August 2026" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Your Message</label>
                  <textarea name="message" placeholder="Tell us about your group size, budget, and what you are looking for..." rows={5} required style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                {status === 'error' && <div style={{ background: 'rgba(255,60,60,0.08)', border: '1px solid rgba(255,60,60,0.2)', color: '#ff6b6b', padding: '14px 18px', borderRadius: 12, fontSize: 14 }}>Something went wrong. Please try WhatsApp or call us directly.</div>}
                <button type="submit" disabled={loading} style={{ background: loading ? 'rgba(255,240,0,0.5)' : '#fff000', color: '#0D0D0D', padding: '16px', fontWeight: 700, fontSize: 15, letterSpacing: 2, border: 'none', borderRadius: 100, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s', textTransform: 'uppercase' }}>{loading ? 'SENDING...' : 'SEND ENQUIRY'}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
