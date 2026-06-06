export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Tourism from Kenya — India, Thailand, Turkey Treatment | Turkenya',
  description: 'Affordable medical treatment abroad for Kenyans. Surgery in India, dental in Turkey, IVF in Thailand. Save 40-80% vs private Kenya hospitals. Flights, hotels, hospital liaison included.',
}

const destinations = [
  { country: 'India', specialty: 'Cardiac, Oncology, Orthopedics', saving: '60–80% savings', img: 'photo-1524492412937-b28074a5d7da' },
  { country: 'Thailand', specialty: 'Cosmetic, Dental, IVF', saving: '50–70% savings', img: 'photo-1506905925346-21bda4d32df4' },
  { country: 'Turkey', specialty: 'Hair Transplant, Eye Surgery, Dental', saving: '40–65% savings', img: 'photo-1524231757912-21f4fe3a7200' },
  { country: 'Egypt', specialty: 'Fertility, Cosmetic Surgery', saving: '30–50% savings', img: 'photo-1541343672885-9be56236302a' },
]

const services = ['Hospital Selection', 'Appointment Booking', 'Visa Assistance', 'Flight & Hotel', 'Airport Transfers', 'Translation Support', 'Post-Treatment Care', 'Insurance Guidance']

export default function MedicalTourism() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      <section style={{ position: 'relative', height: '65vh', minHeight: 450, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Affordable World-Class Healthcare</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Medical Tourism</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 520, margin: '0 0 32px' }}>Top-tier medical treatment abroad at a fraction of the cost. We handle flights, accommodation, hospital liaison and transfers.</p>
          <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '14px 36px', borderRadius: 100, fontSize: 14, fontWeight: 700, letterSpacing: 1.5, textDecoration: 'none', textTransform: 'uppercase', width: 'fit-content' }}>Get a Free Consultation</Link>
        </div>
      </section>

      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Destinations</span></div>
          <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>Popular Medical Destinations</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, marginTop: 12 }}>JCI-accredited hospitals, English-speaking doctors, significant cost savings</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {destinations.map((d) => (
            <div key={d.country} className="hover-lift" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ height: 200, overflow: 'hidden' }}><img src={`https://images.unsplash.com/${d.img}?w=600&q=80&fit=crop`} alt={d.country} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
              <div style={{ padding: '24px 28px 28px' }}>
                <h3 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 8px' }}>{d.country}</h3>
                <p style={{ color: '#fff000', fontSize: 14, fontWeight: 600, margin: '0 0 4px' }}>{d.specialty}</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, margin: '0 0 20px' }}>{d.saving}</p>
                <Link href="/contact" style={{ display: 'block', textAlign: 'center', background: '#fff000', color: '#0D0D0D', padding: '13px', fontWeight: 700, fontSize: 13, letterSpacing: 2, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Get Quote</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, justifyContent: 'center' }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>End-to-End Support</span><div style={{ height: 1, width: 32, background: '#fff000' }} /></div>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, margin: 0 }}>What We Handle For You</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {services.map((s) => (
              <div key={s} style={{ padding: '28px 20px', background: '#0a0a0a', textAlign: 'center' }}>
                <div style={{ color: '#fff000', fontSize: 16, marginBottom: 10 }}>&#10003;</div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Start Your Medical Journey</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>Tell us your medical needs, preferred destination, and timeline — we arrange everything.</p>
          <Link href="/contact" style={{ background: '#fff000', color: '#0D0D0D', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Free Consultation</Link>
        </div>
      </section>
    </main>
  )
}
