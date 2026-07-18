'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Bike, Shield, FileText, X, CheckCircle } from 'lucide-react'

export default function RentalsPage() {
  const [activeRental, setActiveRental] = useState<'bike' | 'car' | null>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeRental) return

    const bookingId = 'BK-RNT-' + Math.floor(1000 + Math.random() * 9000);
    const pricePerDay = activeRental === 'bike' ? 400 : 2500;
    const localBooking = {
      id: bookingId,
      type: 'rental',
      status: 'CONFIRMED',
      rentalType: activeRental === 'bike' ? 'Bike' : 'Cab / Car',
      name: name,
      phone: phone,
      startDate: date,
      totalAmount: pricePerDay,
      createdAt: new Date().toISOString(),
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${bookingId}_${activeRental}`
    };
    const existing = JSON.parse(localStorage.getItem('local_bookings') || '[]');
    localStorage.setItem('local_bookings', JSON.stringify([localBooking, ...existing]));

    setSubmitted(true)
  }

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
            <button onClick={() => { setActiveRental('bike'); setSubmitted(false); setName(''); setPhone(''); }} className="btn-gold w-full mt-6 py-2.5 text-body-sm font-semibold cursor-pointer">
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
            <button onClick={() => { setActiveRental('car'); setSubmitted(false); setName(''); setPhone(''); }} className="btn-primary w-full mt-6 py-2.5 text-body-sm font-semibold cursor-pointer">
              Inquire Cab Rental
            </button>
          </div>

        </div>

        {/* Inquiry Modal */}
        {activeRental && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg border space-y-5">
              <div className="flex justify-between items-start border-b border-granite-100 pb-3">
                <div>
                  <h3 className="font-serif text-heading text-granite-800">
                    Inquire {activeRental === 'bike' ? 'Bike Rental' : 'Cab / Car Rental'}
                  </h3>
                  <p className="text-caption text-granite-500">
                    {activeRental === 'bike' ? 'Starting from ₹400/day' : 'Starting from ₹2,500/day'}
                  </p>
                </div>
                <button onClick={() => setActiveRental(null)} className="text-granite-400 hover:text-granite-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-12 h-12 bg-sea-50 rounded-full flex items-center justify-center mx-auto text-sea">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-heading-sm text-granite-900">Inquiry Sent!</h4>
                  <p className="text-body-sm text-granite-500">
                    Your rental request has been logged successfully. The vendor will contact you to coordinate pickup.
                  </p>
                  <button onClick={() => setActiveRental(null)} className="btn-primary w-full py-2.5 cursor-pointer">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-caption font-semibold text-granite-600 mb-1">Full Name</label>
                    <input type="text" required placeholder="Your name" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-caption font-semibold text-granite-600 mb-1">Phone Number</label>
                    <input type="tel" required placeholder="10-digit mobile" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-caption font-semibold text-granite-600 mb-1">Start Date</label>
                    <input type="date" required min={new Date().toISOString().split('T')[0]} className="input-field" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <button type="submit" className="btn-gold w-full py-3 text-body-sm font-bold cursor-pointer">
                    Submit Rental Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
