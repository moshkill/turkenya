export const dynamic = 'force-dynamic'
import Link from 'next/link'
import BookingButton from '@/components/BookingButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kenya Safari Packages 2026 — Maasai Mara, Amboseli, Samburu | Turkenya',
  description: 'Book Kenya safari packages from KES 22,000. Maasai Mara game drives, Amboseli elephant herds, Samburu wildlife. Big Five guaranteed. Budget to luxury. Nairobi-based operator since 2009.',
}

const pkgs = [
  { name: 'Maasai Mara Classic', days: '3D / 2N', price: 'From KES 45,000', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80&fit=crop', hi: ['Big Five game drives', 'Luxury tented camp', 'Bush breakfast', 'Expert KWS guide'] },
  { name: 'Amboseli & Kilimanjaro', days: '4D / 3N', price: 'From KES 62,000', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80&fit=crop', hi: ['Elephant herds', 'Kilimanjaro views', 'Sundowner drinks', 'Full board'] },
  { name: 'Samburu Explorer', days: '5D / 4N', price: 'From KES 78,000', img: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80&fit=crop', hi: ['Rare northern species', 'Ewaso Ngiro River', 'Cultural village visit', 'Airstrip access'] },
  { name: 'Ultimate Kenya Circuit', days: '8D / 7N', price: 'From KES 145,000', img: 'https://images.unsplash.com/photo-1551872427-1434a39a8c10?w=600&q=80&fit=crop', hi: ['Mara + Amboseli + Tsavo', 'Lake Nakuru flamingos', 'Private vehicle', 'Full board throughout'], featured: true },
  { name: 'Budget Mara Safari', days: '2D / 1N', price: 'From KES 22,000', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80&fit=crop', hi: ['Game drives', 'Campsite stay', 'Group tour', 'Park fees included'] },
  { name: 'Private Charter Safari', days: 'Custom', price: 'POA', img: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=600&q=80&fit=crop', hi: ['Your schedule', 'Private 4x4', 'Any destination', 'Fully custom'] },
]

const wildlife = [
  { animal: 'Lion', img: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=80&fit=crop' },
  { animal: 'Elephant', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&q=80&fit=crop' },
  { animal: 'Leopard', img: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=80&fit=crop' },
  { animal: 'Buffalo', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80&fit=crop' },
  { animal: 'Rhino', img: 'https://images.unsplash.com/photo-1551872427-1434a39a8c10?w=400&q=80&fit=crop' },
]

const whySafari = [
  { t: 'Certified KWS Guides', d: 'Silver-rated, Kenya-licensed driver-guides who read the bush and put you on the wildlife — not just near it.' },
  { t: '15+ Years on the Ground', d: 'Since 2009 we’ve run 500+ safaris across every Kenyan reserve. We know the camps, the rangers and the shortcuts.' },
  { t: 'Tailor-Made Itineraries', d: 'Budget camping to private luxury — we build the trip around your dates, pace and wish list, not a fixed template.' },
  { t: 'All-Inclusive, No Surprises', d: 'Park fees, accommodation, meals, 4x4 and guide are quoted up front. The price we send is the price you pay.' },
  { t: '24/7 On-Safari Support', d: 'A real person on WhatsApp for the whole trip — flat tyre, flight change or a special request, we’re one message away.' },
  { t: 'Diaspora-Friendly Booking', d: 'Plan from London, Dubai or New York. Pay securely from abroad and we handle every detail on the ground.' },
]

const seasons = [
  { m: 'Jul – Oct', t: 'Great Migration', d: 'A million wildebeest thunder across the Mara. Dramatic river crossings. Peak season — book early.', peak: true },
  { m: 'Jun – Oct', t: 'Dry Season', d: 'Sparse vegetation and animals gathered at waterholes make this the best all-round game viewing.' },
  { m: 'Jan – Mar', t: 'Calving & Cats', d: 'Green-season newborns in the southern plains draw lions, cheetahs and leopards. Fewer crowds.' },
  { m: 'Nov – Dec', t: 'Short Rains', d: 'Lush landscapes, superb birding and lower rates. Brief afternoon showers, then clear skies.' },
]

export default function SafarisPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>

      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline className="hero-entrance" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/safaris.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', color: '#fff000' }}>Safari Tours</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 700 }}>
            Kenya Safaris &<br />Wildlife Tours
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 32px' }}>
            Big Five. Breathtaking landscapes. Expertly curated game drives across East Africa&apos;s finest reserves.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#packages" className="glass-cta" style={{ padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase' }}>
              View Packages
            </a>
            <Link href="/quote?service=safari" className="glass-ghost" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
              Plan My Safari
            </Link>
          </div>
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
          {[
            { value: '300+', label: 'Safaris / Year' },
            { value: 'Big Five', label: 'All Parks Covered' },
            { value: 'Since 2009', label: 'On the Ground' },
            { value: '24/7', label: 'On-Safari Support' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: '1 1 140px', minWidth: 0, padding: '28px 16px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,240,0,0.15)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(24px, 2.5vw, 40px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', fontFamily: "'Urbanist', sans-serif", color: 'rgb(235,235,235)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <section id="packages" style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Packages</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Choose Your Safari</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 400, margin: 0, lineHeight: 1.6 }}>All prices include park fees, accommodation, meals, and a certified guide.</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))', gap: 24 }}>
          {pkgs.map((p) => (
            <div key={p.name} className="hover-lift" style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s',
            }}>
              <div style={{ height: 240, overflow: 'hidden', position: 'relative' }}>
                <img src={p.img} alt={p.name} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                {'featured' in p && (
                  <div style={{ position: 'absolute', top: 16, left: 16 }}>
                    <span style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)', fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 14px', borderRadius: 100 }}>Best Value</span>
                  </div>
                )}
              </div>
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, letterSpacing: 2 }}>{p.days}</span>
                  <span style={{ color: '#fff000', fontWeight: 800, fontSize: 17 }}>{p.price}</span>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 20px', letterSpacing: '-0.01em' }}>{p.name}</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px' }}>
                  {p.hi.map((h) => (
                    <li key={h} style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span style={{ color: '#fff000', fontSize: 14, flexShrink: 0 }}>&#10003;</span>{h}
                    </li>
                  ))}
                </ul>
                <Link href="/quote?service=safari" className="glass-cta" style={{
                  display: 'block', textAlign: 'center',
                  padding: '14px', fontWeight: 700, fontSize: 13,
                  letterSpacing: 2, textDecoration: 'none', borderRadius: 100,
                  textTransform: 'uppercase',
                }}>
                  Book This Safari
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Divider */}
      <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1920&q=80&fit=crop" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-20%', width: '100%', height: '140%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
          <p style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', maxWidth: 650, margin: '0 auto', lineHeight: 1.6, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            &ldquo;The wildebeest do not know the boundary between Kenya and Tanzania — and neither should you&rdquo;
          </p>
        </div>
      </div>

      {/* Why Safari With Turkenya */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Why Turkenya</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Safari Done Properly</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
            {whySafari.map((item, i) => (
              <div key={i} className="card-hover" style={{ padding: '32px 28px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', transition: 'border-color 0.3s' }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{item.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Five Wildlife Gallery */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>The Big Five</span>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, margin: 0 }}>Wildlife You Will See</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }} className="wildlife-grid">
            {wildlife.map((w) => (
              <div key={w.animal} className="hover-lift" style={{ position: 'relative', height: 280, overflow: 'hidden', borderRadius: 12 }}>
                <img src={w.img} alt={w.animal} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.8))' }} />
                <span style={{ position: 'absolute', bottom: 16, left: 16, color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: 3, textTransform: 'uppercase' }}>{w.animal}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to Go */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
              <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>When to Go</span>
              <div style={{ height: 1, width: 32, background: '#fff000' }} />
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.02em' }}>Best Time to Safari</h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>Kenya is a year-round destination — here&apos;s what each season delivers so you can time your trip.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {seasons.map((s, i) => (
              <div key={i} data-reveal style={{ position: 'relative', padding: '32px 26px', background: s.peak ? 'rgba(255,240,0,0.05)' : 'rgba(255,255,255,0.03)', border: s.peak ? '1px solid rgba(255,240,0,0.25)' : '1px solid rgba(255,255,255,0.07)', borderRadius: 18 }}>
                {s.peak && <span style={{ position: 'absolute', top: 16, right: 16, fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: '#fff000', border: '1px solid rgba(255,240,0,0.4)', borderRadius: 100, padding: '3px 10px', textTransform: 'uppercase' }}>Peak</span>}
                <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#fff000', textTransform: 'uppercase', marginBottom: 14 }}>{s.m}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{s.t}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Safari CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Custom Safari?<br />We Build It For You.</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px' }}>
            Tell us your dates, budget, and wish list — we design a bespoke itinerary tailored to you.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BookingButton flowKey="safari" label="Get a Free Quote" className="glass-cta" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }} />
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
