export const dynamic = 'force-dynamic'

const dest = [
  {city:'Dubai',country:'UAE',days:'5D/4N',price:'From USD 1,200',img:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80&fit=crop',desc:'Burj Khalifa, desert safaris, world-class shopping, JBR beach and luxury brunches.'},
  {city:'Istanbul',country:'Turkey',days:'6D/5N',price:'From USD 1,100',img:'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80&fit=crop',desc:'Historic Old City, Bosphorus sunset cruise, Grand Bazaar, Hagia Sophia and Turkish cuisine.'},
  {city:'Zanzibar',country:'Tanzania',days:'4D/3N',price:'From USD 650',img:'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=600&q=80&fit=crop',desc:'Pristine white beaches, Spice Island tours, Stone Town heritage and dhow cruises.'},
  {city:'Bali',country:'Indonesia',days:'8D/7N',price:'From USD 1,800',img:'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80&fit=crop',desc:'Emerald rice terraces, ancient temples, world-class surf and luxury spa retreats.'},
  {city:'Maldives',country:'Maldives',days:'5D/4N',price:'From USD 2,500',img:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=80&fit=crop',desc:'Overwater bungalows, crystal-clear lagoons and total disconnection from the world.'},
  {city:'London',country:'UK',days:'7D/6N',price:'From USD 2,200',img:'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80&fit=crop',desc:'Buckingham Palace, West End shows, iconic museums and Thames river cruise.'},
]

export default function InternationalPage() {
  return (
    <main style={{background:'#0D0D0D',minHeight:'100vh'}}>
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .dest-card{transition:transform 0.3s,box-shadow 0.3s}
        .dest-card:hover{transform:translateY(-8px);box-shadow:0 24px 60px rgba(0,0,0,0.5)}
        .dest-card img{transition:transform 0.6s}
        .dest-card:hover img{transform:scale(1.06)}
      `}</style>

      <div style={{position:'relative',height:'55vh',minHeight:380,display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:56,overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,backgroundImage:'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80&fit=crop)',backgroundSize:'cover',backgroundPosition:'center'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(13,13,13,0.95))'}} />
        <div style={{position:'relative',textAlign:'center',animation:'fadeUp 0.8s ease'}}>
          <span style={{display:'inline-block',background:'#fff000',color:'#0D0D0D',fontSize:11,fontWeight:800,letterSpacing:4,padding:'6px 20px',borderRadius:100,marginBottom:20}}>INTERNATIONAL</span>
          <h1 style={{color:'#fff',fontSize:'clamp(28px,5vw,60px)',fontWeight:900,margin:'0 0 12px',letterSpacing:'-1px'}}>International Holiday Packages</h1>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:18,margin:0}}>Visa. Flights. Hotel. Transfers. You just pack.</p>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'72px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))',gap:24,marginBottom:80}}>
          {dest.map((d) => (
            <div key={d.city} className="dest-card" style={{background:'#111',borderRadius:8,overflow:'hidden',border:'1px solid rgba(255,255,255,0.05)'}}>
              <div style={{position:'relative',height:200,overflow:'hidden'}}>
                <img src={d.img} alt={d.city} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}} />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(transparent 40%,rgba(0,0,0,0.7))'}} />
                <div style={{position:'absolute',bottom:12,left:16,right:16,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
                  <div>
                    <div style={{color:'#fff',fontSize:22,fontWeight:900,lineHeight:1}}>{d.city}</div>
                    <div style={{color:'rgba(255,255,255,0.6)',fontSize:11,letterSpacing:2,textTransform:'uppercase'}}>{d.country}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{color:'#fff000',fontSize:13,fontWeight:800}}>{d.price}</div>
                    <div style={{color:'rgba(255,255,255,0.5)',fontSize:11}}>{d.days}</div>
                  </div>
                </div>
              </div>
              <div style={{padding:'20px 24px 28px'}}>
                <p style={{color:'rgba(255,255,255,0.6)',fontSize:14,lineHeight:1.8,margin:'0 0 20px'}}>{d.desc}</p>
                <a href="/contact" style={{display:'block',textAlign:'center',background:'#fff000',color:'#0D0D0D',padding:'12px',fontWeight:800,fontSize:12,letterSpacing:2,textDecoration:'none',borderRadius:4}}>BOOK PACKAGE</a>
              </div>
            </div>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:2}}>
          {[['Visa Assistance','Full guidance through the visa process for any destination'],['Flight Booking','Best fares on all airlines, all routes from Kenya'],['Curated Hotels','Hand-picked stays at every budget level'],['All Transfers','Airport pickups, hotel check-ins, seamless']].map(([t,d]) => (
            <div key={t} style={{padding:'32px 24px',background:'rgba(255,240,0,0.04)',border:'1px solid rgba(255,240,0,0.1)',textAlign:'center'}}>
              <h4 style={{color:'#fff000',fontSize:12,fontWeight:800,letterSpacing:2,margin:'0 0 12px',textTransform:'uppercase'}}>{t}</h4>
              <p style={{color:'rgba(255,255,255,0.55)',fontSize:13,lineHeight:1.7,margin:0}}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
