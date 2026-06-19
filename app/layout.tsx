import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/ChatWidget'
import Loader from '@/components/Loader'
import AnimationProvider from '@/components/AnimationProvider'
import PageTransitionProvider from '@/components/PageTransition'
import MobileActionBar from '@/components/MobileActionBar'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import PublicOnly from '@/components/layout/PublicOnly'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://turkenya.com'),
  title: { default: 'Turkenya Tours & Safaris | Kenya Safaris, Cheap Flights & Travel Since 2009', template: '%s | Turkenya Tours & Safaris' },
  description: 'IATA-accredited Kenyan travel agency since 2009. Book Maasai Mara safaris, cheap flights from Nairobi, car hire, hotels, international tours, pilgrimage & corporate travel. Trusted by the diaspora.',
  keywords: ['Turkenya', 'Kenya travel agency', 'Maasai Mara safari', 'cheap flights Nairobi', 'IATA agent Kenya', 'car hire Kenya', 'Kenya safari packages', 'corporate travel Kenya', 'diaspora travel', 'KATA member'],
  applicationName: 'Turkenya Tours & Safaris',
  authors: [{ name: 'Turkenya Tours & Safaris' }],
  alternates: { canonical: '/' },
  openGraph: { title: 'Turkenya Tours & Safaris | Kenya Safaris, Flights & Travel Since 2009', description: 'IATA-accredited Kenyan travel agency since 2009 — safaris, cheap flights, car hire, hotels, international tours & corporate travel.', url: 'https://turkenya.com', siteName: 'Turkenya Tours & Safaris', locale: 'en_KE', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Turkenya Tours & Safaris', description: 'IATA-accredited Kenyan travel agency since 2009 — safaris, flights, car hire & more.' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

// Site-wide structured data — read by Google (Knowledge Panel / rich results)
// AND by answer engines like ChatGPT & Gemini to understand & cite the business.
const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': 'https://turkenya.com/#organization',
  name: 'Turkenya Tours & Safaris',
  alternateName: 'Turkenya Tours and Safaris Ltd',
  url: 'https://turkenya.com',
  logo: 'https://turkenya.com/logo.png',
  image: 'https://turkenya.com/logo.png',
  description: 'IATA-accredited Kenyan travel agency operating since 2009 — air ticketing, Maasai Mara & Kenya safari packages, car hire, hotel booking, international tours, pilgrimage tours, conferences/MICE and cargo logistics. Built for Kenyans and the diaspora (UK, US, UAE, Europe).',
  telephone: '+254722666644',
  email: 'info@turkenya.com',
  foundingDate: '2009',
  priceRange: '$$',
  currenciesAccepted: 'KES, USD',
  address: { '@type': 'PostalAddress', streetAddress: '3rd Floor, T-Mall, Langata Road, Nairobi West', addressLocality: 'Nairobi', addressRegion: 'Nairobi', addressCountry: 'KE' },
  areaServed: ['Kenya', 'United Kingdom', 'United States', 'United Arab Emirates', 'Europe'],
  contactPoint: { '@type': 'ContactPoint', telephone: '+254722666644', contactType: 'customer service', areaServed: 'KE', availableLanguage: ['en', 'sw'] },
  openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' }],
  memberOf: [{ '@type': 'Organization', name: 'IATA' }, { '@type': 'Organization', name: 'Kenya Association of Travel Agents (KATA)' }],
  knowsAbout: ['Kenya safaris', 'Maasai Mara', 'Amboseli', 'air ticketing', 'flight booking', 'car hire', 'hotel booking', 'international holidays', 'pilgrimage tours', 'corporate travel', 'cargo logistics'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Abel&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Urbanist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body style={{ margin:0, padding:0, background:'#0D0D0D', color:'#fff', fontFamily:"'Abel', system-ui, sans-serif", fontSize:18 }}>
        <AnimationProvider />
        <PublicOnly>
          <Loader />
          <ScrollProgress />
          <CustomCursor />
          <Header />
        </PublicOnly>
        <PageTransitionProvider>
          <div>{children}</div>
        </PageTransitionProvider>
        <PublicOnly>
          <Footer />
          <ChatWidget/>
          <MobileActionBar />
        </PublicOnly>
      </body>
    </html>
  )
}
