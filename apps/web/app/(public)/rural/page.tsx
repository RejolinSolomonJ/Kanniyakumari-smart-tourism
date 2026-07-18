'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Leaf, MapPin, Clock, Phone, Sparkles, CheckCircle, ArrowRight, Compass
} from 'lucide-react'

// Define listings data for Agri & Rural Tourism
const listings = {
  farms: {
    title: "Agri-Tourism & Spice Plantations",
    tagline: "Explore rubber estates, coconut groves, and fragrant spice farms of Kanyakumari.",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    items: [
      {
        name: "Vaikundam Rubber Plantation & Estate",
        location: "Vaikundam, Kanyakumari District",
        hours: "09:00 AM - 05:00 PM (Prior Booking Recommended)",
        phone: "+91 4651 230221",
        description: "A historic, sprawling rubber estate in the foothills of the Western Ghats. Visitors can walk through rubber groves, watch the traditional rubber tapping process, and visit the processing factory.",
        features: ["Rubber Tapping Demos", "Guided Plantation Walks", "Heritage Bungalow Stay", "Processing Factory Tour"]
      },
      {
        name: "Government Horticulture Farm (Pechiparai)",
        location: "Pechiparai Dam Road, Kanyakumari District",
        hours: "09:00 AM - 04:30 PM",
        phone: "+91 4651 281258",
        description: "An experimental farm set in a highly biodiverse landscape. Highlights include clove, nutmeg, and black pepper cultivation, along with regional tropical fruits and nurseries.",
        features: ["Spice Crop Cultivation", "Botanical Plant Nurseries", "Foothill Scenic View", "Herbal Garden Trails"]
      },
      {
        name: "Kumari Organic Coconut Groves",
        location: "Erachakulam Village, near Nagercoil",
        hours: "08:00 AM - 05:00 PM",
        phone: "+91 94421 89001",
        description: "A traditional organic plantation showcasing the versatility of coconut trees. Watch local coconut tree climbers and learn about organic neera (sweet sap) extraction.",
        features: ["Organic Farming Methods", "Coconut Tree Climbing Demo", "Fresh Tender Coconut Water", "Jaggery-making workshops"]
      }
    ]
  },
  villages: {
    title: "Rural Villages & Local Crafts",
    tagline: "Understand the local roots of trade, flower markets, and coir weaving.",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
    items: [
      {
        name: "Thovalai Flower Market",
        location: "Thovalai Village (12 km from Nagercoil)",
        hours: "04:00 AM - 09:00 AM (Best morning hours)",
        phone: "+91 94431 82991",
        description: "One of the largest wholesale flower markets in South India. Witness the early morning hustle of flower trades, massive mounds of jasmine, marigold, and roses, and garland weaving.",
        features: ["Bustling Flower Auction", "Traditional Garland Weaving", "Jasmine & Rose Farming Fields", "Fragrant Photography Spots"]
      },
      {
        name: "Marungoor Coir Making Village",
        location: "Marungoor, Kanyakumari",
        hours: "09:00 AM - 05:30 PM",
        phone: "Local Self-Help Cooperative",
        description: "A peaceful artisan village where local households spin coconut husks into strong coir fibers. See coir yarn spinning wheels and traditional mat weaving in action.",
        features: ["Coconut Fiber Extraction", "Coir Spinning Demos", "Hand-woven Doormat Crafts", "Rustic Clay Pot Making"]
      },
      {
        name: "Suchindram Potter's Quarter",
        location: "Temple Street, Suchindram",
        hours: "09:30 AM - 06:00 PM",
        phone: "Suchindram Pottery Association",
        description: "Discover a heritage neighborhood of clay potters. Watch craftsmen throw traditional clay pots, cooking vessels, and oil lamps (diyas) on manual throwing wheels.",
        features: ["Manual Pottery Wheels", "Clay Baking Kilns", "Traditional Terracotta Lamps", "Hands-on Pottery Lessons"]
      }
    ]
  },
  walks: {
    title: "Scenic Countryside Trails",
    tagline: "Walk through green paddy plains, aqueducts, and windmills.",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
    items: [
      {
        name: "Mathur Aqueduct Village Walk",
        location: "Mathur, near Thiruvattar",
        hours: "07:00 AM - 06:30 PM",
        phone: "Tourist Desk, Mathur",
        description: "Walk across the longest and highest trough aqueduct in Asia. Beneath the bridge flows the Pahrali river, surrounded by thousands of coconut and banana plantations.",
        features: ["Walkway 115 feet high", "Panoramic Valley Views", "Fresh Pineapple Fruit Shops", "River bank stairs walk"]
      },
      {
        name: "Muppandal Windmill Plains",
        location: "Muppandal, Aralvaimozhi Pass",
        hours: "Best visited during sunrise/sunset",
        phone: "Wind Energy Info Office",
        description: "One of Asia's largest wind farm clusters located in a scenic mountain pass. Walk through the countryside roads surrounded by massive spinning wind turbines and mountain backdrops.",
        features: ["Asia's Largest Wind Cluster", "Epic Mountain Pass Backdrops", "Sunset Photography", "Clean Energy Education"]
      },
      {
        name: "Pechiparai Canal Trails",
        location: "Pechiparai, Kanyakumari",
        hours: "08:00 AM - 05:00 PM",
        phone: "Forest Range Office, Pechiparai",
        description: "A pleasant walking path along the historical Pechiparai irrigation canals. Experience thick green forest edges, banana plantations, and fresh streams.",
        features: ["Canal Irrigation Pathways", "Lush Paddy Fields View", "Bird Watching Spots", "Freshwater stream bathing"]
      }
    ]
  }
}

