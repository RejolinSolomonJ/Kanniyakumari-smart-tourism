'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Image as ImageIcon, X, ArrowLeft, ArrowRight } from 'lucide-react'
import { galleryPhotos } from '@/lib/data'

export default function PhotosGalleryPage() {
  const [filter, setFilter] = useState('ALL')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredPhotos = filter === 'ALL' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === filter)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (lightboxIndex === null) return
    let nextIdx = direction === 'next' ? lightboxIndex + 1 : lightboxIndex - 1
    if (nextIdx >= filteredPhotos.length) nextIdx = 0
    if (nextIdx < 0) nextIdx = filteredPhotos.length - 1
    setLightboxIndex(nextIdx)
  }

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
              onClick={() => { setFilter(cat); setLightboxIndex(null); }}
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
            <div 
              key={idx} 
              onClick={() => openLightbox(idx)}
              className="break-inside-avoid bg-white rounded-2xl overflow-hidden shadow-sm border border-granite-100 group cursor-pointer"
            >
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-55 flex items-center justify-center p-4"
              onClick={() => setLightboxIndex(null)}
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full border border-white/20 transition-all cursor-pointer z-56"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
                className="absolute left-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-all cursor-pointer z-56"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>

              <div 
                className="relative max-w-4xl max-h-[80vh] flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={filteredPhotos[lightboxIndex].src} 
                  alt={filteredPhotos[lightboxIndex].title} 
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
                <div className="text-center text-white">
                  <h3 className="font-serif text-lg font-bold">{filteredPhotos[lightboxIndex].title}</h3>
                  <span className="text-xs text-gold font-bold uppercase tracking-widest">{filteredPhotos[lightboxIndex].category}</span>
                </div>
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
                className="absolute right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-all cursor-pointer z-56"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
