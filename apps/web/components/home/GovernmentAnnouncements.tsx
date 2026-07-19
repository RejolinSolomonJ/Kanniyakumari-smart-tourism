'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Megaphone, ArrowRight, Info } from 'lucide-react'

const announcements = [
  {
    title: 'Online Ticket Booking Now Available',
    titleTa: 'ஆன்லைன் டிக்கெட் முன்பதிவு இப்போது கிடைக்கிறது',
    content: 'Book tickets to Vivekananda Rock Memorial and other heritage sites directly through our portal. Skip the queues and plan ahead!',
    type: 'Service Update',
    date: 'July 15, 2026',
    isNew: true,
    link: '/bookings/tickets',
  },
  {
    title: 'Cape Festival 2026 — Registration Open',
    titleTa: 'கேப் திருவிழா 2026 — பதிவு தொடங்கியது',
    content: 'The annual Cape Festival will be held from October 15-17. Cultural performances, food stalls, and art exhibitions. Register now for events.',
    type: 'Event',
    date: 'July 10, 2026',
    isNew: true,
    link: '/events',
  },
]

const ticker = [
  'Welcome to the Official Kanyakumari Tourism Portal',
  'Online ticket booking now available for Vivekananda Rock Memorial',
  'Cape Festival 2026 — October 15-17 — Registration Open',
  'New heritage trail map available for download',
  'Emergency Helpline: 1363 | Police: 100 | Ambulance: 108',
]

export default function GovernmentAnnouncements() {
  return (
    <section className="bg-white">
      {/* Ticker Bar */}
      <div className="bg-ocean-800 py-2.5 overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 bg-gold px-4 py-1 text-caption font-bold text-granite-900 flex items-center gap-1.5 z-10">
            <Megaphone className="w-3.5 h-3.5" />
            UPDATES
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="inline-flex gap-12 text-white/90 text-body-sm"
            >
              {ticker.map((text, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Announcement Cards */}
      <div className="container-wide py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-ocean-50 flex items-center justify-center">
            <Info className="w-5 h-5 text-ocean" />
          </div>
          <h2 className="font-serif text-heading-lg text-granite-900">Government Announcements</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {announcements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={item.link} 
                className="block p-6 rounded-xl border border-granite-100 hover:border-ocean/20 hover:shadow-card transition-all duration-300 group cursor-pointer h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge-ocean text-[11px]">{item.type}</span>
                  {item.isNew && (
                    <span className="text-[10px] font-bold text-white bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
                      NEW
                    </span>
                  )}
                  <span className="text-caption text-granite-400 ml-auto">{item.date}</span>
                </div>
                <h3 className="font-semibold text-granite-900 mb-1 group-hover:text-ocean transition-colors">
                  {item.title}
                </h3>
                <p className="text-caption text-granite-400 font-tamil mb-2">{item.titleTa}</p>
                <p className="text-body-sm text-granite-500">{item.content}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-ocean text-body-sm font-medium group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
