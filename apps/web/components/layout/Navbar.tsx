'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Search, ChevronDown, 
  MapPin, Ticket, Hotel,
  Sparkles, Phone, Compass, UtensilsCrossed,
  Church, Mountain, TreePine, Palette,
  Map as MapIcon, Bus, UserCheck, Car,
  Camera, Video, BookOpen, Download,
  Shield, Glasses, CloudSun, Star, Flag, ImageIcon
} from 'lucide-react'
import { useAuthStore, useUIStore } from '@/lib/auth'
import { cn } from '@/lib/utils'
import MobileNav from './MobileNav'

const navLinks = [
  {
    label: 'Explore',
    href: '/explore',
    icon: Compass,
    children: [
      { label: 'All Destinations', href: '/explore', icon: MapPin },
      { label: 'Interactive Map', href: '/explore?view=map', icon: MapIcon },
    ]
  },
  {
    label: 'Experiences',
    href: '#',
    icon: Sparkles,
    children: [
      { label: 'Food Trails', href: '/food', icon: UtensilsCrossed },
      { label: 'Religious Tours', href: '/religious', icon: Church },
      { label: 'Adventure', href: '/explore?category=ADVENTURE', icon: Mountain },
      { label: 'Cultural Programs', href: '/events', icon: Palette },
      { label: 'Wildlife Sanctuary', href: '/wildlife', icon: TreePine },
      { label: 'AR/VR Virtual Tours', href: '/ar-vr', icon: Glasses, badge: 'New' },
    ]
  },
  {
    label: 'Plan My Trip',
    href: '/plan',
    icon: MapIcon,
    children: [
      { label: 'AI Itinerary Planner', href: '/plan', icon: Sparkles },
      { label: 'Weather & Best Time', href: '/weather', icon: CloudSun },
      { label: 'Photo Spots Guide', href: '/photo-spots', icon: ImageIcon },
      { label: 'Compare Destinations', href: '/compare', icon: Compass },
      { label: 'Public Transport', href: '/transport', icon: Bus },
      { label: 'Guide Booking', href: '/guides', icon: UserCheck },
      { label: 'Rental Vehicles', href: '/rentals', icon: Car },
    ]
  },
  {
    label: 'Bookings',
    href: '/bookings/tickets',
    icon: Ticket,
    children: [
      { label: 'Book Tickets', href: '/bookings/tickets', icon: Ticket },
      { label: 'Book Hotels', href: '/bookings/hotels', icon: Hotel },
      { label: 'Book Guide', href: '/guides', icon: UserCheck },
    ]
  },
  {
    label: 'Stay',
    href: '/stay',
    icon: Hotel,
    children: [
      { label: 'All Accommodations', href: '/stay', icon: Hotel },
      { label: 'Government Hotels', href: '/stay?type=GOVERNMENT', icon: Shield },
      { label: 'Resorts', href: '/stay?type=RESORT', icon: Hotel },
      { label: 'Homestays', href: '/stay?type=HOMESTAY', icon: Hotel },
    ]
  },
  { label: 'Events', href: '/events', icon: Palette },
  {
    label: 'Gallery',
    href: '/gallery/photos',
    icon: Camera,
    children: [
      { label: 'Photo Gallery', href: '/gallery/photos', icon: Camera },
      { label: 'Video Gallery', href: '/gallery/videos', icon: Video },
    ]
  },
  { label: 'Blogs', href: '/blogs', icon: BookOpen },
  {
    label: 'More',
    href: '#',
    icon: Star,
    children: [
      { label: 'Tourist Reviews', href: '/reviews', icon: Star },
      { label: 'Report an Issue', href: '/report-issue', icon: Flag },
      { label: 'Downloads', href: '/downloads', icon: Download },
    ]
  },
]

// Only 4 core links shown in floating pill at top
const pillLinks = navLinks.filter(l => ['Explore', 'Experiences', 'Plan My Trip', 'Bookings'].includes(l.label))

