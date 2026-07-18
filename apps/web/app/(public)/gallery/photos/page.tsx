'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Camera, Image as ImageIcon } from 'lucide-react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=800', title: 'Vivekananda Rock Memorial', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800', title: 'Thiruvalluvar Statue', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', title: 'Kanyakumari Beach Sunset', category: 'Beach' },
  { src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800', title: 'Padmanabhapuram Palace Murals', category: 'Heritage' },
  { src: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba5854?w=800', title: 'Thirparappu Waterfalls', category: 'Waterfall' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800', title: 'Western Ghats Scenic View', category: 'Nature' }
]

export default function PhotosGalleryPage() {
  const [filter, setFilter] = useState('ALL')

  const filteredPhotos = filter === 'ALL' ? photos : photos.filter(p => p.category === filter)

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Photo Gallery
          </h1>
          <p className="text-body-sm text-granite-500">
            Beautiful captures of Kanyakumari&apos;s landscapes, historical monuments, and beach views.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center gap-3 mb-10">
          {['ALL', 'Heritage', 'Beach', 'Waterfall', 'Nature'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full border text-body-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-ocean border-ocean text-white'
                  : 'bg-white border-granite-200 text-granite-600 hover:border-granite-300'
              }`}
            >
              {cat === 'ALL' ? 'All Photos' : cat}
            </button>
          ))}
        </div>

        {/* Staggered Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo, idx) => (
            <div key={idx} className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-granite-100 group cursor-pointer">
              <div className="relative overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {photo.category}
                </span>
              </div>
              <div className="p-4 border-t border-granite-50 flex items-center justify-between">
                <span className="font-semibold text-body-sm text-granite-800">{photo.title}</span>
                <ImageIcon className="w-4 h-4 text-granite-400" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
