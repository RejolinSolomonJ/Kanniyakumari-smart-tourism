'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Calendar, Users, IndianRupee, Compass, 
  MapPin, HelpCircle, AlertCircle, CheckCircle, Download, Share2, Heart, ArrowRight
} from 'lucide-react'
import { useAuthStore } from '@/lib/auth'

export default function ItineraryPlannerPage() {
  const [step, setStep] = useState(1)
  const { isAuthenticated } = useAuthStore()

  // Form State
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState(15000)
  const [travelType, setTravelType] = useState('family')
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [vehicle, setVehicle] = useState('own_car')
  const [hotelPref, setHotelPref] = useState('mid')
  const [dietary, setDietary] = useState('veg')
  const [accessibility, setAccessibility] = useState(false)

  // Output State
  const [itinerary, setItinerary] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [activeTab, setActiveTab] = useState('itinerary')
  const [replanDay, setReplanDay] = useState(1)
  const [replanPrompt, setReplanPrompt] = useState('')
  const [isReplanning, setIsReplanning] = useState(false)

  const interestsList = [
    { id: 'Beach', label: 'Beaches 🌊' },
    { id: 'Temple', label: 'Temples 🛕' },
    { id: 'Waterfall', label: 'Waterfalls 💧' },
    { id: 'Heritage', label: 'Heritage 🏛' },
    { id: 'Adventure', label: 'Adventure 🧗' },
    { id: 'Food', label: 'Local Food 🍲' }
  ]

  const handleInterestToggle = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStep(2) // Move to loading animation step

    try {
      const token = localStorage.getItem('auth_token')
      const response = await fetch('http://localhost:5000/api/ai/itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          days,
          budget,
          travelType,
          interests: selectedInterests.length > 0 ? selectedInterests : ['Beach', 'Heritage'],
          hotelPreference: hotelPref,
          dietary,
          language: 'en',
          accessibility
        })
      })

      const data = await response.json()
      if (data.itinerary) {
        setItinerary(data.itinerary)
        setStep(3)
      } else {
        throw new Error('AI Planner request failed')
      }
    } catch (err) {
      console.warn('AI integration error, attempting direct Gemini client-side fallback...', err)
      const clientApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
      if (clientApiKey) {
        try {
          const prompt = `You are an expert tourism planner for Kanyakumari, Tamil Nadu, India.
Generate a detailed ${days}-day travel itinerary.

Parameters:
- Budget: ₹${budget} total
- Travel Type: ${travelType}
- Interests: ${selectedInterests.length > 0 ? selectedInterests.join(', ') : 'Beach, Heritage'}
- Hotel: ${hotelPref}
- Diet: ${dietary}
- Language: English
- Accessibility: ${accessibility ? 'Required' : 'Not required'}

Respond ONLY with valid JSON in this exact structure (do not include any conversational text or markdown formatting except the JSON object itself):
{
  "title": "string",
  "summary": "string",
  "totalDays": number,
  "estimatedBudget": {
    "accommodation": number,
    "food": number,
    "transport": number,
    "tickets": number,
    "total": number
  },
  "days": [
    {
      "day": number,
      "theme": "string",
      "slots": [
        {
          "time": "Morning|Afternoon|Evening|Night",
          "place": "string",
          "activity": "string",
          "duration": "string",
          "tips": "string",
          "estimatedCost": number
        }
      ]
    }
  ],
  "packingList": ["string"],
  "weatherNote": "string",
  "emergencyContacts": [
    { "name": "string", "phone": "string", "type": "string" }
  ]
}`

          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${clientApiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
              })
            }
          )
          const geminiData = await geminiRes.json()
          const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) {
            const jsonMatch = text.match(/\{[\s\S]*\}/)
            if (jsonMatch) {
              const parsedItinerary = JSON.parse(jsonMatch[0])
              setItinerary(parsedItinerary)
              setStep(3)
              setIsLoading(false)
              return
            }
          }
        } catch (apiErr) {
          console.error('Direct Gemini itinerary generation failed:', apiErr)
        }
      }

      // Wait 3 seconds to show simulation loading as fallback
      setTimeout(() => {
        setItinerary(getSimulatedItinerary())
        setStep(3)
        setIsLoading(false)
      }, 3000)
      return
    } finally {
      // Note: we control setIsLoading within success/error branches above
    }
  }

  const getSimulatedItinerary = () => ({
    title: `Amazing Kanyakumari Escape (${days} Days)`,
    summary: `An optimized trip customized for a ${travelType} holiday, focusing on your selected interests.`,
    totalDays: days,
    estimatedBudget: {
      accommodation: Math.round(budget * 0.45),
      food: Math.round(budget * 0.25),
      transport: Math.round(budget * 0.20),
      tickets: Math.round(budget * 0.05),
      total: Math.round(budget * 0.95)
    },
    days: Array.from({ length: days }, (_, idx) => ({
      day: idx + 1,
      theme: idx === 0 ? 'Sunrise & Heritage Monuments' : idx === 1 ? 'Waterfalls & Palaces' : 'Nature & Local Markets',
      slots: [
        {
          time: 'Morning',
          place: 'Kanyakumari Beach Sunrise Point',
          activity: 'Watch the sunrise where three oceans meet. Incredible sunrise photography opportunity.',
          duration: '1.5 hours',
          tips: 'Reach by 5:30 AM to secure a good spot.',
          estimatedCost: 0
        },
        {
          time: 'Afternoon',
          place: 'Vivekananda Rock Memorial & Thiruvalluvar Statue',
          activity: 'Ferry ride to the rock memorial and stone statue island.',
          duration: '3 hours',
          tips: 'Wear slip-on shoes for quick removal at the memorial entrance.',
          estimatedCost: 70
        },
        {
          time: 'Evening',
          place: 'Sunset View Point',
          activity: 'Unwind and witness the sunset over the Arabian Sea.',
          duration: '1.5 hours',
          tips: 'Try the local Nannari Sarbath nearby.',
          estimatedCost: 20
        }
      ]
    })),
    packingList: ['Sunglasses', 'Sunscreen lotion', 'Light cotton clothing', 'Comfortable footwear', 'Camera'],
    weatherNote: 'Breezy and pleasant coastal temperatures. High UV during mid-day.',
    emergencyContacts: [
      { name: 'Police Helpline', phone: '100', type: 'POLICE' },
      { name: 'Tourism Info Center', phone: '04652-246276', type: 'TOURISM' }
    ]
  })

  const handleReplan = async () => {
    setIsReplanning(true)
    const clientApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    
    if (clientApiKey) {
      try {
        const prompt = `You are an expert tourism planner for Kanyakumari. 
We have an existing itinerary day: ${JSON.stringify(itinerary.days[replanDay - 1])}. 
Replan this day with this custom request: "${replanPrompt}". 
Respond ONLY with valid JSON matching this exact structure (no conversational text or markdown formatting except the JSON object itself):
{
  "day": ${replanDay},
  "theme": "string",
  "slots": [
    {
      "time": "Morning|Afternoon|Evening|Night",
      "place": "string",
      "activity": "string",
      "duration": "string",
      "tips": "string",
      "estimatedCost": number
    }
  ]
}`

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${clientApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }]
            })
          }
        )
        const geminiData = await geminiRes.json()
        const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) {
          const jsonMatch = text.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            const parsedDay = JSON.parse(jsonMatch[0])
            const newDays = [...itinerary.days]
            newDays[replanDay - 1] = parsedDay
            setItinerary({ ...itinerary, days: newDays })
            setIsReplanning(false)
            setReplanPrompt('')
            setActiveTab('itinerary')
            return
          }
        }
      } catch (err) {
        console.error("Gemini replan failed, falling back to mock:", err)
      }
    }

    // Mock replan fallback
    setTimeout(() => {
      const mockDay = {
        day: replanDay,
        theme: `Replanned: ${replanPrompt.length > 30 ? replanPrompt.slice(0, 30) + '...' : replanPrompt}`,
        slots: [
          {
            time: 'Morning',
            place: 'Sunrise Point & Cozy Cafe',
            activity: `Enjoying a relaxed morning tailored to your request: "${replanPrompt}".`,
            duration: '2 hours',
            tips: 'Take it easy and enjoy the sights.',
            estimatedCost: 150
          },
          {
            time: 'Afternoon',
            place: 'Kanyakumari Historical Museum',
            activity: 'Indoor exhibits, local crafts and history, perfectly matching your custom request.',
            duration: '2.5 hours',
            tips: 'A pleasant and cool spot during mid-day.',
            estimatedCost: 200
          },
          {
            time: 'Evening',
            place: 'Sunset Walk & Beachside Dinner',
            activity: 'Unwind with a custom evening program designed just for you.',
            duration: '3 hours',
            tips: 'Try the local Pazha Bajji (banana fritters).',
            estimatedCost: 250
          }
        ]
      }
      const newDays = [...itinerary.days]
      newDays[replanDay - 1] = mockDay
      setItinerary({ ...itinerary, days: newDays })
      setIsReplanning(false)
      setReplanPrompt('')
      setActiveTab('itinerary')
    }, 2000)
  }

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-20">
      <div className="container-wide">
        
        {/* STEP 1: Plan Input Form */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-granite-100 shadow-sm space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-50 text-gold rounded-full mb-2">
                <Sparkles className="w-6 h-6" />
              </div>
              <h1 className="font-serif text-heading-xl font-bold text-granite-900">
                AI Journey Planner
              </h1>
              <p className="text-body-sm text-granite-500 max-w-md mx-auto">
                Let our intelligent system generate a fully customized travel itinerary for your Kanyakumari trip.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
              
              {/* Date & Days */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                    Duration (Days)
                  </label>
                  <select
                    className="input-field"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 7].map(d => (
                      <option key={d} value={d}>{d} {d === 1 ? 'Day' : 'Days'}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                    Travel Group Type
                  </label>
                  <select
                    className="input-field"
                    value={travelType}
                    onChange={(e) => setTravelType(e.target.value)}
                  >
                    <option value="solo">Solo Traveler</option>
                    <option value="couple">Couple</option>
                    <option value="family">Family Group</option>
                    <option value="friends">Friends / Group</option>
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-caption font-semibold text-granite-600">
                    Total Trip Budget (INR)
                  </label>
                  <span className="text-body-sm font-bold text-ocean">
                    ₹{budget.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="2000"
                  className="w-full accent-ocean"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                />
                <div className="flex justify-between text-[10px] text-granite-400 mt-1">
                  <span>₹2,000</span>
                  <span>₹50,000</span>
                  <span>₹1,00,000+</span>
                </div>
              </div>

              {/* Interests Checklist */}
              <div>
                <label className="block text-caption font-semibold text-granite-600 mb-3">
                  Select Interests (Choose multiple)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {interestsList.map(item => {
                    const selected = selectedInterests.includes(item.id)
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => handleInterestToggle(item.id)}
                        className={`py-3 px-4 rounded-xl border text-left text-body-sm font-semibold transition-all ${
                          selected
                            ? 'border-ocean bg-ocean-50 text-ocean'
                            : 'border-granite-200 text-granite-600 hover:border-granite-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Transport & Accommodation Prefs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                    Transport Option
                  </label>
                  <select className="input-field" value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                    <option value="own_car">Own Vehicle / Taxi</option>
                    <option value="rental">Rent a Car / Bike</option>
                    <option value="bus">Public Buses</option>
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                    Hotel Preference
                  </label>
                  <select className="input-field" value={hotelPref} onChange={(e) => setHotelPref(e.target.value)}>
                    <option value="budget">Budget Stay / Home</option>
                    <option value="mid">Mid-Range Hotels</option>
                    <option value="luxury">Luxury Resorts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                    Dietary Preference
                  </label>
                  <select className="input-field" value={dietary} onChange={(e) => setDietary(e.target.value)}>
                    <option value="veg">Vegetarian</option>
                    <option value="non_veg">Non-Veg / Seafood</option>
                  </select>
                </div>
              </div>

              {/* Accessibility */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="accessibility"
                  className="rounded text-ocean focus:ring-ocean"
                  checked={accessibility}
                  onChange={(e) => setAccessibility(e.target.checked)}
                />
                <label htmlFor="accessibility" className="text-body-sm text-granite-600">
                  Wheelchair or senior-friendly route needed
                </label>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-primary w-full py-4 text-body font-bold flex justify-center items-center gap-2">
                <Sparkles className="w-5 h-5" /> Generate Custom Itinerary
              </button>

            </form>
          </motion.div>
        )}

        {/* STEP 2: Loading Animation */}
        {step === 2 && (
          <div className="max-w-md mx-auto text-center py-20 bg-white rounded-2xl border border-granite-100 shadow-sm space-y-6">
            {/* Loading Illustration */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-ocean/20 animate-spin border-t-ocean" />
              <div className="absolute inset-2 bg-gradient-ocean rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-3xl">TN</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-heading text-granite-800">Creating Your Journey...</h3>
              <p className="text-body-sm text-granite-500 animate-pulse">
                Analyzing Kanyakumari spots, transport routes, and travel times.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Display Itinerary */}
        {step === 3 && itinerary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Left 2 Cols: Daily Timeline & Replan */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Tab Navigation */}
              <div className="flex border border-granite-100 bg-white p-1 rounded-xl shadow-sm">
                <button
                  onClick={() => setActiveTab('itinerary')}
                  className={`flex-1 py-2 text-center text-body-sm font-semibold rounded-lg transition-all ${
                    activeTab === 'itinerary'
                      ? 'bg-ocean text-white shadow-sm'
                      : 'text-granite-600 hover:bg-granite-50'
                  }`}
                >
                  Itinerary Timeline
                </button>
                <button
                  onClick={() => setActiveTab('replan')}
                  className={`flex-1 py-2 text-center text-body-sm font-semibold rounded-lg transition-all ${
                    activeTab === 'replan'
                      ? 'bg-ocean text-white shadow-sm'
                      : 'text-granite-600 hover:bg-granite-50'
                  }`}
                >
                  Custom Requests
                </button>
              </div>

              {activeTab === 'itinerary' && (
                <>
                  <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm">
                    <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
                      {itinerary.title}
                    </h1>
                    <p className="text-body-sm text-granite-600 leading-relaxed">
                      {itinerary.summary}
                    </p>
                  </div>

                  {/* Day accordion cards */}
                  {itinerary.days.map((dayData: any) => (
                    <div key={dayData.day} className="bg-white rounded-2xl border border-granite-100 shadow-sm overflow-hidden animate-fade-up">
                      <div className="bg-ocean-50/80 px-6 py-4 flex justify-between items-center border-b border-granite-100">
                        <h3 className="font-serif text-heading-sm text-ocean font-bold">
                          Day {dayData.day} : {dayData.theme}
                        </h3>
                      </div>

                      <div className="p-6 divide-y divide-granite-100">
                        {dayData.slots.map((slot: any, sIdx: number) => (
                          <div key={sIdx} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row gap-4 items-start">
                            <span className="badge-ocean text-[11px] font-bold md:w-24 text-center">
                              {slot.time}
                            </span>
                            <div className="flex-1 space-y-1">
                              <h4 className="font-semibold text-body text-granite-900 flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gold" />
                                {slot.place}
                              </h4>
                              <p className="text-body-sm text-granite-600">{slot.activity}</p>
                              <div className="flex flex-wrap gap-4 text-caption text-granite-400 pt-1">
                                <span>Duration: {slot.duration}</span>
                                {slot.tips && <span>💡 Tip: {slot.tips}</span>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {activeTab === 'replan' && (
                <div className="bg-white p-8 rounded-2xl border border-granite-100 shadow-sm space-y-6 animate-fade-up">
                  <div>
                    <h2 className="font-serif text-heading-lg font-bold text-granite-900 mb-1">
                      Replan Specific Day
                    </h2>
                    <p className="text-body-sm text-granite-500">
                      Update details for a single day of your trip by sending a custom request to the AI.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                        Select Day to Replan
                      </label>
                      <select
                        className="input-field"
                        value={replanDay}
                        onChange={(e) => setReplanDay(Number(e.target.value))}
                      >
                        {Array.from({ length: itinerary.totalDays }, (_, i) => (
                          <option key={i+1} value={i+1}>Day {i+1}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-caption font-semibold text-granite-600 mb-1.5">
                        Tell us what to change for this day...
                      </label>
                      <textarea
                        className="input-field min-h-[120px] py-3 px-4 resize-none focus:ring-1 focus:ring-ocean"
                        placeholder="e.g. 'less walking', 'more local food spots', 'focus on temples'"
                        value={replanPrompt}
                        onChange={(e) => setReplanPrompt(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={handleReplan}
                      disabled={isReplanning || !replanPrompt.trim()}
                      className="btn-gold w-full py-3.5 text-body-sm font-bold flex justify-center items-center gap-2 transition-all disabled:opacity-50"
                    >
                      {isReplanning ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Replanning Day {replanDay}...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          Update Day {replanDay}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Extras (Costs, Packing, Actions) */}
            <div className="space-y-6">
              
              {/* Cost breakdown card */}
              <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-4">
                <h3 className="font-serif text-heading-sm text-granite-800 border-b border-granite-100 pb-3">
                  Estimated Costs
                </h3>
                <div className="space-y-2.5 text-body-sm text-granite-600">
                  <div className="flex justify-between">
                    <span>Accommodation</span>
                    <span>₹{itinerary.estimatedBudget.accommodation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food</span>
                    <span>₹{itinerary.estimatedBudget.food.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport</span>
                    <span>₹{itinerary.estimatedBudget.transport.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed pt-2.5 font-bold text-granite-900">
                    <span>Total Estimate</span>
                    <span>₹{itinerary.estimatedBudget.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Packing checklist */}
              <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-3">
                <h3 className="font-serif text-heading-sm text-granite-800">
                  Packing List
                </h3>
                <ul className="space-y-2 text-body-sm text-granite-600">
                  {itinerary.packingList.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-ocean" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weather note */}
              <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-2 flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-ocean flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-body-sm text-granite-800">Weather Notice</h4>
                  <p className="text-caption text-granite-500 leading-relaxed">{itinerary.weatherNote}</p>
                </div>
              </div>

              {/* Actions panel */}
              <div className="bg-white p-6 rounded-2xl border border-granite-100 shadow-sm space-y-3">
                <button onClick={() => window.print()} className="btn-primary w-full py-2.5 flex items-center justify-center gap-2 text-body-sm font-semibold">
                  <Download className="w-4 h-4" /> Download PDF / Print
                </button>
                
                <button
                  onClick={() => setIsSaved(true)}
                  disabled={isSaved}
                  className="btn-outline w-full py-2.5 flex items-center justify-center gap-2 text-body-sm font-semibold"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                  {isSaved ? 'Saved to Profile' : 'Save Itinerary'}
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full py-2.5 bg-granite-100 hover:bg-granite-200 text-granite-800 font-semibold rounded-full text-body-sm transition-all"
                >
                  Start Over / Plan Another
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}
