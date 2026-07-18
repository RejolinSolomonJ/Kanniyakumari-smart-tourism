'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Ticket, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react'
import { destinations } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'

export default function BookTicketsPage() {
  // Only show destinations that have entry fees (ticketed)
  const ticketedDestinations = destinations.filter(
    d => d.entryFeeAdult !== undefined && d.entryFeeAdult > 0
  )

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="w-12 h-12 bg-gold-50 text-gold-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <Ticket className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Online Ticket Booking
          </h1>
          <p className="text-body-sm text-granite-500">
            Pre-book entry tickets for historical monuments, reserves, and waterfalls in Kanyakumari. Skip the long ticket queues.
          </p>
        </div>

        {/* List of Ticketed Places */}
        <div className="space-y-6">
          {ticketedDestinations.map((dest) => (
            <div 
              key={dest.id} 
              className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col md:flex-row gap-5 items-start justify-between group"
            >
              <div className="flex gap-4 items-start">
                <img 
                  src={dest.heroImage} 
                  alt={dest.nameEn} 
                  className="w-24 h-24 rounded-xl object-cover border border-granite-200 flex-shrink-0"
                />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-heading-sm text-granite-900 group-hover:text-ocean transition-colors">
                      {dest.nameEn}
                    </h3>
                    <span className="badge bg-ocean-50 text-ocean text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {dest.category}
                    </span>
                  </div>
                  <p className="text-caption text-granite-400 font-tamil leading-none">
                    {dest.nameTa}
                  </p>
                  <p className="text-body-sm text-granite-650 line-clamp-2">
                    {dest.descriptionEn}
                  </p>
                  <div className="flex flex-wrap gap-4 text-caption text-granite-400 font-semibold pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-ocean" /> {dest.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" /> {dest.openingHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:text-right flex flex-col justify-between h-full w-full md:w-auto mt-4 md:mt-0 gap-3 border-t md:border-t-0 pt-4 md:pt-0">
                <div>
                  <span className="block text-caption text-granite-400">Adult Entry Fee</span>
                  <span className="text-body-lg font-bold text-granite-900">
                    {formatCurrency(dest.entryFeeAdult || 0)}
                  </span>
                </div>
                <Link 
                  href={`/explore/${dest.slug}#booking-section`}
                  className="btn-gold py-2 px-5 text-body-sm font-semibold whitespace-nowrap flex items-center gap-1"
                >
                  Book Tickets <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-12 bg-blue-50 border border-blue-200/50 p-6 rounded-2xl flex gap-4 items-start max-w-4xl mx-auto">
          <ShieldCheck className="w-6 h-6 text-ocean flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-body-sm text-ocean">Secure Digital Ticketing</h4>
            <p className="text-caption text-granite-600 leading-relaxed">
              All bookings are processed securely. Digital QR passes will be generated instantly in your profile dashboard upon successful payment. Present the QR code on your phone at entry gates.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
