'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Star, Calendar, MessageSquare, Compass, Phone } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const mockGuides = [
  {
    id: '1',
    nameEn: 'Muthu Swamy',
    nameTa: 'முத்துசாமி',
    bio: 'Specialist in Vivekananda Rock & Gandhi Mandapam history. Over 8 years of guiding experience.',
    languages: ['English', 'Tamil', 'Malayalam'],
    experience: 8,
    ratePerDay: 1500,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    isVerified: true
  },
  {
    id: '2',
    nameEn: 'Selvan Pillai',
    nameTa: 'செல்வன் பிள்ளை',
    bio: 'Expert in Padmanabhapuram wooden architecture and Suchindram Thanumalayan temple mythology.',
    languages: ['English', 'Tamil'],
    experience: 5,
    ratePerDay: 1200,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    isVerified: true
  }
]

export default function GuidesPage() {
  const [guides, setGuides] = useState(mockGuides)
  const [activeGuide, setActiveGuide] = useState<any>(null)
  
  // Booking Form State
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    fetch('http://localhost:5000/api/guides')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setGuides(data)
        }
      })
      .catch(() => console.log('Using mock guides.'))
  }, [])

  const handleBookGuide = (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('auth_token')
    if (!token) {
      alert('Please login to book a guide!')
      window.location.href = '/login'
      return
    }

    if (!startDate || !endDate) {
      alert('Please select start and end dates.')
      return
    }

    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1)
    const totalAmount = days * activeGuide.ratePerDay

    fetch('http://localhost:5000/api/guides/book', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        guideId: activeGuide.id,
        startDate,
        endDate,
        totalAmount
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        alert(data.error)
      } else {
        setBookingSuccess(true)
      }
    })
    .catch(() => {
      // Simulate booking success in pilot mode
      setBookingSuccess(true)
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Licensed Tour Guides
          </h1>
          <p className="text-body-sm text-granite-500">
            Book professional, government-verified local guides speaking English, Tamil, and other regional languages.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {guides.map(guide => (
            <div key={guide.id} className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm flex flex-col sm:flex-row gap-5 items-start justify-between">
              <div className="flex gap-4 items-start">
                <img
                  src={guide.photo || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                  alt={guide.nameEn}
                  className="w-16 h-16 rounded-full object-cover border border-granite-200"
                />
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif text-heading-sm text-granite-900 leading-none">
                      {guide.nameEn}
                    </h3>
                    {guide.isVerified && (
                      <ShieldCheck className="w-4 h-4 text-sea" />
                    )}
                  </div>
                  <p className="text-caption text-granite-400 font-tamil leading-none">{guide.nameTa}</p>
                  
                  <p className="text-body-sm text-granite-600 leading-relaxed line-clamp-2">
                    {guide.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {guide.languages.map((l: string) => (
                      <span key={l} className="bg-granite-100 text-granite-600 text-[10px] px-2 py-0.5 rounded font-medium">
                        {l}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-caption text-granite-400 pt-2">
                    <span>🎓 {guide.experience} Years Exp</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-gold text-gold" /> 4.8 Rating
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right flex flex-col justify-between h-full w-full sm:w-auto mt-4 sm:mt-0 gap-3 border-t sm:border-t-0 pt-4 sm:pt-0">
                <div>
                  <span className="block text-caption text-granite-400">Daily Rate</span>
                  <span className="text-body-lg font-bold text-granite-900">
                    {formatCurrency(guide.ratePerDay)}
                  </span>
                </div>
                <button
                  onClick={() => { setActiveGuide(guide); setBookingSuccess(false); }}
                  className="btn-gold py-2 px-5 text-body-sm font-semibold whitespace-nowrap"
                >
                  Book Guide
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Booking Form Modal */}
        {activeGuide && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-lg border space-y-6">
              
              <div className="flex justify-between items-start border-b border-granite-100 pb-3">
                <div>
                  <h3 className="font-serif text-heading text-granite-800">Book {activeGuide.nameEn}</h3>
                  <p className="text-caption text-granite-500">Rate: {formatCurrency(activeGuide.ratePerDay)}/day</p>
                </div>
                <button
                  onClick={() => setActiveGuide(null)}
                  className="text-granite-400 hover:text-granite-600 font-bold"
                >
                  ✕
                </button>
              </div>

              {bookingSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-sea-50 rounded-full flex items-center justify-center mx-auto text-sea">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-heading-sm text-granite-900">Request Submitted!</h4>
                  <p className="text-body-sm text-granite-500">
                    Your request has been sent to {activeGuide.nameEn}. Status will update in your profile.
                  </p>
                  <button onClick={() => setActiveGuide(null)} className="btn-primary w-full py-2.5">
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookGuide} className="space-y-4">
                  <div>
                    <label className="block text-caption font-semibold text-granite-600 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-caption font-semibold text-granite-600 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      required
                      min={startDate || new Date().toISOString().split('T')[0]}
                      className="input-field"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-3 text-body-sm font-bold"
                  >
                    Confirm Booking Request
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