export default function AgriRuralPage() {
  const [activeCategory, setActiveCategory] = useState<'farms' | 'villages' | 'walks'>('farms')

  const handleCardClick = (category: 'farms' | 'villages' | 'walks') => {
    setActiveCategory(category)
    const element = document.getElementById('details-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const currentCategory = listings[activeCategory]

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Hero Banner Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-slate-900 py-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600&auto=format&fit=crop" 
            alt="Agri & Rural Banner"
            className="w-full h-full object-cover blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-20" />
        </div>

        <div className="container-wide relative z-30 text-center max-w-4xl px-4 mt-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-caption font-bold"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            COUNTRY ROADS IN NAMMA KUMARI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-display-md md:text-display-lg text-white font-extrabold tracking-tight leading-none"
          >
            Agri & Rural Tourism
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-body-lg md:text-xl text-white/95 max-w-2xl mx-auto leading-relaxed"
          >
            Experience the rustic charm of village life, walk through lush paddy fields, and understand the roots of Tamil culture.
          </motion.p>
        </div>
      </section>

      {/* Main Grid: Card Selection */}
      <section className="container-wide -mt-20 relative z-40 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Agri-Tourism */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`bg-white rounded-3xl overflow-hidden shadow-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[450px] ${
              activeCategory === 'farms' ? 'ring-2 ring-emerald-500 border-transparent' : 'border-slate-100 hover:border-slate-200'
            }`}
            onClick={() => handleCardClick('farms')}
            id="card-farms"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop" 
                alt="Agri-Tourism"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                FARMS, PLANTATIONS & ESTATES
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-heading-md font-bold text-slate-900">Agri & Spice Tourism</h3>
                <p className="text-body-sm text-slate-500 leading-relaxed">
                  Explore rubber estates, coconut tree climbing demonstrations, and Pechiparai spice farms.
                </p>
              </div>
              <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-body-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-4">
                EXPLORE FARMS <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Rural Villages */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`bg-white rounded-3xl overflow-hidden shadow-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[450px] ${
              activeCategory === 'villages' ? 'ring-2 ring-amber-500 border-transparent' : 'border-slate-100 hover:border-slate-200'
            }`}
            onClick={() => handleCardClick('villages')}
            id="card-villages"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop" 
                alt="Rural Villages"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                LOCAL TRADE & CRAFTS
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-heading-md font-bold text-slate-900">Rural & Crafts Villages</h3>
                <p className="text-body-sm text-slate-500 leading-relaxed">
                  Discover the early morning Thovalai flower market, potters, and coir spinning households.
                </p>
              </div>
              <button className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-body-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-4">
                DISCOVER VILLAGES <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Countryside Walks */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`bg-white rounded-3xl overflow-hidden shadow-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[450px] ${
              activeCategory === 'walks' ? 'ring-2 ring-blue-500 border-transparent' : 'border-slate-100 hover:border-slate-200'
            }`}
            onClick={() => handleCardClick('walks')}
            id="card-walks"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=600&auto=format&fit=crop" 
                alt="Countryside Walks"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                CANALS & WINDMILLS
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-heading-md font-bold text-slate-900">Countryside Walks</h3>
                <p className="text-body-sm text-slate-500 leading-relaxed">
                  Walk across the high Mathur Aqueduct trough, mountain wind passes, and canal borders.
                </p>
              </div>
              <button className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-body-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-4">
                PLAN TRAILS <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Details Presentation Section */}
      <section id="details-section" className="container-wide mt-20 px-4 scroll-mt-28">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className={`px-3 py-1.5 rounded-full text-caption font-bold border bg-white shadow-sm ${currentCategory.badgeColor}`}>
              EXPLORING CATEGORY
            </span>
            <h2 className="font-serif text-heading-xl font-bold text-slate-900">
              {currentCategory.title}
            </h2>
            <p className="text-body-sm text-slate-500">
              {currentCategory.tagline}
            </p>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {currentCategory.items.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-2xl p-6 md:p-8 border border-slate-150 shadow-sm flex flex-col justify-between gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-4">
                      {/* Name & Badge */}
                      <div className="flex justify-between items-start gap-4 flex-wrap">
                        <h3 className="font-serif text-heading font-bold text-slate-900">
                          {item.name}
                        </h3>
                        <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-lg border border-slate-100 uppercase tracking-wide">
                          {activeCategory === 'farms' ? 'Agro Site' : activeCategory === 'villages' ? 'Heritage Trade' : 'Hiking Path'}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-body-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights / Features */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.features.map((feat, fIdx) => (
                          <span 
                            key={fIdx}
                            className={`px-3 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1 bg-slate-50 text-slate-600 border border-slate-150`}
                          >
                            <CheckCircle className="w-3 h-3 text-slate-400" />
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metadata and Directions Actions */}
                    <div className="border-t border-slate-100 pt-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-6 text-caption text-slate-400 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-ocean" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gold" />
                          {item.hours}
                        </span>
                        {item.phone !== 'Local Self-Help Cooperative' && item.phone !== 'Suchindram Pottery Association' && item.phone !== 'Tourist Desk, Mathur' && item.phone !== 'Wind Energy Info Office' && item.phone !== 'Forest Range Office, Pechiparai' && (
                          <a href={`tel:${item.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-1.5 hover:text-slate-600 transition-colors">
                            <Phone className="w-4 h-4 text-slate-400" />
                            {item.phone}
                          </a>
                        )}
                      </div>

                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.name + ', Kanyakumari')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-ocean hover:bg-ocean-700 text-white font-bold text-body-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer self-start md:self-auto"
                        title="Get directions to the center"
                      >
                        <MapPin className="w-4 h-4" /> Get Directions
                      </a>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  )
}
