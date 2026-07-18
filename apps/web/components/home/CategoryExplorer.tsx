'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Waves, Church, TreePine, Droplets, 
  Mountain, Landmark, Building, Palette, 
  ShoppingBag, UtensilsCrossed, BookHeart, Camera 
} from 'lucide-react'

const categories = [
  { key: 'BEACH', label: 'Beaches', icon: Waves, count: 4, color: 'bg-blue-50 text-blue-600' },
  { key: 'TEMPLE', label: 'Temples', icon: Church, count: 3, color: 'bg-orange-50 text-orange-600' },
  { key: 'HERITAGE', label: 'Heritage', icon: Landmark, count: 6, color: 'bg-amber-50 text-amber-700' },
  { key: 'WATERFALL', label: 'Waterfalls', icon: Droplets, count: 2, color: 'bg-cyan-50 text-cyan-600' },
  { key: 'ADVENTURE', label: 'Adventure', icon: Mountain, count: 1, color: 'bg-green-50 text-green-600' },
  { key: 'WILDLIFE', label: 'Wildlife', icon: TreePine, count: 1, color: 'bg-emerald-50 text-emerald-600' },
  { key: 'MUSEUM', label: 'Museums', icon: Building, count: 2, color: 'bg-purple-50 text-purple-600' },
  { key: 'CULTURE', label: 'Culture', icon: Palette, count: 2, color: 'bg-pink-50 text-pink-600' },
  { key: 'RELIGIOUS', label: 'Religious', icon: BookHeart, count: 1, color: 'bg-red-50 text-red-600' },
  { key: 'FOOD', label: 'Food', icon: UtensilsCrossed, count: 3, color: 'bg-yellow-50 text-yellow-700' },
  { key: 'SHOPPING', label: 'Shopping', icon: ShoppingBag, count: 2, color: 'bg-indigo-50 text-indigo-600' },
  { key: 'PHOTOGRAPHY', label: 'Photography', icon: Camera, count: 5, color: 'bg-teal-50 text-teal-600' },
]

export default function CategoryExplorer() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="section-header">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-medium text-body-sm tracking-wider uppercase mb-2"
          >
            Explore By Category
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Discover the Diverse Wonders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle"
          >
            From pristine beaches to ancient temples, Kanyakumari offers experiences for every traveler
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/explore?category=${cat.key}`}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 group ${
                  activeCategory === cat.key
                    ? 'border-ocean bg-ocean-50 shadow-md'
                    : 'border-granite-100 hover:border-ocean/30 hover:shadow-card'
                }`}
                onMouseEnter={() => setActiveCategory(cat.key)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <p className="text-body-sm font-semibold text-granite-800">{cat.label}</p>
                  <p className="text-caption text-granite-400">{cat.count} places</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
