export const dynamic = 'force-dynamic';
export default function AirportTransfers() {
  const vehicles = [
    {type:'Economy Sedan',capacity:'1-3 passengers',examples:'Toyota Corolla, VW Polo',price:'From KES 2,500',img:'photo-1549317661-bd32c8ce0db2'},
    {type:'Premium SUV',capacity:'1-4 passengers',examples:'Toyota Prado, Ford Explorer',price:'From KES 4,500',img:'photo-1519641471654-76ce0107ad1b'},
    {type:'Minivan',capacity:'5-8 passengers',examples:'Toyota Hiace, VW Transporter',price:'From KES 5,500',img:'photo-1558618666-fcd25c85cd64'},
    {type:'Executive Van',capacity:'8-14 passengers',examples:'Mercedes Sprinter, Toyota Coaster',price:'From KES 8,000',img:'photo-1544620347-c4fd4a3d5957'},
  ];
  const features = ['Flight Tracking','Meet and Greet Sign','24/7 Availability','Fixed Rates','No Hidden Charges','All Airports Covered'];
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'white',fontFamily:"'Abel',sans-serif"}}>
      <div style={{position:'relative',height:420,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center',padding:'0 20px'}}>
        <img src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80&fit=crop" alt="Airport Transfers" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.3}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:14,color:'#fff000',letterSpacing:4,marginBottom:16}}>MEET AND GREET SERVICE</div>
          <h1 style={{fontSize:48,fontWeight:700,margin:'0 0 16px'}}>Airport Transfers</h1>
          <p style={{fontSize:20,opacity:0.8,maxWidth:600}}>Reliable, professional airport pick-up and drop-off across Kenya — JKIA, WIA, MBA and more</p>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 24px'}}>
        <h2 style={{fontSize:36,textAlign:'center',marginBottom:16}}>Choose Your Vehicle</h2>
        <p style={{textAlign:'center',opacity:0.7,fontSize:18,marginBottom:48}}>All vehicles are clean, insured and driven by professional licensed drivers</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24,marginBottom:60}}>
          {vehicles.map((v,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.05)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,0,0.1)'}}>
              <img src={"https://images.unsplash.com/"+v.img+"?w=600&q=80&fit=crop"} alt={v.type} style={{width:'100%',height:200,objectFit:'cover'}}/>
              <div style={{padding:24}}>
                <h3 style={{fontSize:22,marginBottom:4}}>{v.type}</h3>
                <p style={{color:'#fff000',marginBottom:4}}>{v.capacity}</p>
                <p style={{opacity:0.6,fontSize:14,marginBottom:8}}>{v.examples}</p>
                <p style={{fontSize:20,fontWeight:700,marginBottom:16}}>{v.price}</p>
                <a href="/contact" style={{background:'#fff000',color:'#000',padding:'10px 20px',borderRadius:8,fontWeight:700,textDecoration:'none',display:'inline-block'}}>Book Now</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:48}}>
          {features.map((f,i)=>(
            <div key={i} style={{padding:20,background:'rgba(255,255,0,0.05)',borderRadius:12,textAlign:'center',border:'1px solid rgba(255,255,0,0.1)'}}>
              <div style={{color:'#fff000',fontSize:24,marginBottom:8}}>✓</div>
              <div>{f}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center'}}>
          <a href="/contact" style={{display:'inline-block',background:'#fff000',color:'#000',padding:'16px 40px',borderRadius:50,fontSize:18,fontWeight:700,textDecoration:'none'}}>Book Your Transfer</a>
        </div>
      </div>
    </div>
  );
}
