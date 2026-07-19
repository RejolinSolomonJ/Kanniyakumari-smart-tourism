'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Compass, Ticket, Hotel, AlertTriangle, 
  Download, Sparkles 
} from 'lucide-react'

const actions = [
  { icon: Compass, label: 'Plan Trip', href: '/plan', color: 'from-ocean-500 to-ocean-700', delay: 0 },
  { icon: Ticket, label: 'Book Tickets', href: '/bookings/tickets', color: 'from-gold-500 to-gold-700', delay: 0.05 },
  { icon: Hotel, label: 'Find Hotels', href: '/stay', color: 'from-sea-500 to-sea-700', delay: 0.1 },
  { icon: AlertTriangle, label: 'Emergency', href: '/emergency', color: 'from-red-500 to-red-700', delay: 0.15 },
  { icon: Download, label: 'Download Map', href: '/downloads', color: 'from-sunset-500 to-sunset-700', delay: 0.2 },
]

export default function QuickActions() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-wide">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {actions.map((action) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: action.delay }}
            >
              <Link
                href={action.href}
                className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border border-granite-100 hover:border-transparent hover:shadow-card-hover transition-all duration-400 group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-body-sm font-semibold text-granite-700 group-hover:text-ocean transition-colors">
                  {action.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
