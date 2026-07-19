'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const photos = [
  { src: '/images/mixed/Vivekananda_Memorial.jpg', title: 'Vivekananda Rock Memorial', height: 'h-48' },
  { src: '/images/mixed/sunrise and sunset view point.jpg', title: 'Sunset at Kanyakumari', height: 'h-64' },
  { src: '/images/adventure/kalikesam maramalai.jpg', title: 'Western Ghats View', height: 'h-52' },
  { src: '/images/mixed/SUCHINDAM_TEMPLE.jpg', title: 'Temple Architecture', height: 'h-44' },
  { src: '/images/waterfalls/Thirparappu Falls.jpg', title: 'Thirparappu Falls', height: 'h-56' },
  { src: '/images/museums/padmanabhapuram palace museum.jpg', title: 'Palace Heritage', height: 'h-48' },
  { src: '/images/Mathur_aqueduct.jpg', title: 'Mathoor Hanging Bridge', height: 'h-60' },
  { src: '/images/mixed/sothavilai_Beach.jpg', title: 'Coastal Beauty', height: 'h-48' },
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
