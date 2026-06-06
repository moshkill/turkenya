export const dynamic = 'force-dynamic'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getDbPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Travel Blog — Safari Tips & Guides | Turkenya Tours & Safaris',
  description: 'Kenya safari tips, travel guides, destination inspiration and insider advice from Turkenya Tours & Safaris.',
}

const posts = [
  { slug: 'ultimate-maasai-mara-guide', title: 'The Ultimate Maasai Mara Safari Guide 2025', cat: 'Safari Tips', date: '15 Jan 2025', read: '8 min', img: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80&fit=crop', excerpt: 'Everything you need to know about visiting the Maasai Mara — best time, camps, game drives and what the Great Migration really looks like up close.' },
  { slug: 'budget-kenya-safari', title: 'How to Do a Kenya Safari on a Budget', cat: 'Budget Travel', date: '22 Feb 2025', read: '6 min', img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80&fit=crop', excerpt: 'You do not need to spend a fortune to see the Big Five. Our honest breakdown of budget safari options and affordable camps.' },
  { slug: 'dubai-layover-guide', title: 'Making the Most of a Dubai Layover', cat: 'International', date: '10 Mar 2025', read: '5 min', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&fit=crop', excerpt: 'Got 12–48 hours in Dubai between flights? The best spots, food, and how to book a same-day tour without stress.' },
  { slug: 'kenya-car-hire-tips', title: '5 Things to Know Before Hiring a Car in Kenya', cat: 'Car Hire', date: '2 Apr 2025', read: '4 min', img: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80&fit=crop', excerpt: 'From road conditions to insurance — our practical guide to self-drive car hire in Kenya.' },
  { slug: 'amboseli-kilimanjaro-views', title: "Amboseli: Africa's Best Kilimanjaro Views", cat: 'Destinations', date: '18 Apr 2025', read: '7 min', img: 'https://images.unsplash.com/photo-1549366021-9f761d450615?w=800&q=80&fit=crop', excerpt: 'Amboseli offers some of the most dramatic elephant-and-mountain scenery in Africa.' },
  { slug: 'nairobi-city-guide', title: 'Nairobi in 48 Hours: The Insider City Guide', cat: 'Destinations', date: '5 May 2025', read: '6 min', img: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&q=80&fit=crop', excerpt: 'Nairobi is much more than a transit hub — the places locals actually love in the Safari Capital.' },
]

export default async function BlogPage() {
  const dbPosts = await getDbPosts()
  const all = [...dbPosts, ...posts]
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
              <span style={{ background: '#fff000', color: '#0D0D0D', padding: '5px 14px', fontSize: 10, fontWeight: 800, letterSpacing: 2, borderRadius: 100 }}>FEATURED</span>
              <span style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '5px 14px', fontSize: 10, fontWeight: 700, borderRadius: 100 }}>{featured.cat}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 38px)', fontWeight: 800, margin: '0 0 12px', maxWidth: 700 }}>{featured.title}</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 15, maxWidth: 600, marginBottom: 20, lineHeight: 1.6 }}>{featured.excerpt}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{featured.date} &middot; {featured.read} read</span>
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
                  <span style={{ background: '#fff000', color: '#0D0D0D', padding: '4px 12px', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, borderRadius: 100 }}>{p.cat}</span>
                </div>
              </div>
              <div style={{ padding: '24px 28px 28px' }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, margin: '0 0 12px', lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 16 }}>{p.excerpt}</p>
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
          <Link href="/quote" style={{ background: '#fff000', color: '#0D0D0D', padding: '16px 44px', borderRadius: 100, fontSize: 15, fontWeight: 700, letterSpacing: 1, textDecoration: 'none', textTransform: 'uppercase' }}>Plan My Trip</Link>
        </div>
      </section>
    </main>
  )
}
