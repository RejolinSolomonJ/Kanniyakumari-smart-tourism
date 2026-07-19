'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin, Users, Clock, Maximize, Compass, Ticket, Hotel, AlertTriangle, Headset, Volume2, VolumeX } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { icon: MapPin,    value: 45,   suffix: '+',  label: 'Destinations',     color: '#38bdf8' },
  { icon: Users,     value: 12,   suffix: 'M+', label: 'Annual Visitors',  color: '#fbbf24' },
  { icon: Clock,     value: 3000, suffix: '+',  label: 'Years of Heritage',color: '#fb923c' },
  { icon: Maximize,  value: 1672, suffix: '',   label: 'Sq KM of Beauty',  color: '#34d399' },
]

const actions = [
  { icon: Compass,       label: 'Plan Trip',    href: '/plan',             bg: 'from-blue-600 to-blue-800' },
  { icon: Ticket,        label: 'Book Tickets', href: '/bookings/tickets', bg: 'from-amber-500 to-yellow-700' },
  { icon: Hotel,         label: 'Find Hotels',  href: '/stay',             bg: 'from-teal-500 to-teal-700' },
  { icon: AlertTriangle, label: 'Emergency',    href: '/emergency',        bg: 'from-red-500 to-red-700' },
  { icon: Headset,       label: 'AR / VR',      href: '/ar-vr',            bg: 'from-orange-500 to-red-600' },
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
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  // Attempt to play with audio after first user interaction on the page
  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {})
      }
    }
    document.addEventListener('click', playVideo, { once: true })
    document.addEventListener('keydown', playVideo, { once: true })
    return () => {
      document.removeEventListener('click', playVideo, playVideo as any)
      document.removeEventListener('keydown', playVideo, playVideo as any)
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted
      if (!muted === false) {
        // unmuting — make sure playing
        videoRef.current.play().catch(() => {})
      }
      setMuted(!muted)
    }
  }

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden">

      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        src="/images/kanniyakumari-bg.mp4"
        autoPlay
        loop
        muted={muted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/55 z-10" />

      {/* ── Mute / Unmute Button ── */}
      <button
        onClick={toggleMute}
        className="absolute top-5 right-5 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold hover:bg-white/25 transition-all"
        title={muted ? 'Unmute video' : 'Mute video'}
      >
        {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        {muted ? 'Unmute' : 'Mute'}
      </button>

      {/* ── Content ── */}
      <div className="relative z-20 container-wide px-4">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex flex-col items-center gap-3 py-8 px-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + '22' }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="font-serif text-4xl md:text-5xl font-extrabold" style={{ color: stat.color }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-white/80 text-sm font-semibold tracking-wide text-center">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-white/30 mx-auto mb-14" />

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-10 md:gap-16">
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
