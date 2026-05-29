"use client";

const reviews = [
  { name: 'Sarah M.', country: 'United Kingdom', rating: 5, text: 'Turkenya arranged our Maasai Mara safari perfectly. The guide was exceptional, the lodge was beautiful, and everything ran like clockwork. Highly recommend!', service: 'Safari Tour' },
  { name: 'Ahmed K.', country: 'UAE', rating: 5, text: 'Used Turkenya for our Hajj package. They handled everything from Nairobi to Makkah — flights, accommodation, transfers. Absolutely seamless.', service: 'Pilgrimage' },
  { name: 'James O.', country: 'Kenya', rating: 5, text: 'Best travel agent in Nairobi. Got great rates on my Dubai tickets and the car hire was top notch. Will always use Turkenya.', service: 'Air Ticketing + Car Hire' },
]

export default function Testimonials() {
  return (
    <section style={{ background: '#0D0D0D', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: '#fff000' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#fff000', letterSpacing: '0.25em' }}>TESTIMONIALS</span>
            <div style={{ width: 32, height: 2, background: '#fff000' }} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#F8F8F5' }}>
            What Our <span style={{ color: '#fff000' }}>Clients Say</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {reviews.map((review, i) => (
            <div key={i} style={{ background: '#1E1E1E', padding: '40px 36px', position: 'relative' }}>
              {/* Quote mark */}
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 80, color: 'rgba(245,197,24,0.15)', position: 'absolute', top: 16, right: 24, lineHeight: 1 }}>"</div>

              {/* Stars */}
              <div style={{ marginBottom: 20 }}>
                {'★'.repeat(review.rating).split('').map((s, j) => (
                  <span key={j} style={{ color: '#fff000', fontSize: 18 }}>{s}</span>
                ))}
              </div>

              {/* Text */}
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#F5F0E8', lineHeight: 1.8, marginBottom: 32, fontStyle: 'italic' }}>
                "{review.text}"
              </p>

              {/* Author */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#F8F8F5' }}>{review.name}</div>
                  <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#9E9080', letterSpacing: '0.1em', marginTop: 2 }}>{review.country}</div>
                </div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#fff000', letterSpacing: '0.1em', textAlign: 'right' }}>{review.service}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Google rating */}
        <div style={{ textAlign: 'center', marginTop: 56 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 16, background: '#1E1E1E', padding: '20px 40px', border: '1px solid rgba(245,197,24,0.2)' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 800, color: '#fff000' }}>4.8</span>
            <div>
              <div style={{ color: '#fff000', fontSize: 20 }}>★★★★★</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#9E9080', letterSpacing: '0.15em' }}>GOOGLE REVIEWS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
