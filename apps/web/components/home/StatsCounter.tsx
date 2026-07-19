'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { MapPin, Users, Clock, Maximize, Compass, Ticket, Hotel, AlertTriangle, Headset } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { icon: MapPin,   value: 45,   suffix: '+',  label: 'Destinations',    color: 'text-sky-300' },
  { icon: Users,    value: 12,   suffix: 'M+', label: 'Annual Visitors', color: 'text-amber-300' },
  { icon: Clock,    value: 3000, suffix: '+',  label: 'Years of Heritage', color: 'text-orange-300' },
  { icon: Maximize, value: 1672, suffix: '',   label: 'Sq KM of Beauty',  color: 'text-emerald-300' },
]

const actions = [
  { icon: Compass,      label: 'Plan Trip',    href: '/plan',              bg: 'from-blue-600 to-blue-800' },
  { icon: Ticket,       label: 'Book Tickets', href: '/bookings/tickets',  bg: 'from-amber-500 to-yellow-700' },
  { icon: Hotel,        label: 'Find Hotels',  href: '/stay',              bg: 'from-teal-500 to-teal-700' },
  { icon: AlertTriangle,label: 'Emergency',    href: '/emergency',         bg: 'from-red-500 to-red-700' },
  { icon: Headset,      label: 'AR / VR',      href: '/ar-vr',             bg: 'from-orange-500 to-red-600' },
]

function AnimatedCounter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 2000 / steps)
    return () => clearInterval(timer)
  }, [target, inView])

  return <span className="tabular-nums">{count.toLocaleString('en-IN')}{suffix}</span>
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  // Parallax: background image moves slower than scroll
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32">

      {/* ── Parallax background ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        {/* extra height so parallax never exposes empty space */}
        <div className="absolute inset-0 scale-[1.3] origin-center">
          <img
            src="/images/background.jpg"
            alt="Kanyakumari landscape"
            className="w-full h-full object-cover"
          />
        </div>
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      {/* ── Content ── */}
      <div className="relative z-10 container-wide px-4">

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`font-serif text-4xl md:text-5xl font-extrabold ${stat.color}`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-white/80 text-sm font-semibold tracking-wide text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-white/30 mx-auto mb-14" />

        {/* Quick action buttons */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {actions.map((action, i) => (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
            >
              <Link href={action.href} className="flex flex-col items-center gap-3 group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${action.bg} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <action.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-white text-xs font-bold tracking-widest uppercase group-hover:text-amber-300 transition-colors">
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
