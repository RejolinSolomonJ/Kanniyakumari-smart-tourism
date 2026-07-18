'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, Eye, ArrowLeft, Clock } from 'lucide-react'
import { blogs as allBlogs } from '@/lib/data'

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [blog, setBlog] = useState<any>(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setBlog(data)
        } else {
          const found = allBlogs.find(b => b.slug === slug)
          setBlog(found || allBlogs[0])
        }
      })
      .catch(() => {
        const found = allBlogs.find(b => b.slug === slug)
        setBlog(found || allBlogs[0])
      })
  }, [slug])

  if (!blog) {
    return (
      <div className="pt-32 pb-16 text-center">
        <div className="skeleton w-32 h-32 mx-auto rounded-full mb-4"></div>
        <p className="text-body-sm text-granite-500">Loading blog details...</p>
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-granite-50 pb-16">
      <div className="container-wide max-w-3xl">
        
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-ocean text-body-sm font-semibold hover:gap-3 transition-all mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blogs
        </Link>

        {/* Content Card */}
        <article className="bg-white rounded-2xl border border-granite-100 shadow-sm overflow-hidden">
          <img src={blog.coverImage} alt={blog.titleEn} className="w-full h-80 object-cover" />
          
          <div className="p-6 md:p-8 space-y-6">
            
            <div className="flex flex-wrap gap-4 items-center justify-between border-b border-granite-100 pb-4 text-caption text-granite-400">
              <div className="flex gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(blog.publishedAt).toLocaleDateString('en-IN')}
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> {blog.viewCount} Views
                </span>
              </div>
              <span className="badge-gold bg-gold-50 text-gold-700 text-[10px] font-bold uppercase">
                {blog.category.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-heading-xl md:text-display font-bold text-granite-900 leading-tight">
                {blog.titleEn}
              </h1>
              <p className="text-body-lg text-granite-500 font-tamil leading-relaxed">
                {blog.titleTa}
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-granite-100 text-body text-granite-750 leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-ocean first-letter:float-left first-letter:mr-2">
                {blog.contentEn}
              </p>
              
              {blog.contentTa && (
                <div className="bg-granite-50 p-5 rounded-xl border border-granite-100 font-tamil text-granite-600">
                  <h4 className="font-bold text-body-sm mb-2 text-ocean">தமிழ் பதிப்பு (Tamil Translation)</h4>
                  <p>{blog.contentTa}</p>
                </div>
              )}
            </div>

          </div>
        </article>

      </div>
    </div>
  )
}
