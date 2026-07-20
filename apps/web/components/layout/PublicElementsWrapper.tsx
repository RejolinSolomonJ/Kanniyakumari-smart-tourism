'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import AIAssistant from '../ai/AIAssistant'
import TamilLettersBackground from '../ui/TamilLettersBackground'

export default function PublicElementsWrapper() {
  const pathname = usePathname()

  // Do not show public UI elements (Navbar, Footer, etc.) on CRM/Admin dashboard routes
  if (pathname?.startsWith('/crm')) {
    return null
  }

  return (
    <>
      <TamilLettersBackground />
      <Navbar />
      <AIAssistant />
    </>
  )
}
