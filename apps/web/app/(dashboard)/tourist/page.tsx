'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/auth'
import { 
  User, Ticket, Calendar, Clock, MapPin, 
  Compass, ArrowRight, ShieldCheck, Mail, Phone, LogOut, CheckCircle2, X,
  FileText
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default function TouristDashboard() {
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'bookings' | 'hotels' | 'rentals' | 'itineraries'>('bookings')
  const [bookings, setBookings] = useState<any[]>([])
  const [activeTicket, setActiveTicket] = useState<any>(null)
  const [activeBooking, setActiveBooking] = useState<any | null>(null)
  const [selectedTicketIndex, setSelectedTicketIndex] = useState<number>(0)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      window.location.href = '/login'
      return
    }

    const localSaved = JSON.parse(localStorage.getItem('local_bookings') || '[]')

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/user`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        let combined = []
        if (Array.isArray(data) && data.length > 0) {
          combined = [...data.map((d: any) => ({ ...d, type: (d.type || 'ticket').toLowerCase() })), ...localSaved]
        } else {
          combined = [...localSaved]
        }
        
        const hasTickets = combined.some((b: any) => b.type === 'ticket')
        const hasHotels = combined.some((b: any) => b.type === 'hotel')
        const hasRentals = combined.some((b: any) => b.type === 'rental')

        if (!hasTickets) combined.push(...getSimulatedBookings().filter(b => b.type === 'ticket'))
        if (!hasHotels) combined.push(...getSimulatedBookings().filter(b => b.type === 'hotel'))
        if (!hasRentals) combined.push(...getSimulatedBookings().filter(b => b.type === 'rental'))

        // Remove duplicate IDs
        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
        setBookings(unique)
      })
      .catch(err => {
        let combined = [...localSaved]
        const hasTickets = combined.some((b: any) => b.type === 'ticket')
        const hasHotels = combined.some((b: any) => b.type === 'hotel')
        const hasRentals = combined.some((b: any) => b.type === 'rental')

        if (!hasTickets) combined.push(...getSimulatedBookings().filter(b => b.type === 'ticket'))
        if (!hasHotels) combined.push(...getSimulatedBookings().filter(b => b.type === 'hotel'))
        if (!hasRentals) combined.push(...getSimulatedBookings().filter(b => b.type === 'rental'))

        const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)
        setBookings(unique)
      })
  }, [])

  const getSimulatedBookings = () => [
    {
      id: 'BK-8902',
      type: 'ticket',
      status: 'CONFIRMED',
      totalAmount: 140,
      tickets: [
        {
          id: 'TK-1002',
          visitDate: new Date(Date.now() + 86400000 * 2).toISOString(),
          ticketType: 'ADULT',
          quantity: 2,
          qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BK-8902_TK-1002',
          destination: {
            nameEn: 'Vivekananda Rock Memorial'
          }
        }
      ]
    },
    {
      id: 'BK-4402',
      type: 'ticket',
      status: 'CONFIRMED',
      totalAmount: 150,
      tickets: [
        {
          id: 'TK-4402',
          visitDate: new Date(Date.now() + 86400000 * 3).toISOString(),
          ticketType: 'ADULT',
          quantity: 3,
          qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BK-4402_TK-4402',
          destination: {
            nameEn: 'Padmanabhapuram Palace'
          }
        }
      ]
    },
    {
      id: 'BK-5601',
      type: 'ticket',
      status: 'COMPLETED',
      totalAmount: 40,
      tickets: [
        {
          id: 'TK-2391',
          visitDate: new Date(Date.now() - 86400000 * 5).toISOString(),
          ticketType: 'ADULT',
          quantity: 2,
          qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BK-5601_TK-2391',
          destination: {
            nameEn: 'Thirparappu Waterfalls'
          }
        }
      ]
    },
    {
      id: 'BK-HTL-7749',
      type: 'hotel',
      status: 'CONFIRMED',
      hotelName: 'Hotel Tamil Nadu (TTDC)',
      name: 'John Doe',
      phone: '9876543210',
      checkInDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      nights: 2,
      totalAmount: 5000,
      createdAt: new Date().toISOString(),
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BK-HTL-7749_1'
    },
    {
      id: 'BK-RNT-1102',
      type: 'rental',
      status: 'CONFIRMED',
      rentalType: 'Bike',
      name: 'John Doe',
      phone: '9876543210',
      startDate: new Date(Date.now() + 86400000 * 1).toISOString(),
      totalAmount: 400,
      createdAt: new Date().toISOString(),
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=BK-RNT-1102_bike'
    }
  ]

  if (!user) return null

  const handleLogout = () => {
    logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-granite-50 pb-16">
      
      {/* Dashboard Grid Layout - Hidden during printing */}
      <div className="pt-24 print:hidden container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 1. Profile Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-6">
            <div className="text-center space-y-2 border-b border-granite-100 pb-5">
              <div className="w-16 h-16 rounded-full bg-[#0B4F8A] text-white flex items-center justify-center mx-auto text-heading-xl font-bold font-serif">
                {user.name.charAt(0)}
              </div>
              <h2 className="font-serif text-heading-sm text-granite-900 font-bold">{user.name}</h2>
              <span className="bg-[#0B4F8A]/10 text-[#0B4F8A] px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">{user.role}</span>
            </div>

            <div className="space-y-3.5 text-body-sm text-granite-600 font-sans font-medium">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#0B4F8A]" />
                <span className="truncate">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#0B4F8A]" />
                  <span>{user.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0B4F8A]" />
                <span>Verified Account</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-body-sm transition-colors flex items-center justify-center gap-2 font-sans"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>

          {/* 2. Main Panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-granite-200 gap-1 md:gap-3">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-4 py-3 font-semibold text-body-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'bookings' ? 'border-[#0B4F8A] text-[#0B4F8A] font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                <Ticket className="w-4 h-4" /> Monument Tickets
              </button>
              <button
                onClick={() => setActiveTab('hotels')}
                className={`px-4 py-3 font-semibold text-body-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'hotels' ? 'border-[#0B4F8A] text-[#0B4F8A] font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                <Calendar className="w-4 h-4" /> Hotel Stays
              </button>
              <button
                onClick={() => setActiveTab('rentals')}
                className={`px-4 py-3 font-semibold text-body-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'rentals' ? 'border-[#0B4F8A] text-[#0B4F8A] font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                <Compass className="w-4 h-4" /> Vehicle Rentals
              </button>
              <button
                onClick={() => setActiveTab('itineraries')}
                className={`px-4 py-3 font-semibold text-body-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'itineraries' ? 'border-[#0B4F8A] text-[#0B4F8A] font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                <Clock className="w-4 h-4" /> Saved Itineraries
              </button>
            </div>

            {/* Tab contents */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.filter((b: any) => b.type === 'ticket').length > 0 ? (
                  bookings.filter((b: any) => b.type === 'ticket').map((booking: any) => (
                    <div key={booking.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap font-sans">
                          <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ticket {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400 font-bold">ID: {booking.id}</span>
                        </div>
                        
                        {booking.tickets && booking.tickets.map((t: any) => (
                          <div key={t.id} className="space-y-1 pt-1 font-sans">
                            <h4 className="font-semibold text-body-sm text-granite-850">
                              {t.destination?.nameEn || 'Attraction Entry Pass'}
                            </h4>
                            <div className="flex flex-wrap gap-4 text-caption text-granite-400">
                              <span className="flex items-center gap-1 font-semibold">
                                <Calendar className="w-3.5 h-3.5" />
                                {new Date(t.visitDate).toLocaleDateString('en-IN')}
                              </span>
                              <span className="capitalize font-bold text-slate-600">Category: {t.ticketType.toLowerCase().replace('_', ' ')} (x{t.quantity})</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="md:text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 font-sans">
                        <div>
                          <span className="block text-caption text-granite-400 font-medium">Amount Paid</span>
                          <span className="text-body-lg font-bold text-granite-900">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        {booking.tickets && booking.tickets.length > 0 && (
                          <button
                            onClick={() => {
                              setActiveBooking(booking)
                              setSelectedTicketIndex(0)
                              setActiveTicket({
                                ...booking.tickets[0],
                                type: 'ticket',
                                id: booking.id
                              })
                            }}
                            className="px-4 py-2 bg-[#C9981A] hover:bg-amber-600 text-white font-bold rounded-xl text-caption transition-all shadow-sm"
                          >
                            View Ticket Passes
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-granite-100 font-sans">
                    <Ticket className="w-12 h-12 text-granite-300 mx-auto mb-3" />
                    <h3 className="font-serif text-heading-sm text-granite-800">No Bookings Yet</h3>
                    <p className="text-body-sm text-granite-500 mb-6 max-w-xs mx-auto">
                      You haven&apos;t booked any entry tickets. Explore destinations to plan your visit!
                    </p>
                    <Link href="/explore" className="btn-primary py-2 px-6 text-body-sm font-sans font-bold">
                      Browse Places
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-4">
                {bookings.filter((b: any) => b.type === 'hotel').length > 0 ? (
                  bookings.filter((b: any) => b.type === 'hotel').map((booking: any) => (
                    <div key={booking.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap font-sans">
                          <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Stay {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400 font-bold">ID: {booking.id}</span>
                        </div>
                        
                        <div className="space-y-1 pt-1 font-sans">
                          <h4 className="font-semibold text-body-sm text-granite-850">
                            {booking.hotelName}
                          </h4>
                          <div className="flex flex-wrap gap-4 text-caption text-granite-400 font-sans">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Check-in: {new Date(booking.checkInDate).toLocaleDateString('en-IN')}
                            </span>
                            <span className="font-bold">Duration: {booking.nights} Night{booking.nights > 1 ? 's' : ''}</span>
                            <span>Guest: {booking.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 font-sans">
                        <div>
                          <span className="block text-caption text-granite-400 font-medium">Est. Total Cost</span>
                          <span className="text-body-lg font-bold text-granite-900">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setActiveBooking(null)
                            setActiveTicket({
                              id: booking.id,
                              type: 'hotel',
                              qrCodeUrl: booking.qrCodeUrl,
                              hotelName: booking.hotelName,
                              checkInDate: booking.checkInDate,
                              nights: booking.nights
                            })
                          }}
                          className="px-4 py-2 bg-[#C9981A] hover:bg-amber-600 text-white font-bold rounded-xl text-caption transition-all shadow-sm"
                        >
                          View Booking QR
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-granite-100 font-sans font-medium">
                    <Calendar className="w-12 h-12 text-granite-300 mx-auto mb-3" />
                    <h3 className="font-serif text-heading-sm text-granite-800">No Hotel Bookings</h3>
                    <p className="text-body-sm text-granite-500 mb-6 max-w-xs mx-auto">
                      You haven&apos;t booked any stays yet. Explore beautiful beachfront hotels!
                    </p>
                    <Link href="/stay" className="btn-primary py-2 px-6 text-body-sm font-bold">
                      Browse Stays
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rentals' && (
              <div className="space-y-4 font-sans font-medium">
                {bookings.filter((b: any) => b.type === 'rental').length > 0 ? (
                  bookings.filter((b: any) => b.type === 'rental').map((booking: any) => (
                    <div key={booking.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap font-sans">
                          <span className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border border-emerald-100">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Rental {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400 font-bold">ID: {booking.id}</span>
                        </div>
                        
                        <div className="space-y-1 pt-1 font-sans">
                          <h4 className="font-semibold text-body-sm text-granite-850">
                            {booking.rentalType} Rental
                          </h4>
                          <div className="flex flex-wrap gap-4 text-caption text-granite-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Start Date: {new Date(booking.startDate).toLocaleDateString('en-IN')}
                            </span>
                            <span>Renter: {booking.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-3 md:pt-0 font-sans">
                        <div>
                          <span className="block text-caption text-granite-400 font-medium">Est. Daily Rate</span>
                          <span className="text-body-lg font-bold text-granite-900">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            setActiveBooking(null)
                            setActiveTicket({
                              id: booking.id,
                              type: 'rental',
                              qrCodeUrl: booking.qrCodeUrl,
                              rentalType: booking.rentalType,
                              startDate: booking.startDate
                            })
                          }}
                          className="px-4 py-2 bg-[#C9981A] hover:bg-amber-600 text-white font-bold rounded-xl text-caption transition-all shadow-sm"
                        >
                          View Rental QR
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-granite-100">
                    <Compass className="w-12 h-12 text-granite-300 mx-auto mb-3" />
                    <h3 className="font-serif text-heading-sm text-granite-800">No Rental Bookings</h3>
                    <p className="text-body-sm text-granite-500 mb-6 max-w-xs mx-auto font-sans font-medium">
                      You haven&apos;t booked any self-drive bikes or cab rentals yet.
                    </p>
                    <Link href="/rentals" className="btn-primary py-2 px-6 text-body-sm font-bold">
                      Browse Rentals
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'itineraries' && (
              <div className="space-y-4 font-sans font-medium font-sans font-medium">
                {[
                  {
                    id: 'IT-4029',
                    title: 'Short Weekend Kumari Getaway',
                    days: 2,
                    budget: 8000,
                    createdAt: '2026-07-15',
                  },
                  {
                    id: 'IT-1192',
                    title: 'Ultimate Coastal Explorations',
                    days: 4,
                    budget: 18000,
                    createdAt: '2026-07-11',
                  }
                ].map((itinerary) => (
                  <div key={itinerary.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1 font-sans font-medium">
                      <div className="flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">SAVED PLAN</span>
                        <span className="text-[11px] text-granite-400 font-bold">ID: {itinerary.id}</span>
                      </div>
                      <h4 className="font-semibold text-body-sm text-granite-800">{itinerary.title}</h4>
                      <p className="text-caption text-granite-400">Duration: {itinerary.days} Days | Budget Cap: {formatCurrency(itinerary.budget)}</p>
                    </div>
                    <Link href={`/plan?id=${itinerary.id}`} className="px-3.5 py-1.5 bg-[#0B4F8A]/10 hover:bg-[#0B4F8A]/20 text-[#0B4F8A] font-bold rounded-xl text-caption transition-colors">
                      Open Planner
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Boarding Pass Modal */}
      {activeTicket && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto overflow-x-hidden print:bg-white print:absolute print:inset-0 print:z-[9999] print:flex print:items-start print:justify-center print:p-0 print:m-0">
          <div className="relative w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-[24px] shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in duration-300 print:shadow-none print:rounded-none print-container-ticket print:border-none print:w-full print:max-w-full print:m-0">
            
            {/* Close Button - Absolute */}
            <button
              onClick={() => {
                setActiveTicket(null)
                setActiveBooking(null)
              }}
              className="absolute top-3 right-3 md:top-4 md:right-4 text-white hover:text-gray-200 font-bold z-10 p-2 bg-black/20 rounded-full md:text-granite-400 md:bg-white md:hover:bg-granite-100 md:hover:text-granite-600 transition-colors shadow-sm print:hidden"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Section (Main Ticket Body) */}
            <div className="flex-1 flex flex-col relative bg-white min-w-0">
              {/* Red Header */}
              <div className="bg-[#D32F2F] text-white px-6 py-5 md:px-8 md:py-6 flex justify-between items-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                <div className="flex items-center gap-3 relative z-10">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Ticket className="w-5 h-5 rotate-[-45deg]" />
                  </div>
                  <h2 className="font-bold text-lg md:text-xl tracking-widest">KANYAKUMARI PASS</h2>
                </div>
                <div className="border border-white/40 px-3 py-1 rounded text-[10px] md:text-xs font-bold tracking-widest uppercase relative z-10 bg-black/10">
                   {activeTicket.type === 'hotel' ? 'STAY PASS' : activeTicket.type === 'rental' ? 'RENTAL PASS' : 'ENTRY PASS'}
                </div>
              </div>

              {/* Tickets Switcher Tab (If booking has multiple tickets e.g. adult, camera, parking) */}
              {activeBooking && activeBooking.tickets && activeBooking.tickets.length > 1 && (
                <div className="flex gap-2 p-3 bg-slate-50 border-b border-slate-100 overflow-x-auto print:hidden font-sans">
                  {activeBooking.tickets.map((t: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedTicketIndex(idx)
                        setActiveTicket({
                          ...t,
                          type: 'ticket',
                          id: activeBooking.id
                        })
                      }}
                      className={`px-3 py-1 rounded-lg text-caption font-bold transition-all whitespace-nowrap ${
                        selectedTicketIndex === idx
                          ? 'bg-[#D32F2F] text-white shadow-sm'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      🎫 {t.ticketType.replace('_', ' ')} (x{t.quantity})
                    </button>
                  ))}
                </div>
              )}

              {/* Ticket Details */}
              <div className="p-6 md:p-8 space-y-8">
                
                <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
                  {/* Passenger Name */}
                  <div className="space-y-1.5 min-w-[140px]">
                    <p className="text-[10px] md:text-[11px] font-bold text-granite-400 tracking-widest uppercase">PASSENGER NAME</p>
                    <p className="font-bold text-lg md:text-xl text-granite-900 uppercase tracking-wide">{user.name}</p>
                  </div>
                  
                  {/* Destination Equivalent */}
                  <div className="space-y-1.5 flex-1">
                    <p className="text-[10px] md:text-[11px] font-bold text-granite-400 tracking-widest uppercase">
                       {activeTicket.type === 'hotel' ? 'HOTEL / ACCOMMODATION' : activeTicket.type === 'rental' ? 'VEHICLE / VENDOR' : 'DESTINATION / MONUMENT'}
                    </p>
                    <p className="font-bold text-lg md:text-xl text-granite-900 uppercase truncate tracking-wide">
                      {activeTicket.type === 'hotel' 
                        ? activeTicket.hotelName 
                        : activeTicket.type === 'rental' 
                          ? `${activeTicket.rentalType} Rental` 
                          : activeTicket.destination?.nameEn || 'Destination'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-granite-100">
                   {/* Date */}
                   <div className="space-y-1.5">
                     <p className="text-[10px] font-bold text-granite-400 tracking-widest uppercase">
                       {activeTicket.type === 'hotel' ? 'CHECK-IN' : activeTicket.type === 'rental' ? 'START DATE' : 'VISIT DATE'}
                     </p>
                     <p className="font-bold text-base md:text-lg text-granite-900">
                       {new Date(activeTicket.checkInDate || activeTicket.startDate || activeTicket.visitDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                     </p>
                   </div>
                   
                   {/* Time or Duration */}
                   <div className="space-y-1.5">
                     <p className="text-[10px] font-bold text-granite-400 tracking-widest uppercase">
                        {activeTicket.type === 'hotel' ? 'DURATION' : 'TIME'}
                     </p>
                     <p className="font-bold text-base md:text-lg text-granite-900 uppercase">
                        {activeTicket.type === 'hotel' ? `${activeTicket.nights} NIGHTS` : '09:00 AM'}
                     </p>
                   </div>

                   {/* Type */}
                   <div className="space-y-1.5">
                     <p className="text-[10px] font-bold text-granite-400 tracking-widest uppercase">
                        {activeTicket.type === 'rental' ? 'TYPE' : 'CLASS'}
                     </p>
                     <p className="font-bold text-base md:text-lg text-granite-900 uppercase">
                        {activeTicket.ticketType?.replace('_', ' ') || 'STANDARD'}
                     </p>
                   </div>

                   {/* Quantity */}
                   <div className="space-y-1.5">
                     <p className="text-[10px] font-bold text-granite-400 tracking-widest uppercase">QTY / GUEST</p>
                     <p className="font-bold text-base md:text-lg text-granite-900 uppercase">
                       {activeTicket.quantity || 1} PAX
                     </p>
                   </div>
                </div>

                {/* Ticket ID */}
                <div className="pt-4 flex items-center justify-between border-t border-granite-100">
                   <div>
                     <p className="text-[10px] md:text-xs font-bold text-granite-400 tracking-widest uppercase mb-1">UNIQUE PASS ID NO.</p>
                     <p className="font-mono font-bold text-lg md:text-xl text-granite-800 tracking-widest">{activeTicket.id}</p>
                   </div>
                   <div className="hidden sm:flex flex-col gap-1 opacity-20">
                     {/* Fake Barcode Lines for aesthetics */}
                     <div className="flex gap-1 h-8">
                       {[...Array(15)].map((_, i) => (
                         <div key={i} className={`bg-black ${i % 2 === 0 ? 'w-1' : 'w-2'} ${i % 3 === 0 ? 'w-0.5' : ''}`}></div>
                       ))}
                     </div>
                   </div>
                </div>

                {/* Print & Download buttons */}
                <div className="pt-6 border-t border-slate-100 flex gap-3 print:hidden font-sans">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-2.5 bg-[#0B4F8A] hover:bg-opacity-95 text-white font-bold rounded-xl text-caption flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <FileText className="w-4 h-4" /> Print Ticket Pass (PDF)
                  </button>
                  
                  <a
                    href={activeTicket.qrCodeUrl}
                    download={`pass-${activeTicket.id || activeTicket.type}.png`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-caption flex items-center justify-center gap-2 transition-all"
                  >
                    Download QR Code
                  </a>
                </div>

              </div>
            </div>

            {/* Dashed Divider */}
            <div className="hidden md:flex flex-col items-center justify-center w-10 relative bg-white print:hidden">
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0 border-l-2 border-dashed border-granite-200"></div>
              {/* Semi-circle cutouts (colored as background to look cut out) */}
              <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#333] opacity-60 rounded-full mix-blend-overlay"></div>
              <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-10 h-10 bg-[#333] opacity-60 rounded-full mix-blend-overlay"></div>
            </div>
            
            {/* Mobile Divider */}
            <div className="md:hidden flex items-center justify-center h-10 relative w-full overflow-hidden bg-white print:hidden">
               <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0 border-t-2 border-dashed border-granite-200"></div>
               <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-[#333] opacity-60 rounded-full mix-blend-overlay"></div>
               <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 bg-[#333] opacity-60 rounded-full mix-blend-overlay"></div>
            </div>

            {/* Right Section (Stub & QR) */}
            <div className="w-full md:w-64 flex-shrink-0 bg-granite-50 flex flex-col print:bg-white print:border-l print:border-slate-300">
               <div className="bg-[#D32F2F] text-white p-4 h-[64px] md:h-[88px] flex items-center justify-center border-l border-white/20 print:bg-[#D32F2F] print:text-white">
                  <p className="font-bold text-sm tracking-widest uppercase">BOARDING PASS</p>
               </div>
               
               <div className="flex-1 p-4 md:p-6 flex flex-col items-center justify-center space-y-5">
                  <div className="bg-white p-3 rounded-2xl border border-granite-200 shadow-sm inline-block print:border-none print:shadow-none">
                    <img
                      src={activeTicket.qrCodeUrl}
                      alt="Booking QR Code"
                      className="w-32 h-32 md:w-36 md:h-36 mx-auto mix-blend-multiply"
                    />
                  </div>
                  <div className="text-center w-full font-sans">
                    <p className="text-[10px] font-bold text-[#D32F2F] uppercase tracking-widest mb-1.5">SCAN AT ENTRY GATE</p>
                    <div className="flex gap-1 justify-center h-6 opacity-30 mb-2 print:hidden">
                       {[...Array(20)].map((_, i) => (
                         <div key={i} className={`bg-black ${i % 2 === 0 ? 'w-0.5' : 'w-[3px]'} ${i % 5 === 0 ? 'w-1' : ''}`}></div>
                       ))}
                    </div>
                    <p className="font-mono text-xs font-bold text-granite-600 tracking-[0.2em]">{activeTicket.id.split('-').pop()}</p>
                  </div>
               </div>
            </div>
            
          </div>
        </div>
      )}

    </div>
  )
}
