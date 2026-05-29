"use client";

export default function TrustStrip() {
  const items = [
    { value: 'IATA', label: 'Registered Agency' },
    { value: '4.8★', label: 'Google Reviews' },
    { value: '2009', label: 'Est. in Nairobi' },
    { value: '5000+', label: 'Clients Served' },
    { value: 'KATO', label: 'Member' },
    { value: 'Ministry', label: 'of Tourism Auth.' },
  ]

  return (
    <section style={{ background: '#fff000', padding: '20px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: 22, color: '#0D0D0D', lineHeight: 1 }}>{item.value}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#1E1E1E', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>{item.label}</div>
            </div>
            {i < items.length - 1 && <div style={{ width: 1, height: 32, background: 'rgba(13,13,13,0.2)' }} />}
          </div>
        ))}
      </div>
    </section>
  )
}
