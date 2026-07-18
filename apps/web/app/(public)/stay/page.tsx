'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Phone, Globe, ShieldCheck, X } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { hotels as allHotels } from '@/lib/data'

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
  const [hotels, setHotels] = useState(allHotels)
  const [bookingHotel, setBookingHotel] = useState<any>(null)
  const [bookingName, setBookingName] = useState('')
  const [bookingPhone, setBookingPhone] = useState('')
  const [bookingDate, setBookingDate] = useState('')
  const [bookingNights, setBookingNights] = useState(1)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [activeType, setActiveType] = useState('ALL')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch(`/api/hotels?type=${activeType}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setHotels(data)
        } else {
          setHotels([])
        }
      })
      .catch(() => console.log('Using mock hotels data.'))
      .finally(() => setIsLoading(false))
  }, [activeType])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingHotel) return

    const bookingId = 'BK-HTL-' + Math.floor(1000 + Math.random() * 9000);
    const localBooking = {
      id: bookingId,
      type: 'hotel',
      status: 'CONFIRMED',
      hotelName: bookingHotel.nameEn,
      name: bookingName,
      phone: bookingPhone,
      checkInDate: bookingDate,
      nights: bookingNights,
      totalAmount: bookingHotel.pricePerNight * bookingNights,
      createdAt: new Date().toISOString(),
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}_${bookingHotel.id}`
    };
    const existing = JSON.parse(localStorage.getItem('local_bookings') || '[]');
    localStorage.setItem('local_bookings', JSON.stringify([localBooking, ...existing]));

    setBookingSubmitted(true)
  }

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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean"></div>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-20 text-granite-500">
            No accommodations found for this category.
          </div>
        ) : (
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
                  onClick={() => { setBookingHotel(hotel); setBookingSubmitted(false); setBookingName(''); setBookingPhone(''); }}
                  className="btn-gold py-2 px-5 text-body-sm font-semibold"
                >
                  Book Stay
                </button>
              </div>

            </div>
          ))}
        </div>
        )}

        {/* Booking Modal */}
        {bookingHotel && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg border space-y-5">
              <div className="flex justify-between items-start border-b border-granite-100 pb-3">
                <div>
                  <h3 className="font-serif text-heading text-granite-800">Book {bookingHotel.nameEn}</h3>
                  <p className="text-caption text-granite-500">{formatCurrency(bookingHotel.pricePerNight)}/night</p>
                </div>
                <button onClick={() => setBookingHotel(null)} className="text-granite-400 hover:text-granite-600"><X className="w-5 h-5" /></button>
              </div>

              {bookingSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-sea-50 rounded-full flex items-center justify-center mx-auto text-sea"><ShieldCheck className="w-8 h-8" /></div>
                  <h4 className="font-serif text-heading-sm text-granite-900">Inquiry Submitted!</h4>
                  <p className="text-body-sm text-granite-500">Your booking inquiry for {bookingHotel.nameEn} has been recorded. You will receive a confirmation call shortly.</p>
                  <button onClick={() => setBookingHotel(null)} className="btn-primary w-full py-2.5">Close</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookingHotel.website && (
                    <div className="bg-ocean/10 p-4 rounded-xl border border-ocean/20">
                      <p className="text-sm text-granite-600 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4 text-ocean shrink-0" />
                        Book directly on the official website for the best rates and instant confirmation.
                      </p>
                      <a href={bookingHotel.website} target="_blank" rel="noreferrer" className="btn-primary w-full py-2.5 flex justify-center items-center gap-2 font-bold">
                        Visit Official Website
                      </a>
                    </div>
                  )}

                  {bookingHotel.website && (
                    <div className="flex items-center gap-3 my-4">
                      <div className="flex-1 h-px bg-granite-200"></div>
                      <span className="text-[10px] uppercase font-bold text-granite-400">Or Submit Inquiry</span>
                      <div className="flex-1 h-px bg-granite-200"></div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-caption font-semibold text-granite-600 mb-1">Full Name</label>
                    <input type="text" required placeholder="Your name" className="input-field" value={bookingName} onChange={(e) => setBookingName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-caption font-semibold text-granite-600 mb-1">Phone Number</label>
                    <input type="tel" required placeholder="10-digit mobile" className="input-field" value={bookingPhone} onChange={(e) => setBookingPhone(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-caption font-semibold text-granite-600 mb-1">Check-in Date</label>
                      <input type="date" required min={new Date().toISOString().split('T')[0]} className="input-field" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-caption font-semibold text-granite-600 mb-1">Nights</label>
                      <select className="input-field" value={bookingNights} onChange={(e) => setBookingNights(Number(e.target.value))}>
                        {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} Night{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="bg-granite-50 p-3 rounded-xl text-center">
                    <span className="text-caption text-granite-500">Estimated Total: </span>
                    <span className="font-bold text-granite-900">{formatCurrency(bookingHotel.pricePerNight * bookingNights)}</span>
                  </div>
                  <button type="submit" className="btn-gold w-full py-3 text-body-sm font-bold">Submit Booking Inquiry</button>
                </form>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
