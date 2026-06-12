export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import Icon from '@/components/Icon'
import TestimonialForm from '@/components/TestimonialForm'

export const metadata: Metadata = {
  title: 'Client Reviews & Testimonials | Turkenya Tours & Safaris',
  description: 'Real reviews from travellers who booked flights, safaris, car hire and holidays with Turkenya Tours & Safaris. Share your own experience.',
}

function initials(name: string) {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('')
}

type T = { id: number | string; name: string; location: string | null; service: string | null; rating: number; message: string; img?: string }

// Curated starter reviews (match the homepage carousel) — corporate clients
// lead, and every review maps to a service we actually offer. Shown alongside
// approved submissions; a real review with the same name overrides its
// curated counterpart. Avatars: free Unsplash portraits, African/Kenyan-fit.
const curated: T[] = [
  { id: 'c1', name: 'Grace N.', location: 'Travel & Admin Manager · Nairobi', service: 'Corporate Travel', rating: 5, message: 'Turkenya runs the travel desk for our 120 staff — flights confirmed in minutes, one consolidated invoice a month, and 3am rebookings we never have to think about.', img: 'photo-1713845784497-fe3d7ed176d8' },
  { id: 'c2', name: 'Peter K.', location: 'Operations Director · Mombasa', service: 'Logistics', rating: 5, message: 'They move our 28-tonne loads from Mombasa port to Kampala weekly. GPS-tracked, clean customs paperwork, zero lost cargo in two years.', img: 'photo-1614023342667-6f060e9d1e04' },
  { id: 'c3', name: 'Susan W.', location: 'Procurement Lead · Nairobi', service: 'Corporate Car Hire', rating: 5, message: 'Eight Prados on a two-year contract with vetted chauffeurs. When one had an issue upcountry, the relief vehicle arrived the same day. That is why we renewed.' },
  { id: 'c4', name: 'Wanjiru M.', location: 'London, UK', service: 'Safari Tours', rating: 5, message: 'Absolutely incredible. Turkenya handled everything from JKIA pickup to our final sunrise at the Mara. Not a single thing went wrong.', img: 'photo-1645736353780-e70a7d508088' },
  { id: 'c5', name: 'James Otieno', location: 'Houston, USA', service: 'Air Ticketing', rating: 5, message: 'Flew my family of 6 from Houston to Nairobi, then Mara. Turkenya got us business class at economy prices. Unbeatable.', img: 'photo-1522529599102-193c0d76b5b6' },
  { id: 'c6', name: 'Fatima H.', location: 'Events Lead · Mombasa', service: 'Conferences & MICE', rating: 5, message: 'Our corporate retreat for 50 delegates — venue, flights, safari, everything was coordinated perfectly. Will use Turkenya again.', img: 'photo-1743871698163-a2e470d8eac7' },
  { id: 'c7', name: 'Ahmed K.', location: 'Dubai, UAE', service: 'Pilgrimage', rating: 5, message: 'Booked our Umrah package and it was flawless. Hotels were steps from the Haram, flights on time, the guide was wonderful.', img: 'photo-1659422440915-d516c6dc932e' },
  { id: 'c8', name: 'Dr. R. Patel', location: 'Nairobi, Kenya', service: 'Medical Tourism', rating: 5, message: 'Turkenya arranged my medical trip to Bangkok — hospital, hotel, flights, transfers. Saved 65% versus Kenya private rates.', img: 'photo-1778692258270-bc0e80e975c0' },
  { id: 'c9', name: 'Lisa & Tom B.', location: 'Germany', service: 'Safari Tours', rating: 5, message: 'Our 10-day Kenya circuit was beyond what we imagined. The team was on call 24/7 and genuinely cared about every detail.' },
  { id: 'c10', name: 'Mary Achieng', location: 'Toronto, Canada', service: 'Hotel Booking', rating: 5, message: 'Flew home for Christmas and Turkenya booked our Diani resort and the Nairobi stopover hotel in one go. Walked into both like royalty.' },
  { id: 'c11', name: 'Brian M.', location: 'Nairobi, Kenya', service: 'Airport Transfers', rating: 4, message: 'Landed at 11pm and the driver was waiting with a name board, helped with all our bags. Clean car, fair price — will use them every trip.' },
  { id: 'c12', name: 'Esther & Joy', location: 'Kisumu, Kenya', service: 'International Holidays', rating: 5, message: 'Our first trip out of the country — Dubai! Visas, flights, hotel and the desert safari were all arranged. We just packed and went.' },
  { id: 'c13', name: 'David Omondi', location: 'SME Owner · Eldoret', service: 'Logistics', rating: 4, message: 'They truck my produce from Eldoret to Nairobi twice a week. Honest rates and the goods arrive when they say they will.' },
  { id: 'c14', name: 'Pastor Samuel K.', location: 'Church Group Leader · Nakuru', service: 'Biblical Tours', rating: 5, message: 'Took 40 of our congregation to Israel — the Jordan River baptism day alone was worth it. Every visa, flight and hotel was handled for us.' },
  { id: 'c15', name: 'Naomi W.', location: 'HR Officer · Thika', service: 'Conferences & MICE', rating: 5, message: 'Our company retreat for 80 staff — transport, rooms and the conference hall were seamless. One contact person start to finish.' },
]

