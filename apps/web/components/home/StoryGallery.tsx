'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function StoryGallery() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Set default setting as full sound (unmuted with volume 1.0)
    video.muted = false
    video.volume = 1.0

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(err => {
            console.log("Autoplay with sound was blocked by browser policy, waiting for user click/interaction.", err);
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 } // Start playing when 30% of the video is visible
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-heading-lg text-granite-900 font-bold mb-4">Story Gallery</h2>
          <p className="text-body text-granite-500 max-w-2xl mx-auto font-sans font-medium">
            Discover the rich heritage and breath-taking beauty of Kanyakumari.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl aspect-video border border-granite-100 bg-black relative"
        >
          <video
            ref={videoRef}
            className="w-full h-full absolute inset-0 object-cover"
            src="/videos/Storycc.mp4"
            loop
            playsInline
            controls
          />
        </motion.div>
      </div>
    </section>
  )
}
