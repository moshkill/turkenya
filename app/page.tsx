export const dynamic = 'force-dynamic';
import HeroSlider from '@/components/HeroSlider';
const services = [
  {title:'Safari Tours',desc:'Maasai Mara, Amboseli, Tsavo & Samburu',img:'photo-1516426122078-c23e76319801',href:'/safaris'},
  {title:'Air Ticketing',desc:'IATA accredited — best fares on 30+ airlines',img:'photo-1436491865332-7a61a109cc05',href:'/air-tickets'},
  {title:'Car Hire',desc:'SUVs, saloons, buses & executive vehicles',img:'photo-1449965408869-eaa3f722e40d',href:'/car-rental'},
  {title:'Hotel Booking',desc:'Budget to 5-star across Africa & beyond',img:'photo-1611892440504-42a792e24d32',href:'/hotel-booking'},
  {title:'International Tours',desc:'Dubai, Paris, Maldives, New York & more',img:'photo-1512453979798-5ea266f8880c',href:'/international'},
  {title:'Pilgrimage Tours',desc:'Israel, Turkey, Egypt, Rome & Umrah',img:'photo-1591604129939-f1efa4d9f7fa',href:'/pilgrimage-tours'},
  {title:'Medical Tourism',desc:'India, Thailand & Turkey at 60% savings',img:'photo-1559757148-5c350d0d3c56',href:'/medical-tourism'},
  {title:'Conferences & MICE',desc:'End-to-end event management',img:'photo-1540575467063-178a50c2df87',href:'/conferences'},
  {title:'Airport Transfers',desc:'Meet & greet — all Kenya airports 24/7',img:'photo-1544620347-c4fd4a3d5957',href:'/airport-transfers'},
  {title:'Logistics',desc:'Cargo & freight across East Africa',img:'photo-1586528116311-ad8dd3c8310d',href:'/logistics'},
];
const airlines = [
  'Kenya Airways','Emirates','Qatar Airways','Turkish Airlines','Ethiopian Airlines',
  'RwandAir','KLM','British Airways','Swiss Air','South African Airways',
  'Saudia','Gulf Air','Etihad Airways','Egypt Air','Brussels Airlines',
  'Air Kenya','Precision Air','African Express','Air Uganda','Air SafariLink',
];
const why = [
  {icon:'✈',t:'IATA Accredited',d:'Internationally certified — your flights and bookings are fully protected'},
  {icon:'🦁',t:'Safari Specialists',d:'15+ years crafting exceptional wildlife experiences across East Africa'},
  {icon:'💰',t:'Best Price Guarantee',d:'We match or beat any comparable quote — no hidden charges ever'},
  {icon:'🕐',t:'24/7 Support',d:'Our team is reachable around the clock wherever in the world you are'},
  {icon:'🌍',t:'Global Network',d:'Partners and representation in 50+ countries for seamless travel'},
  {icon:'⭐',t:'500+ Happy Groups',d:'From solo travellers to 200-delegate conferences — we deliver excellence'},
];
const testimonials = [
  {name:'Sarah M.',country:'United Kingdom',text:'Absolutely incredible. Turkenya handled everything from JKIA pickup to our final sunrise at the Mara. Not a single thing went wrong.',img:'photo-1494790108377-be9c29b29330'},
  {name:'Ahmed K.',country:'United Arab Emirates',text:'Booked our Umrah package and it was flawless. Hotels were steps from the Haram, flights on time, the guide was wonderful.',img:'photo-1507003211169-0a1dd7228f2d'},
  {name:'Lisa & Tom B.',country:'Germany',text:'Our 10-day Kenya circuit was beyond what we imagined. The team was on call 24/7 and genuinely cared about every detail.',img:'photo-1438761681033-6461ffad8d80'},
  {name:'Dr. R. Patel',country:'India',text:'Turkenya arranged my medical trip to Bangkok — hospital, hotel, flights, transfers. Saved 65% versus Kenya private rates.',img:'photo-1472099645785-5658abf4ff4e'},
];
export default function Home() {
  return (
    <div style={{background:'#0a0a0a',color:'white',fontFamily:"'Abel',sans-serif"}}>
      <HeroSlider/>
      <div style={{background:'#fff000',padding:'20px 24px'}}>
        <div style={{maxWidth:1100,margin:'0 auto',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:12}}>
          {[{n:'500+',l:'Safaris Completed'},{n:'15+',l:'Years in Business'},{n:'IATA',l:'Accredited Agency'},{n:'24/7',l:'Customer Support'},{n:'50K+',l:'Happy Travellers'}].map((s,i)=>(
            <div key={i} style={{textAlign:'center',color:'#000',padding:'8px 16px'}}>
              <div style={{fontSize:28,fontWeight:700,lineHeight:1}}>{s.n}</div>
              <div style={{fontSize:12,opacity:0.65,marginTop:4,letterSpacing:1}}>{s.l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'90px 24px 60px'}}>
        <div style={{textAlign:'center',marginBottom:60}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:16}}>
            <div style={{height:1,width:40,background:'#fff000'}}/>
            <span style={{color:'#fff000',fontSize:12,letterSpacing:4}}>WHAT WE OFFER</span>
            <div style={{height:1,width:40,background:'#fff000'}}/>
          </div>
          <h2 style={{fontSize:'clamp(30px,4vw,48px)',marginBottom:16,fontWeight:700}}>Our Services</h2>
          <p style={{opacity:0.5,fontSize:18,maxWidth:500,margin:'0 auto'}}>Everything you need for a perfect journey — under one roof</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
          {services.map((sv,i)=>(
            <a key={i} href={sv.href} style={{textDecoration:'none',color:'white',display:'block',borderRadius:16,overflow:'hidden',position:'relative',height:260,border:'1px solid rgba(255,255,255,0.06)'}}>
              <img src={'https://images.unsplash.com/'+sv.img+'?w=600&q=80&fit=crop'} alt={sv.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
              <div style={{position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.2) 60%,transparent 100%)'}}/>
              <div style={{position:'absolute',bottom:0,left:0,right:0,padding:24}}>
                <h3 style={{fontSize:20,fontWeight:700,marginBottom:6}}>{sv.title}</h3>
                <p style={{opacity:0.7,fontSize:14,marginBottom:10}}>{sv.desc}</p>
                <span style={{color:'#fff000',fontSize:13,fontWeight:600,letterSpacing:1}}>EXPLORE →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div style={{background:'rgba(255,255,255,0.02)',borderTop:'1px solid rgba(255,255,255,0.05)',borderBottom:'1px solid rgba(255,255,255,0.05)',padding:'90px 24px'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:60}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:16}}>
              <div style={{height:1,width:40,background:'#fff000'}}/>
              <span style={{color:'#fff000',fontSize:12,letterSpacing:4}}>WHY CHOOSE US</span>
              <div style={{height:1,width:40,background:'#fff000'}}/>
            </div>
            <h2 style={{fontSize:'clamp(30px,4vw,48px)',fontWeight:700}}>Trusted by Thousands of Travellers</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:20}}>
            {why.map((w,i)=>(
              <div key={i} style={{padding:32,background:'rgba(255,255,255,0.03)',borderRadius:16,border:'1px solid rgba(255,255,255,0.06)',display:'flex',gap:20,alignItems:'flex-start'}}>
                <div style={{fontSize:36,flexShrink:0,marginTop:4}}>{w.icon}</div>
                <div>
                  <h3 style={{fontSize:18,fontWeight:700,marginBottom:8}}>{w.t}</h3>
                  <p style={{opacity:0.55,lineHeight:1.6,fontSize:15}}>{w.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'90px 24px'}}>
        <div style={{textAlign:'center',marginBottom:60}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:16}}>
            <div style={{height:1,width:40,background:'#fff000'}}/>
            <span style={{color:'#fff000',fontSize:12,letterSpacing:4}}>CLIENT STORIES</span>
            <div style={{height:1,width:40,background:'#fff000'}}/>
          </div>
          <h2 style={{fontSize:'clamp(30px,4vw,48px)',fontWeight:700}}>What Our Clients Say</h2>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
          {testimonials.map((t,i)=>(
            <div key={i} style={{padding:32,background:'rgba(255,255,255,0.03)',borderRadius:16,border:'1px solid rgba(255,255,255,0.06)',display:'flex',flexDirection:'column',gap:20}}>
              <div style={{color:'#fff000',fontSize:18,letterSpacing:2}}>★★★★★</div>
              <p style={{opacity:0.8,lineHeight:1.75,fontSize:15,fontStyle:'italic',flex:1}}>&#34;{t.text}&#34;</p>
              <div style={{display:'flex',alignItems:'center',gap:14,paddingTop:20,borderTop:'1px solid rgba(255,255,255,0.08)'}}>
                <img src={'https://images.unsplash.com/'+t.img+'?w=100&h=100&fit=crop&crop=face'} alt={t.name} style={{width:46,height:46,borderRadius:'50%',objectFit:'cover',border:'2px solid #fff000'}}/>
                <div>
                  <div style={{fontWeight:700,fontSize:16}}>{t.name}</div>
                  <div style={{opacity:0.45,fontSize:13}}>{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:'rgba(255,255,255,0.02)',borderTop:'1px solid rgba(255,255,255,0.05)',padding:'80px 24px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',textAlign:'center'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:16}}>
            <div style={{height:1,width:40,background:'#fff000'}}/>
            <span style={{color:'#fff000',fontSize:12,letterSpacing:4}}>AIRLINE PARTNERS</span>
            <div style={{height:1,width:40,background:'#fff000'}}/>
          </div>
          <h2 style={{fontSize:'clamp(24px,3vw,40px)',fontWeight:700,marginBottom:12}}>20+ Airline Partners Worldwide</h2>
          <p style={{opacity:0.5,marginBottom:48,fontSize:16}}>IATA accredited — we access the best fares across every major carrier</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center'}}>
            {airlines.map((a,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:10,padding:'12px 22px',fontSize:14,fontWeight:600,letterSpacing:0.3}}>{a}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:'#fff000',padding:'90px 24px'}}>
        <div style={{maxWidth:800,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(30px,4vw,52px)',color:'#000',fontWeight:700,marginBottom:16,lineHeight:1.1}}>Ready to Start Your Journey?</h2>
          <p style={{color:'rgba(0,0,0,0.65)',fontSize:19,marginBottom:14}}>3rd Floor T-Mall, Nairobi West — Langata Road</p>
          <p style={{color:'rgba(0,0,0,0.65)',fontSize:17,marginBottom:40}}>+254 729 888 666 &nbsp;|&nbsp; +254 728 415 496 &nbsp;|&nbsp; +254 722 468 981 &nbsp;|&nbsp; info@turkenya.com</p>
          <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
            <a href='/contact' style={{background:'#000',color:'#fff000',padding:'17px 40px',borderRadius:50,fontSize:17,fontWeight:700,textDecoration:'none'}}>Send an Enquiry</a>
            <a href='https://wa.me/254729888666' style={{background:'rgba(0,0,0,0.08)',color:'#000',padding:'17px 40px',borderRadius:50,fontSize:17,fontWeight:700,textDecoration:'none',border:'2px solid rgba(0,0,0,0.25)'}}>WhatsApp Us</a>
          </div>
        </div>
      </div>
    </div>
  );
}
