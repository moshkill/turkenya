export default function NotFound() {
  return (
    <main style={{ background:'#0D0D0D', minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', textAlign:'center', padding:'0 24px' }}>
      <div style={{ fontSize:120, fontWeight:900, color:'rgba(255,240,0,0.08)', lineHeight:1, marginBottom:8 }}>404</div>
      <h1 style={{ color:'#fff', fontSize:'clamp(28px,4vw,48px)', fontWeight:900, margin:'0 0 16px' }}>Page Not Found</h1>
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:18, marginBottom:48, maxWidth:440 }}>This trail goes cold here. Let us get you back on the right path.</p>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center' }}>
        <a href="/" style={{ background:'#fff000', color:'#0D0D0D', padding:'14px 36px', fontWeight:800, fontSize:13, letterSpacing:2, textDecoration:'none', borderRadius:2 }}>GO HOME</a>
        <a href="/contact" style={{ border:'1px solid rgba(255,255,255,0.2)', color:'#fff', padding:'14px 36px', fontWeight:800, fontSize:13, letterSpacing:2, textDecoration:'none', borderRadius:2 }}>CONTACT US</a>
      </div>
    </main>
  )
}
