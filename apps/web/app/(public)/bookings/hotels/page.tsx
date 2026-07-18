'use client'

import { useState } from 'react'
import { Hotel, Star, MapPin, Wifi, Car, Coffee, Waves, Search, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

const hotels = [
  { id: '1', name: 'Hotel Seashore', type: 'MID_RANGE', price: 2800, rating: 4.2, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400', amenities: ['Wi-Fi', 'AC', 'Restaurant', 'Sea View'], location: 'Beach Road, Kanyakumari' },
  { id: '2', name: 'TTDC Hotel Tamil Nadu', type: 'GOVERNMENT', price: 1500, rating: 3.8, image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=400', amenities: ['Wi-Fi', 'AC', 'Parking'], location: 'Main Road, Kanyakumari' },
  { id: '3', name: 'Sparsa Resort', type: 'RESORT', price: 6500, rating: 4.6, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=400', amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Sea View'], location: 'Kovalam Road' },
  { id: '4', name: 'Cape Comorin Homestay', type: 'HOMESTAY', price: 1200, rating: 4.4, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400', amenities: ['Wi-Fi', 'Kitchen', 'Terrace'], location: 'Chettikulam' },
  { id: '5', name: 'The Gopinivas Grand', type: 'LUXURY', price: 8500, rating: 4.7, image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=400', amenities: ['Wi-Fi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Sea View'], location: 'East Car Street' },
  { id: '6', name: 'Vivekananda Kendra', type: 'BUDGET', price: 800, rating: 3.5, image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=400', amenities: ['AC', 'Parking'], location: 'Vivekanandapuram' },
]

const typeLabels: Record<string, string> = { GOVERNMENT: 'Govt', LUXURY: 'Luxury', MID_RANGE: 'Mid-Range', BUDGET: 'Budget', HOMESTAY: 'Homestay', RESORT: 'Resort' }
const typeColors: Record<string, string> = { GOVERNMENT: 'bg-ocean-50 text-ocean', LUXURY: 'bg-gold/10 text-gold', MID_RANGE: 'bg-emerald-50 text-emerald-700', BUDGET: 'bg-granite-100 text-granite-600', HOMESTAY: 'bg-rose-50 text-rose-600', RESORT: 'bg-purple-50 text-purple-700' }

export default function BookHotelsPage() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = hotels.filter(h => {
    if (filter !== 'ALL' && h.type !== filter) return false
    if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-20">
      <div className="container-wide">
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-granite-900">Book Accommodation</h1>
          <p className="text-granite-500 mt-2">Government-approved hotels, resorts, and homestays across Kanyakumari district</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-granite-400" />
            <input
              type="text" placeholder="Search hotels..."
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-granite-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['ALL', 'GOVERNMENT', 'LUXURY', 'RESORT', 'MID_RANGE', 'HOMESTAY', 'BUDGET'].map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === t ? 'bg-ocean text-white' : 'bg-white text-granite-600 border border-granite-200 hover:border-ocean'}`}>
                {t === 'ALL' ? 'All' : typeLabels[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Hotel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(hotel => (
            <div key={hotel.id} className="group bg-white rounded-2xl overflow-hidden border border-granite-100 shadow-sm hover:shadow-lg transition-all">
              <div className="relative h-48 overflow-hidden">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${typeColors[hotel.type]}`}>
                  {typeLabels[hotel.type]}
                </span>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                  <Star className="w-3 h-3 text-gold fill-gold" />
                  <span className="text-white text-xs font-bold">{hotel.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif font-bold text-granite-900 text-lg group-hover:text-ocean transition-colors">{hotel.name}</h3>
                <p className="text-xs text-granite-400 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {hotel.location}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {hotel.amenities.slice(0, 4).map(a => (
                    <span key={a} className="px-2 py-0.5 bg-granite-50 text-granite-500 text-[10px] rounded-full border border-granite-100">{a}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-granite-100">
                  <div>
                    <span className="text-xl font-bold text-granite-900">{formatCurrency(hotel.price)}</span>
                    <span className="text-xs text-granite-400">/night</span>
                  </div>
                  <button className="px-5 py-2 bg-ocean text-white font-bold rounded-lg text-sm hover:bg-ocean/90 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
