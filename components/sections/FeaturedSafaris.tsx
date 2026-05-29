"use client";

import Link from 'next/link'

const safaris = [
  {
    name: 'Maasai Mara Classic',
    duration: '3 Days / 2 Nights',
    price: 'From $450',
    priceKES: 'KES 58,000',
    highlights: ['Big 5 Game Drives', 'Expert Guide', 'Full Board Lodge', 'Park Fees Included'],
    tag: 'MOST POPULAR',
    href: '/travel/safaris/maasai-mara',
  },
  {
    name: 'Amboseli & Tsavo',
    duration: '4 Days / 3 Nights',
    price: 'From $580',
    priceKES: 'KES 75,000',
    highlights: ['Elephant Herds', 'Kilimanjaro Views', 'Two Parks', 'Meals Included'],
    tag: 'FAMILY FAVOURITE',
    href: '/travel/safaris/amboseli',
  },
  {
    name: 'Kenya Grand Safari',
    duration: '7 Days / 6 Nights',
    price: 'From $1,200',
    priceKES: 'KES 155,000',
    highlights: ['Mara + Amboseli + Nakuru', 'Flying Package Option', 'Premium Lodges', 'All Inclusive'],
    tag: 'PREMIUM',
    href: '/travel/safaris',
  },
]

export default function FeaturedSafaris() {
  return (
    <section style={{ background: '#0D0D0D', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: '#fff000' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#fff000', letterSpacing: '0.25em' }}>SAFARI PACKAGES</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#F8F8F5', lineHeight: 1.1 }}>
              Featured <span style={{ color: '#fff000' }}>Safaris</span>
            </h2>
          </div>
          <Link href="/travel/safaris" className="btn-outline">All Safari Packages</Link>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {safaris.map((safari, i) => (
            <div key={i} style={{ background: '#1E1E1E', display: 'flex', flexDirection: 'column' }}>
              {/* Top accent */}
              <div style={{ height: 3, background: i === 2 ? '#fff000' : 'rgba(245,197,24,0.3)' }} />

              <div style={{ padding: '36px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Tag */}
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#fff000', letterSpacing: '0.2em', marginBottom: 16 }}>{safari.tag}</div>

                {/* Name */}
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#F8F8F5', marginBottom: 6 }}>{safari.name}</h3>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9E9080', marginBottom: 28 }}>{safari.duration}</div>

                {/* Highlights */}
                <div style={{ flex: 1, marginBottom: 32 }}>
                  {safari.highlights.map((h, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <div style={{ width: 6, height: 6, background: '#fff000', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#F5F0E8' }}>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24 }}>
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 800, color: '#fff000' }}>{safari.price}</div>
                    <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#9E9080', letterSpacing: '0.1em' }}>{safari.priceKES} per person</div>
                  </div>
                  <Link href={safari.href} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }}>
                    Book This Safari →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom quote CTA */}
        <div style={{ marginTop: 48, background: '#1E1E1E', padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, borderLeft: '4px solid #fff000' }}>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#F8F8F5', marginBottom: 8 }}>Need a Custom Safari?</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9E9080' }}>Tell us your dates, group size and budget — we'll design the perfect itinerary.</p>
          </div>
          <Link href="/contact" className="btn-primary">Get a Free Quote →</Link>
        </div>
      </div>
    </section>
  )
}
