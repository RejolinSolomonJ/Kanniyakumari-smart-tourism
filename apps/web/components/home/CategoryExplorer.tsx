'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Waves, Church, TreePine, Droplets,
  Mountain, Landmark, Building, Palette,
  ShoppingBag, UtensilsCrossed, BookHeart, Camera,
  ArrowRight
} from 'lucide-react'

const categories = [
  { key: 'BEACH',       label: 'Beaches',      icon: Waves,           count: 4,  accent: '#0ea5e9', bg: 'from-sky-500/20 to-blue-600/20',     border: 'border-sky-400/30' },
  { key: 'TEMPLE',      label: 'Temples',       icon: Church,          count: 3,  accent: '#f97316', bg: 'from-orange-500/20 to-red-600/20',   border: 'border-orange-400/30' },
  { key: 'HERITAGE',    label: 'Heritage',      icon: Landmark,        count: 6,  accent: '#d97706', bg: 'from-amber-500/20 to-yellow-600/20', border: 'border-amber-400/30' },
  { key: 'WATERFALL',   label: 'Waterfalls',    icon: Droplets,        count: 2,  accent: '#06b6d4', bg: 'from-cyan-500/20 to-teal-600/20',    border: 'border-cyan-400/30' },
  { key: 'ADVENTURE',   label: 'Adventure',     icon: Mountain,        count: 1,  accent: '#22c55e', bg: 'from-green-500/20 to-emerald-600/20',border: 'border-green-400/30' },
  { key: 'WILDLIFE',    label: 'Wildlife',      icon: TreePine,        count: 1,  accent: '#10b981', bg: 'from-emerald-500/20 to-green-700/20', border: 'border-emerald-400/30' },
  { key: 'MUSEUM',      label: 'Museums',       icon: Building,        count: 2,  accent: '#8b5cf6', bg: 'from-violet-500/20 to-purple-600/20', border: 'border-violet-400/30' },
  { key: 'CULTURE',     label: 'Culture',       icon: Palette,         count: 2,  accent: '#ec4899', bg: 'from-pink-500/20 to-rose-600/20',    border: 'border-pink-400/30' },
  { key: 'RELIGIOUS',   label: 'Religious',     icon: BookHeart,       count: 1,  accent: '#ef4444', bg: 'from-red-500/20 to-rose-700/20',     border: 'border-red-400/30' },
  { key: 'FOOD',        label: 'Food',          icon: UtensilsCrossed, count: 3,  accent: '#eab308', bg: 'from-yellow-500/20 to-amber-600/20',  border: 'border-yellow-400/30' },
  { key: 'SHOPPING',    label: 'Shopping',      icon: ShoppingBag,     count: 2,  accent: '#6366f1', bg: 'from-indigo-500/20 to-violet-600/20', border: 'border-indigo-400/30' },
  { key: 'PHOTOGRAPHY', label: 'Photography',   icon: Camera,          count: 5,  accent: '#14b8a6', bg: 'from-teal-500/20 to-cyan-700/20',    border: 'border-teal-400/30' },
]

export default function CategoryExplorer() {
  return (
    <section className="py-16 px-6 bg-[#0a0f1e]">
      <div className="container-wide">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.25em] uppercase text-amber-400 mb-2"
            >
              Browse by Category
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight"
            >
              Discover the Diverse Wonders
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Link
              href="/explore"
              className="flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group"
            >
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.4 }}
            >
              <Link
                href={`/explore?category=${cat.key}`}
                className={`group relative flex flex-col items-center gap-3 p-5 rounded-xl border bg-white/5 ${cat.border} hover:bg-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden`}
              >
                {/* Gradient glow bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} />

                {/* Icon */}
                <div
                  className="relative z-10 w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: cat.accent + '22' }}
                >
                  <cat.icon className="w-5 h-5" style={{ color: cat.accent }} />
                </div>

                {/* Label */}
                <div className="relative z-10 text-center">
                  <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: cat.accent + 'cc' }}>
                    {cat.count} places
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
