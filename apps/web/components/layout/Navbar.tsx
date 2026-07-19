'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Search, Globe, ChevronDown, 
  MapPin, Ticket, Hotel, AlertTriangle, 
  Sparkles, Phone, Compass, UtensilsCrossed,
  Church, Mountain, TreePine, Palette,
  Map as MapIcon, Bus, UserCheck, Car,
  Camera, Video, BookOpen, Download,
  Shield, Glasses, CloudSun, Star, Flag, ImageIcon, User
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Define the translation element init function
    (window as any).googleTranslateElementInit = () => {
      if (!(window as any).google || !(window as any).google.translate) {
        return // Prevent crash if script isn't fully compiled yet
      }
      const container = document.getElementById('google_translate_element')
      if (container) {
        container.innerHTML = '' // Clear duplicate widgets in React Strict Mode
      }
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,ta,hi,ml,fr,kn,ur', // English, Tamil, Hindi, Malayalam, French, Kannada, Urdu
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      )
    }

    // Load Google Translate script dynamically (preventing duplicates)
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script')
      script.id = 'google-translate-script'
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    } else {
      // If script is already loaded, initialize manually only if Google Translate is ready
      if ((window as any).google && (window as any).google.translate && (window as any).googleTranslateElementInit) {
        (window as any).googleTranslateElementInit()
      }
    }
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-nav'
            : 'bg-transparent'
        )}
      >


        {/* Main Navbar */}
        <nav className="container-wide">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0" onClick={closeMobileMenu}>
              <img 
                src="/images/logo.png" 
                alt="Namma Kumari Logo" 
                className="w-10 h-10 object-contain rounded-full bg-white p-0.5"
              />
              <div className="hidden sm:block">
                <h1 className={cn(
                  'font-serif font-bold text-lg leading-tight transition-colors',
                  scrolled ? 'text-ocean' : 'text-white'
                )}>
                  Kanyakumari
                </h1>
                <p className={cn(
                  'text-[10px] tracking-wider uppercase transition-colors',
                  scrolled ? 'text-granite-500' : 'text-white/70'
                )}>
                  Tourism
                </p>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 rounded-lg text-body-sm font-medium transition-all duration-200',
                      scrolled
                        ? 'text-granite-700 hover:text-ocean hover:bg-ocean-50'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {link.label}
                    {link.children && <ChevronDown className="w-3.5 h-3.5 opacity-60" />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-granite-100 overflow-hidden py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-body-sm text-granite-700 hover:bg-ocean-50 hover:text-ocean transition-colors"
                          >
                            <child.icon className="w-4 h-4 opacity-60" />
                            {child.label}
                            {'badge' in child && (
                              <span className="ml-auto text-[10px] bg-sunset-50 text-sunset-600 px-2 py-0.5 rounded-full font-medium">
                                {(child as { badge: string }).badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Emergency Button */}
              <Link
                href="/emergency"
                className={cn(
                  'hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-caption font-semibold transition-all',
                  scrolled
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-red-600/20 text-red-300 hover:bg-red-600/30 backdrop-blur-sm border border-red-400/30'
                )}
              >
                <Phone className="w-3.5 h-3.5" />
                Emergency
              </Link>

              {/* Search */}
              <button
                className={cn(
                  'p-2 rounded-full transition-all duration-200',
                  scrolled
                    ? 'text-granite-600 hover:bg-granite-100'
                    : 'text-white/80 hover:bg-white/10'
                )}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Toggle with Google Translate */}
              <div id="google_translate_element" className="hidden sm:inline-block"></div>

              {/* Profile / Login */}
              {mounted ? (
                isAuthenticated ? (
                  <div className="relative hidden md:block group">
                    <Link
                      href={['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? '/crm' : '/tourist'}
                      className={cn(
                        'flex items-center gap-2 px-4 py-2 rounded-full text-body-sm font-medium transition-all duration-300',
                        scrolled
                          ? 'border-2 border-ocean text-ocean hover:bg-ocean-50'
                          : 'border border-white/40 text-white hover:bg-white/10'
                      )}
                    >
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs",
                        scrolled ? "bg-ocean/10 text-ocean" : "bg-white/20 text-white"
                      )}>
                        {user?.name?.charAt(0) || 'U'}
                      </div>
                      <span className="max-w-[100px] truncate">{user?.name || 'Profile'}</span>
                    </Link>
                    {/* Dropdown */}
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-granite-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <Link 
                        href={['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? '/crm' : '/tourist'} 
                        className="block px-4 py-3 text-sm text-granite-700 hover:bg-ocean-50 hover:text-ocean transition-colors"
                      >
                        {['COLLECTOR', 'TOURISM_OFFICER', 'SITE_MANAGER', 'SUPER_ADMIN'].includes(user?.role || '') ? 'CRM Dashboard' : 'My Dashboard'}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          window.location.href = '/';
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-granite-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className={cn(
                      'hidden md:flex items-center px-5 py-2 rounded-full text-body-sm font-medium transition-all duration-300',
                      scrolled
                        ? 'border-2 border-ocean text-ocean hover:bg-ocean hover:text-white'
                        : 'border border-white/40 text-white hover:bg-white/10'
                    )}
                  >
                    Login
                  </Link>
                )
              ) : (
                <div className="hidden md:block w-[88px] h-[38px]"></div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                className={cn(
                  'lg:hidden p-2 rounded-full transition-all',
                  scrolled
                    ? 'text-granite-700 hover:bg-granite-100'
                    : 'text-white hover:bg-white/10'
                )}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileMenuOpen} onClose={closeMobileMenu} links={navLinks} />
    </>
  )
}
