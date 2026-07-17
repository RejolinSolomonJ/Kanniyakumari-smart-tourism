'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Phone, Globe, ShieldCheck } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const mockHotels = [
  {
    id: '1',
    nameEn: 'Hotel Tamil Nadu (TTDC)',
    nameTa: 'ஹோட்டல் தமிழ்நாடு (TTDC)',
    type: 'GOVERNMENT',
    pricePerNight: 2500,
    address: 'Beach Road, Kanyakumari',
    starRating: 3,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
    amenities: ['AC', 'Restaurant', 'Parking', 'Wi-Fi']
  },
  {
    id: '2',
    nameEn: 'Sparsa Resort Kanyakumari',
    nameTa: 'ஸ்பர்சா ரிசார்ட்',
    type: 'RESORT',
    pricePerNight: 6000,
    address: 'Kovalam Road, Kanyakumari',
    starRating: 4,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant']
  },
  {
    id: '3',
    nameEn: 'The Seashore Hotel',
    nameTa: 'தி சீஷோர் ஹோட்டல்',
    type: 'LUXURY',
    pricePerNight: 4500,
    address: 'East Car Street, Kanyakumari',
    starRating: 4,
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500'],
    amenities: ['Sea View', 'Rooftop Resto', 'Parking', 'Wi-Fi']
  }
]

export default function StayPage() {
  const [hotels, setHotels] = useState(mockHotels)
  const [activeType, setActiveType] = useState('ALL')

  useEffect(() => {
    fetch('http://localhost:5000/api/hotels')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setHotels(data)
        }
      })
      .catch(() => console.log('Using mock hotels data.'))
  }, [])

  const filteredHotels = hotels.filter(h => activeType === 'ALL' || h.type === activeType)

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Where to Stay
          </h1>
          <p className="text-body-sm text-granite-500">
            Book official TTDC hotels, beachfront resorts, or clean budget accommodations.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {['ALL', 'GOVERNMENT', 'RESORT', 'LUXURY', 'MID_RANGE', 'BUDGET', 'HOMESTAY'].map(type => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-5 py-2 rounded-full border text-body-sm font-semibold transition-all ${
                activeType === type
                  ? 'bg-ocean border-ocean text-white'
                  : 'bg-white border-granite-200 text-granite-600 hover:border-granite-300'
              }`}
            >
              {type === 'ALL' ? 'All Types' : type.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Hotel Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-white rounded-2xl overflow-hidden shadow-card border border-granite-100 flex flex-col justify-between">
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={hotel.images[0]}
                    alt={hotel.nameEn}
                    className="w-full h-full object-cover"
                  />
                  {hotel.type === 'GOVERNMENT' && (
                    <span className="absolute top-3 left-3 bg-sea text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Government Verified
                    </span>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif text-heading-sm text-granite-900 leading-tight">
                      {hotel.nameEn}
                    </h3>
                    <p className="text-caption text-granite-400 font-tamil">{hotel.nameTa}</p>
                  </div>

                  <p className="flex items-center gap-1.5 text-caption text-granite-500">
                    <MapPin className="w-4 h-4 text-ocean" />
                    {hotel.address}
                  </p>

                  {hotel.starRating && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-gold-600">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                      {hotel.starRating}-Star Standard
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {hotel.amenities.map((am: string) => (
                      <span key={am} className="bg-granite-100 text-granite-600 text-[10px] px-2 py-0.5 rounded">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-granite-100 flex items-center justify-between">
                <div>
                  <span className="block text-caption text-granite-400 font-medium">Starting from</span>
                  <span className="text-body-lg font-bold text-granite-900">{formatCurrency(hotel.pricePerNight)}<span className="text-caption font-normal">/night</span></span>
                </div>
                <button
                  onClick={() => alert('Direct booking integration will be live in Pilot Phase 1')}
                  className="btn-gold py-2 px-5 text-body-sm font-semibold"
                >
                  Book Stay
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
