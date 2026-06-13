'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import BookNowButton from '../BookNowButton'
import Icon from '../Icon'

type NavChild = { label: string; href: string }
type NavLink = { label: string; href: string; children?: NavChild[] }

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Air Tickets', href: '/air-ticketing' },
  { label: 'Tours', href: '/safaris', children: [
    { label: 'Safaris', href: '/safaris' },
    { label: 'International', href: '/international' },
    { label: 'Blog', href: '/blog' },
  ] },
  { label: 'Car Hire', href: '/car-rental' },
  { label: 'Logistics', href: '/logistics' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const serviceLinks = [
  { label: 'Safari Tours', href: '/safaris' },
  { label: 'Air Ticketing', href: '/air-ticketing' },
  { label: 'Car Hire', href: '/car-rental' },
  { label: 'Hotel Booking', href: '/hotel-booking' },
  { label: 'International Tours', href: '/international' },
  { label: 'Pilgrimage Tours', href: '/pilgrimage-tours' },
  { label: 'Conferences & MICE', href: '/conferences' },
  { label: 'Airport Transfers', href: '/airport-transfers' },
  { label: 'Logistics & Cargo', href: '/logistics' },
]

const quickLinks = [
  { label: 'Get a Quote', href: '/quote' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [openDrop, setOpenDrop] = useState<string | null>(null)
  const lastScroll = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 300 && y > lastScroll.current)
      lastScroll.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s, border-color 0.3s',
        background: scrolled ? 'rgba(13,13,13,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,240,0,0.08)' : '1px solid transparent',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 92, padding: '0 40px',
        }}>
          <Link href="/" style={{ textDecoration: 'none', flexShrink: 0, position: 'relative', zIndex: 101 }}>
            <img src="/logo.png" alt="Turkenya Tours & Safaris" style={{ height: 64, width: 'auto', display: 'block' }} />
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
            {navLinks.slice(0, 7).map(link => (
              link.children ? (
                <div
                  key={link.label}
                  style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                  onMouseEnter={() => setOpenDrop(link.label)}
                  onMouseLeave={() => setOpenDrop(null)}
                >
                  <Link
                    href={link.href}
                    className="nav-link"
                    style={{
                      color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600,
                      textDecoration: 'none', letterSpacing: '1.5px', textTransform: 'uppercase',
                      transition: 'color 0.2s', position: 'relative',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    {link.label}
                    <span style={{ display: 'flex', opacity: 0.7, transform: openDrop === link.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s' }}><Icon name="chevron-down" size={14} /></span>
                  </Link>
                  <div style={{
                    position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', paddingTop: 16,
                    opacity: openDrop === link.label ? 1 : 0,
                    pointerEvents: openDrop === link.label ? 'all' : 'none',
                    transition: 'opacity 0.25s ease',
                  }}>
                    <div style={{
                      background: 'rgba(13,13,13,0.97)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,240,0,0.14)', borderRadius: 14, padding: 8, minWidth: 190,
                      boxShadow: '0 24px 50px rgba(0,0,0,0.55)',
                      transform: openDrop === link.label ? 'translateY(0)' : 'translateY(8px)', transition: 'transform 0.25s ease',
                    }}>
                      {link.children.map(c => (
                        <Link key={c.href} href={c.href} className="nav-drop" style={{
                          display: 'block', padding: '11px 16px', color: 'rgba(255,255,255,0.78)', textDecoration: 'none',
                          fontSize: 14, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', borderRadius: 8, transition: 'all 0.2s',
                        }}>{c.label}</Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                  style={{
                    color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 600,
                    textDecoration: 'none', letterSpacing: '1.5px', textTransform: 'uppercase',
                    transition: 'color 0.2s', position: 'relative',
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <BookNowButton
              label="Book Now"
              className="book-btn desktop-nav"
              style={{
                background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
                padding: '10px 28px', fontSize: 14, fontWeight: 700,
                letterSpacing: '1.5px',
                borderRadius: 100, textTransform: 'uppercase',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
              }}
            />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="hamburger-btn"
              style={{
                cursor: 'pointer',
                width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 101, padding: 0, borderRadius: '50%',
                background: menuOpen ? 'rgba(255,240,0,0.14)' : 'rgba(255,255,255,0.05)',
                border: '1px solid ' + (menuOpen ? 'rgba(255,240,0,0.5)' : 'rgba(255,255,255,0.14)'),
                backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
                transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <div style={{ width: 20, height: 14, position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: 0, width: 20, height: 2, borderRadius: 2, background: menuOpen ? '#fff000' : '#fff',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  top: menuOpen ? 6 : 0,
                  transform: menuOpen ? 'rotate(45deg)' : 'none',
                }} />
                <span style={{
                  position: 'absolute', right: 0, width: menuOpen ? 20 : 13, height: 2, borderRadius: 2, background: menuOpen ? '#fff000' : '#fff',
                  top: 6, opacity: menuOpen ? 0 : 1,
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                }} />
                <span style={{
                  position: 'absolute', left: 0, width: menuOpen ? 20 : 16, height: 2, borderRadius: 2, background: menuOpen ? '#fff000' : '#fff',
                  transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  top: menuOpen ? 6 : 12,
                  transform: menuOpen ? 'rotate(-45deg)' : 'none',
                }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 99,
        background: 'rgba(13,13,13,0.98)',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? 'all' : 'none',
        transition: 'opacity 0.4s cubic-bezier(0.16,1,0.3,1)',
        overflowY: 'auto',
      }}>
        <div style={{
          maxWidth: 1400, margin: '0 auto', padding: '120px 40px 60px',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 60,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s',
          minHeight: 'calc(100vh - 180px)',
        }} className="menu-grid">
          {/* Mobile Book Now CTA */}
          <div className="mobile-menu-cta" style={{ gridColumn: '1 / -1', display: 'none' }}>
            <BookNowButton
              label="Book Now"
              className=""
              onOpen={() => setMenuOpen(false)}
              style={{
                display: 'block', width: '100%', textAlign: 'center',
                background: 'rgba(255,240,0,0.13)', color: '#fff', border: '1px solid rgba(255,240,0,0.42)', backdropFilter: 'blur(14px) saturate(180%)', WebkitBackdropFilter: 'blur(14px) saturate(180%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.18)',
                padding: '16px 32px', fontSize: 16, fontWeight: 800,
                letterSpacing: 2,
                borderRadius: 100, textTransform: 'uppercase',
              }}
            />
          </div>
          {/* Services */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 32 }}>
              Services
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {serviceLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="menu-link"
                  style={{
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    fontSize: 18, fontWeight: 500, padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'none' : 'translateX(-14px)',
                    transition: `color 0.2s, opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.04}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${0.12 + i * 0.04}s`,
                  }}
                >
                  <span>{link.label}</span>
                  <span className="menu-link-arrow" style={{ opacity: 0.3, display: 'flex', transition: 'all 0.2s' }}><Icon name="arrow-right" size={16} /></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 32 }}>
              Company
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {quickLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="menu-link"
                  style={{
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    fontSize: 18, fontWeight: 500, padding: '14px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ fontSize: 15, opacity: 0.3, transition: 'all 0.2s' }}>&#8594;</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fff000', letterSpacing: 4, textTransform: 'uppercase', marginBottom: 32 }}>
              Get in Touch
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 6, letterSpacing: 1 }}>CALL US</div>
                <a href="tel:+254722666644" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 18, fontWeight: 500 }}>+254 722 666 644</a>
              </div>
              <div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 6, letterSpacing: 1 }}>EMAIL</div>
                <a href="mailto:info@turkenya.com" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: 18, fontWeight: 500 }}>info@turkenya.com</a>
              </div>
              <div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 6, letterSpacing: 1 }}>VISIT US</div>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.6, margin: 0 }}>3rd Floor, T-Mall<br />Nairobi West, Langata Road</p>
              </div>
              <a
                href="https://wa.me/254722666644"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'rgba(37,211,102,0.18)', color: '#fff', border: '1px solid rgba(37,211,102,0.5)', backdropFilter: 'blur(14px) saturate(160%)', WebkitBackdropFilter: 'blur(14px) saturate(160%)', boxShadow: '0 8px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.16)',
                  padding: '14px 28px', borderRadius: 100,
                  textDecoration: 'none', fontSize: 15, fontWeight: 700,
                  letterSpacing: '0.5px', marginTop: 8,
                  transition: 'transform 0.2s',
                  width: 'fit-content',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
