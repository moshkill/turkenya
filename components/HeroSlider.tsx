'use client';
import { useState, useEffect } from 'react';

const slides = [
  { img: 'photo-1436491865332-7a61a109cc05', loc: 'Nairobi · Dubai · London · New York', title: 'Fly Anywhere in the World', sub: 'Local and international flights at unbeatable rates — economy, business class and group bookings' },
  { img: 'photo-1547471080-7cc2caa01a7e', loc: 'Amboseli, Kenya', title: 'Giants Under Kilimanjaro', sub: 'Walk among the largest elephant herds in Africa with the snow-capped peak of Kilimanjaro behind them' },
  { img: 'photo-1559128010-7c1ad6e1b6a5', loc: 'Zanzibar, Tanzania', title: 'Paradise Found', sub: 'Crystal waters, powder-white sands and centuries of Swahili culture on the Spice Island' },
  { img: 'photo-1590523277543-a94d2e4eb00b', loc: 'Serengeti, Tanzania', title: 'The Endless Plains', sub: '1.5 million acres of golden savanna — the greatest concentration of wildlife on the planet' },
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
    const t = setInterval(() => goTo((cur + 1) % slides.length), 6000);
    return () => clearInterval(t);
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

      {prev !== null && (
        <img src={\} alt='' style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1, zIndex: 0 }} />
      )}
      <img src={\} alt={s.loc} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: transitioning ? 0 : 1, transition: 'opacity 1.2s ease', zIndex: 1 }} />

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.4) 60%,rgba(0,0,0,0.2) 100%)', zIndex: 2 }} />

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8% 80px', zIndex: 3 }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <div style={{ height: 2, width: 40, background: '#fff000' }} />
            <span style={{ color: '#fff000', fontSize: 13, letterSpacing: 4, textTransform: 'uppercase' }}>{s.loc}</span>
          </div>
          <h1 key={cur} style={{ fontSize: 'clamp(38px,5.5vw,72px)', fontWeight: 700, lineHeight: 1.05, margin: '0 0 20px', color: 'white', opacity: transitioning ? 0 : 1, transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s' }}>{s.title}</h1>
          <p style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: 40, maxWidth: 560, opacity: transitioning ? 0 : 1, transition: 'opacity 0.8s ease 0.3s' }}>{s.sub}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a href='/safaris' style={{ background: '#fff000', color: '#000', padding: '15px 34px', borderRadius: 50, fontSize: 17, fontWeight: 700, textDecoration: 'none', textTransform: 'uppercase' }}>Explore Safaris</a>
            <a href='/contact' style={{ background: 'transparent', color: 'white', padding: '15px 34px', borderRadius: 50, fontSize: 17, fontWeight: 600, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)' }}>Get Free Quote</a>
          </div>
        </div>
      </div>

      <button onClick={() => goTo((cur - 1 + slides.length) % slides.length)} style={{ ...arrowBase, left: 24 }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} aria-label='Previous'>
        ‹
      </button>

      <button onClick={() => goTo((cur + 1) % slides.length)} style={{ ...arrowBase, right: 24 }} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut} aria-label='Next'>
        ›
      </button>

      <div style={{ position: 'absolute', bottom: 40, right: '8%', zIndex: 10, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{ width: i === cur ? 24 : 8, height: 2, borderRadius: 4, background: i === cur ? '#fff000' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.4s ease', padding: 0 }} />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 100, background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)', zIndex: 2 }} />

    </div>
  );
}