'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const destinations = [
  {
    name: 'Vivekananda Rock Memorial',
    nameTa: 'விவேகானந்தர் பாறை நினைவகம்',
    category: 'Heritage',
    image: '/images/Vivekananda_Memorial.jpg',
    slug: 'vivekananda-rock-memorial',
  },
  {
    name: 'Kanyakumari Beach',
    nameTa: 'கன்னியாகுமரி கடற்கரை',
    category: 'Beach',
    image: '/images/kanyakumari-beaches.jpg',
    slug: 'kanyakumari-beach',
  },
  {
    name: 'Padmanabhapuram Palace',
    nameTa: 'பத்மநாபபுரம் அரண்மனை',
    category: 'Heritage',
    image: '/images/padmanabhapuram-palace.jpg',
    slug: 'padmanabhapuram-palace',
  },
  {
    name: 'Thirparappu Falls',
    nameTa: 'திற்பரப்பு அருவி',
    category: 'Waterfall',
    image: '/images/Thirparappu_Waterfalls.jpg',
    slug: 'thirparappu-waterfalls',
  },
  {
    name: 'Suchindram Temple',
    nameTa: 'சுசீந்திரம் கோவில்',
    category: 'Temple',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=450&fit=crop',
    slug: 'suchindram-thanumalayan-temple',
  },
  {
    name: 'Mathoor Hanging Bridge',
    nameTa: 'மத்தூர் தூக்கு பாலம்',
    category: 'Adventure',
    image: '/images/Mathur_aqueduct.jpg',
    slug: 'mathoor-hanging-bridge',
  },
]

export default function FeaturedDestinations() {
  return (
    <section className="section-padding bg-granite-50">
      <div className="container-wide">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold font-medium text-body-sm tracking-wider uppercase mb-2"
            >
              Stunning Wonders
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-heading-xl md:text-display text-granite-900"
            >
              Featured Destinations
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-ocean font-medium hover:gap-3 transition-all mt-4 md:mt-0"
            >
              Explore All <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={index === 2 ? 'md:row-span-2' : ''}
            >
              <Link href={`/explore/${dest.slug}`} className="destination-card group block h-full">
                <div className="card-image">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className={`w-full object-cover ${index === 2 ? 'h-[420px] lg:h-full' : 'h-64'}`}
                  />
                  <div className="absolute inset-0 bg-gradient-card opacity-60" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-4 left-4 badge-ocean backdrop-blur-sm">
                    {dest.category}
                  </span>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-serif text-heading-sm text-white font-bold mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-body-sm text-white/70 font-tamil">
                      {dest.nameTa}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
