'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin } from 'lucide-react'

const festivals = [
  {
    name: 'Cape Festival',
    nameTa: 'கேப் திருவிழா',
    month: 'October',
    date: 'Oct 15-17, 2026',
    venue: 'Kanyakumari Beach',
    type: 'Cultural',
    description: 'Cultural extravaganza with music, dance, and traditional performances at the tip of India.',
    color: 'border-l-ocean',
  },
  {
    name: 'Kumari Thiruvizha',
    nameTa: 'குமரி திருவிழா',
    month: 'April',
    date: 'Apr 20-25, 2027',
    venue: 'Kanyakumari Town',
    type: 'Tourism Festival',
    description: 'Annual tourism festival featuring Villu Paattu, Karagattam, and classical dance.',
    color: 'border-l-gold',
  },
  {
    name: 'Suchindram Car Festival',
    nameTa: 'சுசீந்திரம் தேர் திருவிழா',
    month: 'December',
    date: 'Dec 20-30, 2026',
    venue: 'Suchindram Temple',
    type: 'Temple Festival',
    description: 'Grand chariot procession through temple streets with elaborate rituals and cultural events.',
    color: 'border-l-sunset',
  },
  {
    name: 'Mandaikadu Kodai Festival',
    nameTa: 'மண்டைக்காடு கோடை திருவிழா',
    month: 'February',
    date: 'Feb 10-20, 2027',
    venue: 'Mandaikadu Bhagavathi Temple',
    type: 'Religious',
    description: 'Major festival dedicated to Goddess Bhagavathi, attracting lakhs of devotees.',
    color: 'border-l-red-500',
  },
  {
    name: 'Our Lady of Ransom Festival',
    nameTa: 'அன்னை ராணி திருவிழா',
    month: 'December',
    date: 'Dec 1-10, 2026',
    venue: 'Kanyakumari Church',
    type: 'Christian Festival',
    description: 'Known for the spectacular golden car procession with grand fireworks.',
    color: 'border-l-purple-500',
  },
  {
    name: 'Chitra Purnami',
    nameTa: 'சித்ரா பூர்ணமி',
    month: 'April',
    date: 'Apr 13, 2027',
    venue: 'Kanyakumari Amman Temple',
    type: 'Sacred',
    description: 'Full-moon festival with thousands gathering for special rituals by the sea.',
    color: 'border-l-emerald-500',
  },
]

export default function FestivalCalendar() {
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
            Celebrate With Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Festival Calendar
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {festivals.map((festival, index) => (
            <motion.div
              key={festival.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={`p-5 rounded-xl bg-granite-50 border-l-4 ${festival.color} hover:bg-white hover:shadow-card transition-all duration-300`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-caption font-semibold text-ocean bg-ocean-50 px-2.5 py-1 rounded-full">
                  {festival.month}
                </span>
                <span className="text-caption text-granite-500 bg-granite-100 px-2.5 py-1 rounded-full">
                  {festival.type}
                </span>
              </div>
              <h3 className="font-serif text-heading-sm text-granite-900 mb-1">
                {festival.name}
              </h3>
              <p className="text-caption text-granite-400 font-tamil mb-2">{festival.nameTa}</p>
              <p className="text-body-sm text-granite-500 mb-3">{festival.description}</p>
              <div className="flex items-center gap-4 text-caption text-granite-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {festival.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-ocean" />
                  {festival.venue}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
