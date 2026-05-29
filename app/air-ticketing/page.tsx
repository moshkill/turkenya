export const dynamic = 'force-dynamic'
export default function AirTicketingPage() {
  const airlines = ['Kenya Airways','Emirates','Ethiopian Airlines','Qatar Airways','Turkish Airlines','RwandAir','Fly Dubai','British Airways','KLM','Lufthansa','Air Arabia','South African Airways']
  return (
    <main style={{background:'#0D0D0D',minHeight:'100vh'}}>
      <div style={{background:'#0D0D0D',padding:'140px 24px 80px',borderBottom:'1px solid rgba(255,240,0,0.15)',textAlign:'center'}}>
        <span style={{display:'inline-block',background:'#fff000',color:'#0D0D0D',fontSize:11,fontWeight:800,letterSpacing:4,padding:'6px 20px',borderRadius:2,marginBottom:24}}>AIR TICKETING</span>
        <h1 style={{color:'#fff',fontSize:'clamp(32px,5vw,60px)',fontWeight:900,margin:'0 0 16px',letterSpacing:'-1px'}}>Flight Tickets — All Airlines</h1>
        <p style={{color:'rgba(255,255,255,0.55)',fontSize:18,margin:0}}>IATA registered. Domestic, regional, and international. Best fares guaranteed.</p>
      </div>
      <div style={{maxWidth:1100,margin:'0 auto',padding:'80px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:32,marginBottom:80}}>
          {[
            {icon:'🏠',title:'Domestic Flights',desc:'Nairobi to Mombasa, Kisumu, Malindi, Lamu and all local routes.'},
            {icon:'🌍',title:'Regional Africa',desc:'Uganda, Tanzania, Rwanda, Ethiopia, South Africa and across the continent.'},
            {icon:'✈️',title:'International',desc:'Dubai, London, Istanbul, Doha, Amsterdam and 150+ global destinations.'},
            {icon:'👥',title:'Group Bookings',desc:'10+ passengers? We negotiate group fares and manage seat allocation.'},
          ].map((f) => (
            <div key={f.title} style={{background:'#111',padding:'32px 28px',borderBottom:'2px solid rgba(255,240,0,0.2)'}}>
              <div style={{fontSize:32,marginBottom:16}}>{f.icon}</div>
              <h3 style={{color:'#fff',fontSize:18,fontWeight:700,margin:'0 0 12px'}}>{f.title}</h3>
              <p style={{color:'rgba(255,255,255,0.55)',fontSize:14,lineHeight:1.8,margin:0}}>{f.desc}</p>
            </div>
          ))}
        </div>
        <h2 style={{color:'#fff000',fontSize:13,fontWeight:800,letterSpacing:3,marginBottom:24,textAlign:'center'}}>AIRLINES WE BOOK</h2>
        <div style={{display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center',marginBottom:80}}>
          {airlines.map((a) => (
            <span key={a} style={{border:'1px solid rgba(255,240,0,0.25)',color:'rgba(255,255,255,0.7)',padding:'8px 20px',fontSize:13,borderRadius:2}}>{a}</span>
          ))}
        </div>
        <div style={{textAlign:'center',padding:48,background:'#111',border:'1px solid rgba(255,240,0,0.2)',borderRadius:4}}>
          <h2 style={{color:'#fff',fontSize:28,fontWeight:800,marginBottom:16}}>Get Your Ticket Quote</h2>
          <p style={{color:'rgba(255,255,255,0.6)',marginBottom:32,fontSize:16}}>Share your route and travel dates — we respond within 2 hours.</p>
          <a href="/contact" style={{display:'inline-block',background:'#fff000',color:'#0D0D0D',padding:'16px 44px',fontWeight:800,fontSize:13,letterSpacing:3,textDecoration:'none',borderRadius:2}}>REQUEST A QUOTE</a>
        </div>
      </div>
    </main>
  )
}