function DropdownMenu({ children }: { children: any[] }) {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden py-2 z-50">
      {children.map((child: any) => (
        <Link
          key={child.label}
          href={child.href}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        >
          <child.icon className="w-4 h-4 opacity-60" />
          {child.label}
          {child.badge && (
            <span className="ml-auto text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">
              {child.badge}
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      if (!(window as any).google || !(window as any).google.translate) return
      const container = document.getElementById('google_translate_element')
      if (container) container.innerHTML = ''
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', includedLanguages: 'en,ta,hi,ml,fr,kn,ur', layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false },
        'google_translate_element'
      )
    }
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    } else {
      if ((window as any).google && (window as any).google.translate && (window as any).googleTranslateElementInit) {
        (window as any).googleTranslateElementInit()
      }
    }
  }, [])

  return (
    <>
      {/* ── TOP NAVBAR – full-width dark bar at top of page ── */}
      <AnimatePresence>
        {!scrolled && (
          <motion.header
            key="top-navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/15 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
          >
            <div className="container-wide">
              <div className="flex items-center justify-between h-16">

                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={closeMobileMenu}>
                  <img src="/images/logo.png" alt="Kanyakumari Tourism Logo" className="w-9 h-9 object-contain rounded-full bg-white p-0.5" />
                  <div className="hidden sm:block">
                    <p className="font-serif font-bold text-base leading-tight text-white">Kanyakumari</p>
                    <p className="text-[9px] tracking-widest uppercase text-white/50">Tourism</p>
                  </div>
                </Link>

                {/* Center: 4 core links */}
                <div className="hidden lg:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
                  {pillLinks.map((link) => (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                      >
                        {link.label}
                        {link.children && <ChevronDown className="w-3 h-3 opacity-50" />}
                      </Link>

                      <AnimatePresence>
                        {link.children && activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            transition={{ duration: 0.15 }}
                          >
                            <DropdownMenu children={link.children} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Right: Language + Login */}
                <div className="flex items-center gap-2">
                  <div id="google_translate_element" className="hidden sm:inline-block"></div>

                  {mounted ? (
                    isAuthenticated ? (
                      <div className="relative hidden md:block group">
                        <Link
                          href={['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? '/crm' : '/tourist'}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-all"
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-white/20 text-white">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="max-w-[100px] truncate">{user?.name || 'Profile'}</span>
                        </Link>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          <Link href={['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? '/crm' : '/tourist'} className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                            {['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? 'CRM Dashboard' : 'My Dashboard'}
                          </Link>
                          <button onClick={() => { logout(); window.location.href = '/' }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100">
                            Logout
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        className="hidden md:flex items-center px-5 py-2 rounded-full text-sm font-semibold bg-white text-slate-900 hover:bg-white/90 transition-all duration-300"
                      >
                        Login
                      </Link>
                    )
                  ) : (
                    <div className="hidden md:block w-[70px] h-[36px]" />
                  )}

                  {/* Mobile toggle */}
                  <button className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-all" onClick={toggleMobileMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>

              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* ── FULL NAVBAR – appears on scroll ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.header
            key="full-navbar"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-md"
          >
            <nav className="container-wide">
              <div className="flex items-center justify-between h-16 lg:h-[72px]">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={closeMobileMenu}>
                  <img src="/images/logo.png" alt="Kanyakumari Tourism Logo" className="w-10 h-10 object-contain rounded-full bg-white p-0.5" />
                  <div className="hidden sm:block">
                    <p className="font-serif font-bold text-lg leading-tight text-blue-800">Kanyakumari</p>
                    <p className="text-[10px] tracking-wider uppercase text-slate-500">Tourism</p>
                  </div>
                </Link>

                {/* All nav links */}
                <div className="hidden lg:flex items-center gap-0.5">
                  {navLinks.map((link) => (
                    <div
                      key={link.label}
                      className="relative"
                      onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={link.href}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200"
                      >
                        {link.label}
                        {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                      </Link>

                      <AnimatePresence>
                        {link.children && activeDropdown === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden py-2 z-50"
                          >
                            {link.children.map((child: any) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              >
                                <child.icon className="w-4 h-4 opacity-60" />
                                {child.label}
                                {child.badge && (
                                  <span className="ml-auto text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-medium">{child.badge}</span>
                                )}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Right actions */}
                <div className="flex items-center gap-2">
                  <Link href="/emergency" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 hover:bg-red-100 transition-all">
                    <Phone className="w-3.5 h-3.5" /> Emergency
                  </Link>

                  <button className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-all" aria-label="Search">
                    <Search className="w-5 h-5" />
                  </button>

                  <div id="google_translate_element" className="hidden sm:inline-block"></div>

                  {mounted ? (
                    isAuthenticated ? (
                      <div className="relative hidden md:block group">
                        <Link
                          href={['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? '/crm' : '/tourist'}
                          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all"
                        >
                          <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs bg-blue-100 text-blue-600">
                            {user?.name?.charAt(0) || 'U'}
                          </div>
                          <span className="max-w-[100px] truncate">{user?.name || 'Profile'}</span>
                        </Link>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                          <Link href={['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? '/crm' : '/tourist'} className="block px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                            {['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? 'CRM Dashboard' : 'My Dashboard'}
                          </Link>
                          <button onClick={() => { logout(); window.location.href = '/' }} className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100">
                            Logout
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link href="/login" className="hidden md:flex items-center px-5 py-2 rounded-full text-sm font-medium border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                        Login
                      </Link>
                    )
                  ) : (
                    <div className="hidden md:block w-[88px] h-[38px]" />
                  )}

                  <button className="lg:hidden p-2 rounded-full text-slate-700 hover:bg-slate-100 transition-all" onClick={toggleMobileMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} links={navLinks} />
    </>
  )
}
