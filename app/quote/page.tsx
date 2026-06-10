export const dynamic = 'force-dynamic'
import BookingForm from '@/components/BookingForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book or Get a Quote — Smart Booking | Turkenya Tours & Safaris',
  description: 'Book flights, safaris, car hire, international holidays or logistics in minutes. Describe your trip and our AI fills the form. Quote within 2 hours.',
}

export default function QuotePage() {
  return (
    <main style={{ background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <section style={{ textAlign: 'center', padding: '150px 24px 50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 18 }}>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
          <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Smart Booking</span>
          <div style={{ height: 1, width: 32, background: '#fff000' }} />
        </div>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 14px', fontFamily: "'Urbanist', sans-serif" }}>
          Book in Minutes
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, maxWidth: 480, margin: '0 auto' }}>
          Tell us what you need — or just describe it and let our AI fill the form. Quote within 2 hours.
        </p>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px 120px' }}>
        <BookingForm standalone />
      </section>
    </main>
  )
}
