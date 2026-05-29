export const dynamic = 'force-dynamic';
import HeroSlider from '@/components/HeroSlider';
import Link from 'next/link';

const services = [
  { title: 'Safari Tours', desc: 'Maasai Mara, Amboseli, Tsavo & Samburu — expertly curated game drives', img: 'photo-1516426122078-c23e76319801', href: '/safaris', tag: 'Most Popular' },
  { title: 'Air Ticketing', desc: 'IATA accredited — best fares on 30+ airlines worldwide', img: 'photo-1436491865332-7a61a109cc05', href: '/air-ticketing', tag: 'Corporate & Individual' },
  { title: 'Car Hire', desc: 'SUVs, saloons, buses & executive vehicles — self-drive or chauffeur', img: 'photo-1449965408869-eaa3f722e40d', href: '/car-rental', tag: '' },
  { title: 'Hotel Booking', desc: 'Budget to 5-star across Africa & beyond', img: 'photo-1611892440504-42a792e24d32', href: '/hotel-booking', tag: '' },
  { title: 'International Tours', desc: 'Dubai, Paris, Maldives, New York & more — fully packaged', img: 'photo-1512453979798-5ea266f8880c', href: '/international', tag: 'Trending' },
  { title: 'Pilgrimage Tours', desc: 'Israel, Turkey, Egypt, Rome & Umrah packages', img: 'photo-1591604129939-f1efa4d9f7fa', href: '/pilgrimage-tours', tag: '' },
  { title: 'Medical Tourism', desc: 'India, Thailand & Turkey at 60% savings', img: 'photo-1559757148-5c350d0d3c56', href: '/medical-tourism', tag: '' },
  { title: 'Conferences & MICE', desc: 'End-to-end corporate event management', img: 'photo-1540575467063-178a50c2df87', href: '/conferences', tag: 'Corporate' },
  { title: 'Airport Transfers', desc: 'Meet & greet — all Kenya airports 24/7', img: 'photo-1544620347-c4fd4a3d5957', href: '/airport-transfers', tag: '' },
  { title: 'Logistics & Cargo', desc: 'Reliable freight across East Africa', img: 'photo-1586528116311-ad8dd3c8310d', href: '/logistics', tag: '' },
];

const stats = [
  { value: '500+', label: 'Safaris Completed' },
  { value: '15+', label: 'Years in Business' },
  { value: 'IATA', label: 'Accredited Agency' },
  { value: '24/7', label: 'Customer Support' },
  { value: '50K+', label: 'Happy Travellers' },
];

const why = [
  { icon: '01', title: 'IATA Accredited', desc: 'Internationally certified — your flights and bookings are fully protected by global aviation standards.' },
  { icon: '02', title: 'Safari Specialists', desc: '15+ years crafting exceptional wildlife experiences across East Africa\'s finest reserves.' },
  { icon: '03', title: 'Best Price Guarantee', desc: 'We match or beat any comparable quote — transparent pricing with no hidden charges, ever.' },
  { icon: '04', title: '24/7 Support', desc: 'Our team is reachable around the clock, wherever in the world you are — by phone, email, or WhatsApp.' },
  { icon: '05', title: 'Global Network', desc: 'Partners and representation in 50+ countries for seamless travel coordination worldwide.' },
  { icon: '06', title: '500+ Happy Groups', desc: 'From solo travellers to 200-delegate corporate conferences — we deliver excellence at every scale.' },
];

