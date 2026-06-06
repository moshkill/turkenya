export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'International Holiday Packages from Kenya — Dubai, Istanbul, Maldives | Turkenya',
  description: 'Book international holiday packages from Nairobi. Dubai from $1,200, Istanbul from $1,100, Maldives from $2,500. Visa, flights, hotel & transfers included. IATA accredited.',
}

const dest = [
  { city: 'Dubai', country: 'UAE', days: '5D / 4N', price: 'From USD 1,200', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop', desc: 'Burj Khalifa, desert safaris, world-class shopping, JBR beach and luxury brunches.' },
  { city: 'Istanbul', country: 'Turkey', days: '6D / 5N', price: 'From USD 1,100', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80&fit=crop', desc: 'Historic Old City, Bosphorus sunset cruise, Grand Bazaar, Hagia Sophia and Turkish cuisine.' },
  { city: 'Zanzibar', country: 'Tanzania', days: '4D / 3N', price: 'From USD 650', img: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&q=80&fit=crop', desc: 'Pristine white beaches, Spice Island tours, Stone Town heritage and dhow cruises.' },
  { city: 'Bali', country: 'Indonesia', days: '8D / 7N', price: 'From USD 1,800', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop', desc: 'Emerald rice terraces, ancient temples, world-class surf and luxury spa retreats.' },
  { city: 'Maldives', country: 'Maldives', days: '5D / 4N', price: 'From USD 2,500', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80&fit=crop', desc: 'Overwater bungalows, crystal-clear lagoons and total disconnection from the world.' },
  { city: 'London', country: 'UK', days: '7D / 6N', price: 'From USD 2,200', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&fit=crop', desc: 'Buckingham Palace, West End shows, iconic museums and Thames river cruise.' },
]

const included = [
  { title: 'Visa Assistance', desc: 'Full guidance through the visa process for any destination' },
  { title: 'Flight Booking', desc: 'Best fares on all airlines, all routes from Kenya' },
  { title: 'Curated Hotels', desc: 'Hand-picked stays at every budget level' },
  { title: 'All Transfers', desc: 'Airport pickups, hotel check-ins, seamless' },
]

export default function InternationalPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden' }}>
        <video autoPlay muted loop playsInline className="hero-entrance" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
          <source src="/videos/dubai.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>International Tours</span>
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 700 }}>
            The World<br />is Waiting
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: '0 0 32px' }}>
            Visa. Flights. Hotel. Transfers. You just pack — we handle everything else.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase' }}>Plan My Trip</Link>
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.2)' }}>WhatsApp Us</a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)' }}>
          {included.map((item) => (
            <div key={item.title} style={{ padding: '36px 28px', background: '#0a0a0a', textAlign: 'center' }}>
              <h4 style={{ color: '#fff000', fontSize: 12, fontWeight: 700, letterSpacing: 3, margin: '0 0 12px', textTransform: 'uppercase' }}>{item.title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Destinations */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ height: 1, width: 32, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Destinations</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Fully Packaged Holidays</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {dest.map((d) => (
            <div key={d.city} className="hover-lift" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img src={d.img} alt={d.city} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.7))' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 900, lineHeight: 1 }}>{d.city}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}>{d.country}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#fff000', fontSize: 14, fontWeight: 800 }}>{d.price}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 }}>{d.days}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '20px 24px 28px' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15, lineHeight: 1.7, margin: '0 0 20px' }}>{d.desc}</p>
                <Link href="/contact" style={{ display: 'block', textAlign: 'center', background: '#fff000', color: '#0D0D0D', padding: '13px', fontWeight: 700, fontSize: 13, letterSpacing: 2, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Book Package</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Divider */}
      <div style={{ position: 'relative', height: 350, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=80&fit=crop" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-20%', width: '100%', height: '140%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.5) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
          <p style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            &ldquo;Travel is the only thing you buy that makes you richer&rdquo;
          </p>
        </div>
      </div>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Dream Destination<br />Not Listed?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
            We package holidays to anywhere in the world. Tell us where you want to go — we make it happen.
          </p>
          <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Plan My Trip</Link>
        </div>
      </section>
    </main>
  )
}
