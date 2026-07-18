'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, Compass, ShieldCheck, MapPin, Phone, Clock, 
  Sparkles, Activity, Leaf, CheckCircle, ArrowRight, Eye
} from 'lucide-react'

// Define listings data
const listings = {
  retreats: {
    title: "Wellness & Yoga Retreats",
    tagline: "Restore your body, mind & spirit in the serene environment of Kanyakumari.",
    color: "from-emerald-500 to-teal-600",
    themeColor: "text-emerald-600",
    bgLight: "bg-emerald-50/50",
    borderLight: "border-emerald-100",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    items: [
      {
        name: "Anantya Wellness Retreat",
        location: "Chittar Lake, Kaliyal, Kanyakumari District",
        hours: "Open 24 hours (Reservations Required)",
        phone: "+91 4651 211111",
        description: "Set on the peaceful banks of Chittar Lake, Anantya offers personalized wellness programs combining Ayurveda, yoga, meditation, and tailor-made organic nutrition in luxury cottages.",
        features: ["Ayurvedic Massage", "Lakefront Yoga & Meditation", "Detox Diet Plans", "Eco-Therapy Walks"]
      },
      {
        name: "Vivekananda Kendra Spiritual Retreat",
        location: "Vivekanandapuram, Kanyakumari",
        hours: "06:00 AM - 08:00 PM",
        phone: "+91 4652 247012",
        description: "A coastal, disciplined ashram experience offering spiritual retreats, yoga training courses, and quiet seashore meditation sessions amidst lush trees and Peacock gardens.",
        features: ["Structured Yoga Classes", "Vedic Chanting & Meditation", "Spiritual Lectures", "Cultural Library Access"]
      },
      {
        name: "Santhigiri Ashram Wellness Center",
        location: "Leepuram Beach Road, Kanyakumari",
        hours: "08:00 AM - 06:00 PM",
        phone: "+91 4652 246990",
        description: "A prominent branch of Santhigiri Ashram offering classical Ayurvedic Panchakarma, authentic Siddha rejuvenation therapies, and spiritual healing programs near the sea.",
        features: ["Panchakarma Detoxification", "Siddha Herbal Steam Baths", "Stress Management Therapies", "Consulting Vaidyas"]
      }
    ]
  },
  siddha: {
    title: "Siddha & Ayurveda Healing",
    tagline: "Experience ancient herbal remedies and traditional vital-point (Varma) healing.",
    color: "from-amber-500 to-orange-600",
    themeColor: "text-amber-600",
    bgLight: "bg-amber-50/50",
    borderLight: "border-amber-100",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
    items: [
      {
        name: "Sudha Saseendran Siddha Hospital",
        location: "Mecode Vaidhyasalai, near Marthandam",
        hours: "09:00 AM - 05:00 PM",
        phone: "+91 4651 270258",
        description: "An institution representing five generations of traditional Siddha expertise, Mecode Vaidhyasalai is legendary for Varma bone-setting, joint therapies, and organic herbal formulations.",
        features: ["Traditional Bone-Setting (Odivu Murivu)", "Varma Point Therapy", "Herbal Medicine Pharmacy", "Kalari Marma Consultations"]
      },
      {
        name: "Golden Leaf Siddha and Ayurveda Hospital",
        location: "Allumoodu, Nagercoil",
        hours: "09:00 AM - 08:00 PM",
        phone: "+91 94431 35002",
        description: "Providing modern amenities alongside ancient medicine, Golden Leaf specializes in Panchakarma detoxification, traditional Siddha remedies, physiotherapy, and acupuncture.",
        features: ["Panchakarma Therapies", "Traditional Siddha Oil Massage", "Acupuncture & Moxibustion", "Chronic Disease Management"]
      },
      {
        name: "Kumari Ayurvedic Resort & Healing Center",
        location: "Chunkankadai, Nagercoil",
        hours: "08:30 AM - 06:30 PM",
        phone: "+91 4652 230154",
        description: "Nestled away in Nagercoil, this center offers classical nature cure treatments, customized Ayurvedic diets, and soothing herbal steam baths in a serene environment.",
        features: ["Ayurvedic Rejuvenation Massage", "Medicated Oil Baths (Sirodhara)", "Naturo-therapy consultation", "Siddha Herbal Powder Massages"]
      }
    ]
  },
  hospitals: {
    title: "Hospital Tourism & Healthcare",
    tagline: "Access world-class tertiary hospitals and super-specialty medical services.",
    color: "from-blue-500 to-indigo-600",
    themeColor: "text-blue-600",
    bgLight: "bg-blue-50/50",
    borderLight: "border-blue-100",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-100",
    items: [
      {
        name: "Govt. Kanyakumari Medical College Hospital",
        location: "Asaripallam, Nagercoil",
        hours: "Emergency Care 24/7",
        phone: "04652-223201",
        description: "The primary government tertiary medical institution in the Kanyakumari district, offering advanced super-specialty departments, modern critical care units, and round-the-clock emergency support.",
        features: ["24/7 Emergency & ICU", "Super-Specialty Surgery", "Comprehensive Diagnostic Labs", "Qualified Resident Doctors"]
      },
      {
        name: "Holy Cross Multi-Specialty Hospital",
        location: "Holy Cross College Road, Nagercoil",
        hours: "Emergency Care 24/7",
        phone: "+91 4652 230681",
        description: "A highly trusted private healthcare provider in Nagercoil, known for advanced cardiology, surgical care, pediatric departments, and modern diagnostic systems.",
        features: ["Advanced Cardiac Cath Lab", "Maternity & Pediatric Special Care", "Outpatient Consultation Blocks", "Orthopedics & Joint Replacement"]
      },
      {
        name: "Sree Mookambika Institute of Medical Sciences",
        location: "Kulasekharam, Kanyakumari District",
        hours: "Emergency Care 24/7",
        phone: "+91 4651 280742",
        description: "A premier medical institute and super-specialty hospital situated in Kulasekharam, delivering state-of-the-art neurology, cardiology, orthopedic, and nephrology services.",
        features: ["Advanced Tertiary Trauma Care", "Nephrology & Dialysis Center", "Multi-disciplinary surgical setups", "Academic medical research labs"]
      }
    ]
  }
}

