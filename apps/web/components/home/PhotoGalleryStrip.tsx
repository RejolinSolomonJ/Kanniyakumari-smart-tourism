'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1621427638795-7e4e88e1e6d8?w=400&h=300&fit=crop', title: 'Vivekananda Rock Memorial', height: 'h-48' },
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop', title: 'Sunset at Kanyakumari', height: 'h-64' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=350&fit=crop', title: 'Western Ghats View', height: 'h-52' },
  { src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=280&fit=crop', title: 'Temple Architecture', height: 'h-44' },
  { src: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba5854?w=400&h=400&fit=crop', title: 'Thirparappu Falls', height: 'h-56' },
  { src: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=320&fit=crop', title: 'Palace Heritage', height: 'h-48' },
  { src: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=450&fit=crop', title: 'Local Cuisine', height: 'h-60' },
  { src: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop', title: 'Coastal Beauty', height: 'h-48' },
]

export default function PhotoGalleryStrip() {
  return (
    <section className="section-padding bg-granite-50">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold font-medium text-body-sm tracking-wider uppercase mb-2"
            >
              Visual Journey
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-heading-xl md:text-display text-granite-900"
            >
              Photo Gallery
            </motion.h2>
          </div>
          <Link href="/gallery/photos" className="inline-flex items-center gap-2 text-ocean font-medium hover:gap-3 transition-all mt-4 md:mt-0">
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Staggered Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="break-inside-avoid group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className={`w-full ${photo.height} object-cover group-hover:scale-110 transition-transform duration-700`}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                  <p className="text-white text-body-sm font-medium p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    {photo.title}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