const testimonials = [
  { name: 'Sarah M.', country: 'United Kingdom', text: 'Absolutely incredible. Turkenya handled everything from JKIA pickup to our final sunrise at the Mara. Not a single thing went wrong.', img: 'photo-1494790108377-be9c29b29330', service: 'Safari Tours' },
  { name: 'Ahmed K.', country: 'United Arab Emirates', text: 'Booked our Umrah package and it was flawless. Hotels were steps from the Haram, flights on time, the guide was wonderful.', img: 'photo-1507003211169-0a1dd7228f2d', service: 'Pilgrimage' },
  { name: 'Lisa & Tom B.', country: 'Germany', text: 'Our 10-day Kenya circuit was beyond what we imagined. The team was on call 24/7 and genuinely cared about every detail.', img: 'photo-1438761681033-6461ffad8d80', service: 'Safari Tours' },
  { name: 'Dr. R. Patel', country: 'India', text: 'Turkenya arranged my medical trip to Bangkok — hospital, hotel, flights, transfers. Saved 65% versus Kenya private rates.', img: 'photo-1472099645785-5658abf4ff4e', service: 'Medical Tourism' },
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

      {/* Stats Strip */}
      <div style={{ background: '#fff000' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '28px 40px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center', color: '#0D0D0D', padding: '4px 12px', flex: '1 1 auto', minWidth: 120 }}>
              <div style={{ fontSize: 'clamp(24px, 2.5vw, 36px)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 11, opacity: 0.55, marginTop: 6, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}>
          <div style={{ maxWidth: 600 }}>
            <SectionLabel text="What We Offer" />
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
              Everything You Need,<br />Under One Roof
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 16, maxWidth: 400, lineHeight: 1.7, margin: 0 }}>
            From game drives in the Mara to corporate travel for 200 — we handle every detail so you don&apos;t have to.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {services.map((sv, i) => (
            <Link
              key={i}
              href={sv.href}
              className="hover-lift"
              style={{
                textDecoration: 'none', color: 'white', display: 'block',
                borderRadius: 16, overflow: 'hidden', position: 'relative',
                height: 300,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <img
                src={`https://images.unsplash.com/${sv.img}?w=600&q=80&fit=crop`}
                alt={sv.title}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                className="service-img"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)' }} />
              {sv.tag && (
                <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
                  <span style={{ background: '#fff000', color: '#0D0D0D', fontSize: 10, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '5px 12px', borderRadius: 100 }}>
                    {sv.tag}
                  </span>
                </div>
              )}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 24px' }}>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>{sv.title}</h3>
                <p style={{ opacity: 0.6, fontSize: 14, lineHeight: 1.5, marginBottom: 14 }}>{sv.desc}</p>
                <span className="explore-link" style={{ color: '#fff000', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  Explore <span className="explore-arrow" style={{ fontSize: 16, transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', display: 'inline-block' }}>&#8594;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 72 }}>
            <div style={{ maxWidth: 500 }}>
              <SectionLabel text="Why Choose Us" />
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
                Trusted by Thousands<br />of Travellers
              </h2>
            </div>
            <Link href="/about" style={{ color: '#fff000', fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 0', borderBottom: '1.5px solid #fff000' }}>
              About Us <span>&#8594;</span>
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            {why.map((w, i) => (
              <div key={i} style={{ padding: '40px 36px', background: '#0a0a0a', display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: 'rgba(255,240,0,0.15)', lineHeight: 1, flexShrink: 0, fontFamily: "'Abel', sans-serif" }}>{w.icon}</div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>{w.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontSize: 15, margin: 0 }}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '120px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24, marginBottom: 60 }}>
          <div style={{ maxWidth: 500 }}>
            <SectionLabel text="Client Stories" />
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, lineHeight: 1.1, margin: 0 }}>
              What Our<br />Clients Say
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card-hover" style={{
              padding: '36px 32px', background: 'rgba(255,255,255,0.03)',
              borderRadius: 20, border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', flexDirection: 'column', gap: 24,
              transition: 'border-color 0.3s',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#fff000', fontSize: 16, letterSpacing: 3 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 600 }}>{t.service}</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: 15, fontStyle: 'italic', flex: 1, margin: 0 }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <img
                  src={`https://images.unsplash.com/${t.img}?w=100&h=100&fit=crop&crop=face`}
                  alt={t.name}
                  style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,240,0,0.3)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: 13, marginTop: 2 }}>{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IATA + Airlines */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.015)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '100px 40px' }}>

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
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              className="parallax-img"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.75) 100%)' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, width: 3, background: '#fff000' }} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 48, flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: 16, padding: '20px 28px', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                <img src="/logos/badges/iata_logoW.png" alt="IATA Accredited Agent" style={{ height: 56, width: 'auto', display: 'block' }} />
              </div>
              <div style={{ maxWidth: 500 }}>
                <h3 style={{ fontSize: 26, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.01em' }}>IATA Accredited Agent</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7, margin: 0 }}>
                  As an internationally certified IATA agent, every flight booking through Turkenya is fully protected.
                  We access wholesale fares across 30+ airlines — giving you the best prices with complete peace of mind.
                </p>
              </div>
            </div>
          </div>

          {/* Airline Logos Grid */}
          <div style={{ textAlign: 'center' }}>
            <SectionLabel text="Airline Partners" />
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>20+ Airline Partners Worldwide</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, maxWidth: 500, margin: '0 auto 56px' }}>
              Access the best fares across every major carrier — domestic, regional, and international
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
