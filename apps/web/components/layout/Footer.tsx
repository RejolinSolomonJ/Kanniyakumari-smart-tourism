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
    { label: 'Weather & Best Time', href: '/weather' },
    { label: 'Compare Destinations', href: '/compare' },
    { label: 'Hire Guide', href: '/guides' },
  ],
  discover: [
    { label: 'Events & Festivals', href: '/events' },
    { label: 'Food Trails', href: '/food' },
    { label: 'AR/VR Virtual Tours', href: '/ar-vr' },
    { label: 'Wildlife Sanctuary', href: '/wildlife' },
    { label: 'Photo Spots Guide', href: '/photo-spots' },
    { label: 'Photo Gallery', href: '/gallery/photos' },
  ],
  government: [
    { label: 'Downloads', href: '/downloads' },
    { label: 'Emergency Services', href: '/emergency' },
    { label: 'Report Infrastructure Issue', href: '/report-issue' },
    { label: 'Tourist Reviews', href: '/reviews' },
    { label: 'RTI', href: '/rti' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Accessibility', href: '/accessibility' },
  ],
}


export default function Footer() {
  return (
    <footer className="bg-granite-900 text-white">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/images/logo.png" 
                alt="Namma Kumari Logo" 
                className="w-12 h-12 object-contain rounded-full bg-white p-0.5"
              />
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
                <span>Department of Tourism, Government of Kanyakumari</span>
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
            <span>© {new Date().getFullYear()} Department of Tourism, Government of Kanyakumari</span>
          </div>


        </div>
      </div>
    </footer>
  )
}
