export const dynamic = 'force-dynamic';
export default function MedicalTourism() {
  const destinations = [
    {country:'India',specialty:'Cardiac, Oncology, Orthopedics',saving:'60-80% vs Kenya private',img:'photo-1524492412937-b28074a5d7da'},
    {country:'Thailand',specialty:'Cosmetic, Dental, IVF',saving:'50-70% vs Kenya private',img:'photo-1506905925346-21bda4d32df4'},
    {country:'Turkey',specialty:'Hair Transplant, Eye Surgery, Dental',saving:'40-65% vs Kenya private',img:'photo-1524231757912-21f4fe3a7200'},
    {country:'Egypt',specialty:'Fertility, Cosmetic Surgery',saving:'30-50% vs Kenya private',img:'photo-1541343672885-9be56236302a'},
  ];
  const services = ['Hospital Selection','Appointment Booking','Visa Assistance','Flight and Hotel','Airport Transfers','Translation Support','Post-Treatment Care','Insurance Guidance'];
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',color:'white',fontFamily:"'Abel',sans-serif"}}>
      <div style={{position:'relative',height:420,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',textAlign:'center',padding:'0 20px'}}>
        <img src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80&fit=crop" alt="Medical Tourism" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.25}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div style={{fontSize:14,color:'#fff000',letterSpacing:4,marginBottom:16}}>AFFORDABLE WORLD-CLASS HEALTHCARE</div>
          <h1 style={{fontSize:48,fontWeight:700,margin:'0 0 16px'}}>Medical Tourism</h1>
          <p style={{fontSize:20,opacity:0.8,maxWidth:600}}>Top-tier medical treatment abroad — we handle flights, accommodation, hospital liaison and transfers</p>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'60px 24px'}}>
        <h2 style={{fontSize:36,textAlign:'center',marginBottom:16}}>Popular Medical Destinations</h2>
        <p style={{textAlign:'center',opacity:0.7,fontSize:18,marginBottom:48}}>JCI-accredited hospitals, English-speaking doctors, significant cost savings</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:24,marginBottom:60}}>
          {destinations.map((d,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.05)',borderRadius:16,overflow:'hidden',border:'1px solid rgba(255,255,0,0.1)'}}>
              <img src={"https://images.unsplash.com/"+d.img+"?w=600&q=80&fit=crop"} alt={d.country} style={{width:'100%',height:200,objectFit:'cover'}}/>
              <div style={{padding:24}}>
                <h3 style={{fontSize:26,marginBottom:8}}>{d.country}</h3>
                <p style={{color:'#fff000',marginBottom:4}}>{d.specialty}</p>
                <p style={{opacity:0.7,marginBottom:16}}>Savings: {d.saving}</p>
                <a href="/contact" style={{background:'#fff000',color:'#000',padding:'10px 20px',borderRadius:8,fontWeight:700,textDecoration:'none',display:'inline-block'}}>Get Quote</a>
              </div>
            </div>
          ))}
        </div>
        <h2 style={{fontSize:32,textAlign:'center',marginBottom:32}}>What We Handle For You</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:16,marginBottom:48}}>
          {services.map((s,i)=>(
            <div key={i} style={{padding:20,background:'rgba(255,255,255,0.05)',borderRadius:12,textAlign:'center'}}>
              <div style={{color:'#fff000',fontSize:24,marginBottom:8}}>+</div>
              <div>{s}</div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center'}}>
          <a href="/contact" style={{display:'inline-block',background:'#fff000',color:'#000',padding:'16px 40px',borderRadius:50,fontSize:18,fontWeight:700,textDecoration:'none'}}>Start Your Medical Journey</a>
        </div>
      </div>
    </div>
  );
}
