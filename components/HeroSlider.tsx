'use client';
import { useState, useEffect } from 'react';

const slides = [
  {
    video: '/videos/airplane.mp4', img: null, duration: 14000,
    tag: 'IATA Accredited',
    loc: 'Nairobi · Mombasa · Dubai · London',
    title: 'Cheap Flights from Kenya',
    sub: 'Jambojet, Kenya Airways, Emirates & 30+ airlines — wholesale fares for individuals, families and corporates',
    cta1: { label: 'Book a Flight', href: '/air-ticketing' },
    cta2: { label: 'Get a Quote', href: '/quote?service=flights' },
  },
  {
    video: '/videos/safaris.mp4', img: null, duration: 18000,
    tag: 'Kenya Safaris',
    loc: 'Maasai Mara · Amboseli · Samburu · Tsavo',
    title: 'Big Five Safari Packages',
    sub: 'Game drives from KES 22,000 — Mara, Amboseli, Samburu. Budget to luxury. 15+ years of expertise.',
    cta1: { label: 'View Packages', href: '/safaris' },
    cta2: { label: 'Plan My Safari', href: '/quote?service=safari' },
  },
  {
    video: '/videos/dubai.mp4', img: null, duration: 10000,
    tag: 'Holiday Packages',
    loc: 'Dubai · Istanbul · Maldives · London',
    title: 'International Holidays from Kenya',
    sub: 'Visa, flights, hotel & transfers — all included. Dubai from $1,200, Istanbul from $1,100. You just pack.',
    cta1: { label: 'View Destinations', href: '/international' },
    cta2: { label: 'WhatsApp Us', href: 'https://wa.me/254722666644' },
  },
  {
    video: null, img: 'photo-1449965408869-eaa3f722e40d', duration: 7000,
    tag: 'Car Hire Kenya',
    loc: 'Nairobi · Mombasa · Kisumu · Nakuru',
    title: 'Car Hire Across Kenya',
    sub: 'Drive yourself or add a driver — Land Cruisers, Prados, saloons & buses from KES 3,500/day. Pick up anywhere.',
    cta1: { label: 'View Fleet', href: '/car-rental' },
    cta2: { label: 'Get a Quote', href: '/quote?service=car-hire' },
  },
  {
    video: null, img: 'photo-1601584115197-04ecc0da31d7', duration: 7000,
    tag: 'Logistics',
    loc: 'Nairobi · Mombasa · Dar es Salaam · Kampala',
    title: 'Logistics Across East Africa',
    sub: 'Lorries, trailers, box body trucks & flatbeds — competitive rates, reliable delivery, fully insured.',
    cta1: { label: 'Get a Quote', href: '/logistics' },
    cta2: { label: 'WhatsApp Us', href: 'https://wa.me/254722666644' },
  },
];

export default function HeroSlider() {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = (idx: number) => {
    setPrev(cur);
    setTransitioning(true);
    setTimeout(() => { setCur(idx); setTransitioning(false); }, 50);
  };

  useEffect(() => {
    const t = setTimeout(() => goTo((cur + 1) % slides.length), slides[cur].duration);
    return () => clearTimeout(t);
  }, [cur]);

  const s = slides[cur];

  const arrowBase: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    width: 52,
    height: 52,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.1)',
    border: '1.5px solid rgba(255,255,255,0.25)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 24,
    transition: 'all 0.25s ease',
    outline: 'none',
    lineHeight: 1,
  };

  const onHoverIn = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.background = 'rgba(255,240,0,0.2)';
    el.style.borderColor = '#fff000';
    el.style.color = '#fff000';
    el.style.transform = 'translateY(-50%) scale(1.08)';
  };

  const onHoverOut = (e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.style.background = 'rgba(255,255,255,0.1)';
    el.style.borderColor = 'rgba(255,255,255,0.25)';
    el.style.color = '#fff';
    el.style.transform = 'translateY(-50%) scale(1)';
  };

  return (
    <div style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden' }}>

      {prev !== null && slides[prev].img && (
        <img
          src={'https://images.unsplash.com/' + slides[prev].img + '?w=1920&q=80&fit=crop'}
          alt=''
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1, zIndex: 0 }}
        />
      )}

      {s.video ? (
        <video
          key={s.video}
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: transitioning ? 0 : 1, transition: 'opacity 1.2s ease', zIndex: 1 }}
        >
          <source src={s.video} type='video/mp4' />
        </video>
      ) : (
        <img
          src={'https://images.unsplash.com/' + s.img + '?w=1920&q=80&fit=crop'}
          alt={s.loc}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: transitioning ? 0 : 1, transition: 'opacity 1.2s ease', zIndex: 1 }}
        />
      )}

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.2) 100%)', zIndex: 2 }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 5% 60px', zIndex: 3, textAlign: 'center' }}>
        <div style={{ maxWidth: 760 }}>

          <div style={{ marginBottom: 16 }}>
            <span style={{ display: 'inline-block', background: '#fff000', color: '#000', fontSize: 10, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', padding: '5px 16px', borderRadius: 100 }}>
              {s.tag}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ height: 1, width: 36, background: 'rgba(255,255,255,0.4)' }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 3, textTransform: 'uppercase' }}>{s.loc}</span>
            <div style={{ height: 1, width: 36, background: 'rgba(255,255,255,0.4)' }} />
          </div>

          <h1 key={cur} style={{ fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', margin: '0 0 20px', color: 'white', opacity: transitioning ? 0 : 1, transition: 'opacity 0.8s ease 0.2s' }}>
            {s.title}
          </h1>

          <p style={{ fontSize: 'clamp(14px,1.5vw,18px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 36px', opacity: transitioning ? 0 : 1, transition: 'opacity 0.8s ease 0.3s' }}>
            {s.sub}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a href={s.cta1.href} className="glass-cta" style={{ background: '#fff000', color: '#000', padding: '15px 34px', borderRadius: 50, fontSize: 16, fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: 1 }}>
              {s.cta1.label}
            </a>
            <a href={s.cta2.href} className="glass-ghost" style={{ background: 'transparent', color: 'white', padding: '15px 34px', borderRadius: 50, fontSize: 16, fontWeight: 600, textDecoration: 'none' }}>
              {s.cta2.label}
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{ width: i === cur ? 32 : 10, height: 3, borderRadius: 4, background: i === cur ? '#fff000' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease', padding: 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => goTo((cur - 1 + slides.length) % slides.length)} style={{ ...arrowBase, left: 24 }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} aria-label='Previous'>‹</button>
      <button onClick={() => goTo((cur + 1) % slides.length)} style={{ ...arrowBase, right: 24 }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} aria-label='Next'>›</button>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)', zIndex: 2 }} />

    </div>
  );
}
