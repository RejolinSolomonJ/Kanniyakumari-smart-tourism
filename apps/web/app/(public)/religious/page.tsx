'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Landmark, MapPin, Clock, Calendar, Car, 
  BookOpen, ChevronRight, Compass, Sparkles, RefreshCw, AlertCircle
} from 'lucide-react'
import { religiousSites } from '@/lib/data'

interface ItineraryItem {
  time: string
  siteName: string
  activity: string
  tips: string
}

interface Itinerary {
  [day: string]: ItineraryItem[]
}

const predefinedItineraries: Record<string, Record<number, Itinerary>> = {
  ALL: {
    1: {
      'Day 1: Interfaith Harmony Tour': [
        { time: '08:00 AM - 09:30 AM', siteName: 'Bhagavathi Amman Temple', activity: 'Witness the morning darshan and enjoy the cool sea breeze at the confluence of three oceans.', tips: 'Traditional dress code required (men must remove shirts; no shorts allowed).' },
        { time: '10:00 AM - 11:30 AM', siteName: 'Our Lady of Ransom Church', activity: 'Admire the stunning Gothic architecture and historical stained-glass windows facing the ocean.', tips: 'Keep silence inside the prayer hall. Photography is prohibited during services.' },
        { time: '12:30 PM - 02:00 PM', siteName: 'Suchindram Thanumalayan Temple', activity: 'Explore the 134-foot Gopuram, the unique musical pillars, and the massive 18-foot Hanuman statue.', tips: 'Hire a local guide to explain the historical synthesis of Shiva, Vishnu, and Brahma.' },
        { time: '03:00 PM - 04:30 PM', siteName: 'St. Francis Xavier Cathedral', activity: 'Visit the historic cathedral and museum dedicated to the 16th-century saint St. Francis Xavier.', tips: 'Located in Kottar, Nagercoil. Peaceful place for contemplation.' },
        { time: '05:30 PM - 07:00 PM', siteName: 'Peer Mohammed Oliyullah Dargah', activity: 'Pay respects at the tomb of the legendary Sufi philosopher-saint. Soak in the spiritual Sufi energy.', tips: 'Dress modestly. Caps or head scarves are recommended for entry.' }
      ]
    },
    2: {
      'Day 1: Coastline Spiritual Trail': [
        { time: '08:00 AM - 09:30 AM', siteName: 'Bhagavathi Amman Temple', activity: 'Morning visit to Kanyakumari\'s primary temple right at the shore.', tips: 'Dress code strictly enforced.' },
        { time: '10:00 AM - 11:30 AM', siteName: 'Our Lady of Ransom Church', activity: 'Gothic-style cathedral tour with a view of the sea.', tips: 'Great photo spot from the outside lawn.' },
        { time: '01:00 PM - 03:00 PM', siteName: 'Suchindram Thanumalayan Temple', activity: 'Venture inland to Suchindram for a deep dive into Trinity architecture.', tips: 'Check out the musical stone pillars (tapping gently is permitted under guidance).' },
        { time: '04:00 PM - 06:00 PM', siteName: 'St. Francis Xavier Cathedral', activity: 'Pilgrimage stop at Kottar to see where St. Francis Xavier resided.', tips: 'Visit the small chapel containing relics.' }
      ],
      'Day 2: Historic Inland sanctuaries': [
        { time: '09:00 AM - 10:30 AM', siteName: 'CSI Home Church', activity: 'Tour the grand 200-year-old colonial Protestant cathedral in Nagercoil.', tips: 'One of the largest churches in South Asia. Note the Greek pillars.' },
        { time: '11:00 AM - 12:30 PM', siteName: 'Nagaraja Temple', activity: 'Unique serpent deity worship. Feel the ancient roots of Nagercoil.', tips: 'Traditional sand and milk offerings are given here.' },
        { time: '02:30 PM - 04:00 PM', siteName: 'Lord Subramanya Temple (Kumara Koil)', activity: 'Climb the gentle steps of Velimalai hillock to Lord Murugan\'s temple.', tips: 'Scenic views of green coconut groves and Western Ghats hills.' },
        { time: '05:00 PM - 06:30 PM', siteName: 'Thiruvithancode Arappally (St. Mary\'s Church)', activity: 'Stand in awe inside the church founded in 57 AD by St. Thomas the Apostle.', tips: 'One of the world\'s oldest standing churches. Excellent granite architecture.' }
      ]
    },
    3: {
      'Day 1: Confluence & Shoreline Divinity': [
        { time: '08:00 AM - 09:30 AM', siteName: 'Bhagavathi Amman Temple', activity: 'Start your spiritual journey at the southernmost tip.', tips: 'Visit early to avoid long queues.' },
        { time: '10:00 AM - 11:30 AM', siteName: 'Our Lady of Ransom Church', activity: 'Beautiful Gothic church tour.', tips: 'Walk along the beach pathway to reach it.' },
        { time: '01:30 PM - 03:30 PM', siteName: 'Suchindram Thanumalayan Temple', activity: 'Witness the iconic Trinity carvings.', tips: 'Guides are available at the entrance.' },
        { time: '04:30 PM - 06:30 PM', siteName: 'St. Francis Xavier Cathedral', activity: 'A historic walkthrough of the Kottar shrine.', tips: 'Peaceful setting during evening hours.' }
      ],
      'Day 2: Ancient Hills & Sufi Dargahs': [
        { time: '09:00 AM - 11:00 AM', siteName: 'Thiruvithancode Arappally (St. Mary\'s Church)', activity: 'Explore the 1st-century Christian roots.', tips: 'A historic heritage site protected by the Orthodox Church.' },
        { time: '11:30 AM - 01:30 PM', siteName: 'Peer Mohammed Oliyullah Dargah', activity: 'Pay respects at the Sufi Dargah.', tips: 'A highly peaceful spiritual environment.' },
        { time: '03:00 PM - 05:00 PM', siteName: 'Lord Subramanya Temple (Kumara Koil)', activity: 'Mountain breeze and Lord Murugan darshan at Velimalai.', tips: 'Perfect for photography at sunset.' },
        { time: '05:30 PM - 07:00 PM', siteName: 'Malik Mohammad Oliyullah Dargah', activity: 'Venture to Thiruvithancode Dargah, known for interfaith prayers.', tips: 'Dress conservatively.' }
      ],
      'Day 3: Western Ghats & Coastal Mosques': [
        { time: '09:00 AM - 10:30 AM', siteName: 'Nagaraja Temple', activity: 'Morning worship of the snake deities.', tips: 'Clay mud is given as holy prasad.' },
        { time: '11:30 AM - 01:30 PM', siteName: 'Mandaikadu Bhagavathi Amman Temple', activity: 'Visit the shore temple famed for its growing ant-hill deity.', tips: 'Located near Colachel Beach.' },
        { time: '03:00 PM - 05:00 PM', siteName: 'Thiruvattar Adikesava Perumal Temple', activity: 'Behold the huge reclining Vishnu (Adi Kesava) inside the ancient temple.', tips: 'Stunning wooden murals and stone carvings.' },
        { time: '06:00 PM - 07:30 PM', siteName: 'Malik Deenar Jumma Mosque (Valiyapalli)', activity: 'Visit the historic 7th-century Mosque overlooking Thengapattinam beach.', tips: 'A deeply spiritual ending to your 3-day interfaith journey.' }
      ]
    }
  },
  Hinduism: {
    1: {
      'Day 1: Essential Temple Route': [
        { time: '07:00 AM - 09:00 AM', siteName: 'Bhagavathi Amman Temple', activity: 'Witness the sunrise darshan of Kanyakumari Devi Amman.', tips: 'Carry standard dhoti/veshti for men. Cameras are not allowed inside.' },
        { time: '09:30 AM - 11:30 AM', siteName: 'Suchindram Thanumalayan Temple', activity: 'Explore the monumental Gopuram and the musical pillars.', tips: 'Male devotees must enter bare-chested.' },
        { time: '02:00 PM - 03:30 PM', siteName: 'Nagaraja Temple', activity: 'A peaceful walk in Nagercoil town to seek blessings of the Snake King.', tips: 'Take some sacred sand prasad.' },
        { time: '04:30 PM - 06:30 PM', siteName: 'Lord Subramanya Temple (Kumara Koil)', activity: 'Ascend the hillock of Kumara Koil for the evening Murugan Aarati.', tips: 'Check out the temple pool at the bottom.' }
      ]
    },
    2: {
      'Day 1: Kanyakumari & Nagercoil Temples': [
        { time: '07:00 AM - 09:30 AM', siteName: 'Bhagavathi Amman Temple', activity: 'Morning Devi worship by the sea.', tips: 'Dress code applies.' },
        { time: '10:00 AM - 12:30 PM', siteName: 'Suchindram Thanumalayan Temple', activity: 'Worship Shiva, Vishnu, and Brahma in one place.', tips: 'Don\'t miss the giant Hanuman.' },
        { time: '03:30 PM - 05:30 PM', siteName: 'Nagaraja Temple', activity: 'Seek snake deity protection at the serpent shrine.', tips: 'Very calm afternoon atmosphere.' }
      ],
      'Day 2: Foothills & Western Ghats Tour': [
        { time: '08:00 AM - 10:30 AM', siteName: 'Lord Subramanya Temple (Kumara Koil)', activity: 'Explore Velimalai hillock and Murugan\'s wedding shrine.', tips: 'Wear comfortable slip-on footwear.' },
        { time: '11:30 AM - 01:30 PM', siteName: 'Thiruvattar Adikesava Perumal Temple', activity: 'Marvel at the ancient wood carvings and the 22-foot long deity.', tips: 'The temple layout requires quiet and reverence.' },
        { time: '04:00 PM - 06:30 PM', siteName: 'Mandaikadu Bhagavathi Amman Temple', activity: 'Evening prayers at the coastal temple with the giant growing ant-hill.', tips: 'Famous for the annual Kodai festival.' }
      ]
    },
    3: {
      'Day 1: Sacred Confluence Temples': [
        { time: '07:00 AM - 09:30 AM', siteName: 'Bhagavathi Amman Temple', activity: 'Darshan of the virgin goddess Devi Kumari.', tips: 'Best to visit right after watching the sunrise.' },
        { time: '10:30 AM - 01:00 PM', siteName: 'Suchindram Thanumalayan Temple', activity: 'Deep architectural exploration of Suchindram.', tips: 'Look for the carvings of the Ramayana on the walls.' }
      ],
      'Day 2: Nagercoil & Coastal Sacred Hills': [
        { time: '08:30 AM - 10:30 AM', siteName: 'Nagaraja Temple', activity: 'Walk around the garden-like snake temple grounds.', tips: 'Sand and milk offerings are traditional here.' },
        { time: '12:00 PM - 02:00 PM', siteName: 'Mandaikadu Bhagavathi Amman Temple', activity: 'Explore the beachfront shrine near Colachel.', tips: 'Coconut oil lamp lighting is a popular ritual.' }
      ],
      'Day 3: Western Ghats Heritage Temples': [
        { time: '08:30 AM - 11:00 AM', siteName: 'Lord Subramanya Temple (Kumara Koil)', activity: 'Panoramic views and Murugan worship.', tips: 'Beautiful hill breezes.' },
        { time: '12:00 PM - 02:30 PM', siteName: 'Thiruvattar Adikesava Perumal Temple', activity: 'Behold the reclining Adikesava Perumal in quiet contemplation.', tips: 'Note the Kerala-style architecture.' }
      ]
    }
  },
  Christianity: {
    1: {
      'Day 1: Christianity Heritage Trail': [
        { time: '08:00 AM - 10:00 AM', siteName: 'Our Lady of Ransom Church', activity: 'Morning worship at the sea-facing Gothic cathedral in Kanyakumari.', tips: 'Observe church decorum. No loud noises.' },
        { time: '11:00 AM - 01:00 PM', siteName: 'St. Francis Xavier Cathedral', activity: 'Visit the historic cathedral in Kottar where St. Francis Xavier preached.', tips: 'Pay respects at the grotto.' },
        { time: '02:30 PM - 04:30 PM', siteName: 'CSI Home Church', activity: 'Witness the grand British colonial style cathedral in Nagercoil.', tips: 'Check out the historical graveyard and massive bell tower.' },
        { time: '05:30 PM - 07:30 PM', siteName: 'Thiruvithancode Arappally (St. Mary\'s Church)', activity: 'Step back to 57 AD inside the St. Thomas Arappally.', tips: 'Quiet meditation inside this world-famous ancient stone chapel.' }
      ]
    },
    2: {
      'Day 1: Historic Town & Shore Churches': [
        { time: '08:00 AM - 10:30 AM', siteName: 'Our Lady of Ransom Church', activity: 'Seafront Gothic spires and prayer tour.', tips: 'Wonderful sea view from the front gates.' },
        { time: '01:30 PM - 04:30 PM', siteName: 'St. Francis Xavier Cathedral', activity: 'Historic exploration of Kottar and St. Xavier\'s miracles.', tips: 'Spend time in the quiet adoration chapel.' }
      ],
      'Day 2: Legacy of Reformers & Apostles': [
        { time: '09:00 AM - 12:00 PM', siteName: 'CSI Home Church', activity: 'Learn the history of the London Missionary Society in Nagercoil.', tips: 'Read the memorial tablets inside.' },
        { time: '02:00 PM - 05:00 PM', siteName: 'Thiruvithancode Arappally (St. Mary\'s Church)', activity: 'A long visit to the ancient church established by Apostle St. Thomas.', tips: 'Touch the 1st-century baptismal font and granite pillars.' }
      ]
    },
    3: {
      'Day 1: Gothic Shoreline Wonders': [
        { time: '08:00 AM - 11:00 AM', siteName: 'Our Lady of Ransom Church', activity: 'Explore the Gothic interior, stained-glass icons, and beach walk.', tips: 'Join the morning mass if visiting on Sunday.' }
      ],
      'Day 2: Cathedral Walkthroughs': [
        { time: '09:30 AM - 12:00 PM', siteName: 'St. Francis Xavier Cathedral', activity: 'Visit the old church of Kottar, an important pilgrimage hub.', tips: 'Check out the annual festival details if traveling in December.' },
        { time: '02:00 PM - 04:30 PM', siteName: 'CSI Home Church', activity: 'Admire the 200-year-old colonial Protestant structure in Nagercoil.', tips: 'A highly photogenic historical building.' }
      ],
      'Day 3: World\'s Oldest Standing Church': [
        { time: '09:30 AM - 01:00 PM', siteName: 'Thiruvithancode Arappally (St. Mary\'s Church)', activity: 'Deep historical tour of the St. Thomas Syrian Christian church.', tips: 'Take time to sit in the silent courtyard.' }
      ]
    }
  },
  Islam: {
    1: {
      'Day 1: Historic Sufi & Mosque Trail': [
        { time: '08:00 AM - 10:30 AM', siteName: 'Peer Mohammed Oliyullah Dargah', activity: 'Visit the Sufi shrine in Thuckalay and learn about the saint\'s poetry.', tips: 'Modest dressing. Men and women should cover their heads.' },
        { time: '11:30 AM - 01:30 PM', siteName: 'Malik Mohammad Oliyullah Dargah', activity: 'Contemplative visit to the historical Dargah at Thiruvithancode.', tips: 'A highly peaceful spiritual environment.' },
        { time: '04:00 PM - 07:00 PM', siteName: 'Malik Deenar Jumma Mosque (Valiyapalli)', activity: 'Travel to Thengapattinam beach to witness the 7th-century historic mosque.', tips: 'Perfect timing to watch the sunset over the coconut grove shoreline.' }
      ]
    },
    2: {
      'Day 1: Sufi Pilgrim shrines': [
        { time: '08:00 AM - 11:00 AM', siteName: 'Peer Mohammed Oliyullah Dargah', activity: 'Pilgrimage to the resting place of saint Peer Mohammad.', tips: 'Often filled with soothing spiritual hymns.' },
        { time: '02:00 PM - 05:00 PM', siteName: 'Malik Mohammad Oliyullah Dargah', activity: 'Historical Dargah walk in Thiruvithancode.', tips: 'Beautiful traditional local architectural layout.' }
      ],
      'Day 2: Coastal Islamic Heritage': [
        { time: '09:00 AM - 11:30 AM', siteName: 'Thittuvilai Jumma Mosque', activity: 'Visit the beautiful mosque situated in Thittuvilai village.', tips: 'Very welcoming local community.' },
        { time: '03:30 PM - 07:00 PM', siteName: 'Malik Deenar Jumma Mosque (Valiyapalli)', activity: 'Witness the sea-side mosque established by Malik Deenar in 7th century.', tips: 'Located where the river meets the Arabian sea.' }
      ]
    },
    3: {
      'Day 1: Sufi Philosophy & Poetry': [
        { time: '08:00 AM - 11:30 AM', siteName: 'Peer Mohammed Oliyullah Dargah', activity: 'Deep spiritual tour of the Thuckalay Dargah.', tips: 'Spend time reading translations of the saint\'s verses if available.' }
      ],
      'Day 2: Inland Dargahs & Village Mosques': [
        { time: '09:30 AM - 12:30 PM', siteName: 'Malik Mohammad Oliyullah Dargah', activity: 'Visit the spiritual Thiruvithancode shrine.', tips: 'A great place for quiet meditation.' },
        { time: '03:00 PM - 06:00 PM', siteName: 'Thittuvilai Jumma Mosque', activity: 'Visit the village mosque of Thittuvilai.', tips: 'Observe standard mosque prayer timings.' }
      ],
      'Day 3: Coastal Antiquity': [
        { time: '10:00 AM - 02:00 PM', siteName: 'Malik Deenar Jumma Mosque (Valiyapalli)', activity: 'Deep tour of the ancient 7th-century structure in Thengapattinam.', tips: 'Explore the surrounding beaches and coconut plantations afterwards.' }
      ]
    }
  }
}

