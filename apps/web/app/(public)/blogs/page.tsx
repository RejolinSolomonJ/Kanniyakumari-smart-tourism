'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, Clock, ArrowRight } from 'lucide-react'

const mockBlogs = [
  {
    id: '1',
    slug: 'spiritual-dawn-southern-tip',
    titleEn: 'A Spiritual Dawn at the Southern Tip',
    titleTa: 'தென்கோடி முனையில் ஒரு ஆன்மீக விடியல்',
    excerpt: 'Watching the sunrise from Kanyakumari Beach is a lifetime experience.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    category: 'TRAVEL_STORY',
    publishedAt: '2026-07-16',
    viewCount: 154
  }
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(mockBlogs)

  useEffect(() => {
    fetch('http://localhost:5000/api/blogs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data)
        }
      })
      .catch(() => console.log('Using mock blogs.'))
  }, [])

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

        {/* Blog listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map(blog => (
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
