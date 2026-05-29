export const dynamic = 'force-dynamic';
export default function HotelBooking() {
  const destinations = [
    {city:'Nairobi',hotels:'250+ properties',range:'$40-$500/night',img:'photo-1611892440504-42a792e24d32'},
    {city:'Mombasa',hotels:'180+ properties',range:'$35-$400/night',img:'photo-1596436889106-be35e843f974'},
    {city:'Maasai Mara',hotels:'40+ lodges',range:'$150-$1200/night',img:'photo-1516426122078-c23e76319801'},
    {city:'Zanzibar',hotels:'120+ properties',range:'$60-$800/night',img:'photo-1559128010-7c1ad6e1b6a5'},
    {city:'Dar es Salaam',hotels:'90+ properties',range:'$50-$350/night',img:'photo-1611892440504-42a792e24d32'},
    {city:'Dubai',hotels:'International hotels',range:'$80-$2000/night',img:'photo-1512453979798-5ea266f8880c'},
  ];
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'white',fontFamily:"'Abel',sans-serif"}}>
      <div style={{position:'relative',height:400,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center',padding:'0 20px'}}>
        <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1920&q=80&fit=crop" alt="Hotels" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.3}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:14,color:'#fff000',letterSpacing:4,marginBottom:16}}>BEST RATE GUARANTEE</div>
          <h1 style={{fontSize:48,fontWeight:700,margin:'0 0 16px'}}>Hotel Booking</h1>
          <p style={{fontSize:20,opacity:0.8,maxWidth:600}}>Handpicked hotels, lodges and resorts across Africa and beyond at the best rates</p>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 24px'}}>
        <h2 style={{fontSize:36,textAlign:'center',marginBottom:48}}>Top Destinations</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24,marginBottom:48}}>
          {destinations.map((d,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.05)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,0,0.1)'}}>
              <img src={"https://images.unsplash.com/"+d.img+"?w=600&q=80&fit=crop"} alt={d.city} style={{width:'100%',height:200,objectFit:'cover'}}/>
              <div style={{padding:24}}>
                <h3 style={{fontSize:24,marginBottom:4}}>{d.city}</h3>
                <p style={{color:'#fff000',marginBottom:4}}>{d.hotels}</p>
                <p style={{opacity:0.7,marginBottom:16}}>{d.range}</p>
                <a href="/contact" style={{background:'#fff000',color:'#000',padding:'10px 20px',borderRadius:8,fontWeight:700,textDecoration:'none',display:'inline-block'}}>Check Availability</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center'}}>
          <a href="/contact" style={{display:'inline-block',background:'#fff000',color:'#000',padding:'16px 40px',borderRadius:50,fontSize:18,fontWeight:700,textDecoration:'none'}}>Request Hotel Package</a>
        </div>
      </div>
    </div>
  );
}
