'use client'

import { motion } from 'framer-motion'
import { Car, Bike, Shield, FileText } from 'lucide-react'

export default function RentalsPage() {
  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Vehicle Rentals
          </h1>
          <p className="text-body-sm text-granite-500">
            Rent cars, self-drive bikes, or hire local cabs for comfortable transit across Kanyakumari district.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Bike Rental */}
          <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center">
                <Bike className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-heading-sm text-granite-900">Self-Drive Scooters & Bikes</h3>
              <p className="text-body-sm text-granite-600 leading-relaxed">
                Rent gearless scooters (Activa, Jupiter) or motorbikes for easy sightseeing in Kanyakumari town and coastal roads. Flexible hourly/daily rates.
              </p>
              <ul className="text-caption text-granite-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">✓ Valid Driving License required</li>
                <li className="flex items-center gap-2">✓ Helmet provided with vehicle</li>
                <li className="flex items-center gap-2">✓ Starting from ₹400/day</li>
              </ul>
            </div>
            <button onClick={() => alert('Bike rental booking contacts will be updated in Phase 2.')} className="btn-gold w-full mt-6 py-2.5 text-body-sm font-semibold">
              Inquire Bike Rental
            </button>
          </div>

          {/* Car / Cab rental */}
          <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-heading-sm text-granite-900">Tourist Cabs & Self-Drive Cars</h3>
              <p className="text-body-sm text-granite-600 leading-relaxed">
                Pre-book certified tourist cabs with experienced drivers for sightseeing to Padmanabhapuram Palace, Mathoor Hanging Bridge, and waterfalls.
              </p>
              <ul className="text-caption text-granite-500 space-y-1.5 pt-2">
                <li className="flex items-center gap-2">✓ AC Hatchback / Sedan / SUV</li>
                <li className="flex items-center gap-2">✓ Fixed pricing plans available</li>
                <li className="flex items-center gap-2">✓ Starting from ₹2,500/day</li>
              </ul>
            </div>
            <button onClick={() => alert('Cab booking services will be live in Phase 2.')} className="btn-primary w-full mt-6 py-2.5 text-body-sm font-semibold">
              Inquire Cab Rental
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
