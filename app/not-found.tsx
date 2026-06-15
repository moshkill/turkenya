import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 40px' }}>
      <div style={{ fontSize: 'clamp(100px, 15vw, 180px)', fontWeight: 900, color: 'rgba(255,240,0,0.06)', lineHeight: 1, marginBottom: 0, fontFamily: "'Abel', sans-serif" }}>404</div>
      <h1 style={{ color: '#fff', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Page Not Found</h1>
      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, marginBottom: 48, maxWidth: 440, lineHeight: 1.7 }}>This trail goes cold here. Let us get you back on the right path.</p>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{ background: 'rgba(255,240,0,0.04)', color: '#fff', border: '1px solid rgba(255,240,0,0.1)', backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '14px 36px', fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Go Home</Link>
        <Link href="/contact" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '14px 36px', fontWeight: 600, fontSize: 15, letterSpacing: 1.5, textDecoration: 'none', borderRadius: 100, textTransform: 'uppercase' }}>Contact Us</Link>
      </div>
    </main>
  )
}
