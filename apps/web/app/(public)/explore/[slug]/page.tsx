'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  MapPin, Clock, Ticket, Share2, Heart, 
  Printer, Star, Compass, AlertCircle, Info, CheckCircle 
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { destinations as allDestinations } from '@/lib/data'

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'gallery' | 'reviews'>('overview')
  const [destination, setDestination] = useState<any>(null)
  
  // Booking Form State
  const [visitDate, setVisitDate] = useState('')
  const [adultQty, setAdultQty] = useState(1)
  const [childQty, setChildQty] = useState(0)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Attempt local API fetch
    fetch(`http://localhost:5000/api/destinations/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setDestination(data)
        } else {
          const found = allDestinations.find(d => d.slug === slug)
          setDestination(found || allDestinations[0])
        }
      })
      .catch(() => {
        const found = allDestinations.find(d => d.slug === slug)
        setDestination(found || allDestinations[0])
      })
  }, [slug])

  if (!destination) {
    return (
      <div className="pt-32 pb-16 text-center">
        <div className="skeleton w-32 h-32 mx-auto rounded-full mb-4"></div>
        <p className="text-body-sm text-granite-500">Loading destination details...</p>
      </div>
    )
  }

  const adultPrice = destination.entryFeeAdult || 0
  const childPrice = destination.entryFeeChild || 0
  const totalCost = (adultQty * adultPrice) + (childQty * childPrice)

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!visitDate) {
      alert('Please select a visit date.')
      return
    }
    
    setIsLoading(true)
    // Setup booking ticket on backend
    const token = localStorage.getItem('auth_token')
    if (!token) {
      alert('Please login to book tickets!')
      setIsLoading(false)
      window.location.href = '/login'
      return
    }

    try {
      const ticketsArray = []
      if (adultQty > 0) {
        ticketsArray.push({ type: 'ADULT', quantity: adultQty, unitPrice: adultPrice })
      }
      if (childQty > 0) {
        ticketsArray.push({ type: 'CHILD', quantity: childQty, unitPrice: childPrice })
      }

      const bookingRes = await fetch('http://localhost:5000/api/bookings/ticket/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          destinationId: destination.id,
          visitDate,
          tickets: ticketsArray
        })
      })

      const bookingData = await bookingRes.json()
      if (bookingData.error) {
        alert(bookingData.error)
        setIsLoading(false)
        return
      }

      // Order creation
      const orderRes = await fetch('http://localhost:5000/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          amount: totalCost,
          bookingId: bookingData.booking.id
        })
      })

      const orderData = await orderRes.json()

      // Pilot Stage: Auto-Verify payment simulation
      const verifyRes = await fetch('http://localhost:5000/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: orderData.id,
          paymentId: 'pay_' + Math.random().toString(36).substr(2, 9),
          signature: 'simulated_signature_verification_ok',
          bookingId: bookingData.booking.id
        })
      })

      const verifyData = await verifyRes.json()
      if (verifyData.success) {
        // Save to local storage for profile page integration
        const bookingId = bookingData.booking.id;
        const ticketsList = ticketsArray.map((t, idx) => ({
          id: `TK-${bookingId}-${idx}`,
          visitDate,
          ticketType: t.type,
          quantity: t.quantity,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}_${t.type}_${t.quantity}`,
          destination: {
            nameEn: destination.nameEn || destination.name || 'Destination'
          }
        }));
        const localBooking = {
          id: bookingId,
          type: 'ticket',
          status: 'CONFIRMED',
          totalAmount: totalCost,
          tickets: ticketsList,
          createdAt: new Date().toISOString()
        };
        const existing = JSON.parse(localStorage.getItem('local_bookings') || '[]');
        localStorage.setItem('local_bookings', JSON.stringify([localBooking, ...existing]));

        setBookingSuccess(true)
      } else {
        alert('Payment verification failed.')
      }
    } catch (err) {
      console.error(err)
      
      // Save simulated booking to localStorage
      const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);
      const ticketsList = [];
      if (adultQty > 0) {
        ticketsList.push({
          id: 'TK-AD-' + Math.floor(1000 + Math.random() * 9000),
          visitDate,
          ticketType: 'ADULT',
          quantity: adultQty,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}_AD_${adultQty}`,
          destination: {
            nameEn: destination.nameEn || destination.name || 'Destination'
          }
        });
      }
      if (childQty > 0) {
        ticketsList.push({
          id: 'TK-CH-' + Math.floor(1000 + Math.random() * 9000),
          visitDate,
          ticketType: 'CHILD',
          quantity: childQty,
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}_CH_${childQty}`,
          destination: {
            nameEn: destination.nameEn || destination.name || 'Destination'
          }
        });
      }
      const localBooking = {
        id: bookingId,
        type: 'ticket',
        status: 'CONFIRMED',
        totalAmount: totalCost,
        tickets: ticketsList,
        createdAt: new Date().toISOString()
      };
      const existing = JSON.parse(localStorage.getItem('local_bookings') || '[]');
      localStorage.setItem('local_bookings', JSON.stringify([localBooking, ...existing]));

      alert('An error occurred during booking. Running in simulation mode. Your booking has been saved to your profile.')
      setBookingSuccess(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-granite-50 pb-20">
      {/* 1. Hero Header */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.nameEn}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 py-8 z-10">
          <div className="container-wide">
            <span className="badge-gold bg-gold-400/90 text-white shadow-sm mb-3">
              {destination.category}
            </span>
            <h1 className="font-serif text-heading-xl md:text-display-lg text-white font-bold mb-2">
              {destination.nameEn}
            </h1>
            <p className="text-body-lg text-white/80 font-tamil mb-4">
              {destination.nameTa}
            </p>

            <div className="flex gap-3 text-white/90 text-caption font-semibold">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-gold" /> {destination.location || 'Kanyakumari'}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-gold text-gold" /> {destination.rating || '4.8'} (Reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Sticky Bar */}
      <div className="sticky top-16 bg-white border-b border-granite-200 z-30 shadow-sm py-4">
        <div className="container-wide flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-body-sm text-granite-600">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-ocean" />
              Hours: <strong>{typeof destination.openingHours === 'string' ? destination.openingHours : (destination.openingHours?.open ? `${destination.openingHours.open} - ${destination.openingHours.close}` : '08:00 AM - 04:00 PM')}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-ocean" />
              Adult Fee: <strong>{adultPrice > 0 ? formatCurrency(adultPrice) : 'Free Entry'}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full border hover:bg-granite-50 text-granite-600" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full border hover:bg-granite-50 text-granite-600" aria-label="Save">
              <Heart className="w-4 h-4" />
            </button>
            <button onClick={() => window.print()} className="p-2 rounded-full border hover:bg-granite-50 text-granite-600" aria-label="Print">
              <Printer className="w-4 h-4" />
            </button>
            <a href="#booking-section" className="btn-primary py-2 px-6 text-body-sm font-semibold">
              Book Tickets Now
            </a>
          </div>
        </div>
      </div>

      {/* 3. Detail Content & Sidebar */}
      <div className="container-wide mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Details Panel */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Tabs bar */}
          <div className="flex border-b border-granite-200">
            {(['overview', 'history', 'gallery', 'reviews'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-6 py-3 font-semibold text-body-sm border-b-2 capitalize transition-colors',
                  activeTab === tab 
                    ? 'border-ocean text-ocean'
                    : 'border-transparent text-granite-500 hover:text-granite-800'
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-granite-100 shadow-sm min-h-[300px]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-heading-sm text-granite-800 mb-3">About the Destination</h3>
                  <p className="text-body text-granite-600 leading-relaxed mb-4">{destination.descriptionEn}</p>
                  <p className="text-body text-granite-500 font-tamil leading-relaxed">{destination.descriptionTa}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-body-sm text-granite-700 mb-2">Visitor Information</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-body-sm text-granite-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sea" /> Ferry access available
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sea" /> Meditation hall open to all
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sea" /> Photography allowed on campus
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-sea" /> Wheelchair accessible pathways
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <h3 className="font-serif text-heading-sm text-granite-800 mb-3">Historical Significance</h3>
                <p className="text-body text-granite-600 leading-relaxed mb-2">{destination.historyEn || 'Historical details in English will be expanded soon.'}</p>
                <p className="text-body text-granite-500 font-tamil leading-relaxed">{destination.historyTa || 'வரலாற்று குறிப்புகள் விரைவில் சேர்க்கப்படும்.'}</p>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(destination.images && destination.images.length > 0 ? destination.images : [destination.heroImage]).map((img: string, idx: number) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                    <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="text-center bg-gold-50 border border-gold-200 p-4 rounded-xl">
                    <div className="font-serif text-heading-xl font-bold text-gold-700">{destination.rating || '4.8'}</div>
                    <div className="text-caption text-granite-500 font-medium">Out of 5 Stars</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-body-sm text-granite-800">Tourist Experience</h4>
                    <p className="text-caption text-granite-500">Based on approved guest reviews and feedback forms.</p>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-granite-100">
                  <div className="p-4 bg-granite-50 rounded-xl">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-body-sm text-granite-800">Aravind S.</span>
                      <span className="text-caption text-gold font-bold">★★★★★</span>
                    </div>
                    <p className="text-body-sm text-granite-600">A clean, well-managed monument. Sunset views are absolutely stunning!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Booking Form */}
        <div id="booking-section" className="lg:col-span-1">
          <div className="sticky top-40 bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-6">
            <h3 className="font-serif text-heading-sm text-granite-800 border-b border-granite-100 pb-3">
              Book Tickets
            </h3>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 bg-sea-50 rounded-full flex items-center justify-center mx-auto text-sea">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-heading-sm text-granite-900">Booking Confirmed!</h4>
                <p className="text-body-sm text-granite-500">
                  Your ticket booking is verified. View details in your tourist profile.
                </p>
                <Link href="/bookings/tickets" className="btn-primary w-full py-2.5">
                  View Bookings
                </Link>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="space-y-4">
                {/* Date Picker */}
                <div>
                  <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                  />
                </div>

                {/* Ticket quantities */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="block text-body-sm font-semibold text-granite-800">Adult</span>
                      <span className="text-caption text-granite-400">Age 12+</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setAdultQty(Math.max(1, adultQty - 1))}
                        className="w-8 h-8 rounded-full border flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-semibold text-body">{adultQty}</span>
                      <button
                        type="button"
                        onClick={() => setAdultQty(adultQty + 1)}
                        className="w-8 h-8 rounded-full border flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {childPrice > 0 && (
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block text-body-sm font-semibold text-granite-800">Child</span>
                        <span className="text-caption text-granite-400">Age 5-12</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildQty(Math.max(0, childQty - 1))}
                          className="w-8 h-8 rounded-full border flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold text-body">{childQty}</span>
                        <button
                          type="button"
                          onClick={() => setChildQty(childQty + 1)}
                          className="w-8 h-8 rounded-full border flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Cost Breakdown */}
                {adultPrice > 0 && (
                  <div className="pt-3 border-t border-granite-100 space-y-1.5 text-body-sm text-granite-600">
                    <div className="flex justify-between">
                      <span>Adult ({adultQty} × {formatCurrency(adultPrice)})</span>
                      <span>{formatCurrency(adultQty * adultPrice)}</span>
                    </div>
                    {childQty > 0 && (
                      <div className="flex justify-between">
                        <span>Child ({childQty} × {formatCurrency(childPrice)})</span>
                        <span>{formatCurrency(childQty * childPrice)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-granite-900 pt-2 border-t border-dashed">
                      <span>Total Amount</span>
                      <span>{formatCurrency(totalCost)}</span>
                    </div>
                  </div>
                )}

                {/* Payment button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-gold w-full py-3 text-body-sm font-bold flex justify-center items-center gap-2"
                >
                  {isLoading ? 'Processing Payment...' : 'Proceed & Pay (Razorpay)'}
                </button>

                <p className="text-[10px] text-center text-granite-400">
                  Instant QR tickets will be generated on success. Refundable up to 24 hours prior.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
