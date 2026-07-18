'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Tag } from 'lucide-react'

const mockEvents = [
  {
    id: '1',
    titleEn: 'Cape Festival 2026',
    titleTa: 'கேப் திருவிழா 2026',
    type: 'CULTURAL',
    venue: 'Kanyakumari Beach Open Air Stage',
    startDate: '2026-10-15',
    endDate: '2026-10-17',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500',
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
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500',
    descriptionEn: 'The grand chariot festival of Suchindram Thanumalayan Temple involving a massive procession of three decorated cars.',
    isGovernment: false
  }
]

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents)

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
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

        {/* Events list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {events.map(event => (
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

              <div className="p-6 border-t border-granite-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-caption text-granite-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  {event.startDate} to {event.endDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-ocean" />
                  {event.venue}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
