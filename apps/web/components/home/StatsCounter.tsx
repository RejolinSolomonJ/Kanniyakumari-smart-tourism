'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, Clock, Maximize } from 'lucide-react'

const stats = [
  { icon: MapPin, value: 45, suffix: '+', label: 'Destinations', color: 'text-ocean' },
  { icon: Users, value: 12, suffix: 'M+', label: 'Annual Visitors', color: 'text-gold' },
  { icon: Clock, value: 3000, suffix: '+', label: 'Years of Heritage', color: 'text-sunset' },
  { icon: Maximize, value: 1672, suffix: '', label: 'Sq KM of Beauty', color: 'text-sea' },
]

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    if (!inView) return
    
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    
    return () => clearInterval(timer)
  }, [target, inView])
  
  return (
    <span className="tabular-nums">
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 md:py-20 bg-white relative">
      <div className="container-wide">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="text-center p-6 md:p-8 rounded-2xl bg-granite-50 hover:bg-white hover:shadow-card transition-all duration-400 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm mb-4 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`font-serif text-heading-xl md:text-display font-bold ${stat.color} mb-2`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-body-sm text-granite-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
