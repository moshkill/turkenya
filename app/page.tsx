export const dynamic = 'force-dynamic';
import HeroSlider from '@/components/HeroSlider';
import Testimonials from '@/components/Testimonials';
import BentoServices from '@/components/BentoServices';
import HeroAsk from '@/components/HeroAsk';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Turkenya Tours & Safaris | Kenya Safari Packages, Air Tickets & Travel',
  description: 'Kenya\'s trusted IATA-accredited travel agency. Book safari packages, cheap flights from Nairobi, car hire, hotel reservations & international tours. Based in Nairobi since 2009.',
}

const stats = [
  { value: '471', label: 'Flights / Month' },
  { value: '2009', label: 'Trusted Since' },
  { value: 'IATA', label: 'Accredited Agent' },
  { value: '300+', label: 'Safaris / Year' },
  { value: '24/7', label: 'WhatsApp Support' },
];

const why = [
  { icon: '01', title: 'IATA Accredited Agent', desc: 'We are a licensed IATA agent — your flight tickets are issued directly, fully protected, and refundable under international aviation rules.' },
  { icon: '02', title: 'Kenya Safari Experts', desc: '15+ years organising game drives in Maasai Mara, Amboseli, Tsavo, Samburu and Lake Nakuru. We know every camp, every route, every season.' },
  { icon: '03', title: 'Best Price — Guaranteed', desc: 'We access wholesale airline fares and negotiate hotel rates you won\'t find online. Send us any quote — we\'ll match or beat it.' },
  { icon: '04', title: '24/7 WhatsApp Support', desc: 'Reach our team anytime on +254 722 666 644. Flight delayed at midnight? We rebook you before you finish your coffee.' },
  { icon: '05', title: 'Trusted by Corporates', desc: 'We manage travel for companies sending 50-200 employees — flight bookings, hotel blocks, visa processing, and itinerary coordination.' },
  { icon: '06', title: 'Diaspora-Friendly', desc: 'Booking from the UK, US, UAE or Europe? We handle everything in Kenya for you — airport pickup, safaris, car hire, hotels. Just land and enjoy.' },
];


