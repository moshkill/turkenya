'use client'
import { useRef } from 'react'
import { usePageTransition } from './PageTransition'

type Props = {
  title: string
  desc: string
  img: string
  href: string
  tag?: string
}

export default function ServiceCard({ title, desc, img, href, tag }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { triggerTransition } = usePageTransition()

  const fullImg = `https://images.unsplash.com/${img}?w=600&q=80&fit=crop`

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    triggerTransition(fullImg, rect, href)
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className="hover-lift"
      style={{
        textDecoration: 'none', color: 'white', display: 'block',
        borderRadius: 16, overflow: 'hidden', position: 'relative',
        height: 300, border: '1px solid rgba(255,255,255,0.06)',
        cursor: 'pointer',
      }}
    >
      <img
        src={fullImg}
        alt={title}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
        className="service-img"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
      {tag && (
        <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
          <span style={{ background: '#fff000', color: '#0D0D0D', fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100 }}>
            {tag}
          </span>
        </div>
      )}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '32px 28px' }}>
        <h3 style={{ fontSize: 23, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ opacity: 0.65, fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>{desc}</p>
        <span className="explore-link" style={{ color: '#fff000', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Explore <span className="explore-arrow" style={{ fontSize: 16, transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', display: 'inline-block' }}>&#8594;</span>
        </span>
      </div>
    </div>
  )
}
