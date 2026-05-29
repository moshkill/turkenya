"use client";

import Link from 'next/link'

const services = [
  { icon: '✈', title: 'Air Ticketing', desc: 'International, regional and domestic flights on all IATA and NON-IATA airlines. Competitive rates, professional service.', href: '/air-ticketing', tag: 'IATA REGISTERED' },
  { icon: '🚐', title: 'Logistics', desc: 'Airport transfers, MICE transport, corporate shuttles and VIP ground transportation across Kenya.', href: '/logistics', tag: 'NAIROBI & BEYOND' },
  { icon: '🚗', title: 'Car Rental', desc: 'Self-drive or chauffeured. Executive, wedding, casual and airport transfer vehicles. Well maintained fleet.', href: '/car-rentals', tag: 'ALL VEHICLE TYPES' },
  { icon: '🦁', title: 'Safari Tours', desc: 'Maasai Mara, Amboseli, Samburu and more. Expert guides, flying packages and road safaris across East Africa.', href: '/travel/safaris', tag: 'EAST AFRICA' },
  { icon: '🕌', title: 'Pilgrimage', desc: 'Hajj & Umrah packages. Israel Holy Land tours. Complete spiritual journey planning and support.', href: '/travel/pilgrimage', tag: 'HAJJ · UMRAH · ISRAEL' },
  { icon: '🏨', title: 'Hotels', desc: 'Exclusive tariff agreements with major hotels, lodges and camps in East Africa and worldwide.', href: '/travel/hotels', tag: 'WORLDWIDE' },
]

export default function Services() {
  return (
    <section style={{ background: '#0D0D0D', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: '#fff000' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#fff000', letterSpacing: '0.25em' }}>WHAT WE DO</span>
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#F8F8F5', lineHeight: 1.1 }}>
            Full-Service Travel, <span style={{ color: '#fff000' }}>One Agency</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {services.map((service, i) => (
            <Link key={i} href={service.href} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: '#1E1E1E', padding: '40px 36px', height: '100%', borderLeft: '3px solid transparent', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderLeftColor = '#fff000'
                  el.style.background = '#252525'
                  el.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderLeftColor = 'transparent'
                  el.style.background = '#1E1E1E'
                  el.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }}>{service.icon}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#fff000', letterSpacing: '0.2em', marginBottom: 10 }}>{service.tag}</div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#F8F8F5', marginBottom: 14 }}>{service.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: '#9E9080', lineHeight: 1.7 }}>{service.desc}</p>
                <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 8, color: '#fff000', fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em' }}>
                  Learn More <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
