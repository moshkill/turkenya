'use client'
import { useState, useEffect } from 'react'

const slides = [
  { headline: 'Where the Wild\nCalls You Home', sub: 'Maasai Mara - Amboseli - Samburu', tag: 'SAFARI TOURS', cta: '/safaris', bg: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80&fit=crop', overlay: 'rgba(10,8,0,0.55)' },
  { headline: 'Fly Anywhere.\nWe Handle Everything.', sub: 'IATA Registered - All Airlines - Best Rates', tag: 'AIR TICKETING', cta: '/air-ticketing', bg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80&fit=crop', overlay: 'rgba(0,8,20,0.6)' },
  { headline: 'Dubai - Istanbul - Zanzibar\nYour World Awaits', sub: 'International Holidays - Full Packages - Expert Guides', tag: 'INTERNATIONAL', cta: '/international', bg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80&fit=crop', overlay: 'rgba(5,0,15,0.55)' },
]

const css = '@keyframes heroIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}} @keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.08)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}} .h1{animation:heroIn 0.8s ease both} .h2{animation:heroIn 0.8s 0.15s ease both} .h3{animation:heroIn 0.8s 0.3s ease both} .h4{animation:heroIn 0.8s 0.45s ease both}'

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false)
      setTimeout(() => { setCurrent(c => (c + 1) % slides.length); setVisible(true) }, 600)
    }, 7000)
    return () => clearInterval(t)
  }, [])

  const s = slides[current]

  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div key={current} style={{
        position:'absolute', inset:0,
        backgroundImage: 'url(' + s.bg + ')',
        backgroundSize:'cover', backgroundPosition:'center',
        animation: 'kenBurns 8s ease forwards',
      }} />
      <div style={{ position:'absolute', inset:0, background:s.overlay }} />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'35%', background:'linear-gradient(transparent,#0D0D0D)' }} />

      <div style={{ position:'relative', zIndex:2, textAlign:'center', maxWidth:960, margin:'0 auto', padding:'120px 24px 80px', opacity:visible?1:0, transition:'opacity 0.6s ease' }}>
        <div className="h1" style={{ display:'inline-flex', alignItems:'center', gap:12, background:'rgba(255,240,0,0.12)', border:'1px solid rgba(255,240,0,0.3)', backdropFilter:'blur(8px)', padding:'6px 20px', borderRadius:100, marginBottom:32 }}>
          <span style={{ width:6, height:6, borderRadius:'50%', background:'#fff000', animation:'pulse 2s infinite', display:'inline-block' }} />
          <span style={{ color:'#fff000', fontSize:11, fontWeight:800, letterSpacing:4 }}>{s.tag}</span>
        </div>

        <h1 className="h2" style={{ fontSize:'clamp(40px,7vw,90px)', fontWeight:900, color:'#ffffff', lineHeight:1.05, margin:'0 0 28px', whiteSpace:'pre-line', letterSpacing:'-2px', textShadow:'0 2px 40px rgba(0,0,0,0.5)' }}>
          {s.headline}
        </h1>

        <p className="h3" style={{ fontSize:'clamp(14px,2vw,19px)', color:'rgba(255,255,255,0.7)', marginBottom:52, letterSpacing:3, textTransform:'uppercase' }}>
          {s.sub}
        </p>

        <div className="h4" style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
          <a href="/contact" style={{ background:'#fff000', color:'#0D0D0D', padding:'18px 48px', fontSize:13, fontWeight:800, letterSpacing:3, textDecoration:'none', borderRadius:3 }}>BOOK NOW</a>
          <a href={s.cta} style={{ background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)', border:'1px solid rgba(255,255,255,0.25)', color:'#ffffff', padding:'18px 48px', fontSize:13, fontWeight:800, letterSpacing:3, textDecoration:'none', borderRadius:3 }}>EXPLORE</a>
        </div>

        <div style={{ display:'flex', gap:10, justifyContent:'center', marginTop:64 }}>
          {slides.map((_,i) => (
            <button key={i} onClick={() => { setVisible(false); setTimeout(()=>{setCurrent(i);setVisible(true)},300) }} style={{ width:i===current?40:8, height:8, borderRadius:4, background:i===current?'#fff000':'rgba(255,255,255,0.25)', border:'none', cursor:'pointer', transition:'all 0.35s', padding:0 }} />
          ))}
        </div>
      </div>

      <div style={{ position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:8, zIndex:2 }}>
        <div style={{ width:1, height:48, background:'linear-gradient(#fff000,transparent)' }} />
        <span style={{ color:'rgba(255,255,255,0.4)', fontSize:10, letterSpacing:4, textTransform:'uppercase' }}>Scroll</span>
      </div>
    </section>
  )
}
