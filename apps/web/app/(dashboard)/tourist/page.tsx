'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/auth'
import { 
  User, Ticket, Calendar, Clock, MapPin, 
  Compass, ArrowRight, ShieldCheck, Mail, Phone, LogOut, CheckCircle2 
} from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default function TouristDashboard() {
  const { user, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'bookings' | 'hotels' | 'rentals' | 'itineraries'>('bookings')
  const [bookings, setBookings] = useState<any[]>([])
  const [activeTicket, setActiveTicket] = useState<any>(null)

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
      window.location.href = '/login'
      return
    }

    const localSaved = JSON.parse(localStorage.getItem('local_bookings') || '[]')

    fetch('http://localhost:5000/api/bookings/user', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        let combined = []
        if (Array.isArray(data) && data.length > 0) {
          combined = [...data.map((d: any) => ({ ...d, type: d.type || 'ticket' })), ...localSaved]
        } else {
          combined = [...localSaved]
        }
        
        const hasTickets = combined.some((b: any) => b.type === 'ticket')
        const hasHotels = combined.some((b: any) => b.type === 'hotel')
        const hasRentals = combined.some((b: any) => b.type === 'rental')

        if (!hasTickets) combined.push(...getSimulatedBookings().filter(b => b.type === 'ticket'))
        if (!hasHotels) combined.push(...getSimulatedBookings().filter(b => b.type === 'hotel'))
        if (!hasRentals) combined.push(...getSimulatedBookings().filter(b => b.type === 'rental'))

        setBookings(combined)
      })
      .catch(err => {
        let combined = [...localSaved]
        const hasTickets = combined.some((b: any) => b.type === 'ticket')
        const hasHotels = combined.some((b: any) => b.type === 'hotel')
        const hasRentals = combined.some((b: any) => b.type === 'rental')

        if (!hasTickets) combined.push(...getSimulatedBookings().filter(b => b.type === 'ticket'))
        if (!hasHotels) combined.push(...getSimulatedBookings().filter(b => b.type === 'hotel'))
        if (!hasRentals) combined.push(...getSimulatedBookings().filter(b => b.type === 'rental'))

        setBookings(combined)
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
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* 1. Profile Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-6">
            <div className="text-center space-y-2 border-b border-granite-100 pb-5">
              <div className="w-16 h-16 rounded-full bg-gradient-ocean text-white flex items-center justify-center mx-auto text-heading-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <h2 className="font-serif text-heading-sm text-granite-900 font-bold">{user.name}</h2>
              <span className="badge-ocean text-[11px] uppercase tracking-wider">{user.role}</span>
            </div>

            <div className="space-y-3.5 text-body-sm text-granite-600">
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
                <ShieldCheck className="w-4 h-4 text-ocean" />
                <span>Verified Account</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-2.5 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-xl text-body-sm transition-colors flex items-center justify-center gap-2"
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
                  activeTab === 'bookings' ? 'border-ocean text-ocean font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                <Ticket className="w-4 h-4" /> Monument Tickets
              </button>
              <button
                onClick={() => setActiveTab('hotels')}
                className={`px-4 py-3 font-semibold text-body-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'hotels' ? 'border-ocean text-ocean font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                <Calendar className="w-4 h-4" /> Hotel Stays
              </button>
              <button
                onClick={() => setActiveTab('rentals')}
                className={`px-4 py-3 font-semibold text-body-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'rentals' ? 'border-ocean text-ocean font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                <Compass className="w-4 h-4" /> Vehicle Rentals
              </button>
              <button
                onClick={() => setActiveTab('itineraries')}
                className={`px-4 py-3 font-semibold text-body-sm border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'itineraries' ? 'border-ocean text-ocean font-bold' : 'border-transparent text-granite-500 hover:text-granite-800'
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="badge-sea bg-sea-50 text-sea flex items-center gap-1 font-semibold text-caption">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Ticket {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400">ID: {booking.id}</span>
                        </div>
                        
                        {booking.tickets && booking.tickets.map((t: any) => (
                          <div key={t.id} className="space-y-1 pt-1">
                            <h4 className="font-semibold text-body-sm text-granite-800">
                              {t.destination.nameEn}
                            </h4>
                            <div className="flex flex-wrap gap-4 text-caption text-granite-400">
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
                          <span className="block text-caption text-granite-400">Amount Paid</span>
                          <span className="text-body-lg font-bold text-granite-900">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        {booking.tickets && booking.tickets.length > 0 && (
                          <button
                            onClick={() => setActiveTicket({
                              ...booking.tickets[0],
                              type: 'ticket',
                              id: booking.id
                            })}
                            className="btn-gold py-1.5 px-4 text-caption font-bold"
                          >
                            View Ticket QR
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-granite-100">
                    <Ticket className="w-12 h-12 text-granite-300 mx-auto mb-3" />
                    <h3 className="font-serif text-heading-sm text-granite-800">No Bookings Yet</h3>
                    <p className="text-body-sm text-granite-500 mb-6 max-w-xs mx-auto">
                      You haven&apos;t booked any entry tickets. Explore destinations to plan your visit!
                    </p>
                    <Link href="/explore" className="btn-primary py-2 px-6 text-body-sm">
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
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="badge-sea bg-sea-50 text-sea flex items-center gap-1 font-semibold text-caption">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Stay {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400">ID: {booking.id}</span>
                        </div>
                        
                        <div className="space-y-1 pt-1">
                          <h4 className="font-semibold text-body-sm text-granite-800">
                            {booking.hotelName}
                          </h4>
                          <div className="flex flex-wrap gap-4 text-caption text-granite-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              Check-in: {new Date(booking.checkInDate).toLocaleDateString('en-IN')}
                            </span>
                            <span>{booking.nights} Night{booking.nights > 1 ? 's' : ''}</span>
                            <span>Guest: {booking.name}</span>
                          </div>
                        </div>
                      </div>

                      <div className="md:text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                        <div>
                          <span className="block text-caption text-granite-400">Est. Total Cost</span>
                          <span className="text-body-lg font-bold text-granite-900">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveTicket({
                            id: booking.id,
                            type: 'hotel',
                            qrCodeUrl: booking.qrCodeUrl,
                            hotelName: booking.hotelName,
                            checkInDate: booking.checkInDate,
                            nights: booking.nights
                          })}
                          className="btn-gold py-1.5 px-4 text-caption font-bold"
                        >
                          View Booking QR
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 bg-white rounded-2xl border border-granite-100">
                    <Calendar className="w-12 h-12 text-granite-300 mx-auto mb-3" />
                    <h3 className="font-serif text-heading-sm text-granite-800">No Hotel Bookings</h3>
                    <p className="text-body-sm text-granite-500 mb-6 max-w-xs mx-auto">
                      You haven&apos;t booked any stays yet. Explore beautiful beachfront hotels!
                    </p>
                    <Link href="/stay" className="btn-primary py-2 px-6 text-body-sm">
                      Browse Stays
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'rentals' && (
              <div className="space-y-4">
                {bookings.filter((b: any) => b.type === 'rental').length > 0 ? (
                  bookings.filter((b: any) => b.type === 'rental').map((booking: any) => (
                    <div key={booking.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="badge-sea bg-sea-50 text-sea flex items-center gap-1 font-semibold text-caption">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Rental {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400">ID: {booking.id}</span>
                        </div>
                        
                        <div className="space-y-1 pt-1">
                          <h4 className="font-semibold text-body-sm text-granite-800">
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

                      <div className="md:text-right flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                        <div>
                          <span className="block text-caption text-granite-400">Est. Daily Rate</span>
                          <span className="text-body-lg font-bold text-granite-900">
                            {formatCurrency(booking.totalAmount)}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveTicket({
                            id: booking.id,
                            type: 'rental',
                            qrCodeUrl: booking.qrCodeUrl,
                            rentalType: booking.rentalType,
                            startDate: booking.startDate
                          })}
                          className="btn-gold py-1.5 px-4 text-caption font-bold"
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
                    <p className="text-body-sm text-granite-500 mb-6 max-w-xs mx-auto">
                      You haven&apos;t booked any self-drive bikes or cab rentals yet.
                    </p>
                    <Link href="/rentals" className="btn-primary py-2 px-6 text-body-sm">
                      Browse Rentals
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'itineraries' && (
              <div className="space-y-4">
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
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="badge-gold bg-gold-50 text-gold-700 font-semibold text-[10px] uppercase">
                          AI Planned
                        </span>
                        <span className="text-[11px] text-granite-400">ID: {itinerary.id}</span>
                      </div>
                      <h4 className="font-semibold text-body-sm text-granite-800">
                        {itinerary.title}
                      </h4>
                      <p className="text-caption text-granite-400">
                        Created on: {new Date(itinerary.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-3 border-t md:border-t-0 pt-3 md:pt-0">
                      <div className="md:text-right">
                        <span className="block text-caption text-granite-400">Duration / Budget</span>
                        <span className="text-body-sm font-bold text-granite-900">
                          {itinerary.days} Days / {formatCurrency(itinerary.budget)}
                        </span>
                      </div>
                      <Link
                        href="/plan"
                        className="text-ocean font-semibold text-caption hover:underline flex items-center gap-0.5"
                      >
                        Open Planner →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Booking QR Modal */}
      {activeTicket && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg border text-center space-y-6">
            
            <div className="flex justify-between items-start border-b border-granite-100 pb-3 text-left">
              <div>
                <h3 className="font-serif text-heading text-granite-800">
                  {activeTicket.type === 'hotel' ? 'Hotel Booking QR' : activeTicket.type === 'rental' ? 'Rental Booking QR' : 'Entry Ticket QR'}
                </h3>
                <p className="text-caption text-granite-400">ID: {activeTicket.id}</p>
              </div>
              <button
                onClick={() => setActiveTicket(null)}
                className="text-granite-400 hover:text-granite-600 font-bold"
              >
                ✕
              </button>
            </div>

            {/* QR Code Container */}
            <div className="bg-granite-50 p-4 rounded-xl border border-granite-200 inline-block">
              <img
                src={activeTicket.qrCodeUrl}
                alt="Booking QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-body-sm text-granite-800">
                {activeTicket.type === 'hotel' 
                  ? activeTicket.hotelName 
                  : activeTicket.type === 'rental' 
                    ? `${activeTicket.rentalType} Rental` 
                    : `${activeTicket.ticketType || 'Adult'} Ticket × ${activeTicket.quantity || 1} Qty`}
              </h4>
              <p className="text-caption text-granite-500">
                {activeTicket.type === 'hotel' 
                  ? `Check-in: ${new Date(activeTicket.checkInDate).toLocaleDateString('en-IN')} (${activeTicket.nights} Nights)`
                  : activeTicket.type === 'rental'
                    ? `Start Date: ${new Date(activeTicket.startDate).toLocaleDateString('en-IN')}`
                    : `Visit Date: ${new Date(activeTicket.visitDate).toLocaleDateString('en-IN')}`
                }
              </p>
            </div>

            <p className="text-[10px] text-granite-400">
              {activeTicket.type === 'hotel'
                ? 'Present this QR code at the hotel reception upon check-in.'
                : activeTicket.type === 'rental'
                  ? 'Present this QR code to the vehicle vendor to coordinate pickup.'
                  : 'Present this QR code at the monument entry gate. It will be scanned by the Site Manager.'
              }
            </p>

          </div>
        </div>
      )}

    </div>
  )
}
