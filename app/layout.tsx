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
  title: { default: 'Turkenya Tours & Safaris | Creating Memories', template: '%s | Turkenya Tours & Safaris' },
  description: 'Premium tours, safaris, air ticketing, car hire and travel services in Kenya. IATA registered.',
  openGraph: { title: 'Turkenya Tours & Safaris | Creating Memories', description: 'Premium tours, safaris, air ticketing and travel services in Kenya since 2009.', url: 'https://turkenya.com', siteName: 'Turkenya Tours & Safaris', type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Turkenya Tours & Safaris | Creating Memories', description: 'Premium tours, safaris, air ticketing and travel services in Kenya since 2009.' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Abel&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Urbanist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
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
