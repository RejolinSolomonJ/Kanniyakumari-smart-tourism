'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function PublicFooterWrapper() {
  const pathname = usePathname()

  if (pathname?.startsWith('/crm')) {
    return null
  }

  return <Footer />
}
