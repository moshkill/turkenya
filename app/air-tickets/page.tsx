export const dynamic = 'force-dynamic';
export default function AirTickets() {
  const airlines = [
    {name:'Kenya Airways',routes:'NBO to 50+ destinations',img:'photo-1436491865332-7a61a109cc05'},
    {name:'Ethiopian Airlines',routes:'ADD to 120+ destinations',img:'photo-1569154941061-e231b4aa8eda'},
    {name:'Emirates',routes:'DXB worldwide hub',img:'photo-1556388158-158ea5ccacbd'},
    {name:'Qatar Airways',routes:'DOH to 160+ cities',img:'photo-1436491865332-7a61a109cc05'},
    {name:'Turkish Airlines',routes:'IST to 300+ cities',img:'photo-1569154941061-e231b4aa8eda'},
    {name:'RwandAir',routes:'KGL hub, Africa beyond',img:'photo-1556388158-158ea5ccacbd'},
  ];
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'white',fontFamily:"'Abel',sans-serif"}}>
      <div style={{position:'relative',height:400,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center',padding:'0 20px'}}>
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80&fit=crop" alt="Flights" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.3}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:14,color:'#fff000',letterSpacing:4,marginBottom:16}}>IATA ACCREDITED AGENCY</div>
          <h1 style={{fontSize:48,fontWeight:700,margin:'0 0 16px'}}>Air Ticket Booking</h1>
          <p style={{fontSize:20,opacity:0.8,maxWidth:600}}>Best fares on all major airlines — domestic, regional and international flights from Kenya</p>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:24,marginBottom:60}}>
          {airlines.map((a,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.05)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,0,0.1)'}}>
              <img src={"https://images.unsplash.com/"+a.img+"?w=600&q=80&fit=crop"} alt={a.name} style={{width:'100%',height:180,objectFit:'cover'}}/>
              <div style={{padding:24}}>
                <h3 style={{fontSize:22,marginBottom:8}}>{a.name}</h3>
                <p style={{opacity:0.7,marginBottom:16}}>{a.routes}</p>
                <a href="/contact" style={{background:'#fff000',color:'#000',padding:'10px 20px',borderRadius:8,fontWeight:700,textDecoration:'none',display:'inline-block'}}>Get Quote</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(255,255,0,0.05)',border:'1px solid rgba(255,255,0,0.3)',borderRadius:20,padding:40,textAlign:'center'}}>
          <h2 style={{fontSize:32,marginBottom:32}}>Why Book With Us?</h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:20}}>
            {['Best Fare Guarantee','IATA Accredited','Group Discounts','24/7 Support','Flexible Changes','Corporate Accounts'].map((f,i)=>(
              <div key={i} style={{padding:20,background:'rgba(255,255,255,0.05)',borderRadius:12}}>
                <div style={{fontSize:28,marginBottom:8}}>✈</div>
                <div>{f}</div>
              </div>
            ))}
          </div>
          <a href="/contact" style={{display:'inline-block',marginTop:32,background:'#fff000',color:'#000',padding:'16px 40px',borderRadius:50,fontSize:18,fontWeight:700,textDecoration:'none'}}>Book Your Flight</a>
        </div>
      </div>
    </div>
  );
}