const airlines = [
  { name: 'Kenya Airways', logo: '/logos/airlines/kenya-airways-logo.png' },
  { name: 'Emirates', logo: '/logos/airlines/emirates-logo.png' },
  { name: 'Qatar Airways', logo: '/logos/airlines/qatar-airways-logo.png' },
  { name: 'Turkish Airlines', logo: '/logos/airlines/turkish-airlines-logog.png' },
  { name: 'Ethiopian Airlines', logo: '/logos/airlines/ethiopian-airlines-logo.png' },
  { name: 'RwandAir', logo: '/logos/airlines/rwanda-air-logo.png' },
  { name: 'KLM', logo: '/logos/airlines/klm-logo.jpg' },
  { name: 'British Airways', logo: '/logos/airlines/british-airways-logo.jpg' },
  { name: 'Swiss Air', logo: '/logos/airlines/swiss-air-logo.png' },
  { name: 'South African Airways', logo: '/logos/airlines/south-african-airways-logo.jpg' },
  { name: 'Saudia', logo: '/logos/airlines/saudia-logo.png' },
  { name: 'Gulf Air', logo: '/logos/airlines/gulf-air-logo.png' },
  { name: 'Etihad Airways', logo: '/logos/airlines/etihad-airways-logo.png' },
  { name: 'Egypt Air', logo: '/logos/airlines/egypt-air-logo.png' },
  { name: 'Brussels Airlines', logo: '/logos/airlines/brussels-logo.png' },
  { name: 'Fly 540', logo: '/logos/airlines/air-Fly-540_logo-1.png' },
  { name: 'Air Kenya', logo: '/logos/airlines/air-kenya-logo.png' },
  { name: 'Precision Air', logo: '/logos/airlines/precision-air-logo.png' },
  { name: 'African Express', logo: '/logos/airlines/african-express-logo.png' },
  { name: 'Air SafariLink', logo: '/logos/airlines/air-safarilink-logo.jpg' },
];

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
      <div style={{ height: 1, width: 32, background: '#fff000' }} />
      <span style={{ color: '#fff000', fontSize: 11, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a', color: 'white' }}>
      <HeroSlider />

      {/* Stats Strip — Glassmorphism */}
      <div style={{ position: 'relative', marginTop: -48, zIndex: 5, padding: '0 24px' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          background: 'rgba(255,240,0,0.04)',
          backdropFilter: 'blur(4px) saturate(150%)', WebkitBackdropFilter: 'blur(4px) saturate(150%)',
          border: '1px solid rgba(255,240,0,0.1)',
          borderRadius: 20, padding: '0 20px',
          display: 'flex', flexWrap: 'wrap',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              flex: '1 1 140px', minWidth: 0, padding: '28px 16px', textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div style={{ fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', fontFamily: "'Urbanist', sans-serif", color: 'rgb(235,235,235)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 8, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Plan in one line — conversational quick-ask */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px 0' }}>
        <div style={{ maxWidth: 760 }}>
          <SectionLabel text="Plan in one line" />
          <h2 style={{ fontSize: 'clamp(30px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: '0 0 12px' }}>
            Where are we heading?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.7, margin: '0 0 28px', maxWidth: 560 }}>
            Flights, safaris, corporate travel, car hire or cargo — describe your trip and we build the booking for you. No forms to hunt through.
          </p>
          <HeroAsk />
        </div>
      </section>

      {/* Bento Services */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '90px 40px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <div style={{ maxWidth: 600 }}>
            <SectionLabel text="What We Do" />
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
              Everything, One Team
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
            Sized by what our clients book most — air ticketing and corporate travel lead the way.
          </p>
        </div>

        <BentoServices />
      </section>

      {/* Parallax Divider — Safari */}
      <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&fit=crop" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-20%', width: '100%', height: '140%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.7) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
          <div>
            <p style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 600, color: 'rgba(255,255,255,0.9)', maxWidth: 700, margin: '0 auto', lineHeight: 1.6, fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
              &ldquo;Creating memories across East Africa — one journey at a time&rdquo;
            </p>
            <div style={{ marginTop: 20, fontSize: 14, color: '#fff000', letterSpacing: 3, fontWeight: 700, textTransform: 'uppercase' }}>Since 2009</div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 72 }}>
            <div style={{ maxWidth: 500 }}>
              <SectionLabel text="Why Turkenya" />
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
                Why Thousands Trust<br />Us With Their Travel
              </h2>
            </div>
            <Link href="/about" style={{ color: '#fff000', fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 0', borderBottom: '1.5px solid #fff000' }}>
              About Us <span>&#8594;</span>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 380px), 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {why.map((w, i) => (
              <div key={i} style={{ padding: '40px 36px', background: '#0a0a0a', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'rgba(255,240,0,0.32)', lineHeight: 1, flexShrink: 0, fontFamily: "'Urbanist', sans-serif" }}>{w.icon}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.01em' }}>{w.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 16, margin: 0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Parallax Divider — Airplane */}
      <div style={{ position: 'relative', height: 350, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80&fit=crop" alt="" className="parallax-img" style={{ position: 'absolute', inset: '-20%', width: '100%', height: '140%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 40px' }}>
          <div>
            <div style={{ fontSize: 11, color: '#fff000', letterSpacing: 5, fontWeight: 700, textTransform: 'uppercase', marginBottom: 16 }}>IATA Accredited Since 2009</div>
            <p style={{ fontSize: 'clamp(24px, 3vw, 42px)', fontWeight: 800, color: '#fff', maxWidth: 600, margin: '0 auto', lineHeight: 1.2, fontFamily: "'Urbanist', sans-serif" }}>
              Your Trusted Flight Partner in Kenya
            </p>
          </div>
        </div>
      </div>

      {/* IATA + Airlines */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '140px 40px' }}>

          {/* IATA Badge Feature */}
          <div style={{
            position: 'relative', overflow: 'hidden',
            display: 'flex', alignItems: 'center', gap: 48,
            flexWrap: 'wrap', marginBottom: 80, padding: '56px 48px',
            borderRadius: 20, minHeight: 220,
          }}>
            <img
              src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&fit=crop"
              alt="" aria-hidden="true"
              style={{ position: 'absolute', top: '-25%', left: 0, width: '100%', height: '150%', objectFit: 'cover' }}
              className="parallax-img"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.75) 100%)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 3, background: '#fff000' }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '20px 28px', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/logos/badges/iata_logoW.png" alt="IATA Accredited Agent" style={{ height: 56, width: 'auto', display: 'block' }} />
              </div>
              <div style={{ maxWidth: 500 }}>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.01em' }}>IATA Accredited — Nairobi</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                  Turkenya is a licensed IATA agent based in Nairobi. We issue tickets directly on Kenya Airways, Jambojet, Emirates, Qatar Airways, and 30+ carriers — at wholesale fares the public can&apos;t access. Every booking is fully protected.
                </p>
              </div>
            </div>
          </div>

          {/* Airline Logos Grid */}
          <div style={{ textAlign: 'center' }}>
            <SectionLabel text="Airlines We Book" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>Domestic, Regional &amp; International Flights</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, maxWidth: 560, margin: '0 auto 56px' }}>
              Jambojet to Mombasa, Kenya Airways to London, Emirates to Dubai — we book them all at the best fares
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12,
              maxWidth: 1000, margin: '0 auto',
            }}>
              {airlines.map((a, i) => (
                <div key={i} className="airline-chip" style={{
                  background: '#ffffff', border: '1px solid rgba(0,0,0,0.08)',
                  borderRadius: 12, padding: '20px 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)', minHeight: 70,
                  cursor: 'default',
                }}>
                  <img
                    src={a.logo} alt={a.name}
                    style={{ maxHeight: 36, maxWidth: '100%', objectFit: 'contain', transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
