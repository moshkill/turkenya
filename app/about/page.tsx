export const dynamic = 'force-dynamic'

export default function AboutPage() {
  return (
    <main style={{background:'#0D0D0D',minHeight:'100vh'}}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div style={{position:'relative',height:'50vh',minHeight:360,display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:56,overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'url(https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1600&q=80&fit=crop)',backgroundSize:'cover',backgroundPosition:'center'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.2),rgba(13,13,13,0.97))'}} />
        <div style={{position:'relative',textAlign:'center',animation:'fadeUp 0.8s ease'}}>
          <span style={{display:'inline-block',background:'#fff000',color:'#0D0D0D',fontSize:11,fontWeight:800,letterSpacing:4,padding:'6px 20px',borderRadius:100,marginBottom:20}}>OUR STORY</span>
          <h1 style={{color:'#fff',fontSize:'clamp(28px,5vw,60px)',fontWeight:900,margin:'0 0 12px',letterSpacing:'-1px'}}>About Turkenya Tours</h1>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:18,margin:0}}>Built on a passion for African travel. Driven by your experience.</p>
        </div>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'72px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:2,marginBottom:80}}>
          {[['500+','Travellers Served'],['IATA','Registered'],['50+','Destinations'],['24/7','Support']].map(([n,l]) => (
            <div key={l} style={{padding:'40px 24px',textAlign:'center',background:'rgba(255,240,0,0.04)',border:'1px solid rgba(255,240,0,0.08)'}}>
              <div style={{color:'#fff000',fontSize:40,fontWeight:900,marginBottom:8}}>{n}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:11,letterSpacing:3,textTransform:'uppercase'}}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:48,alignItems:'center',marginBottom:80}}>
          <div>
            <span style={{color:'#fff000',fontSize:11,fontWeight:800,letterSpacing:3,textTransform:'uppercase',display:'block',marginBottom:16}}>WHO WE ARE</span>
            <h2 style={{color:'#fff',fontSize:'clamp(22px,3vw,38px)',fontWeight:800,margin:'0 0 20px',lineHeight:1.2}}>Built on a passion for African travel</h2>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:16,lineHeight:2,marginBottom:20}}>Turkenya Tours and Safaris was founded with one belief — that exceptional travel should be accessible to everyone. From a budget Mara safari to a luxury Dubai escape, we bring the same dedication to every booking.</p>
            <p style={{color:'rgba(255,255,255,0.65)',fontSize:16,lineHeight:2,margin:0}}>IATA registered, fully licensed, and deeply rooted in the Kenyan travel landscape. Our team lives and breathes what we sell — and it shows in every itinerary we build.</p>
          </div>
          <div style={{borderRadius:8,overflow:'hidden',height:360}}>
            <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=700&q=80&fit=crop" alt="Safari" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
          </div>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:2}}>
          {[['Authentic','We only recommend experiences we have personally verified'],['Reliable','IATA registered with full licensing across Kenya'],['Personal','Every itinerary is custom-built around your needs'],['Transparent','No hidden fees. What we quote is what you pay']].map(([t,d]) => (
            <div key={t} style={{padding:'36px 24px',borderTop:'3px solid #fff000',background:'#111'}}>
              <h4 style={{color:'#fff',fontSize:16,fontWeight:800,margin:'0 0 12px'}}>{t}</h4>
              <p style={{color:'rgba(255,255,255,0.55)',fontSize:14,lineHeight:1.8,margin:0}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
