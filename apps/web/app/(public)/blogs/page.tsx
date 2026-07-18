'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'
import { blogs as allBlogs } from '@/lib/data'

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(allBlogs)
  const [activeCategory, setActiveCategory] = useState('ALL')

  const categories = ['ALL', 'TRAVEL_STORY', 'HISTORY', 'CULTURE', 'FOOD', 'GUIDE']

  const filteredBlogs = activeCategory === 'ALL' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory)

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-5xl">
        
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="font-serif text-heading-xl font-bold text-granite-900 mb-2">
            Kumari Travel Blogs
          </h1>
          <p className="text-body-sm text-granite-500">
            Read stories, detailed itineraries, and historical essays written by travelers and historians.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full border text-body-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-ocean border-ocean text-white'
                  : 'bg-white border-granite-200 text-granite-600 hover:border-granite-300'
              }`}
            >
              {cat === 'ALL' ? 'All Stories' : cat.replace('_', ' ').charAt(0) + cat.replace('_', ' ').slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        {/* Blog listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredBlogs.map(blog => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden shadow-card border border-granite-100 flex flex-col justify-between group">
              <div>
                <img
                  src={blog.coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800'}
                  alt={blog.titleEn}
                  className="w-full h-56 object-cover group-hover:scale-102 transition-transform"
                />
                
                <div className="p-6 space-y-3">
                  <span className="badge-gold bg-gold-50 text-gold-700 text-[10px] font-bold uppercase">
                    {blog.category.replace('_', ' ')}
                  </span>
                  
                  <h3 className="font-serif text-heading-sm text-granite-900 leading-tight group-hover:text-ocean transition-colors">
                    {blog.titleEn}
                  </h3>
                  <p className="text-caption text-granite-400 font-tamil">{blog.titleTa}</p>
                  
                  <p className="text-body-sm text-granite-600 line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-granite-100 flex items-center justify-between">
                <div className="flex gap-4 text-caption text-granite-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(blog.publishedAt).toLocaleDateString('en-IN')}
                  </span>
                  <span>|</span>
                  <span>{blog.viewCount} Views</span>
                </div>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-ocean font-semibold text-body-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Read Post <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
