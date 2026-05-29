"use client";

import Link from 'next/link'

const kenya = [
  { name: 'Maasai Mara', tag: 'Big 5 · Game Drives', href: '/travel/safaris/maasai-mara' },
  { name: 'Amboseli', tag: 'Elephants · Mt Kenya Views', href: '/travel/safaris/amboseli' },
  { name: 'Diani Beach', tag: 'Indian Ocean · Coral Reefs', href: '/travel/destinations/diani' },
  { name: 'Lake Nakuru', tag: 'Flamingos · Rhino Sanctuary', href: '/travel/safaris/lake-nakuru' },
]

const international = [
  { name: 'Dubai', flag: '🇦🇪', tag: 'Luxury · Shopping · Desert' },
  { name: 'Istanbul', flag: '🇹🇷', tag: 'Culture · Medical · Historic' },
  { name: 'Zanzibar', flag: '🇹🇿', tag: 'Beaches · Spice Island' },
  { name: 'Maldives', flag: '🇲🇻', tag: 'Overwater Villas · Diving' },
  { name: 'Egypt', flag: '🇪🇬', tag: 'Pyramids · Nile · History' },
  { name: 'Israel', flag: '🇮🇱', tag: 'Holy Land · Pilgrimage' },
]

export default function Destinations() {
  return (
    <section style={{ background: '#111111', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: '#fff000' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#fff000', letterSpacing: '0.25em' }}>DESTINATIONS</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#F8F8F5', lineHeight: 1.1 }}>
              Kenya & <span style={{ color: '#fff000' }}>Beyond</span>
            </h2>
          </div>
          <Link href="/travel/destinations" className="btn-outline">View All Destinations</Link>
        </div>

        {/* Kenya grid */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#9E9080', letterSpacing: '0.2em', marginBottom: 20 }}>KENYA SAFARIS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {kenya.map((dest, i) => (
              <Link key={i} href={dest.href} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#1E1E1E', padding: '32px 28px', borderBottom: '3px solid transparent', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.borderBottomColor = '#fff000'; e.currentTarget.style.background = '#252525'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'transparent'; e.currentTarget.style.background = '#1E1E1E'; }}
                >
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#F8F8F5', marginBottom: 8 }}>{dest.name}</h3>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#fff000', letterSpacing: '0.15em' }}>{dest.tag}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* International */}
        <div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#9E9080', letterSpacing: '0.2em', marginBottom: 20, marginTop: 40 }}>INTERNATIONAL HOLIDAYS</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 2 }}>
            {international.map((dest, i) => (
              <div key={i} style={{ background: '#1E1E1E', padding: '28px 24px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#252525'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#1E1E1E'; }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{dest.flag}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#F8F8F5', marginBottom: 6 }}>{dest.name}</h3>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#9E9080', letterSpacing: '0.12em' }}>{dest.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
