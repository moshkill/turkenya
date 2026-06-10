'use client'
import { usePathname } from 'next/navigation'

// Renders public-site chrome (header, footer, chat, cursor…) everywhere
// EXCEPT the /admin CRM, which is its own self-contained app shell.
export default function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return <>{children}</>
}
