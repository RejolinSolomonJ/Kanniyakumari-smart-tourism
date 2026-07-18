'use client'

import { motion } from 'framer-motion'
import { Landmark, MapPin, Clock } from 'lucide-react'
import { religiousSites } from '@/lib/data'

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
          {religiousSites.map((site, index) => (
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
