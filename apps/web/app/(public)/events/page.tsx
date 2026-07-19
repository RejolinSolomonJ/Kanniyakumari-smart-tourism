'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Tag } from 'lucide-react'
import { events as allEvents } from '@/lib/data'

const mockEvents = [
  {
    id: '1',
    titleEn: 'Cape Festival 2026',
    titleTa: 'கேப் திருவிழா 2026',
    type: 'CULTURAL',
    venue: 'Kanyakumari Beach Open Air Stage',
    startDate: '2026-10-15',
    endDate: '2026-10-17',
    image: '/images/Cape Festival.jpg',
    descriptionEn: 'Organized by the Department of Tourism, Tamil Nadu. Showcases regional culture with music concerts and dance performances.',
    isGovernment: true
  },
  {
    id: '2',
    titleEn: 'Margazhi Temple Car Festival',
    titleTa: 'மார்கழி தேர்த்திருவிழா',
    type: 'TEMPLE',
    venue: 'Suchindram Temple Street',
    startDate: '2026-12-20',
    endDate: '2026-12-30',
    image: '/images/Margazhi Temple Car Festival.jpg',
    descriptionEn: 'The grand chariot festival of Suchindram Thanumalayan Temple involving a massive procession of three decorated cars.',
    isGovernment: false
  }
]

export default function EventsPage() {
  const [events, setEvents] = useState(allEvents)
  const [activeType, setActiveType] = useState('ALL')

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data)
        }
      })
      .catch(() => console.log('Using mock events.'))
  }, [])

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Kumari Festivals & Events
          </h1>
          <p className="text-body-sm text-granite-500">
            Witness Kanyakumari&apos;s rich cultural heritage through official government celebrations and historic temple car festivals.
          </p>
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['ALL', 'CULTURAL', 'TEMPLE', 'SPORTS'].map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-5 py-2 rounded-full border text-body-sm font-semibold transition-all ${
                activeType === type
                  ? 'bg-ocean border-ocean text-white'
                  : 'bg-white border-granite-200 text-granite-600 hover:border-granite-300'
              }`}
            >
              {type === 'ALL' ? 'All Events' : type.charAt(0) + type.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Events list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.filter(e => activeType === 'ALL' || e.type === activeType).map(event => (
            <div key={event.id} className="bg-white rounded-2xl overflow-hidden shadow-card border border-granite-100 flex flex-col justify-between group">
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={event.image || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500'}
                    alt={event.titleEn}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {event.isGovernment && (
                    <span className="absolute top-4 left-4 bg-ocean text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Govt Organized
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex gap-2">
                    <span className="bg-granite-100 text-granite-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {event.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-heading-sm text-granite-900 leading-snug">
                      {event.titleEn}
                    </h3>
                    <p className="text-caption text-granite-400 font-tamil">{event.titleTa}</p>
                  </div>

                  <p className="text-body-sm text-granite-600 leading-relaxed">
                    {event.descriptionEn}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-granite-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-caption text-granite-500">
                <div className="space-y-1">
                  <span className="flex items-center gap-1.5 text-granite-400">
                    <Calendar className="w-4 h-4 text-gold" />
                    {event.startDate} to {event.endDate}
                  </span>
                  <span className="flex items-center gap-1.5 text-granite-400">
                    <MapPin className="w-4 h-4 text-ocean" />
                    {event.venue}
                  </span>
                </div>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(event.venue + ', Kanyakumari')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-ocean-50 text-ocean hover:bg-ocean hover:text-white transition-all duration-200 text-[11px] font-bold flex items-center gap-1 border border-ocean-100 cursor-pointer self-start sm:self-auto"
                  title="Get Directions"
                >
                  Get Directions
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
