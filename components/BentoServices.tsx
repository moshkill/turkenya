import Link from 'next/link'
import Icon from './Icon'

// Bento services grid — tiles sized by commercial value. Packs into a gapless
// 4x4 on desktop, 2-col on tablet, single stack on mobile (see globals.css).
const U = (id: string, w = 800) => `https://images.unsplash.com/${id}?w=${w}&q=80&fit=crop`

type Tile = {
  cls: string; href: string; img: string; title: string
  tag?: string; desc?: string; price?: string; cta?: string; big?: boolean; wide?: boolean
}

const tiles: Tile[] = [
  { cls: 'b-air', href: '/air-ticketing', img: U('photo-1436491865332-7a61a109cc05', 1200), tag: '★ Our Core · IATA', title: 'Air Ticketing', desc: 'Wholesale fares on 30+ airlines for individuals, families and corporates managing 10–200+ travellers. Invoice billing, 24/7 rebooking.', cta: 'Get a fare →', big: true },
  { cls: 'b-saf', href: '/safaris', img: U('photo-1547471080-7cc2caa01a7e', 1000), title: 'Kenya Safaris', desc: 'Maasai Mara, Amboseli, Samburu — Big Five, budget to luxury.', price: 'From KES 22,000', wide: true },
  { cls: 'b-intl', href: '/international', img: U('photo-1512453979798-5ea266f8880c'), title: 'International', price: 'Dubai · Istanbul · Maldives' },
  { cls: 'b-hotel', href: '/hotel-booking', img: U('photo-1566073771259-6a8506099945'), title: 'Hotels', price: 'Kenya & worldwide' },
  { cls: 'b-car', href: '/car-rental', img: U('photo-1449965408869-eaa3f722e40d'), tag: 'Corporate', title: 'Car Hire', desc: 'Prado, V8, Range Rover & crew vans. Contracts from 3 days to 2 years, with chauffeurs.' },
  { cls: 'b-mice', href: '/conferences', img: U('photo-1505373877841-8d25f7d46678', 1000), tag: 'Corporate', title: 'Conferences & MICE', desc: 'Board retreats to 1,000-delegate conferences, fully managed.', wide: true },
  { cls: 'b-air2', href: '/airport-transfers', img: U('photo-1502877338535-766e1452684a'), title: 'Airport Transfers', price: 'Meet & greet' },
  { cls: 'b-log', href: '/logistics', img: U('photo-1601584115197-04ecc0da31d7'), title: 'Logistics', price: 'Cargo · East Africa' },
  { cls: 'b-pil', href: '/pilgrimage-tours', img: U('photo-1564769662533-4f00a87b4056'), title: 'Pilgrimage', price: 'Umrah · Holy Land' },
  { cls: 'b-med', href: '/medical-tourism', img: U('photo-1576091160550-2173dba999ef'), title: 'Medical Tourism', price: 'Treatment abroad' },
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
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(12px)', fontSize: t.big ? 11 : 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100, marginBottom: 14 }}>{t.tag}</span>
            )}
            <h3 style={{ fontSize: t.big ? 32 : t.wide ? 24 : 20, fontWeight: 800, letterSpacing: '-0.01em', margin: 0, fontFamily: "'Urbanist', sans-serif" }}>{t.title}</h3>
            {t.desc && <p style={{ color: 'rgba(255,255,255,0.62)', fontSize: t.big ? 15 : 14, lineHeight: 1.55, marginTop: 8, maxWidth: t.big ? 430 : undefined }}>{t.desc}</p>}
            {t.price && <div style={{ color: '#fff000', fontWeight: 800, fontSize: 14, marginTop: 6 }}>{t.price}</div>}
            {t.cta && <span style={{ marginTop: 18, display: 'inline-block', background: 'rgba(255,240,0,0.14)', border: '1px solid rgba(255,240,0,0.5)', backdropFilter: 'blur(14px)', color: '#fff', padding: '12px 26px', borderRadius: 100, fontSize: 12, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase' }}>{t.cta}</span>}
          </div>
        </Link>
      ))}
    </div>
  )
}
