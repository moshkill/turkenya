export const dynamic = 'force-dynamic';
export default function PilgrimageTours() {
  const packages = [
    {name:'Umrah Package',duration:'10-14 Days',price:'From $1,800/person',img:'photo-1591604129939-f1efa4d9f7fa'},
    {name:'Holy Land - Israel',duration:'8-12 Days',price:'From $2,200/person',img:'photo-1548013146-72479768bada'},
    {name:'Rome Pilgrimage',duration:'7-10 Days',price:'From $2,500/person',img:'photo-1552832230-c0197dd311b5'},
    {name:'Fatima and Lourdes',duration:'10 Days',price:'From $2,800/person',img:'photo-1507003211169-0a1dd7228f2d'},
    {name:'Hajj Arrangements',duration:'21-30 Days',price:'Contact for pricing',img:'photo-1591604129939-f1efa4d9f7fa'},
    {name:'India Sacred Sites',duration:'12 Days',price:'From $1,600/person',img:'photo-1524492412937-b28074a5d7da'},
  ];
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'white',fontFamily:"'Abel',sans-serif"}}>
      <div style={{position:'relative',height:420,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center',padding:'0 20px'}}>
        <img src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1920&q=80&fit=crop" alt="Pilgrimage" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.3}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:14,color:'#fff000',letterSpacing:4,marginBottom:16}}>SPIRITUAL JOURNEYS</div>
          <h1 style={{fontSize:48,fontWeight:700,margin:'0 0 16px'}}>Pilgrimage Tours</h1>
          <p style={{fontSize:20,opacity:0.8,maxWidth:600}}>Sacred journeys thoughtfully planned — Umrah, Holy Land, Rome and more</p>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24,marginBottom:60}}>
          {packages.map((p,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.05)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,0,0.1)'}}>
              <img src={"https://images.unsplash.com/"+p.img+"?w=600&q=80&fit=crop"} alt={p.name} style={{width:'100%',height:200,objectFit:'cover'}}/>
              <div style={{padding:24}}>
                <h3 style={{fontSize:22,marginBottom:4}}>{p.name}</h3>
                <p style={{color:'#fff000',marginBottom:4}}>Duration: {p.duration}</p>
                <p style={{fontSize:18,fontWeight:700,marginBottom:16}}>{p.price}</p>
                <a href="/contact" style={{background:'#fff000',color:'#000',padding:'10px 20px',borderRadius:8,fontWeight:700,textDecoration:'none',display:'inline-block'}}>Enquire Now</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center'}}>
          <a href="/contact" style={{display:'inline-block',background:'#fff000',color:'#000',padding:'16px 40px',borderRadius:50,fontSize:18,fontWeight:700,textDecoration:'none'}}>Plan Your Sacred Journey</a>
        </div>
      </div>
    </div>
  );
}
