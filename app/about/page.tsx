export const dynamic = 'force-dynamic'
import Link from 'next/link'
import Icon, { IconName } from '@/components/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Turkenya Tours & Safaris — IATA Travel Agency & Logistics Group, Nairobi',
  description: 'Since 2009: IATA-accredited air travel agent issuing 471 flights a month, KATO-member tour operator, corporate travel desk for 10–200+ staff, 200+ vehicle hire fleet and 200+ truck logistics arm. Nairobi-based, serving Kenya and the diaspora.',
}

const stats = [
  { v: '2009', l: 'Trusted Since' },
  { v: '471', l: 'Flights / Month' },
  { v: '300+', l: 'Safaris / Year' },
  { v: '200+', l: 'Hire Vehicles' },
  { v: '200+', l: 'Trucks in Fleet' },
]

// The group as it stands today — every division we actually run.
const divisions: { icon: IconName; title: string; href: string; desc: string }[] = [
  { icon: 'plane', title: 'Air Ticketing', href: '/air-ticketing', desc: 'Our core. IATA-accredited, issuing 471 tickets a month across 30+ airlines — wholesale fares for individuals, families and organisations.' },
  { icon: 'briefcase', title: 'Corporate Travel', href: '/air-ticketing', desc: 'A managed travel desk for companies moving 10–200+ staff: negotiated fares, invoice billing, policy compliance and a 24/7 rebooking line.' },
  { icon: 'compass', title: 'Safaris & Tours', href: '/safaris', desc: 'KATO-member tour operator running 300+ safaris a year — Maasai Mara to the Coast, budget camps to private luxury.' },
  { icon: 'globe', title: 'International Holidays', href: '/international', desc: 'Dubai, Mauritius, Maldives, Turkey and beyond — visas, flights, hotels and transfers in one package.' },
  { icon: 'car', title: 'Car Hire', href: '/car-rental', desc: '200+ vehicles from city saloons to executive Prados and V8s — self-drive, chauffeured, weddings, and corporate contracts up to two years.' },
  { icon: 'truck', title: 'Logistics', href: '/logistics', desc: 'A 200+ truck fleet hauling for government, manufacturers and SMEs — Mombasa port clearance to cross-border deliveries.' },
  { icon: 'sun', title: 'Biblical Tours & Pilgrimage', href: '/pilgrimage-tours', desc: 'The Holy Land, the Footsteps of Paul in Turkey, Rome, Umrah and Hajj — journeys of faith for churches and families.' },
  { icon: 'users', title: 'Conferences & MICE', href: '/conferences', desc: 'Board retreats to 1,000-delegate conferences — venues, travel, rooms and logistics, fully managed.' },
]

const values = [
  { num: '01', title: 'Accredited', desc: 'IATA-accredited for air travel and a KATO-member tour operator — every booking is protected and professionally issued.' },
  { num: '02', title: 'Corporate-Grade', desc: 'We run travel desks, fleet contracts and freight schedules for organisations that cannot afford downtime — and we hold ourselves to that standard for every client.' },
  { num: '03', title: 'Personal', desc: 'Every itinerary is custom-built around your needs, preferences and budget — whether you are one traveller or two hundred.' },
  { num: '04', title: 'Transparent', desc: 'No hidden fees, no surprises. Quotes come from a real agent, and what we quote is what you pay — always.' },
]

export default function AboutPage() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="/images/safaris.jpg" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Our Story</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 760 }}>Kenya&rsquo;s Full-Service<br />Travel &amp; Logistics House</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: 0 }}>Since 2009 — from a Nairobi ticketing desk to an IATA-accredited travel group flying, driving and hauling for individuals, corporates and the diaspora.</p>
        </div>
      </section>

      {/* Stats — Glassmorphism */}
      <div style={{ position: 'relative', marginTop: -48, zIndex: 5, padding: '0 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', background: 'rgba(255,240,0,0.12)', backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 20, padding: '0 20px', display: 'flex', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ flex: '1 1 130px', minWidth: 0, padding: '28px 14px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontSize: 'clamp(22px, 2.4vw, 38px)', fontWeight: 900, lineHeight: 1, fontFamily: "'Urbanist', sans-serif", color: 'rgb(235,235,235)' }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story — full width: heading, three text columns, then a wide banner */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Who We Are</span></div>
        <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.15, margin: '0 0 48px', maxWidth: 900 }}>From One Ticketing Desk to a Travel Group</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 56px)' }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.9, margin: 0 }}>Turkenya Tours and Safaris started in 2009 with a simple promise: get Kenyans the best airfare, honestly. Today that promise issues <strong style={{ color: '#fff' }}>471 flights a month</strong> as an IATA-accredited agent, runs managed travel desks for companies moving up to 200+ staff, and packages everything from a budget Mara weekend to the Footsteps of Paul in Turkey.</p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.9, margin: 0 }}>Along the way our clients asked us to do more — so we built it. A <strong style={{ color: '#fff' }}>200+ vehicle hire fleet</strong> with executive Prados and V8s on corporate contracts. A <strong style={{ color: '#fff' }}>200+ truck logistics arm</strong> moving cargo from Mombasa port across East Africa. Hotels, conferences, airport transfers and pilgrimages — one team, one phone number, everything handled.</p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 16, lineHeight: 1.9, margin: 0 }}>We are KATO members, deeply rooted in Nairobi, and built for the diaspora — plan from London, Dallas or Dubai and we execute on the ground at home.</p>
        </div>
        <div style={{ borderRadius: 20, overflow: 'hidden', height: 'clamp(260px, 34vw, 420px)', margin: '64px 0 140px' }}>
          <img src="/images/air-ticketing.jpg" alt="Turkenya air ticketing" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </section>

      {/* The group today */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>The Group Today</span></div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Eight Ways We Move You</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
            {divisions.map(d => (
              <Link key={d.title} href={d.href} className="card-hover" style={{ display: 'block', padding: '28px 26px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, textDecoration: 'none', color: '#fff', transition: 'border-color 0.3s' }}>
                <div style={{ color: '#fff000', marginBottom: 14 }}><Icon name={d.icon} size={26} stroke={1.75} /></div>
                <h3 style={{ fontSize: 19, fontWeight: 900, margin: '0 0 8px', fontFamily: "'Urbanist', sans-serif" }}>{d.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
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
                  <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 10 }}>{v.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 16, margin: 0 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>One Team for Your Travel<br />— and Your Company&rsquo;s</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px' }}>Book a flight, plan a safari, contract a fleet or move your cargo — talk to one agent and it is handled. That is what 15+ years on the ground buys you.</p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quote" style={{ background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.1)', backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Get in Touch</Link>
            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" className="glass-wa" style={{ padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}>WhatsApp Us</a>
          </div>
        </div>
      </section>
    </main>
  )
}
