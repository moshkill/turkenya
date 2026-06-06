export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cargo Transport Kenya — Lorries, Trucks & Freight | Turkenya',
  description: 'Road freight and cargo transport across Kenya & East Africa. Lorries, box body trucks, trailers, flatbeds. Nairobi to Mombasa, Dar es Salaam, Kampala. Competitive rates.',
}

const fleet = [
  { num: '01', title: 'Lorries', desc: 'General purpose lorries for mid-size cargo loads. Ideal for palletised goods, hardware and general merchandise.' },
  { num: '02', title: 'Box Body Trucks', desc: 'Enclosed box body trucks that protect cargo from weather and dust. Perfect for retail goods, electronics and sensitive freight.' },
  { num: '03', title: 'Trailers', desc: 'High-capacity trailers for large or heavy loads. Suitable for bulk goods, machinery and oversized cargo.' },
  { num: '04', title: 'Flatbed Trucks', desc: 'Long flatbed and low-loader trucks built to carry shipping containers and heavy equipment.' },
]

const steps = [
  { num: '01', title: 'Tell Us Your Cargo', desc: 'Share cargo type, weight, dimensions, pickup and drop-off locations.' },
  { num: '02', title: 'We Match the Right Truck', desc: 'We assign the appropriate vehicle for your load — lorry, box body, trailer or flatbed.' },
  { num: '03', title: 'Goods Delivered', desc: 'Your cargo is transported safely and delivered on time to your destination.' },
]

export default function LogisticsPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Logistics & Cargo</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Road Freight<br />& Haulage</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: '0 0 32px' }}>Reliable cargo transportation across Kenya and East Africa. Competitive rates, on-time delivery, fully insured.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase' }}>Get a Quote</Link>
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Fleet</span></div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>The Right Vehicle for Every Load</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
          {fleet.map((f) => (
            <div key={f.num} className="card-hover" style={{ padding: '40px 32px', background: '#0a0a0a', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: 'rgba(255,240,0,0.32)', lineHeight: 1, flexShrink: 0, fontFamily: "'Urbanist', sans-serif" }}>{f.num}</div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Process</span><div style={{ height: 1, width: 32, background: '#fff000' }} /></div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, margin: 0 }}>How It Works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 32 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff000', color: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, margin: '0 auto 20px', fontFamily: "'Urbanist', sans-serif" }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Need to Move Cargo?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>Tell us your pickup point, destination, and cargo details — we handle the rest.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/254722666644?text=Hi%20Turkenya%2C%20I%20need%20to%20transport%20cargo" target="_blank" rel="noopener noreferrer" style={{ background: '#25D366', color: '#fff', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none' }}>WhatsApp Us Now</a>
            <Link href="/contact" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>Contact Us</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
