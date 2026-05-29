"use client";

'use client'
import { useEffect, useRef, useState } from 'react'

const stats = [
  { num: 15, suffix: '+', label: 'Years in Business', desc: 'Serving clients since 2009' },
  { num: 5000, suffix: '+', label: 'Happy Clients', desc: 'And counting every year' },
  { num: 50, suffix: '+', label: 'Destinations', desc: 'Kenya & internationally' },
  { num: 98, suffix: '%', label: 'Satisfaction Rate', desc: 'Based on client feedback' },
]

const reasons = [
  { icon: '🏆', title: 'IATA Certified', desc: 'Fully licensed and registered with IATA. Authorized by the Kenya Ministry of Tourism and KATO member.' },
  { icon: '💰', title: 'Best Price Guarantee', desc: 'Exclusive tariff agreements with hotels, airlines and lodges pass savings directly to you.' },
  { icon: '📞', title: '24/7 Support', desc: 'Our team is reachable around the clock. Call our hotline at any time: +254 722 666 644.' },
  { icon: '🗺️', title: 'Expert Local Knowledge', desc: 'Born and based in Nairobi. Our guides know every park, route and hidden gem across East Africa.' },
  { icon: '✈️', title: 'All-In-One Agency', desc: 'Flights, hotels, safaris, car hire, pilgrimage and medical tourism — one call handles everything.' },
  { icon: '🌍', title: 'Global Reach', desc: 'Inbound tourism from Europe, Middle East, US and Far East. We speak your language and understand your needs.' },
]

function Counter({ num, suffix }: { num: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = num / 60
        const timer = setInterval(() => {
          start += step
          if (start >= num) { setCount(num); clearInterval(timer) }
          else setCount(Math.floor(start))
        }, 16)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [num])

  return <div ref={ref} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, color: '#fff000', lineHeight: 1 }}>{count}{suffix}</div>
}

export default function WhyTurkenya() {
  return (
    <section style={{ background: '#111111', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 32, height: 2, background: '#fff000' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#fff000', letterSpacing: '0.25em' }}>WHY CHOOSE US</span>
            <div style={{ width: 32, height: 2, background: '#fff000' }} />
          </div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, color: '#F8F8F5', lineHeight: 1.1 }}>
            Kenya's Most Trusted <span style={{ color: '#fff000' }}>Travel Partner</span>
          </h2>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 2, marginBottom: 80 }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: '#1E1E1E', padding: '40px 32px', textAlign: 'center' }}>
              <Counter num={stat.num} suffix={stat.suffix} />
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#F8F8F5', marginTop: 12, marginBottom: 4 }}>{stat.label}</div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: '#9E9080', letterSpacing: '0.1em' }}>{stat.desc}</div>
            </div>
          ))}
        </div>

        {/* Reasons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
          {reasons.map((reason, i) => (
            <div key={i} style={{ background: '#1E1E1E', padding: '36px 32px', display: 'flex', gap: 20 }}>
              <div style={{ fontSize: 28, flexShrink: 0 }}>{reason.icon}</div>
              <div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 16, color: '#fff000', marginBottom: 8, letterSpacing: '0.05em' }}>{reason.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: '#9E9080', lineHeight: 1.7 }}>{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
