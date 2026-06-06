export const dynamic = 'force-dynamic'
import BookingForm from '@/components/BookingForm'

export default function ContactPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '50vh', minHeight: 360, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Get in Touch</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', maxWidth: 650 }}>Let&apos;s Plan Your Adventure</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 450, margin: 0 }}>Tell us what you need below, or reach us directly. We respond within 2 hours.</p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px 100px' }} className="contact-grid-wrapper">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 60, alignItems: 'start' }} className="contact-grid">
          {/* Left — Contact Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Contact Info</span></div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15, marginBottom: 40, lineHeight: 1.7 }}>Based in Nairobi, serving clients across Kenya, East Africa, and the diaspora worldwide.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
              {[
                { label: 'Head Office', value: '3rd Floor, T-Mall\nNairobi West, Langata Road' },
                { label: 'Call / WhatsApp', value: '+254 722 666 644' },
                { label: 'Email', value: 'info@turkenya.com' },
                { label: 'Office Hours', value: 'Mon–Sat: 8am – 8pm EAT' },
              ].map(item => (
                <div key={item.label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '18px 20px' }}>
                  <div style={{ fontSize: 11, color: '#fff000', fontWeight: 700, letterSpacing: 3, marginBottom: 6, textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{item.value}</div>
                </div>
              ))}
            </div>

            <a href="https://wa.me/254722666644" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'rgba(37,211,102,0.18)', color: '#fff', border: '1px solid rgba(37,211,102,0.5)', backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.16)', padding: '16px 28px', fontWeight: 700, textDecoration: 'none', fontSize: 14, letterSpacing: 1, borderRadius: 100 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Right — the single smart booking form */}
          <BookingForm />
        </div>
      </section>
    </main>
  )
}