export default function ReligiousToursPage() {
  const [religion, setReligion] = useState<string>('ALL')
  const [days, setDays] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<'browse' | 'itinerary'>('browse')
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null)

  // Filter sites for browsing based on selection
  const filteredSites = religion === 'ALL' 
    ? religiousSites 
    : religiousSites.filter(site => site.religion === religion)

  const handleGenerate = () => {
    const itinerary = predefinedItineraries[religion]?.[days]
    if (itinerary) {
      setGeneratedItinerary(itinerary)
      setActiveTab('itinerary')
    } else {
      setGeneratedItinerary(null)
    }
  }

  const handleReset = () => {
    setGeneratedItinerary(null)
    setActiveTab('browse')
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50/70 pb-20">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-transparent pointer-events-none -z-10" />

      <div className="container-wide max-w-5xl px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-caption font-bold uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            Heritage & Faith Trails
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-heading-xl md:text-display-sm font-bold text-granite-900 mb-3"
          >
            Spiritual & Religious Heritage
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-body-sm md:text-body text-granite-600 max-w-xl mx-auto leading-relaxed"
          >
            Kanyakumari sits at a mystical crossroads of faiths. Explore ancient temple architectures, historic 1st-century churches, and centuries-old Sufi shrines.
          </motion.p>
        </div>

        {/* Filters Card */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-slate-200 shadow-nav mb-8 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {/* Religion Selector */}
            <div className="space-y-2">
              <label htmlFor="religion" className="block text-body-xs font-bold text-granite-500 uppercase tracking-wider">Select Religion / Faith</label>
              <div className="relative">
                <select
                  id="religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-body-sm font-medium text-granite-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="ALL">All Religions / Interfaith</option>
                  <option value="Hinduism">Hinduism (Temples)</option>
                  <option value="Christianity">Christianity (Churches)</option>
                  <option value="Islam">Islam (Mosques & Dargahs)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-granite-400">
                  <Landmark className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Days Selector */}
            <div className="space-y-2">
              <label htmlFor="days" className="block text-body-xs font-bold text-granite-500 uppercase tracking-wider">Days to be Covered</label>
              <div className="relative">
                <select
                  id="days"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-body-sm font-medium text-granite-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value={1}>1 Day Tour</option>
                  <option value={2}>2 Days Tour</option>
                  <option value={3}>3 Days Tour</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-granite-400">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold text-body-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
              Generate Heritage Itinerary
            </button>
            
            {generatedItinerary && (
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white text-granite-600 hover:bg-slate-50 font-semibold text-body-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-granite-400" />
                Clear Planner
              </button>
            )}
          </div>
        </motion.div>

        {/* Tab Controls */}
        <div className="flex justify-center border-b border-slate-200 mb-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('browse')}
            className={`flex-1 py-3 text-body-sm font-bold border-b-2 text-center transition-all ${
              activeTab === 'browse'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-granite-400 hover:text-granite-600'
            }`}
          >
            Browse Heritage Sites ({filteredSites.length})
          </button>
          <button
            onClick={() => {
              if (!generatedItinerary) handleGenerate()
              else setActiveTab('itinerary')
            }}
            className={`flex-1 py-3 text-body-sm font-bold border-b-2 text-center transition-all ${
              activeTab === 'itinerary'
                ? 'border-amber-500 text-amber-700'
                : 'border-transparent text-granite-400 hover:text-granite-600'
            }`}
          >
            Custom Itinerary Planner
          </button>
        </div>

        {/* Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'browse' ? (
            <motion.div
              key="browse-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredSites.map((site, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all duration-300 group"
                >
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={site.image || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800'}
                      alt={site.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm border ${
                        site.religion === 'Hinduism' 
                          ? 'bg-orange-50 text-orange-700 border-orange-100'
                          : site.religion === 'Christianity'
                            ? 'bg-blue-50 text-blue-700 border-blue-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      }`}>
                        {site.religion}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-heading-sm text-granite-900 group-hover:text-amber-700 transition-colors">
                          {site.name}
                        </h3>
                        <span className="text-[10px] bg-slate-100 text-granite-500 font-bold px-2 py-0.5 rounded-md uppercase">
                          {site.type}
                        </span>
                      </div>
                      <p className="text-body-xs text-granite-600 leading-relaxed font-normal">
                        {site.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-4 text-caption text-granite-400 font-semibold">
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.name + ', Kanyakumari')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-ocean transition-colors cursor-pointer group"
                        title="Get Directions"
                      >
                        <MapPin className="w-3.5 h-3.5 text-ocean group-hover:scale-110 transition-transform" />
                        <span className="hover:underline">{site.location}</span>
                      </a>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gold" />
                        {site.hours}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="itinerary-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="max-w-3xl mx-auto space-y-8"
            >
              {generatedItinerary ? (
                Object.entries(generatedItinerary).map(([dayTitle, steps], dayIndex) => (
                  <div key={dayIndex} className="bg-white rounded-3xl border border-slate-100 shadow-md p-6 md:p-8 space-y-6">
                    {/* Day Heading */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h2 className="font-serif text-heading-md text-amber-800 font-bold flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-amber-500 text-white text-body-sm font-bold flex items-center justify-center">
                          {dayIndex + 1}
                        </span>
                        {dayTitle}
                      </h2>
                      <div className="flex items-center gap-1.5 text-caption text-granite-400 font-bold">
                        <Car className="w-4 h-4 text-ocean" /> Recommended mode: Car/Taxi
                      </div>
                    </div>

                    {/* Timeline stops */}
                    <div className="relative border-l border-slate-200 ml-4 pl-6 md:pl-8 space-y-8">
                      {steps.map((step, stepIndex) => {
                        // Match step site with its religion configuration
                        const siteDetails = religiousSites.find(s => s.name === step.siteName)
                        const religionLabel = siteDetails?.religion || 'Heritage'

                        return (
                          <div key={stepIndex} className="relative group">
                            {/* Dot indicator */}
                            <div className="absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-amber-500 group-hover:scale-125 transition-transform" />

                            <div className="space-y-2">
                              {/* Time and category */}
                              <div className="flex flex-wrap items-center gap-2 text-caption font-bold text-granite-400">
                                <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                                  <Clock className="w-3 h-3" /> {step.time}
                                </span>
                                <span>•</span>
                                <span className={`text-[10px] uppercase ${
                                  religionLabel === 'Hinduism' 
                                    ? 'text-orange-600'
                                    : religionLabel === 'Christianity'
                                      ? 'text-blue-600'
                                      : 'text-emerald-600'
                                }`}>
                                  {religionLabel} Stop
                                </span>
                              </div>

                              {/* Stop title and directions */}
                              <div className="flex items-center justify-between gap-2 flex-wrap">
                                <h4 className="font-serif text-body font-bold text-granite-900 group-hover:text-amber-800 transition-colors">
                                  {step.siteName}
                                </h4>
                                <a 
                                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(step.siteName + ', Kanyakumari')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] text-ocean hover:text-ocean-700 font-bold flex items-center gap-1 bg-ocean-50/50 hover:bg-ocean-50 px-2 py-0.5 rounded border border-ocean-100 transition-all cursor-pointer"
                                  title="Get Directions"
                                >
                                  <MapPin className="w-3 h-3" /> Get Directions
                                </a>
                              </div>

                              {/* Stop activity */}
                              <p className="text-body-xs text-granite-600 leading-relaxed font-normal">
                                {step.activity}
                              </p>

                              {/* Travel / dress code tips */}
                              {step.tips && (
                                <div className="mt-2 bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start gap-2 text-[11px] text-granite-500">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <span><strong className="font-semibold text-granite-700">Visitor Tip:</strong> {step.tips}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl border border-slate-100 p-8 text-center max-w-md mx-auto space-y-4">
                  <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-amber-500">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-heading-sm text-granite-900 font-bold">No Itinerary Selected</h3>
                  <p className="text-body-xs text-granite-500 leading-relaxed">
                    Select a faith category and target duration from the dropdown filters above and click "Generate Itinerary".
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
