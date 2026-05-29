export const dynamic = 'force-dynamic'
export const metadata = { title: 'Car Hire Nairobi | Turkenya Tours & Safaris', description: 'Self-drive and chauffeur car hire in Nairobi and across Kenya.' }

const fleet = [
  { name:'Toyota Land Cruiser V8', cat:'4x4 Safari', price:'KES 12,000/day', seats:7, img:'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80&fit=crop', features:['Self-drive or Chauffeur','Roof hatch pop-up','All parks rated','GPS included'] },
  { name:'Toyota Prado TX', cat:'4x4 Mid-Range', price:'KES 8,500/day', seats:7, img:'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80&fit=crop', features:['4WD','Air conditioning','Spacious boot','Upcountry ready'] },
  { name:'Toyota Hiace Van', cat:'Group Shuttle', price:'KES 7,000/day', seats:14, img:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80&fit=crop', features:['14 seats','Airport runs','Luggage rack','Group bookings'] },
  { name:'Toyota Corolla', cat:'City Saloon', price:'KES 3,500/day', seats:5, img:'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80&fit=crop', features:['Fuel efficient','Air conditioning','City driving','Economy rate'] },
  { name:'Toyota RAV4', cat:'Compact 4x4', price:'KES 6,000/day', seats:5, img:'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fit=crop', features:['AWD','Business travel','Comfortable ride','Semi off-road'] },
  { name:'Rosa Coaster Bus', cat:'Large Group', price:'KES 15,000/day', seats:29, img:'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80&fit=crop', features:['29 seats','Church groups','School trips','Luggage hold'] },
]

export default function CarRentalPage() {
  const css = '@keyframes heroIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}} @keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.08)}}'
  return (
    <main style={{ background:'#0D0D0D', minHeight:'100vh', color:'#fff', fontFamily:"'Abel',system-ui,sans-serif" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section style={{ position:'relative', height:'70vh', minHeight:500, overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1920&q=80&fit=crop)', backgroundSize:'cover', backgroundPosition:'center', animation:'kenBurns 10s ease forwards' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,rgba(0,0,0,0.5),rgba(0,0,0,0.75))' }} />
        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'0 24px', animation:'heroIn 1s ease forwards' }}>
          <div style={{ display:'inline-block', background:'rgba(255,240,0,0.15)', border:'1px solid #fff000', color:'#fff000', padding:'6px 18px', fontSize:11, fontWeight:800, letterSpacing:'3px', marginBottom:20, borderRadius:2 }}>CAR HIRE NAIROBI</div>
          <h1 style={{ fontSize:'clamp(36px,6vw,72px)', fontWeight:900, margin:'0 0 20px', lineHeight:1.1, textTransform:'uppercase' }}>Kenya&apos;s Most<br /><span style={{ color:'#fff000' }}>Trusted Fleet</span></h1>
          <p style={{ fontSize:18, color:'rgba(255,255,255,0.8)', maxWidth:560, margin:'0 auto 32px' }}>Self-drive or chauffeur-driven. Safari 4x4s to city saloons. Pick-up anywhere in Kenya.</p>
          <a href="/contact" style={{ display:'inline-block', background:'#fff000', color:'#0D0D0D', padding:'16px 40px', fontWeight:800, textDecoration:'none', fontSize:14, letterSpacing:'2px', borderRadius:2 }}>GET A QUOTE</a>
        </div>
      </section>
      <section style={{ background:'rgba(255,240,0,0.06)', borderTop:'1px solid rgba(255,240,0,0.15)', borderBottom:'1px solid rgba(255,240,0,0.15)', padding:'32px 24px' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:24, textAlign:'center' }}>
          {[['200+','Vehicles Available'],['15+','Years Experience'],['24/7','Breakdown Support'],['Insured','Comprehensive Cover']].map(([v,l])=>(
            <div key={l}><div style={{ fontSize:36, fontWeight:900, color:'#fff000' }}>{v}</div><div style={{ fontSize:12, color:'rgba(255,255,255,0.6)', letterSpacing:'1px', marginTop:4 }}>{l}</div></div>
          ))}
        </div>
      </section>
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'80px 24px' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <h2 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:900, textTransform:'uppercase' }}>Our <span style={{ color:'#fff000' }}>Fleet</span></h2>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:16, marginTop:12 }}>All vehicles serviced, insured and road-ready</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:28 }}>
          {fleet.map(v => (
            <div key={v.name} style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:8, overflow:'hidden' }}>
              <div style={{ position:'relative', height:210, overflow:'hidden' }}>
                <img src={v.img} alt={v.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                <div style={{ position:'absolute', top:12, left:12, background:'rgba(255,240,0,0.9)', color:'#0D0D0D', padding:'4px 10px', fontSize:10, fontWeight:800, letterSpacing:'1.5px', borderRadius:2 }}>{v.cat}</div>
                <div style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.7)', color:'#fff000', padding:'4px 10px', fontSize:11, fontWeight:700 }}>{v.seats} seats</div>
              </div>
              <div style={{ padding:24 }}>
                <h3 style={{ fontSize:18, fontWeight:800, margin:'0 0 8px' }}>{v.name}</h3>
                <div style={{ fontSize:22, fontWeight:900, color:'#fff000', marginBottom:16 }}>{v.price}</div>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 20px' }}>
                  {v.features.map(f=><li key={f} style={{ fontSize:13, color:'rgba(255,255,255,0.7)', padding:'4px 0', borderBottom:'1px solid rgba(255,255,255,0.06)', paddingLeft:16, position:'relative' }}><span style={{ position:'absolute', left:0, color:'#fff000' }}>✓</span>{f}</li>)}
                </ul>
                <a href="/contact" style={{ display:'block', textAlign:'center', background:'#fff000', color:'#0D0D0D', padding:'12px', fontWeight:800, textDecoration:'none', fontSize:12, letterSpacing:'2px', borderRadius:2 }}>BOOK THIS VEHICLE</a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ background:'rgba(255,255,255,0.02)', padding:'60px 24px', borderTop:'1px solid rgba(255,255,255,0.06)', textAlign:'center' }}>
        <h2 style={{ fontSize:28, fontWeight:900, marginBottom:16, textTransform:'uppercase' }}>Self-Drive or <span style={{ color:'#fff000' }}>Chauffeur?</span></h2>
        <div style={{ maxWidth:800, margin:'32px auto 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
          {[{t:'Self-Drive',icon:'🚗',items:['Valid driving licence required','Explore at your own pace','GPS + offline maps provided','24/7 breakdown line']},{t:'Chauffeur-Driven',icon:'👨\u200d✈️',items:['Licensed professional driver','Local knowledge of all routes','Ideal for business travel','Airport pickup included']}].map(o=>(
            <div key={o.t} style={{ background:'rgba(255,240,0,0.06)', border:'1px solid rgba(255,240,0,0.2)', borderRadius:8, padding:28, textAlign:'left' }}>
              <div style={{ fontSize:36, marginBottom:12 }}>{o.icon}</div>
              <h3 style={{ fontSize:18, fontWeight:800, color:'#fff000', marginBottom:16 }}>{o.t}</h3>
              {o.items.map(i=><div key={i} style={{ fontSize:13, color:'rgba(255,255,255,0.75)', padding:'7px 0', borderBottom:'1px solid rgba(255,255,255,0.06)', paddingLeft:18, position:'relative' }}><span style={{ position:'absolute', left:0, color:'#fff000' }}>✓</span>{i}</div>)}
              <a href="/contact" style={{ display:'block', textAlign:'center', marginTop:20, background:'#fff000', color:'#0D0D0D', padding:'11px', fontWeight:800, textDecoration:'none', fontSize:12, letterSpacing:'2px', borderRadius:2 }}>ENQUIRE NOW</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
