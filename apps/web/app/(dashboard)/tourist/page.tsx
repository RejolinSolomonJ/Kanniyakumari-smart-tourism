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
  const [activeTab, setActiveTab] = useState<'bookings' | 'itineraries'>('bookings')
  const [bookings, setBookings] = useState<any[]>([])
  const [activeTicket, setActiveTicket] = useState<any>(null)

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
            <div className="flex border-b border-granite-200">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 font-semibold text-body-sm border-b-2 transition-colors ${
                  activeTab === 'bookings' ? 'border-ocean text-ocean' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                Ticket Bookings
              </button>
              <button
                onClick={() => setActiveTab('itineraries')}
                className={`px-6 py-3 font-semibold text-body-sm border-b-2 transition-colors ${
                  activeTab === 'itineraries' ? 'border-ocean text-ocean' : 'border-transparent text-granite-500 hover:text-granite-800'
                }`}
              >
                Saved Itineraries
              </button>
            </div>

            {/* Tab contents */}
            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking: any) => (
                    <div key={booking.id} className="bg-white p-5 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="badge-sea bg-sea-50 text-sea flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Booking {booking.status}
                          </span>
                          <span className="text-[11px] text-granite-400">ID: {booking.id}</span>
                        </div>
                        
                        {booking.tickets.map((t: any) => (
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
                        {booking.tickets.length > 0 && (
                          <button
                            onClick={() => setActiveTicket(booking.tickets[0])}
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

            {activeTab === 'itineraries' && (
              <div className="text-center py-16 bg-white rounded-2xl border border-granite-100">
                <Compass className="w-12 h-12 text-granite-300 mx-auto mb-3" />
                <h3 className="font-serif text-heading-sm text-granite-800">No Saved Itineraries</h3>
                <p className="text-body-sm text-granite-500 mb-6 max-w-xs mx-auto">
                  Use our AI Trip Planner to create and save custom day timelines.
                </p>
                <Link href="/plan" className="btn-gold py-2 px-6 text-body-sm">
                  Launch AI Planner
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
                <h3 className="font-serif text-heading text-granite-800">Entry Ticket QR</h3>
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
                alt="Ticket QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-body-sm text-granite-800">{activeTicket.ticketType} Ticket × {activeTicket.quantity} Qty</h4>
              <p className="text-caption text-granite-500">
                Visit Date: {new Date(activeTicket.visitDate).toLocaleDateString('en-IN')}
              </p>
            </div>

            <p className="text-[10px] text-granite-400">
              Present this QR code at the monument entry gate. It will be scanned by the Site Manager.
            </p>

          </div>
        </div>
      )}

    </div>
  )
}
