'use client'

import { motion } from 'framer-motion'
import { Leaf, Map, Camera, ShieldAlert, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { wildlifeZones } from '@/lib/data'

export default function WildlifePage() {
  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-20">
      <div className="container-wide">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-forest-900 text-white shadow-2xl mb-16">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070" 
              alt="Kanyakumari Wildlife Sanctuary"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
          
          <div className="relative z-10 p-10 md:p-20 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold text-sm tracking-wide mb-6">
              <Leaf className="w-4 h-4" /> Eco-Tourism
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">
              Kanyakumari Wildlife Sanctuary
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              A biodiversity hotspot in the Western Ghats. Home to tigers, elephants, and endemic flora. Discover the pristine beauty of India's southernmost forests.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-granite-100">
            <div className="w-12 h-12 bg-ocean-50 text-ocean rounded-xl flex items-center justify-center mb-6">
              <Camera className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">Flora & Fauna</h3>
            <p className="text-granite-600">Spot Indian Bison (Gaur), Lion-tailed Macaque, and hundreds of bird species in their natural habitat.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-granite-100">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">Trekking Trails</h3>
            <p className="text-granite-600">Guided treks ranging from easy walks to challenging climbs. Forest department guides are mandatory.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-granite-100">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold mb-3">Conservation Rules</h3>
            <p className="text-granite-600">Plastic-free zone. Strict silence must be maintained. Respect the wildlife and leave no trace behind.</p>
          </div>
        </div>

        {/* Zones */}
        <h2 className="font-serif text-3xl font-bold mb-8">Explore Zones</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wildlifeZones.map((zone, index) => (
            <motion.div
              key={zone.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative h-80 rounded-2xl overflow-hidden ${zone.status !== 'Restricted' ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            >
              {zone.status !== 'Restricted' && (
                <Link href={zone.status === 'Pass Required' ? '/bookings/tickets' : '/explore'} className="absolute inset-0 z-20" />
              )}
              <img 
                src={zone.image} 
                alt={zone.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              
              <div className="absolute top-4 right-4 z-10">
                <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                  zone.status === 'Open' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                  zone.status === 'Restricted' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
                  'bg-gold/20 text-gold border-gold/30'
                }`}>
                  {zone.status}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-300 group-hover:-translate-y-4 z-10">
                <p className="text-emerald-400 font-bold text-sm mb-1">{zone.type}</p>
                <h3 className="font-serif text-white text-2xl font-bold mb-3">{zone.name}</h3>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-gold transition-colors">
                  {(zone as any).action} {zone.status !== 'Restricted' && <ArrowRight className="w-4 h-4" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
