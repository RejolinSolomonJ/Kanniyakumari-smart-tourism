'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Video, Play, ExternalLink } from 'lucide-react'

const videos = [
  {
    title: 'Kanyakumari Drone View 🌊✨',
    desc: 'Breathtaking 4K aerial shots of Thiruvalluvar Statue & Vivekananda Rock Memorial.',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
    duration: '2:15',
    src: '/videos/kanyakumari-hero.mp4'
  },
  {
    title: 'Sunrise over Triveni Sangam 🌅',
    desc: 'Time-lapse video of the unique sunrise where three oceans converge.',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    duration: '1:45',
    src: '/videos/kanyakumari-hero.mp4' // Fallback
  }
]

export default function VideosGalleryPage() {
  const [activeVideo, setActiveVideo] = useState<any>(null)

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-4xl">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Video & Drone Gallery
          </h1>
          <p className="text-body-sm text-granite-500">
            Watch drone footage, walk-through guides, and cultural documentations of Kanyakumari.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-card border border-granite-100 group flex flex-col justify-between">
              <div>
                <div className="relative aspect-video overflow-hidden bg-black flex items-center justify-center cursor-pointer" onClick={() => setActiveVideo(vid)}>
                  <img
                    src={vid.thumbnail}
                    alt={vid.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Play Button Overlay */}
                  <div className="w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg z-10">
                    <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                  </div>

                  <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-heading-sm text-granite-900 font-bold leading-tight">
                    {vid.title}
                  </h3>
                  <p className="text-body-sm text-granite-600 leading-relaxed">
                    {vid.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 border-t border-granite-100 flex justify-between items-center bg-granite-50/50">
                <span className="text-caption text-granite-400 font-medium">Official Media Archive</span>
                <button
                  onClick={() => setActiveVideo(vid)}
                  className="text-ocean font-bold text-caption flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Watch Video <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Video Player Modal */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-transparent max-w-3xl w-full flex flex-col items-end gap-3">
              <button
                onClick={() => setActiveVideo(null)}
                className="text-white hover:text-granite-300 font-bold bg-white/10 w-9 h-9 rounded-full flex items-center justify-center border border-white/25"
              >
                ✕
              </button>
              
              <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
                <video
                  src={activeVideo.src}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
