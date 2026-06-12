export const dynamic = 'force-dynamic'
import BookingButton from '@/components/BookingButton'
import HeroVideo from '@/components/HeroVideo'
import Icon, { IconName } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cargo & Haulage Kenya — 200+ Truck Fleet, Contracts | Turkenya',
  description: 'Road freight across Kenya & East Africa with a 200+ truck fleet. 10-wheeler box bodies, 28–30t trailers, container haulage from Mombasa port, intercity & cross-border. Trusted by government, parastatals, manufacturers and SMEs.',
}

const fleet = [
  { num: '01', title: '10-Wheeler Box Body', desc: 'Enclosed 10-wheelers that protect FMCG, retail goods and electronics from weather and dust — up to ~16 tonnes.' },
  { num: '02', title: '28–30t Trailers', desc: 'High-capacity flatbed and curtain-side trailers for bulk loads, palletised cargo and full truckloads — 28 to 30 tonnes.' },
  { num: '03', title: 'Container Haulage', desc: '20ft & 40ft container transport from Mombasa port to your warehouse, with clearing & forwarding support.' },
  { num: '04', title: 'Flatbeds & Low-Loaders', desc: 'Long flatbeds and low-loaders for machinery, plant, steel and oversized equipment.' },
]

const clients: { icon: IconName; t: string; d: string }[] = [
  { icon: 'shield', t: 'Government & Parastatals', d: 'Tendered contracts with full compliance and documentation.' },
  { icon: 'building', t: 'Manufacturers & Big Players', d: 'Scheduled bulk distribution at scale, on time.' },
  { icon: 'briefcase', t: 'SMEs & Retail', d: 'Flexible loads, reliable timelines and fair rates.' },
  { icon: 'ship', t: 'Importers & Exporters', d: 'Port clearance through to final-mile delivery.' },
]

const steps = [
  { num: '01', title: 'Tell Us Your Cargo', desc: 'Share cargo type, weight, dimensions, pickup and drop-off locations.' },
  { num: '02', title: 'We Match the Right Truck', desc: 'We assign the appropriate vehicle for your load — lorry, box body, trailer or flatbed.' },
  { num: '03', title: 'Goods Delivered', desc: 'Your cargo is transported safely and delivered on time to your destination.' },
]

const routes = [
  { r: 'Nairobi ⇄ Mombasa', d: 'The northern corridor — port clearance to inland delivery.' },
  { r: 'Nairobi ⇄ Kampala', d: 'Cross-border haulage into Uganda with customs support.' },
  { r: 'Nairobi ⇄ Dar es Salaam', d: 'Tanzania freight, both general and containerised cargo.' },
  { r: 'Nairobi ⇄ Kigali', d: 'Rwanda-bound loads via the central corridor.' },
  { r: 'Nairobi ⇄ Juba', d: 'South Sudan deliveries with escorted, tracked transport.' },
  { r: 'Anywhere in Kenya', d: 'Upcountry and last-mile distribution nationwide.' },
]

const logisticsWhy = [
  'GPS-tracked, insured cargo',
  'Experienced long-haul drivers',
  'Cross-border customs support',
  'Real-time delivery updates',
]

export default function LogisticsPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero — image placeholder first, fleet video fades in once fully loaded */}
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <HeroVideo src="/videos/logistics.mp4" poster="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80&fit=crop" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Logistics & Cargo</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Move Volume,<br />Move with Confidence</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 32px' }}>A 200+ truck fleet hauling cargo for government, manufacturers and SMEs — Mombasa port to your warehouse, intercity and cross-border. Contracts welcome.</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <BookingButton flowKey="logistics" label="Get a Quote" className="glass-cta" style={{ padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase' }} />
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '14px 36px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* Stats — Glassmorphism */}
      <div style={{ position: 'relative', marginTop: -48, zIndex: 5, padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', background: 'rgba(255,240,0,0.12)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 20, padding: '0 20px', display: 'flex', flexWrap: 'wrap' }}>
          {[{ v: '200+', l: 'Trucks in Fleet' }, { v: '28–30t', l: 'Per Trailer' }, { v: '24/7', l: 'GPS Tracking' }, { v: 'Since 2009', l: 'On the Road' }].map((s, i) => (
            <div key={i} style={{ flex: '1 1 140px', minWidth: 0, padding: '28px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,240,0,0.15)' : 'none' }}>
              <div style={{ fontSize: 'clamp(22px, 2.4vw, 36px)', fontWeight: 900, lineHeight: 1, fontFamily: "'Urbanist', sans-serif", color: 'rgb(235,235,235)' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

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
                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 16, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Move For */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Who We Move For</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Trusted with Serious Cargo</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {clients.map((c, i) => (
              <div key={i} data-reveal className="card-hover" style={{ padding: '30px 26px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, transition: 'border-color 0.3s' }}>
                <div style={{ color: '#fff000', marginBottom: 14 }}><Icon name={c.icon} size={30} stroke={1.75} /></div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{c.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{c.d}</p>
              </div>
            ))}
          </div>
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
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, margin: '0 auto 20px', fontFamily: "'Urbanist', sans-serif" }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 16, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes We Cover */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <div style={{ height: 1, width: 32, background: '#fff000' }} />
                <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Coverage</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Routes We Cover</h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, maxWidth: 520 }}>
              {logisticsWhy.map((w, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 100, padding: '8px 16px', fontSize: 14, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                  <span style={{ color: '#fff000', display: 'flex' }}><Icon name="check" size={14} stroke={2.5} /></span>{w}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {routes.map((rt, i) => (
              <div key={i} data-reveal className="card-hover" style={{ padding: '28px 26px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, transition: 'border-color 0.3s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <span style={{ color: '#fff000', display: 'flex' }}><Icon name="truck" size={18} /></span>
                  <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{rt.r}</h3>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{rt.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Need to Move Cargo?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>Tell us your pickup point, destination, and cargo details — we handle the rest.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BookingButton flowKey="logistics" label="Get a Quote" className="glass-cta" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
            <a href="https://wa.me/254722666644?text=Hi%20Turkenya%2C%20I%20need%20to%20transport%20cargo" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none' }}>WhatsApp Us Now</a>
          </div>
        </div>
      </section>
    </main>
  )
}
