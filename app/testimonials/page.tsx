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

type T = { id: number; name: string; location: string | null; service: string | null; rating: number; message: string }

async function getApproved(): Promise<T[]> {
  try {
    const rows = await prisma.testimonial.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' }, take: 60 })
    return rows.map(r => ({ id: r.id, name: r.name, location: r.location, service: r.service, rating: r.rating, message: r.message }))
  } catch { return [] }
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

export default async function TestimonialsPage() {
  const items = await getApproved()

  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      {/* hero */}
      <section style={{ textAlign: 'center', padding: '150px 24px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
          <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Client Stories</span>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 14px', fontFamily: "'Urbanist', sans-serif" }}>What Our Clients Say</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Real words from travellers across the diaspora and beyond who trusted us with their journeys.</p>
      </section>

      {/* wall */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 40px' }}>
        {items.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 16, padding: '40px 0' }}>Be the first to share your experience below.</p>
        ) : (
          <div style={{ columnGap: 20, columnWidth: 340 }}>
            {items.map(t => (
              <div key={t.id} style={{ breakInside: 'avoid', marginBottom: 20, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 18, padding: 24 }}>
                <Stars n={t.rating} />
                <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 16, lineHeight: 1.7, margin: '14px 0 18px', fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>&ldquo;{t.message}&rdquo;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,240,0,0.12)', border: '1px solid rgba(255,240,0,0.3)', color: '#fff000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, fontFamily: "'Urbanist', sans-serif", flexShrink: 0 }}>{initials(t.name)}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{t.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{[t.location, t.service].filter(Boolean).join(' · ')}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* submit form */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '20px 24px 120px' }}>
        <TestimonialForm />
      </section>
    </main>
  )
}
