"use client";

import Link from 'next/link'

const posts = [
  { title: 'The Ultimate Maasai Mara Safari Guide 2026', excerpt: 'Everything you need to know about visiting the Maasai Mara — best time to go, what to expect, and how to book.', category: 'Safari Tips', date: 'May 2026', readTime: '5 min read' },
  { title: 'Dubai on a Budget: How to Get the Best Deals from Nairobi', excerpt: 'Flying Nairobi to Dubai doesn\'t have to break the bank. Our ticketing experts share the best strategies for cheap fares.', category: 'Travel Tips', date: 'May 2026', readTime: '4 min read' },
  { title: 'Hajj 2026: Complete Guide for Kenyan Pilgrims', excerpt: 'Dates, costs, documentation, and what to expect. Everything Kenyan Muslims need to prepare for Hajj this year.', category: 'Pilgrimage', date: 'April 2026', readTime: '8 min read' },
]

export default function BlogPreview() {
  return (
    <section style={{ background: '#111111', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 32, height: 2, background: '#fff000' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#fff000', letterSpacing: '0.25em' }}>TRAVEL BLOG</span>
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#F8F8F5', lineHeight: 1.1 }}>
              Travel <span style={{ color: '#fff000' }}>Insights</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline">View All Posts</Link>
        </div>

        {/* Posts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
          {posts.map((post, i) => (
            <Link key={i} href="/blog" style={{ textDecoration: 'none' }}>
              <div style={{ background: '#1E1E1E', padding: '36px 32px', height: '100%', borderTop: '3px solid transparent', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#fff000'; e.currentTarget.style.background = '#252525'; }}
                onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.background = '#1E1E1E'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#fff000', letterSpacing: '0.2em' }}>{post.category}</span>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: '#9E9080' }}>{post.readTime}</span>
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#F8F8F5', lineHeight: 1.4, marginBottom: 14 }}>{post.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9E9080', lineHeight: 1.7, marginBottom: 24 }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#9E9080' }}>{post.date}</span>
                  <span style={{ color: '#fff000', fontSize: 14, fontWeight: 600 }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
