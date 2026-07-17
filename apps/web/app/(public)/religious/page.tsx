'use client'

import { motion } from 'framer-motion'
import { Landmark, MapPin, Clock } from 'lucide-react'

const sites = [
  {
    name: 'Bhagavathi Amman Temple (Kanyakumari)',
    location: 'Beach Road, Kanyakumari',
    hours: '04:30 AM - 12:00 PM, 04:00 PM - 08:30 PM',
    description: 'An ancient temple dedicated to Goddess Kanyakumari. Known for its 3,000-year history and the diamond nose ring of the deity.',
    type: 'Temple'
  },
  {
    name: 'Suchindram Thanumalayan Temple',
    location: 'Suchindram (7 km from Nagercoil)',
    hours: '05:00 AM - 12:30 PM, 04:30 PM - 08:30 PM',
    description: 'Unique temple dedicated to Shiva, Vishnu, and Brahma represented as Sthanumalayan. Features musical pillars and a grand 18-foot Hanuman statue.',
    type: 'Temple'
  },
  {
    name: 'Our Lady of Ransom Church',
    location: 'Kanyakumari Beach Road',
    hours: '06:00 AM - 07:30 PM',
    description: 'Beautiful Gothic-style Catholic church overlooking the ocean, famous for its golden car procession in December.',
    type: 'Church'
  },
  {
    name: 'St. Francis Xavier Church',
    location: 'Kottar, Nagercoil',
    hours: '05:30 AM - 08:00 PM',
    description: 'A historic church built on the site where St. Francis Xavier lived and preached in the 1540s.',
    type: 'Church'
  }
]

export default function ReligiousToursPage() {
  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Religious Heritage Sites
          </h1>
          <p className="text-body-sm text-granite-500">
            Explore ancient temple architectures, spiritual pilgrimage centres, and historic churches of Kanyakumari.
          </p>
        </div>

        <div className="space-y-6">
          {sites.map((site, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row gap-5 items-start">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center flex-shrink-0">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-heading-sm text-granite-900">{site.name}</h3>
                  <span className="badge-gold bg-gold-50 text-gold-700 text-[10px] font-bold uppercase">{site.type}</span>
                </div>
                <p className="text-body-sm text-granite-600 leading-relaxed">{site.description}</p>
                <div className="flex flex-wrap gap-4 text-caption text-granite-400 font-semibold pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-ocean" /> {site.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold" /> {site.hours}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
