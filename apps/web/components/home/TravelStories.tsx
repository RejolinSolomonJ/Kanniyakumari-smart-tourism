'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, User, Clock } from 'lucide-react'

const stories = [
  {
    title: 'A Spiritual Dawn at the Southern Tip',
    excerpt: 'Watching the sunrise from where three oceans converge was a transformative experience. The colors painted across the sky at Kanyakumari Beach made every early morning wake-up call worthwhile.',
    author: 'Priya Sharma',
    date: 'June 2026',
    readTime: '5 min read',
    image: '/images/mixed/sunrise and sunset view point.jpg',
    slug: 'spiritual-dawn-southern-tip',
    category: 'Travel Story',
  },
  {
    title: 'Exploring the Largest Wooden Palace in Asia',
    excerpt: 'Padmanabhapuram Palace is a marvel of ancient architecture. The intricate woodwork, historical murals, and the four-hundred-year-old granite courtyard left me speechless.',
    author: 'Rajesh Kumar',
    date: 'May 2026',
    readTime: '7 min read',
    image: '/images/museums/padmanabhapuram palace museum.jpg',
    slug: 'padmanabhapuram-wooden-wonder',
    category: 'Heritage',
  },
  {
    title: 'The Hidden Waterfalls of Kanyakumari',
    excerpt: 'Beyond the famous tourist spots, Kanyakumari hides pristine waterfalls in the Western Ghats. Our trek to Thirparappu Falls through dense forests was an unforgettable adventure.',
    author: 'Anita Devi',
    date: 'April 2026',
    readTime: '6 min read',
    image: '/images/waterfalls/Thirparappu Falls.jpg',
    slug: 'western-ghats-trekking-guide',
    category: 'Adventure',
  },
]

export default function TravelStories() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold font-medium text-body-sm tracking-wider uppercase mb-2"
            >
              Stories & Experiences
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-heading-xl md:text-display text-granite-900"
            >
              Travel Stories
            </motion.h2>
          </div>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-ocean font-medium hover:gap-3 transition-all mt-4 md:mt-0">
            All Stories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.article
              key={story.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blogs/${story.slug}`} className="card-premium block group">
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-52 object-cover"
                  />
                  <span className="absolute top-3 left-3 badge-gold text-[11px]">
                    {story.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-heading-sm text-granite-900 mb-2 group-hover:text-ocean transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-body-sm text-granite-500 mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-caption text-granite-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-ocean-50 flex items-center justify-center">
                        <User className="w-3 h-3 text-ocean" />
                      </div>
                      <span>{story.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{story.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
