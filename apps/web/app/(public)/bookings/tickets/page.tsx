'use client'

import { useState, useEffect } from 'react'
import { Ticket, Calendar, Users, MapPin, CreditCard, ChevronDown, Minus, Plus, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

const destinations = [
  { id: '1', name: 'Vivekananda Rock Memorial', slug: 'vivekananda-rock', adultFee: 20, childFee: 10, image: 'https://images.unsplash.com/photo-1598463283737-124b1757835f?q=80&w=400' },
  { id: '2', name: 'Thiruvalluvar Statue', slug: 'thiruvalluvar-statue', adultFee: 20, childFee: 10, image: 'https://images.unsplash.com/photo-1623547285973-19cb9e28fba1?q=80&w=400' },
  { id: '3', name: 'Padmanabhapuram Palace', slug: 'padmanabhapuram-palace', adultFee: 50, childFee: 25, image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=400' },
  { id: '4', name: 'Thirparappu Waterfalls', slug: 'thirparappu-waterfalls', adultFee: 20, childFee: 10, image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=400' },
  { id: '5', name: 'Wax Museum', slug: 'wax-museum', adultFee: 100, childFee: 50, image: 'https://images.unsplash.com/photo-1575223970966-76ae61ee7838?q=80&w=400' },
  { id: '6', name: 'Mathoor Hanging Bridge', slug: 'mathoor-hanging-bridge', adultFee: 20, childFee: 10, image: 'https://images.unsplash.com/photo-1545893835-abaa50cbe628?q=80&w=400' },
]

export default function BookTicketsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const [visitDate, setVisitDate] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [step, setStep] = useState<'select' | 'details' | 'confirm'>('select')

  const dest = destinations.find(d => d.id === selected)
  const total = dest ? (dest.adultFee * adults) + (dest.childFee * children) : 0

  const handleBook = () => {
    alert('🎉 Booking confirmed! In production, this connects to the Razorpay payment gateway.')
    setStep('select')
    setSelected(null)
    setAdults(1)
    setChildren(0)
  }

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-20">
      <div className="container-wide">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-granite-900">Book Entry Tickets</h1>
          <p className="text-granite-500 mt-2">Skip the queue — book digital tickets for monuments and attractions across Kanyakumari</p>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-4 mb-10">
          {['Select Place', 'Visitor Details', 'Confirm & Pay'].map((label, i) => {
            const stepKey = ['select', 'details', 'confirm'][i]
            const isActive = step === stepKey
            const isPast = ['select', 'details', 'confirm'].indexOf(step) > i
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  isActive ? 'bg-ocean text-white' : isPast ? 'bg-emerald-500 text-white' : 'bg-granite-200 text-granite-500'
                }`}>
                  {isPast ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-sm font-semibold hidden sm:inline ${isActive ? 'text-ocean' : 'text-granite-400'}`}>{label}</span>
                {i < 2 && <div className="w-8 sm:w-16 h-0.5 bg-granite-200" />}
              </div>
            )
          })}
        </div>

        {/* Step 1: Select Destination */}
        {step === 'select' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map(d => (
              <button
                key={d.id}
                onClick={() => { setSelected(d.id); setStep('details') }}
                className={`group text-left bg-white rounded-2xl overflow-hidden border-2 transition-all shadow-sm hover:shadow-lg ${
                  selected === d.id ? 'border-ocean ring-2 ring-ocean/20' : 'border-granite-100 hover:border-ocean/50'
                }`}
              >
                <div className="relative h-40 overflow-hidden">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                    From {formatCurrency(d.adultFee)}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif font-bold text-granite-900 group-hover:text-ocean transition-colors">{d.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-granite-400">
                    <span>Adult: {formatCurrency(d.adultFee)}</span>
                    <span>Child: {formatCurrency(d.childFee)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Visitor Details */}
        {step === 'details' && dest && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-granite-100">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-granite-100">
              <img src={dest.image} alt={dest.name} className="w-20 h-20 rounded-xl object-cover" />
              <div>
                <h2 className="font-serif text-xl font-bold text-granite-900">{dest.name}</h2>
                <p className="text-sm text-granite-400">Adult: {formatCurrency(dest.adultFee)} · Child: {formatCurrency(dest.childFee)}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-granite-700 mb-2 block">Visit Date</label>
                <input
                  type="date"
                  value={visitDate}
                  onChange={e => setVisitDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl border border-granite-200 bg-granite-50 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-granite-700 mb-2 block">Adults</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-10 h-10 rounded-xl bg-granite-100 flex items-center justify-center hover:bg-granite-200"><Minus className="w-4 h-4" /></button>
                    <span className="text-xl font-bold w-8 text-center">{adults}</span>
                    <button onClick={() => setAdults(adults + 1)} className="w-10 h-10 rounded-xl bg-granite-100 flex items-center justify-center hover:bg-granite-200"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-granite-700 mb-2 block">Children</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setChildren(Math.max(0, children - 1))} className="w-10 h-10 rounded-xl bg-granite-100 flex items-center justify-center hover:bg-granite-200"><Minus className="w-4 h-4" /></button>
                    <span className="text-xl font-bold w-8 text-center">{children}</span>
                    <button onClick={() => setChildren(children + 1)} className="w-10 h-10 rounded-xl bg-granite-100 flex items-center justify-center hover:bg-granite-200"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-granite-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-granite-400">Total Amount</p>
                <p className="text-3xl font-bold text-granite-900">{formatCurrency(total)}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep('select')} className="px-6 py-3 bg-granite-100 text-granite-600 font-bold rounded-xl hover:bg-granite-200 transition-colors">Back</button>
                <button onClick={() => visitDate ? setStep('confirm') : alert('Please select a visit date')} className="px-8 py-3 bg-ocean text-white font-bold rounded-xl hover:bg-ocean/90 transition-colors flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Proceed to Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 'confirm' && dest && (
          <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 shadow-sm border border-granite-100 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-8 h-8" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-granite-900 mb-2">Confirm Your Booking</h2>
            <p className="text-granite-500 text-sm mb-8">Review the details and proceed to payment</p>

            <div className="bg-granite-50 rounded-xl p-5 text-left space-y-3 mb-8">
              <div className="flex justify-between text-sm"><span className="text-granite-500">Destination</span><span className="font-semibold text-granite-800">{dest.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-granite-500">Visit Date</span><span className="font-semibold text-granite-800">{new Date(visitDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
              <div className="flex justify-between text-sm"><span className="text-granite-500">Adults × {adults}</span><span className="font-semibold text-granite-800">{formatCurrency(dest.adultFee * adults)}</span></div>
              {children > 0 && <div className="flex justify-between text-sm"><span className="text-granite-500">Children × {children}</span><span className="font-semibold text-granite-800">{formatCurrency(dest.childFee * children)}</span></div>}
              <div className="border-t border-granite-200 pt-3 flex justify-between font-bold"><span>Total</span><span className="text-ocean text-lg">{formatCurrency(total)}</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep('details')} className="flex-1 py-3 bg-granite-100 text-granite-600 font-bold rounded-xl hover:bg-granite-200 transition-colors">Back</button>
              <button onClick={handleBook} className="flex-1 py-3 bg-gold text-black font-bold rounded-xl hover:bg-gold/80 transition-colors">Pay {formatCurrency(total)}</button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
