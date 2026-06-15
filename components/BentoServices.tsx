import Link from 'next/link'
import Icon from './Icon'

// Bento services grid — tiles sized by commercial value. Packs into a gapless
// 4x4 on desktop, 2-col on tablet, single stack on mobile (see globals.css).
// All imagery is the client's own (public/images/) — no stock hotlinks.

type Tile = {
  cls: string; href: string; img: string; title: string
  tag?: string; desc?: string; price?: string; cta?: string; big?: boolean; wide?: boolean
}

const tiles: Tile[] = [
  { cls: 'b-air', href: '/air-ticketing', img: 'https://images.unsplash.com/photo-1466691623998-d607fab1ca29?w=1200&q=80&fit=crop', tag: '★ Our Core · IATA', title: 'Air Ticketing', desc: 'Wholesale fares on 30+ airlines for individuals, families and corporates managing 10–200+ travellers. Invoice billing, 24/7 rebooking.', cta: 'Get a fare →', big: true },
  { cls: 'b-saf', href: '/safaris', img: '/images/safaris.jpg', title: 'Kenya Safaris', desc: 'Maasai Mara, Amboseli, Samburu — Big Five, budget to luxury.', price: 'From KES 22,000', wide: true },
  { cls: 'b-intl', href: '/international', img: '/images/international.jpg', title: 'International', price: 'Dubai · Istanbul · Maldives' },
  { cls: 'b-hotel', href: '/hotel-booking', img: '/images/hotels.jpg', title: 'Hotels', price: 'Kenya & worldwide' },
  { cls: 'b-car', href: '/car-rental', img: '/images/car-hire.jpg', tag: 'Corporate', title: 'Car Hire', desc: 'Prado, V8, Range Rover & crew vans. Contracts from 3 days to 2 years, with chauffeurs.' },
  { cls: 'b-mice', href: '/conferences', img: '/images/conferences.jpg', tag: 'Corporate', title: 'Conferences & MICE', desc: 'Board retreats to 1,000-delegate conferences, fully managed.', wide: true },
  { cls: 'b-air2', href: '/airport-transfers', img: '/images/airport-transfers.jpg', title: 'Airport Transfers', price: 'Meet & greet' },
  { cls: 'b-log', href: '/logistics', img: '/images/logistics.jpg', title: 'Logistics', price: 'Cargo · East Africa' },
  { cls: 'b-pil', href: '/pilgrimage-tours', img: '/images/pilgrimage.jpg', title: 'Pilgrimage', price: 'Umrah · Holy Land' },
]

export default function BentoServices() {
  return (
    <div className="bento-grid">
      {tiles.map(t => (
        <Link key={t.cls} href={t.href} className={`bento-tile ${t.cls}`}>
          <img src={t.img} alt={t.title} className="bento-bg" loading="lazy" />
          <div className="bento-shade" />
          {(t.big || t.wide || t.tag) && <div className="bento-arrow"><Icon name="arrow-right" size={14} style={{display:"inline",verticalAlign:"-2px"}} /></div>}
          <div className="bento-body">
            {t.tag && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.1)', backdropFilter: 'blur(4px)', fontSize: t.big ? 11 : 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100, marginBottom: 14 }}>{t.tag}</span>
            )}
            <h3 style={{ fontSize: t.big ? 32 : t.wide ? 24 : 20, fontWeight: 800, letterSpacing: '-0.01em', margin: 0, fontFamily: "'Urbanist', sans-serif" }}>{t.title}</h3>
            {t.desc && <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: t.big ? 15 : 14, lineHeight: 1.55, marginTop: 8, maxWidth: t.big ? 430 : undefined }}>{t.desc}</p>}
            {t.price && <div style={{ color: '#fff000', fontWeight: 800, fontSize: 15, marginTop: 6 }}>{t.price}</div>}
            {t.cta && <span style={{ marginTop: 18, display: 'inline-block', background: 'rgba(255,240,0,0.14)', border: '1px solid rgba(255,240,0,0.5)', backdropFilter: 'blur(4px)', color: '#fff', padding: '12px 26px', borderRadius: 100, fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>{t.cta}</span>}
          </div>
        </Link>
      ))}
    </div>
  )
}
