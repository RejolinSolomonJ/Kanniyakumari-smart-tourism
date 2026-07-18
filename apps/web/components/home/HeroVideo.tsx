'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/kanyakumari-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1590766940554-634e880d0e44?q=80&w=1920"
      />

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/30 to-transparent" />

      {/* Government Badge — Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-20 left-6 md:left-10 flex items-center gap-3 z-10"
      >
        <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <span className="text-gold font-serif font-bold text-lg">TN</span>
        </div>
        <div className="text-white">
          <p className="text-[10px] opacity-70 tracking-wider uppercase">Government of Tamil Nadu</p>
          <p className="text-body-sm font-medium">Department of Tourism</p>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gold-400 text-caption md:text-body-sm tracking-[0.3em] uppercase mb-4 font-medium"
        >
          Department of Tourism · Tamil Nadu
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-display-xl text-white font-bold leading-tight mb-5"
        >
          Experience<br />
          <span className="text-gradient-gold bg-clip-text text-transparent bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">
            Kanyakumari
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-white/80 text-body md:text-body-lg mb-10 max-w-xl font-light tracking-wide"
        >
          The Southern Gateway of Incredible India — Where Three Oceans Meet
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4"
        >
          <Link href="/explore" className="btn-primary px-8 py-3.5 text-body">
            Explore
          </Link>
          <Link href="/plan" className="btn-gold px-8 py-3.5 text-body">
            Plan Your Journey
          </Link>
          <Link href="/bookings/tickets" className="btn-glass px-8 py-3.5 text-body">
            Book Tickets
          </Link>
          <button className="btn-glass px-6 py-3.5 text-body gap-2">
            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
              ▶
            </span>
            Watch Story
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-caption flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-white/40" />
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FAFAFA] to-transparent" />
    </section>
  )
}
