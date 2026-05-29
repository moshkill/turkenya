export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Turkenya Tours & Safaris — Nairobi Travel Agency Since 2009',
  description: 'IATA registered tour operator in Nairobi, Kenya. 15+ years organising safaris, flights, car hire & corporate travel. KATO member. Trusted by thousands.',
}

const values = [
  { num: '01', title: 'Authentic', desc: 'We only recommend experiences we have personally verified and believe in.' },
  { num: '02', title: 'Reliable', desc: 'IATA registered with full licensing across Kenya. Your bookings are protected.' },
  { num: '03', title: 'Personal', desc: 'Every itinerary is custom-built around your needs, preferences, and budget.' },
  { num: '04', title: 'Transparent', desc: 'No hidden fees, no surprises. What we quote is what you pay — always.' },
]

export default function AboutPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Story</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 700 }}>About Turkenya<br />Tours & Safaris</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 500, margin: 0 }}>Built on a passion for African travel. Driven by your experience.</p>
        </div>
      </section>

      {/* Stats — Glassmorphism */}
      <div style={{ position: 'relative', marginTop: -48, zIndex: 5, padding: '0 24px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          background: 'rgba(255,240,0,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,240,0,0.2)', borderRadius: 20, padding: '0 20px',
          display: 'flex', flexWrap: 'wrap',
        }}>
          {[{ v: '500+', l: 'Travellers Served' }, { v: 'IATA', l: 'Registered' }, { v: '50+', l: 'Destinations' }, { v: '24/7', l: 'Support' }].map((s, i) => (
            <div key={i} style={{ flex: '1 1 140px', minWidth: 0, padding: '28px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,240,0,0.15)' : 'none' }}>
              <div style={{ fontSize: 'clamp(24px, 2.5vw, 40px)', fontWeight: 900, lineHeight: 1, fontFamily: "'Urbanist', sans-serif", color: '#fff000' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', gap: 60, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Who We Are</span></div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 24px' }}>Built on a Passion<br />for African Travel</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>Turkenya Tours and Safaris was founded with one belief — that exceptional travel should be accessible to everyone. From a budget Mara safari to a luxury Dubai escape, we bring the same dedication to every booking.</p>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.9, margin: 0 }}>IATA registered, fully licensed, and deeply rooted in the Kenyan travel landscape. Our team lives and breathes what we sell — and it shows in every itinerary we build.</p>
          </div>
          <div style={{ borderRadius: 20, overflow: 'hidden', height: 400 }}>
            <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80&fit=crop" alt="Safari landscape" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Values</span></div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>What We Stand For</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {values.map((v) => (
              <div key={v.num} style={{ padding: '40px 32px', background: '#0a0a0a', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'rgba(255,240,0,0.15)', lineHeight: 1, flexShrink: 0, fontFamily: "'Urbanist', sans-serif" }}>{v.num}</div>
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Ready to Travel With Us?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>Let us show you why thousands of travellers trust Turkenya.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Get in Touch</Link>
            <Link href="/safaris" style={{ background: 'rgba(255,255,255,0.06)', color: '#fff', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>View Safaris</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
