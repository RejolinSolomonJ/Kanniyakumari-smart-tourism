import Link from 'next/link'
import { 
  MapPin, Phone, Mail, Globe
} from 'lucide-react'

const footerLinks = {
  explore: [
    { label: 'All Destinations', href: '/explore' },
    { label: 'Beaches', href: '/explore?category=BEACH' },
    { label: 'Temples', href: '/explore?category=TEMPLE' },
    { label: 'Heritage Sites', href: '/explore?category=HERITAGE' },
    { label: 'Waterfalls', href: '/explore?category=WATERFALL' },
    { label: 'Museums', href: '/explore?category=MUSEUM' },
  ],
  plan: [
    { label: 'AI Trip Planner', href: '/plan' },
    { label: 'Book Tickets', href: '/bookings/tickets' },
    { label: 'Find Hotels', href: '/stay' },
    { label: 'Hire Guide', href: '/guides' },
    { label: 'Transport', href: '/transport' },
    { label: 'Rentals', href: '/rentals' },
  ],
  discover: [
    { label: 'Events & Festivals', href: '/events' },
    { label: 'Food Trails', href: '/food' },
    { label: 'Photo Gallery', href: '/gallery/photos' },
    { label: 'Video Gallery', href: '/gallery/videos' },
    { label: 'Travel Blogs', href: '/blogs' },
    { label: 'Religious Sites', href: '/religious' },
  ],
  government: [
    { label: 'Downloads', href: '/downloads' },
    { label: 'Emergency Services', href: '/emergency' },
    { label: 'Report Issue', href: '/emergency' },
    { label: 'RTI', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Accessibility', href: '#' },
  ],
}

const socialLinks = [
  { 
    svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>, 
    href: '#', 
    label: 'Facebook' 
  },
  { 
    svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>, 
    href: '#', 
    label: 'Twitter' 
  },
  { 
    svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 4-8 4z"/></svg>, 
    href: '#', 
    label: 'YouTube' 
  },
  { 
    svg: <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>, 
    href: '#', 
    label: 'Instagram' 
  }
]

export default function Footer() {
  return (
    <footer className="bg-granite-900 text-white">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-ocean flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">K</span>
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl">Kanyakumari</h3>
                <p className="text-caption text-granite-400">Tourism Portal</p>
              </div>
            </div>
            <p className="text-body-sm text-granite-400 mb-6 max-w-sm leading-relaxed">
              The Southern Gateway of Incredible India. Where the Bay of Bengal, 
              Indian Ocean, and Arabian Sea converge — a land of divine beauty, 
              ancient heritage, and warm hospitality.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-body-sm">
              <div className="flex items-start gap-3 text-granite-400">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-gold" />
                <span>Department of Tourism, Government of Tamil Nadu, Kanyakumari District</span>
              </div>
              <div className="flex items-center gap-3 text-granite-400">
                <Phone className="w-4 h-4 flex-shrink-0 text-gold" />
                <a href="tel:04652246276" className="hover:text-white transition-colors">04652-246276</a>
              </div>
              <div className="flex items-center gap-3 text-granite-400">
                <Mail className="w-4 h-4 flex-shrink-0 text-gold" />
                <a href="mailto:info@kanyakumaritourism.org" className="hover:text-white transition-colors">
                  info@kanyakumaritourism.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-granite-400">
                <Globe className="w-4 h-4 flex-shrink-0 text-gold" />
                <a href="#" className="hover:text-white transition-colors">www.kanyakumaritourism.org</a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="font-semibold text-body mb-4 text-white">Explore</h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-granite-400 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-body mb-4 text-white">Plan & Book</h4>
            <ul className="space-y-2.5">
              {footerLinks.plan.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-granite-400 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-body mb-4 text-white">Discover</h4>
            <ul className="space-y-2.5">
              {footerLinks.discover.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body-sm text-granite-400 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-body mb-4 text-white">Government</h4>
            <ul className="space-y-2.5">
              {footerLinks.government.map(link => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="text-body-sm text-granite-400 hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-granite-800">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-caption text-granite-500">
            <span>© {new Date().getFullYear()} Department of Tourism, Government of Tamil Nadu</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Developed under Digital India Initiative</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map(social => (
              <a
                key={social.label}
                href={social.href}
                className="w-9 h-9 rounded-full bg-granite-800 flex items-center justify-center text-granite-400 hover:bg-ocean hover:text-white transition-all duration-300"
                aria-label={social.label}
              >
                {social.svg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
