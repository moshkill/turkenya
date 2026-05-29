export const dynamic = 'force-dynamic'

const pkgs = [
  { name:'Maasai Mara Classic', days:'3D/2N', price:'From KES 45,000', img:'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80&fit=crop', hi:['Big Five game drives','Luxury tented camp','Bush breakfast','Expert KWS guide'] },
  { name:'Amboseli & Kilimanjaro', days:'4D/3N', price:'From KES 62,000', img:'https://images.unsplash.com/photo-1549366021-9f761d450615?w=600&q=80&fit=crop', hi:['Elephant herds','Kilimanjaro views','Sundowner drinks','Full board'] },
  { name:'Samburu Explorer', days:'5D/4N', price:'From KES 78,000', img:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=80&fit=crop', hi:['Rare northern species','Ewaso Ngiro River','Cultural village visit','Airstrip access'] },
  { name:'Ultimate Kenya Circuit', days:'8D/7N', price:'From KES 145,000', img:'https://images.unsplash.com/photo-1551872427-1434a39a8c10?w=600&q=80&fit=crop', hi:['Mara + Amboseli + Tsavo','Lake Nakuru flamingos','Private vehicle','Full board throughout'] },
  { name:'Budget Mara Safari', days:'2D/1N', price:'From KES 22,000', img:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80&fit=crop', hi:['Game drives','Campsite stay','Group tour','Park fees included'] },
  { name:'Private Charter Safari', days:'Custom', price:'POA', img:'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?w=600&q=80&fit=crop', hi:['Your schedule','Private 4x4','Any destination','Fully custom'] },
]

export default function SafarisPage() {
  return (
    <main style={{background:'#0D0D0D',minHeight:'100vh'}}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .pkg-card { transition: transform 0.3s, box-shadow 0.3s; }
        .pkg-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(255,240,0,0.08); }
        .pkg-card img { transition: transform 0.6s; }
        .pkg-card:hover img { transform: scale(1.05); }
      `}</style>

      {/* Hero */}
      <div style={{ position:'relative', height:'60vh', minHeight:400, display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:64, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=80&fit=crop)', backgroundSize:'cover', backgroundPosition:'center 40%' }} />
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position:'relative', textAlign:'center', animation:'fadeUp 0.8s ease' }}>
          <span style={{ display:'inline-block', background:'#fff000', color:'#0D0D0D', fontSize:11, fontWeight:800, letterSpacing:4, padding:'6px 20px', borderRadius:100, marginBottom:20 }}>SAFARI TOURS</span>
          <h1 style={{ color:'#fff', fontSize:'clamp(32px,5vw,64px)', fontWeight:900, margin:'0 0 12px', letterSpacing:'-1px' }}>Kenya Safaris and Wildlife Tours</h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:18, margin:0 }}>Big Five. Breathtaking landscapes. Memories that last a lifetime.</p>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:'rgba(255,240,0,0.06)', borderTop:'1px solid rgba(255,240,0,0.1)', borderBottom:'1px solid rgba(255,240,0,0.1)', padding:'24px 24px' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:24 }}>
          {[['500+','Safaris Completed'],['Big Five','All Parks Covered'],['IATA','Licensed Operator'],['24/7','Support']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ color:'#fff000', fontSize:22, fontWeight:900, marginBottom:4 }}>{n}</div>
              <div style={{ color:'rgba(255,255,255,0.5)', fontSize:12, letterSpacing:2, textTransform:'uppercase' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages grid */}
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'80px 24px' }}>
        <div style={{ textAlign:'center', marginBottom:56 }}>
          <h2 style={{ color:'#fff', fontSize:'clamp(24px,3vw,40px)', fontWeight:800, margin:'0 0 12px' }}>Choose Your Safari Package</h2>
          <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, margin:0 }}>All prices include park fees, accommodation, meals, and a certified guide</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:24 }}>
          {pkgs.map((p) => (
            <div key={p.name} className="pkg-card" style={{ background:'#111', borderRadius:8, overflow:'hidden', border:'1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ height:220, overflow:'hidden' }}>
                <img src={p.img} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />
              </div>
              <div style={{ padding:'28px 28px 32px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12, flexWrap:'wrap', gap:8 }}>
                  <span style={{ color:'#fff000', fontSize:11, fontWeight:700, letterSpacing:3, background:'rgba(255,240,0,0.1)', padding:'4px 12px', borderRadius:100 }}>{p.days}</span>
                  <span style={{ color:'#fff000', fontWeight:800, fontSize:16 }}>{p.price}</span>
                </div>
                <h3 style={{ color:'#fff', fontSize:20, fontWeight:800, margin:'0 0 16px' }}>{p.name}</h3>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px' }}>
                  {p.hi.map((h) => (
                    <li key={h} style={{ color:'rgba(255,255,255,0.6)', fontSize:14, padding:'6px 0', borderBottom:'1px solid rgba(255,255,255,0.04)', display:'flex', gap:10, alignItems:'center' }}>
                      <span style={{ color:'#fff000', fontSize:16 }}>&#10003;</span>{h}
                    </li>
                  ))}
                </ul>
                <a href="/contact" style={{ display:'block', textAlign:'center', background:'#fff000', color:'#0D0D0D', padding:'13px', fontWeight:800, fontSize:12, letterSpacing:2, textDecoration:'none', borderRadius:4 }}>BOOK THIS SAFARI</a>
              </div>
            </div>
          ))}
        </div>

        {/* Wildlife section */}
        <div style={{ marginTop:80, display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:4 }}>
          {[
            {animal:'Lion',img:'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=80&fit=crop'},
            {animal:'Elephant',img:'https://images.unsplash.com/photo-1549366021-9f761d450615?w=400&q=80&fit=crop'},
            {animal:'Leopard',img:'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=80&fit=crop'},
            {animal:'Buffalo',img:'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80&fit=crop'},
            {animal:'Rhino',img:'https://images.unsplash.com/photo-1551872427-1434a39a8c10?w=400&q=80&fit=crop'},
          ].map((w) => (
            <div key={w.animal} style={{ position:'relative', height:200, overflow:'hidden', borderRadius:4 }}>
              <img src={w.img} alt={w.animal} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(transparent 50%,rgba(0,0,0,0.7))' }} />
              <span style={{ position:'absolute', bottom:12, left:12, color:'#fff', fontWeight:700, fontSize:14, letterSpacing:2, textTransform:'uppercase' }}>{w.animal}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:80, padding:'56px 32px', background:'linear-gradient(135deg,rgba(255,240,0,0.06),rgba(255,240,0,0.02))', border:'1px solid rgba(255,240,0,0.15)', borderRadius:12 }}>
          <h2 style={{ color:'#fff', fontSize:32, fontWeight:800, marginBottom:12 }}>Custom Safari? We Build It For You.</h2>
          <p style={{ color:'rgba(255,255,255,0.6)', marginBottom:36, fontSize:17 }}>Tell us your dates, budget, and wish list. We handle everything.</p>
          <a href="/contact" style={{ display:'inline-block', background:'#fff000', color:'#0D0D0D', padding:'18px 52px', fontWeight:800, fontSize:13, letterSpacing:3, textDecoration:'none', borderRadius:4 }}>GET A FREE QUOTE</a>
        </div>
      </div>
    </main>
  )
}
