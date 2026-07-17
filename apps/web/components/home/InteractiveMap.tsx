'use client'

import { motion } from 'framer-motion'
import { MapPin, Hotel, UtensilsCrossed, Landmark, ParkingMeter } from 'lucide-react'

const markers = [
  { name: 'Vivekananda Rock Memorial', lat: 8.0795, lng: 77.5583, type: 'attraction' },
  { name: 'Thiruvalluvar Statue', lat: 8.0776, lng: 77.5584, type: 'attraction' },
  { name: 'Kanyakumari Beach', lat: 8.0817, lng: 77.5562, type: 'attraction' },
  { name: 'Bhagavathi Amman Temple', lat: 8.0827, lng: 77.5574, type: 'attraction' },
  { name: 'Gandhi Memorial', lat: 8.0813, lng: 77.5527, type: 'attraction' },
  { name: 'Hotel Tamil Nadu', lat: 8.0830, lng: 77.5535, type: 'hotel' },
  { name: 'Sparsa Resort', lat: 8.0850, lng: 77.5500, type: 'hotel' },
]

export default function InteractiveMap() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="section-header">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-medium text-body-sm tracking-wider uppercase mb-2"
          >
            Navigate Kanyakumari
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Interactive Map
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            Discover places, hotels, restaurants, and services around Kanyakumari
          </motion.p>
        </div>

        {/* Map Legend Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { icon: Landmark, label: 'Attractions', color: 'bg-ocean-50 text-ocean border-ocean/20' },
            { icon: Hotel, label: 'Hotels', color: 'bg-gold-50 text-gold-700 border-gold/20' },
            { icon: UtensilsCrossed, label: 'Restaurants', color: 'bg-sunset-50 text-sunset border-sunset/20' },
            { icon: MapPin, label: 'ATM', color: 'bg-sea-50 text-sea border-sea/20' },
            { icon: ParkingMeter, label: 'Parking', color: 'bg-purple-50 text-purple-600 border-purple-200' },
          ].map(layer => (
            <button
              key={layer.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-body-sm font-medium transition-all hover:shadow-sm ${layer.color}`}
            >
              <layer.icon className="w-4 h-4" />
              {layer.label}
            </button>
          ))}
        </div>

        {/* Map Container — placeholder with styled background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-lg border border-granite-100"
        >
          <div className="h-[400px] md:h-[500px] bg-gradient-to-br from-ocean-50 via-blue-50 to-sea-50 flex items-center justify-center relative">
            {/* Static Map Image Fallback */}
            <img
              src={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/77.5562,8.0817,12,0/1200x500@2x?access_token=pk.placeholder`}
              alt="Map of Kanyakumari"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            
            {/* Map Placeholder Content */}
            <div className="text-center z-10">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="font-serif text-heading text-granite-800 mb-2">Interactive Map</h3>
              <p className="text-body-sm text-granite-500 max-w-md">
                Configure your Mapbox API key in <code className="bg-granite-100 px-1.5 py-0.5 rounded text-caption">.env.local</code> to enable the interactive map with real-time navigation.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {markers.slice(0, 5).map(m => (
                  <span key={m.name} className="badge-ocean text-[11px]">
                    📍 {m.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