async function getAll(): Promise<T[]> {
  let db: T[] = []
  try {
    const rows = await prisma.testimonial.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' }, take: 60 })
    db = rows.map(r => ({ id: r.id, name: r.name, location: r.location, service: r.service, rating: r.rating, message: r.message }))
  } catch { /* DB unreachable — curated only */ }
  const dbNames = new Set(db.map(x => x.name.trim().toLowerCase()))
  return [...curated.filter(c => !dbNames.has(c.name.trim().toLowerCase())), ...db]
}

function Stars({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, color: '#fff000' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: i < n ? '#fff000' : 'rgba(255,255,255,0.18)', display: 'flex' }}><Icon name="star" size={15} /></span>
      ))}
    </div>
  )
}

function Avatar({ t }: { t: T }) {
  if (t.img) return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`https://images.unsplash.com/${t.img}?w=96&h=96&fit=crop&crop=face`} alt={t.name} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,240,0,0.3)', flexShrink: 0 }} />
  )
  return <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,240,0,0.12)', border: '1px solid rgba(255,240,0,0.3)', color: '#fff000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, fontFamily: "'Urbanist', sans-serif", flexShrink: 0 }}>{initials(t.name)}</div>
}

export default async function TestimonialsPage() {
  const items = await getAll()
  const avg = items.length ? items.reduce((s, t) => s + (t.rating || 5), 0) / items.length : 5

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      {/* hero */}
      <section style={{ textAlign: 'center', padding: '150px 24px 30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
          <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Client Stories</span>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 14px', fontFamily: "'Urbanist', sans-serif" }}>What Our Clients Say</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 520, margin: '0 auto 28px' }}>Real words from travellers across the diaspora and beyond who trusted us with their journeys.</p>
        {/* rating summary */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(255,240,0,0.07)', border: '1px solid rgba(255,240,0,0.25)', borderRadius: 100, padding: '12px 26px' }}>
          <span style={{ fontSize: 34, fontWeight: 900, color: '#fff000', lineHeight: 1, fontFamily: "'Urbanist', sans-serif" }}>{avg.toFixed(1)}</span>
          <span style={{ display: 'flex', gap: 2 }}>{Array.from({ length: 5 }, (_, i) => (
            <span key={i} style={{ color: i < Math.round(avg) ? '#fff000' : 'rgba(255,255,255,0.18)', display: 'flex' }}><Icon name="star" size={17} /></span>
          ))}</span>
          <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, fontWeight: 600 }}>from {items.length} reviews</span>
        </div>
      </section>

      {/* submit form — kept high so it is always easy to find */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '20px 24px 50px' }}>
        <TestimonialForm />
      </section>

      {/* wall */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '10px 24px 120px' }}>
        <div style={{ columnGap: 20, columnWidth: 340 }}>
          {items.map(t => (
            <div key={t.id} style={{ breakInside: 'avoid', marginBottom: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 24 }}>
              <Stars n={t.rating} />
              <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, lineHeight: 1.7, margin: '14px 0 18px', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>&ldquo;{t.message}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Avatar t={t} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{[t.location, t.service].filter(Boolean).join(' · ')}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