export default function MedicalWellnessPage() {
  const [activeCategory, setActiveCategory] = useState<'retreats' | 'siddha' | 'hospitals'>('retreats')

  const handleCardClick = (category: 'retreats' | 'siddha' | 'hospitals') => {
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
          <div className="absolute inset-0 bg-black/55 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1600&auto=format&fit=crop" 
            alt="Wellness Banner"
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
            HOLISTIC HEALING IN NAMMA KUMARI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-display-md md:text-display-lg text-white font-extrabold tracking-tight leading-none"
          >
            Medical & Wellness Tourism
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-body-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
          >
            Rejuvenate your mind and body with world-class healthcare, traditional Siddha medicine, and peaceful yoga retreats in the serene landscape of Kanyakumari.
          </motion.p>
        </div>
      </section>

      {/* Main Grid: Card Selection */}
      <section className="container-wide -mt-20 relative z-40 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Wellness Retreats */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`bg-white rounded-3xl overflow-hidden shadow-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[450px] ${
              activeCategory === 'retreats' ? 'ring-2 ring-emerald-500 border-transparent' : 'border-slate-100 hover:border-slate-200'
            }`}
            onClick={() => handleCardClick('retreats')}
            id="card-retreats"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop" 
                alt="Wellness Retreats"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                YOGA, MEDITATION & DETOX
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-heading-md font-bold text-slate-900">Wellness Retreats</h3>
                <p className="text-body-sm text-slate-500 leading-relaxed">
                  Restore your body, mind & spirit in the serene hills, lakefronts, and coastal campuses of Kanyakumari.
                </p>
              </div>
              <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-body-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-4">
                EXPLORE RETREATS <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: Siddha & Ayurveda */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`bg-white rounded-3xl overflow-hidden shadow-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[450px] ${
              activeCategory === 'siddha' ? 'ring-2 ring-amber-500 border-transparent' : 'border-slate-100 hover:border-slate-200'
            }`}
            onClick={() => handleCardClick('siddha')}
            id="card-siddha"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1611073123048-388a174f7474?w=600&auto=format&fit=crop" 
                alt="Siddha & Ayurveda"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                TRADITIONAL THERAPIES
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-heading-md font-bold text-slate-900">Siddha & Ayurveda</h3>
                <p className="text-body-sm text-slate-500 leading-relaxed">
                  Experience ancient remedies, herbal steam treatments, and traditional vital-point Varmam therapies native to this land.
                </p>
              </div>
              <button className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-body-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-4">
                LEARN MORE <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: Hospital Tourism */}
          <motion.div 
            whileHover={{ y: -8 }}
            className={`bg-white rounded-3xl overflow-hidden shadow-xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[450px] ${
              activeCategory === 'hospitals' ? 'ring-2 ring-blue-500 border-transparent' : 'border-slate-100 hover:border-slate-200'
            }`}
            onClick={() => handleCardClick('hospitals')}
            id="card-hospitals"
          >
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop" 
                alt="Hospital Tourism"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-4 left-4 bg-blue-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                MEDICAL TRAVEL & CARE
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-serif text-heading-md font-bold text-slate-900">Hospital Tourism</h3>
                <p className="text-body-sm text-slate-500 leading-relaxed">
                  Access top tertiary academic hospitals, multi-specialty cardiac facilities, and high-quality modern surgical care.
                </p>
              </div>
              <button className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-body-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-4">
                PLAN YOUR VISIT <ArrowRight className="w-4 h-4" />
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
                          {activeCategory === 'retreats' ? 'Retreat Campus' : activeCategory === 'siddha' ? 'Healing Center' : 'Tertiary Care'}
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
                        <a href={`tel:${item.phone.replace(/[^+\d]/g, '')}`} className="flex items-center gap-1.5 hover:text-slate-600 transition-colors">
                          <Phone className="w-4 h-4 text-slate-400" />
                          {item.phone}
                        </a>
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
