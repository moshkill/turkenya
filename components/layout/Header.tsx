'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const mobileNav = [
  { label: 'Home', href: '/' },
  { label: 'Safaris', href: '/safaris' },
  { label: 'International Tours', href: '/international' },
  { label: 'Air Ticketing', href: '/air-ticketing' },
  { label: 'Car Hire', href: '/car-rental' },
  { label: 'Hotel Booking', href: '/hotel-booking' },
  { label: 'Logistics', href: '/logistics' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const ls = { color: 'rgba(255,255,255,0.82)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textDecoration: 'none', textTransform: 'uppercase' as const, whiteSpace: 'nowrap' as const }

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toursOpen, setToursOpen] = useState(false)
  const toursRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const h = (e: MouseEvent) => { if (toursRef.current && !toursRef.current.contains(e.target as Node)) setToursOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const hov = (e: React.MouseEvent, c: string) => { (e.currentTarget as HTMLElement).style.color = c }

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: scrolled ? 'rgba(8,8,8,0.97)' : 'rgba(8,8,8,0.82)', borderBottom: scrolled ? '1px solid rgba(255,240,0,0.15)' : 'none', transition: 'all 0.3s' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64, padding: '0 24px' }}>
        <Link href='/' style={{ textDecoration: 'none' }}>
          <img src='/logo.png' alt='Turkenya' style={{ height: 36, width: 'auto', display: 'block' }} />
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>

          <Link href='/' style={ls} onMouseEnter={(e)=>hov(e,'#fff000')} onMouseLeave={(e)=>hov(e,'rgba(255,255,255,0.82)')}>Home</Link>
          <Link href='/air-ticketing' style={ls} onMouseEnter={(e)=>hov(e,'#fff000')} onMouseLeave={(e)=>hov(e,'rgba(255,255,255,0.82)')}>Air Tickets</Link>

          <div ref={toursRef} style={{ position: 'relative' }}>
            <button onClick={() => setToursOpen(!toursOpen)} style={{ ...ls, background: 'none', border: 'none', cursor: 'pointer', color: toursOpen ? '#fff000' : 'rgba(255,255,255,0.82)', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }} onMouseEnter={(e)=>hov(e,'#fff000')} onMouseLeave={(e)=>{ if(!toursOpen) hov(e,'rgba(255,255,255,0.82)') }}>TOURS ▾</button>
            {toursOpen && (
              <div style={{ position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)', background: 'rgba(8,8,8,0.98)', border: '1px solid rgba(255,240,0,0.2)', borderRadius: 8, overflow: 'hidden', minWidth: 170, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                {[{label:'Safaris',href:'/safaris'},{label:'International',href:'/international'}].map((t) => (
                  <Link key={t.href} href={t.href} onClick={()=>setToursOpen(false)} style={{ display: 'block', padding: '13px 22px', color: 'rgba(255,255,255,0.82)', fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.15s' }} onMouseEnter={(e)=>{ (e.currentTarget as HTMLElement).style.color='#fff000'; (e.currentTarget as HTMLElement).style.background='rgba(255,240,0,0.06)' }} onMouseLeave={(e)=>{ (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.82)'; (e.currentTarget as HTMLElement).style.background='transparent' }}>{t.label}</Link>
                ))}
              </div>
            )}
          </div>

          <Link href='/car-rental' style={ls} onMouseEnter={(e)=>hov(e,'#fff000')} onMouseLeave={(e)=>hov(e,'rgba(255,255,255,0.82)')}>Car Hire</Link>
          <Link href='/logistics' style={ls} onMouseEnter={(e)=>hov(e,'#fff000')} onMouseLeave={(e)=>hov(e,'rgba(255,255,255,0.82)')}>Logistics</Link>
          <Link href='/blog' style={ls} onMouseEnter={(e)=>hov(e,'#fff000')} onMouseLeave={(e)=>hov(e,'rgba(255,255,255,0.82)')}>Blog</Link>
          <Link href='/about' style={ls} onMouseEnter={(e)=>hov(e,'#fff000')} onMouseLeave={(e)=>hov(e,'rgba(255,255,255,0.82)')}>About</Link>

        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <Link href='/contact' style={{ background: '#fff000', color: '#0D0D00', padding: '9px 18px', fontSize: 11, fontWeight: 800, letterSpacing: '2px', textDecoration: 'none', borderRadius: 2, whiteSpace: 'nowrap' }}>BOOK NOW</Link>
          <button onClick={() => setOpen(!open)} aria-label='Menu' style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', transition: 'all 0.3s', opacity: open ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', transition: 'all 0.3s', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none' }} />
          </button>
        </div>
      </div>

      {open && (
        <div style={{ background: 'rgba(8,8,8,0.99)', borderTop: '1px solid rgba(255,240,0,0.12)', padding: '8px 24px 24px', maxHeight: '80vh', overflowY: 'auto' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '3px', textTransform: 'uppercase', padding: '12px 0 8px' }}>All Services</div>
          {mobileNav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{ display: 'block', color: n.href === '/contact' ? '#fff000' : 'rgba(255,255,255,0.88)', fontSize: 15, fontWeight: 600, padding: '11px 0', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)', letterSpacing: '1px' }}>{n.label}</Link>
          ))}
        </div>
      )}
    </header>
  )
}