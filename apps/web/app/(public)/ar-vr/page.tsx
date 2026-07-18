'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Maximize2, MapPin, Info } from 'lucide-react'
import { arvrTours } from '@/lib/data'

export default function ARVRPage() {
  const [activeTour, setActiveTour] = useState(arvrTours[0])
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="pt-20 min-h-screen bg-black text-white selection:bg-gold selection:text-black">
      {/* Immersive Viewer Area */}
      <div className="relative h-[65vh] md:h-[75vh] w-full bg-granite-900 overflow-hidden">
        {/* Placeholder for 360 Viewer Canvas (Three.js / A-Frame) */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ 
            backgroundImage: `url(${activeTour.image})`,
            transform: isPlaying ? 'scale(1.05)' : 'scale(1)'
          }}
        />
        
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent pointer-events-none" />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
          <motion.div
            key={activeTour.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl space-y-4"
          >
            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold tracking-wider uppercase text-gold">
              {activeTour.tag}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight">
              {activeTour.title}
            </h1>
            <p className="text-lg text-white/80 max-w-lg">
              {activeTour.description}
            </p>
            
            <div className="flex items-center gap-4 pt-4">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105"
              >
                <Play className="w-5 h-5 fill-current" />
                {isPlaying ? 'Pause Tour' : 'Start Virtual Tour'}
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-colors">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tour Selector */}
      <div className="container-wide py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
            <MapPin className="text-gold" />
            Available Experiences
          </h2>
          <button className="text-sm text-white/60 hover:text-white flex items-center gap-1 transition-colors">
            <Info className="w-4 h-4" /> VR Headset Guide
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {arvrTours.map((tour) => (
            <button
              key={tour.id}
              onClick={() => setActiveTour(tour)}
              className={`group text-left relative overflow-hidden rounded-2xl aspect-video transition-all duration-300 ${
                activeTour.id === tour.id ? 'ring-2 ring-gold ring-offset-2 ring-offset-black' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img 
                src={tour.image} 
                alt={tour.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-serif font-bold text-lg">{tour.title}</h3>
                <p className="text-xs text-white/70">{tour.tag}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
