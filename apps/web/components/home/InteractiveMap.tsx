'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Hotel, UtensilsCrossed, Landmark, Navigation, X } from 'lucide-react'
import { mapMarkers } from '@/lib/data'

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

const typeIcons: Record<string, any> = {
  attraction: Landmark,
  hotel: Hotel,
  restaurant: UtensilsCrossed,
  transport: Navigation,
}

const typeColors: Record<string, string> = {
  attraction: 'text-ocean bg-ocean-50 border-ocean/20',
  hotel: 'text-gold-700 bg-gold-50 border-gold/20',
  restaurant: 'text-sunset bg-sunset-50 border-sunset/20',
  transport: 'text-purple-600 bg-purple-50 border-purple-200',
}

export default function InteractiveMap() {
  const [activeFilter, setActiveFilter] = useState('ALL')
  const [selectedMarker, setSelectedMarker] = useState<any>(null)
  const [mapInitialized, setMapInitialized] = useState(false)
  const mapContainer = useRef<HTMLDivElement>(null)
  const googleMap = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const filteredMarkers = mapMarkers.filter(
    (m) => activeFilter === 'ALL' || m.type === activeFilter
  )

  // 1. Load Google Maps Script
  useEffect(() => {
    if (!GOOGLE_MAPS_KEY) return

    const google = (window as any).google
    if (google && google.maps) {
      setMapInitialized(true)
      return
    }

    // Check if script already exists
    const existingScript = document.getElementById('google-maps-script')
    if (existingScript) {
      const loadedGoogle = (window as any).google
      if (loadedGoogle && loadedGoogle.maps) {
        setMapInitialized(true)
      } else {
        existingScript.addEventListener('load', () => {
          setMapInitialized(true)
        })
      }
      return
    }

    const script = document.createElement('script')
    script.id = 'google-maps-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => {
      setMapInitialized(true)
    }
    document.head.appendChild(script)
  }, [])

  // 2. Initialize Google Map Object
  useEffect(() => {
    if (!mapInitialized || !mapContainer.current) return
    const google = (window as any).google
    if (!google || !google.maps) return

    googleMap.current = new google.maps.Map(mapContainer.current, {
      center: { lat: 8.0817, lng: 77.5562 },
      zoom: 13.5,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
    })

    // Trigger initial markers draw
    drawMarkers(google)
  }, [mapInitialized])

  // 3. Redraw Markers when filter changes
  useEffect(() => {
    if (!googleMap.current) return
    const google = (window as any).google
    if (!google || !google.maps) return

    drawMarkers(google)
  }, [activeFilter])

  const drawMarkers = (google: any) => {
    // Clear existing markers
    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    // Add markers
    filteredMarkers.forEach((marker) => {
      const color =
        marker.type === 'attraction'
          ? '#0B4F8A'
          : marker.type === 'hotel'
          ? '#C9981A'
          : marker.type === 'restaurant'
          ? '#E06D53'
          : '#7C3AED'

      const gMarker = new google.maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: googleMap.current,
        title: marker.name,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          scale: 6,
        },
      })

      gMarker.addListener('click', () => {
        setSelectedMarker(marker)
        googleMap.current.panTo({ lat: marker.lat, lng: marker.lng })
        googleMap.current.setZoom(14.5)
      })

      markersRef.current.push(gMarker)
    })
  }

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
            Discover places, hotels, restaurants, and transport services around Kanyakumari
          </motion.p>
        </div>

        {/* Map Legend Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            { key: 'ALL', label: 'All Places', icon: MapPin, color: 'border-granite-200 text-granite-650' },
            { key: 'attraction', label: 'Attractions', icon: Landmark, color: typeColors.attraction },
            { key: 'hotel', label: 'Hotels', icon: Hotel, color: typeColors.hotel },
            { key: 'restaurant', label: 'Restaurants', icon: UtensilsCrossed, color: typeColors.restaurant },
            { key: 'transport', label: 'Transit', icon: Navigation, color: typeColors.transport },
          ].map((layer) => {
            const Icon = layer.icon
            const isActive = activeFilter === layer.key
            return (
              <button
                key={layer.key}
                onClick={() => {
                  setActiveFilter(layer.key)
                  setSelectedMarker(null)
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-body-sm font-semibold transition-all hover:shadow-sm ${
                  isActive
                    ? 'bg-granite-900 border-granite-900 text-white shadow-md'
                    : `bg-white ${layer.color}`
                }`}
              >
                <Icon className="w-4 h-4" />
                {layer.label}
              </button>
            )
          })}
        </div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-lg border border-granite-100 h-[400px] md:h-[500px]"
        >
          {GOOGLE_MAPS_KEY ? (
            <div className="w-full h-full relative">
              <div ref={mapContainer} className="w-full h-full" />
              <AnimatePresence>
                {selectedMarker && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute top-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-granite-100 shadow-xl max-w-[240px] z-10"
                  >
                    <button
                      onClick={() => setSelectedMarker(null)}
                      className="absolute top-2 right-2 text-granite-400 hover:text-granite-600 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-ocean block mb-1">
                      {selectedMarker.type}
                    </span>
                    <h4 className="font-serif font-bold text-body-sm text-granite-900 mb-2">
                      {selectedMarker.name}
                    </h4>
                    {selectedMarker.slug ? (
                      <a
                        href={`/explore/${selectedMarker.slug}`}
                        className="text-[11px] font-semibold text-gold-700 hover:underline flex items-center gap-0.5"
                      >
                        View details →
                      </a>
                    ) : (
                      <span className="text-[10px] text-granite-500">Local Area Listing</span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* Fallback Mock Map Interface */
            <div className="w-full h-full bg-gradient-to-br from-ocean-50 via-blue-50 to-sea-50 flex items-center justify-center relative">
              <img
                src="https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/77.5562,8.0817,12,0/1200x500@2x?access_token=pk.placeholder"
                alt="Map of Kanyakumari"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
              <div className="text-center z-10 p-6 max-w-lg bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl mx-4">
                <div className="w-12 h-12 rounded-xl bg-ocean-50 text-ocean flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-heading text-granite-800 mb-2">Google Maps Key Required</h3>
                <p className="text-body-sm text-granite-500 mb-4">
                  Enable the full interactive map by adding your Google Maps API key to{' '}
                  <code className="bg-granite-100 px-1.5 py-0.5 rounded text-caption font-semibold">
                    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
                  </code>{' '}
                  in <code className="bg-granite-100 px-1.5 py-0.5 rounded text-caption font-semibold">.env.local</code>.
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-h-[120px] overflow-y-auto custom-scrollbar p-1">
                  {filteredMarkers.map((m) => (
                    <span
                      key={m.name}
                      onClick={() => {
                        setSelectedMarker(m)
                      }}
                      className={`badge text-[10px] font-semibold py-1 px-2.5 rounded-full border cursor-pointer transition-all hover:scale-105 ${
                        selectedMarker?.name === m.name
                          ? 'bg-granite-900 border-granite-900 text-white'
                          : 'bg-white/95 text-granite-750 border-granite-200'
                      }`}
                    >
                      📍 {m.name}
                    </span>
                  ))}
                </div>
                <AnimatePresence>
                  {selectedMarker && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="mt-4 p-3 bg-white rounded-xl border border-granite-100 text-left relative shadow-md"
                    >
                      <button
                        onClick={() => setSelectedMarker(null)}
                        className="absolute top-2 right-2 text-granite-400 hover:text-granite-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-ocean block mb-0.5">
                        {selectedMarker.type}
                      </span>
                      <h4 className="font-serif font-bold text-body-sm text-granite-900 mb-1">
                        {selectedMarker.name}
                      </h4>
                      <p className="text-caption text-granite-400 mb-2">
                        Location: {selectedMarker.lat.toFixed(4)}° N, {selectedMarker.lng.toFixed(4)}° E
                      </p>
                      {selectedMarker.slug && (
                        <a
                          href={`/explore/${selectedMarker.slug}`}
                          className="text-[11px] font-semibold text-gold-700 hover:underline inline-flex items-center"
                        >
                          View Details page →
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
