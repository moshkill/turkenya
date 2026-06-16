export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllMeta } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Travel Blog — Safari Tips & Guides | Turkenya Tours & Safaris',
  description: 'Kenya safari tips, travel guides, destination inspiration and insider advice from Turkenya Tours & Safaris.',
}

export default async function BlogPage() {
  const all = await getAllMeta()
  const featured = all[0]
  const rest = all.slice(1)
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      {/* Hero */}
      <section style={{ position: 'relative', height: '55vh', minHeight: 400, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&fit=crop" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} className="parallax-img" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.3) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 80px', maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Travel Stories</span></div>
          <h1 style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px' }}>The Turkenya Blog</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, lineHeight: 1.7, maxWidth: 480, margin: 0 }}>Safari guides, travel tips, destination deep-dives and insider Africa knowledge.</p>
        </div>
      </section>

      {/* Featured Post */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '80px 40px 0' }}>
        <Link href={'/blog/' + featured.slug} className="hover-lift" style={{ display: 'block', position: 'relative', borderRadius: 20, overflow: 'hidden', height: 480, textDecoration: 'none', color: 'white' }}>
          <img src={featured.img} alt={featured.title} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 60%)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 48 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <span style={{ background: 'rgba(255,240,0,0.04)', color: '#fff', border: '1px solid rgba(255,240,0,0.1)', backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '5px 14px', fontSize: 10, fontWeight: 800, letterSpacing: 2, borderRadius: 100 }}>FEATURED</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '5px 14px', fontSize: 10, fontWeight: 700, borderRadius: 100 }}>{featured.cat}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 800, margin: '0 0 12px', maxWidth: 700 }}>{featured.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, maxWidth: 600, marginBottom: 20, lineHeight: 1.6 }}>{featured.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>{featured.date} &middot; {featured.read} read</span>
            </div>
          </div>
        </Link>
      </section>

      {/* Articles Grid */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 40px 100px' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}><div style={{ height: 1, width: 32, background: '#fff000' }} /><span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>Latest Articles</span></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {rest.map(p => (
            <Link key={p.slug} href={'/blog/' + p.slug} className="hover-lift" style={{ textDecoration: 'none', color: 'white', background: 'rgba(255,255,255,0.03)', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', display: 'block' }}>
              <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                <img src={p.img} alt={p.title} className="service-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 16, left: 16 }}>
                  <span style={{ background: 'rgba(255,240,0,0.04)', color: '#fff', border: '1px solid rgba(255,240,0,0.1)', backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '4px 12px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, borderRadius: 100 }}>{p.cat}</span>
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16 }}>{p.excerpt}</p>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{p.date} &middot; {p.read} read</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '140px 40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>Ready to Experience Africa?</h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 17, lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>Stop reading about it. Let us build your perfect safari.</p>
          <Link href="/quote" style={{ background: 'rgba(255,240,0,0.04)', color: '#fff', border: '1px solid rgba(255,240,0,0.1)', backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.12)', padding: '16px 44px', borderRadius: 100, fontSize: 16, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Plan My Trip</Link>
        </div>
      </section>
    </main>
  )
}
