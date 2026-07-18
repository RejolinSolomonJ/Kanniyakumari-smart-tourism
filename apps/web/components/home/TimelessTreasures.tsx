'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { UtensilsCrossed, Leaf, Activity } from 'lucide-react'

const treasures = [
  {
    title: 'Culinary Tourism',
    desc: 'Savor the authentic flavors of Tamil Nadu, from spicy Chettinad curries to traditional vegetarian feasts served on banana leaves.',
    image: '/images/culinary_tourism.png',
    link: '/food',
    icon: UtensilsCrossed
  },
  {
    title: 'Agri & Rural Tourism',
    desc: 'Experience the rustic charm of village life, walk through lush paddy fields, and understand the roots of Tamil culture.',
    image: '/images/rural_tourism.png',
    link: '/explore',
    icon: Leaf
  },
  {
    title: 'Wellness & Medical Tourism',
    desc: 'Rejuvenate your mind and body with world-class healthcare, traditional Siddha medicine, and peaceful yoga retreats.',
    image: '/images/explore',
    link: '/explore',
    icon: Activity
  }
]

export default function TimelessTreasures() {
  return (
    <section className="section-padding bg-granite-50">
      <div className="container-wide">
        <div className="section-header text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold font-medium text-body-sm tracking-wider uppercase mb-2"
          >
            Discover the Diverse Wonders
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-3xl md:text-4xl font-bold font-serif text-granite-900"
          >
            Kanyakumari's Timeless Treasures
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="section-subtitle mt-2 text-granite-500 max-w-xl mx-auto"
          >
            Experience the rich heritage and vibrant culture of the Land of Temples
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {treasures.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-card border border-granite-100 flex flex-col justify-between group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <h3 className="font-serif text-heading font-bold text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-caption text-white/80 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white text-center flex justify-center border-t border-granite-100">
                <Link
                  href={item.link}
                  className="py-2.5 px-10 rounded-full border border-granite-200 text-caption font-bold text-granite-800 hover:bg-ocean hover:text-white hover:border-ocean transition-all duration-300 shadow-sm"
                >
                  Click Here
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
