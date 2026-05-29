export const dynamic = 'force-dynamic';
export default function Conferences() {
  const services = [
    {title:'Venue Sourcing',desc:'Best conference venues across East Africa and internationally',icon:'🏛'},
    {title:'Delegate Travel',desc:'Group air tickets, hotel blocks and airport transfers for all delegates',icon:'✈'},
    {title:'Team Building',desc:'Safari experiences, cultural tours and networking activities',icon:'🤝'},
    {title:'Audio-Visual Setup',desc:'Professional AV equipment, live streaming, interpretation booths',icon:'🎬'},
    {title:'Catering and Events',desc:'Full catering coordination, gala dinners, cocktail receptions',icon:'🍽'},
    {title:'Post-Conference Tours',desc:'Optional safari or beach extensions for international delegates',icon:'🌍'},
  ];
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'white',fontFamily:"'Abel',sans-serif"}}>
      <div style={{position:'relative',height:420,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center',padding:'0 20px'}}>
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80&fit=crop" alt="Conferences" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.3}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:14,color:'#fff000',letterSpacing:4,marginBottom:16}}>END-TO-END EVENT MANAGEMENT</div>
          <h1 style={{fontSize:48,fontWeight:700,margin:'0 0 16px'}}>Conferences and MICE</h1>
          <p style={{fontSize:20,opacity:0.8,maxWidth:600}}>Meetings, Incentives, Conferences and Exhibitions — fully managed by our expert events team</p>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 24px'}}>
        <h2 style={{fontSize:36,textAlign:'center',marginBottom:16}}>Our Conference Services</h2>
        <p style={{textAlign:'center',opacity:0.7,fontSize:18,marginBottom:48}}>We handle everything so your event runs flawlessly</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24,marginBottom:60}}>
          {services.map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.05)',borderRadius:16,padding:32,border:'1px solid rgba(255,255,0,0.1)'}}>
              <div style={{fontSize:40,marginBottom:16}}>{s.icon}</div>
              <h3 style={{fontSize:22,marginBottom:8}}>{s.title}</h3>
              <p style={{opacity:0.7,lineHeight:1.6}}>{s.desc}</p>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(255,255,0,0.05)',border:'1px solid rgba(255,255,0,0.3)',borderRadius:20,padding:40,textAlign:'center'}}>
          <h2 style={{fontSize:32,marginBottom:16}}>Plan Your Next Event With Us</h2>
          <p style={{opacity:0.7,fontSize:18,marginBottom:32}}>From 10-person board retreats to 1,000-delegate international conferences</p>
          <a href="/contact" style={{display:'inline-block',background:'#fff000',color:'#000',padding:'16px 40px',borderRadius:50,fontSize:18,fontWeight:700,textDecoration:'none'}}>Request Proposal</a>
        </div>
      </div>
    </div>
  );
}
