'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth'
import { 
  User, Ticket, Calendar, Clock, MapPin, Star,
  Compass, ArrowRight, ShieldCheck, Mail, Phone, LogOut, CheckCircle2,
  MessageSquare, Edit3, Camera, Heart, TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default function TouristDashboard() {
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'bookings' | 'itineraries' | 'reviews' | 'favorites'>('bookings')
  const [bookings, setBookings] = useState<any[]>([])
  const [activeTicket, setActiveTicket] = useState<any>(null)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewText, setReviewText] = useState('')

  // Mock saved itineraries
  const savedItineraries = [
    { id: '1', title: '3-Day Spiritual Journey', days: 3, budget: 8500, createdAt: '2026-07-10', stops: ['Thiruvalluvar Statue', 'Vivekananda Rock', 'Bhagavathy Amman Temple', 'Suchindram Temple'] },
    { id: '2', title: 'Weekend Beach & Food Trail', days: 2, budget: 5200, createdAt: '2026-07-15', stops: ['Sanguthurai Beach', 'Sunset Point', 'Thengapattinam', 'Local Fish Market'] },
  ]

  // Mock reviews by this user
  const myReviews = [
    { id: '1', destination: 'Vivekananda Rock Memorial', rating: 5, comment: 'Absolutely breathtaking! The boat ride and the monument are a must-visit experience.', date: '2026-07-12', status: 'approved' },
    { id: '2', destination: 'Padmanabhapuram Palace', rating: 4, comment: 'Beautiful wooden architecture. The guide was very knowledgeable about the history.', date: '2026-07-14', status: 'pending' },
  ]

  // Mock favorites
  const favorites = [
    { id: '1', name: 'Sunset Point, Kanyakumari', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400', category: 'BEACH' },
    { id: '2', name: 'Thiruvalluvar Statue', image: 'https://images.unsplash.com/photo-1598463283737-124b1757835f?q=80&w=400', category: 'HERITAGE' },
    { id: '3', name: 'Keeriparai Reserve Forest', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=400', category: 'WILDLIFE' },
  ]

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      window.location.href = '/login'
      return
    }

    fetch('http://localhost:5000/api/bookings/user', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data)
        }
      })
      .catch(err => console.error(err))
  }, [])

  if (!user) return null

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  const tabs = [
    { key: 'bookings', label: 'Bookings', icon: Ticket },
    { key: 'itineraries', label: 'Itineraries', icon: Compass },
    { key: 'reviews', label: 'My Reviews', icon: MessageSquare },
    { key: 'favorites', label: 'Favorites', icon: Heart },
  ] as const

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 1. Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-6">
              <div className="text-center space-y-2 border-b border-granite-100 pb-5">
                <div className="w-20 h-20 rounded-full bg-gradient-ocean text-white flex items-center justify-center mx-auto text-3xl font-bold font-serif relative">
                  {user.name.charAt(0)}
                  <button className="absolute bottom-0 right-0 w-7 h-7 bg-gold text-black rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h2 className="font-serif text-xl text-granite-900 font-bold">{user.name}</h2>
                <span className="inline-block px-3 py-1 bg-ocean-50 text-ocean text-[11px] uppercase tracking-wider font-bold rounded-full">{user.role}</span>
              </div>

              <div className="space-y-3.5 text-sm text-granite-600">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-ocean" />
                  <span className="truncate">{user.email}</span>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-ocean" />
                    <span>{user.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Verified Account</span>
                </div>
              </div>

              <Link
                href="/plan"
                className="block w-full text-center py-2.5 bg-gold/10 text-gold hover:bg-gold/20 font-bold rounded-xl text-sm transition-colors"
              >
                ✨ Launch AI Planner
              </Link>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm">
              <h3 className="font-semibold text-granite-800 mb-4 text-sm">Your Activity</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-ocean-50 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-ocean">{bookings.length || 2}</p>
                  <p className="text-[11px] text-granite-500 mt-1">Bookings</p>
                </div>
                <div className="bg-gold/10 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-gold">{myReviews.length}</p>
                  <p className="text-[11px] text-granite-500 mt-1">Reviews</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-emerald-600">{savedItineraries.length}</p>
                  <p className="text-[11px] text-granite-500 mt-1">Itineraries</p>
                </div>
                <div className="bg-rose-50 p-3 rounded-xl text-center">
                  <p className="text-2xl font-bold text-rose-500">{favorites.length}</p>
                  <p className="text-[11px] text-granite-500 mt-1">Favorites</p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Main Panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex bg-white rounded-xl p-1 shadow-sm border border-granite-100 overflow-x-auto">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab.key ? 'bg-ocean text-white shadow-md' : 'text-granite-500 hover:text-granite-800 hover:bg-granite-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <div key={booking.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400">ID: {booking.id}</span>
                        </div>
                        
                        {booking.tickets.map((t: any) => (
                          <div key={t.id} className="space-y-1 pt-1">
                            <h4 className="font-semibold text-sm text-granite-800">
                              {t.destination.nameEn}
                            </h4>
                            <div className="flex flex-wrap gap-4 text-xs text-granite-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(t.visitDate).toLocaleDateString('en-IN')}
                              </span>
                              <span>Type: {t.ticketType} ({t.quantity} qty)</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="md:text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                        <div>
                          <span className="block text-xs text-granite-400">Amount Paid</span>
                          <span className="text-lg font-bold text-granite-900">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        {booking.tickets.length > 0 && (
                          <button
                            onClick={() => setActiveTicket(booking.tickets[0])}
                            className="px-4 py-1.5 bg-gold text-black font-bold rounded-lg text-xs hover:bg-gold/80 transition-colors"
                          >
                            View QR
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-granite-100">
                    <Ticket className="w-12 h-12 text-granite-300 mx-auto mb-3" />
                    <h3 className="font-serif text-xl text-granite-800 font-bold">No Bookings Yet</h3>
                    <p className="text-sm text-granite-500 mb-6 max-w-xs mx-auto">
                      You haven&apos;t booked any entry tickets. Explore destinations to plan your visit!
                    </p>
                    <Link href="/explore" className="inline-block px-6 py-2.5 bg-ocean text-white font-bold rounded-xl text-sm hover:bg-ocean/90 transition-colors">
                      Browse Places
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Itineraries Tab */}
            {activeTab === 'itineraries' && (
              <div className="space-y-4">
                {savedItineraries.map((itin) => (
                  <div key={itin.id} className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-granite-900">{itin.title}</h3>
                        <p className="text-xs text-granite-400 mt-1">Created {new Date(itin.createdAt).toLocaleDateString('en-IN')}</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-ocean-50 text-ocean text-xs font-bold rounded-full">{itin.days} Days</span>
                        <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded-full">₹{itin.budget?.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {itin.stops.map((stop, i) => (
                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-granite-50 text-granite-600 text-xs rounded-full border border-granite-100">
                          <MapPin className="w-3 h-3 text-ocean" /> {stop}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-4 pt-4 border-t border-granite-100">
                      <button className="px-4 py-2 bg-ocean text-white text-xs font-bold rounded-lg hover:bg-ocean/90 transition-colors flex items-center gap-1">
                        <ArrowRight className="w-3.5 h-3.5" /> View Full Plan
                      </button>
                      <button className="px-4 py-2 bg-granite-100 text-granite-600 text-xs font-bold rounded-lg hover:bg-granite-200 transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Link href="/plan" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-xl text-sm hover:bg-gold/80 transition-colors">
                    ✨ Create New Itinerary with AI
                  </Link>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <button 
                    onClick={() => setShowReviewModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-ocean text-white font-bold rounded-lg text-sm hover:bg-ocean/90 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" /> Write a Review
                  </button>
                </div>
                {myReviews.map(review => (
                  <div key={review.id} className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-granite-800">{review.destination}</h4>
                        <p className="text-xs text-granite-400 mt-1">{new Date(review.date).toLocaleDateString('en-IN')}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        review.status === 'approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {review.status}
                      </span>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-gold fill-gold' : 'text-granite-200'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-granite-600 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map(fav => (
                  <Link key={fav.id} href={`/explore`} className="group bg-white rounded-2xl overflow-hidden border border-granite-100 shadow-sm hover:shadow-md transition-all">
                    <div className="relative h-40 overflow-hidden">
                      <img src={fav.image} alt={fav.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <span className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {fav.category}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-granite-800 text-sm group-hover:text-ocean transition-colors">{fav.name}</h4>
                    </div>
                  </Link>
                ))}
                <Link href="/explore" className="flex flex-col items-center justify-center bg-granite-50 rounded-2xl border-2 border-dashed border-granite-200 p-8 text-granite-400 hover:border-ocean hover:text-ocean transition-colors">
                  <Heart className="w-8 h-8 mb-2" />
                  <span className="font-semibold text-sm">Discover More</span>
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Ticket QR Modal */}
      {activeTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg border text-center space-y-6">
            
            <div className="flex justify-between items-start border-b border-granite-100 pb-3 text-left">
              <div>
                <h3 className="font-serif text-lg text-granite-800 font-bold">Entry Ticket QR</h3>
                <p className="text-xs text-granite-400">ID: {activeTicket.id}</p>
              </div>
              <button
                onClick={() => setActiveTicket(null)}
                className="text-granite-400 hover:text-granite-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-granite-50 p-4 rounded-xl border border-granite-200 inline-block">
              <img
                src={activeTicket.qrCodeUrl}
                alt="Ticket QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-sm text-granite-800">{activeTicket.ticketType} Ticket × {activeTicket.quantity} Qty</h4>
              <p className="text-xs text-granite-500">
                Visit Date: {new Date(activeTicket.visitDate).toLocaleDateString('en-IN')}
              </p>
            </div>

            <p className="text-[10px] text-granite-400">
              Present this QR code at the monument entry gate. It will be scanned by the Site Manager.
            </p>

          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-granite-900">Write a Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-granite-400 hover:text-granite-600 font-bold text-lg">✕</button>
            </div>
            
            <div>
              <label className="text-xs font-semibold text-granite-600 block mb-2">Select Destination</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-granite-200 text-sm bg-granite-50 focus:outline-none focus:ring-2 focus:ring-ocean">
                <option>Vivekananda Rock Memorial</option>
                <option>Thiruvalluvar Statue</option>
                <option>Padmanabhapuram Palace</option>
                <option>Sunset Point</option>
                <option>Kanyakumari Beach</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-granite-600 block mb-2">Your Rating</label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(s => (
                  <button
                    key={s}
                    onClick={() => setReviewRating(s)}
                    className="transition-transform hover:scale-125"
                  >
                    <Star className={`w-7 h-7 ${s <= reviewRating ? 'text-gold fill-gold' : 'text-granite-200 hover:text-granite-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-granite-600 block mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience visiting this place..."
                className="w-full px-4 py-3 rounded-xl border border-granite-200 text-sm bg-granite-50 focus:outline-none focus:ring-2 focus:ring-ocean resize-none h-28"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="flex-1 py-2.5 bg-granite-100 text-granite-600 font-bold rounded-xl text-sm hover:bg-granite-200 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 py-2.5 bg-ocean text-white font-bold rounded-xl text-sm hover:bg-ocean/90 transition-colors">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
