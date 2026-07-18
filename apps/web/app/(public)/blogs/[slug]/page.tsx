'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, Eye, ArrowLeft, Clock } from 'lucide-react'

const mockBlogs: Record<string, any> = {
  'spiritual-dawn-southern-tip': {
    id: '1',
    slug: 'spiritual-dawn-southern-tip',
    titleEn: 'A Spiritual Dawn at the Southern Tip',
    titleTa: 'தென்கோடி முனையில் ஒரு ஆன்மீக விடியல்',
    contentEn: 'Watching the sunrise from where three oceans converge was a transformative experience. The colors painted across the sky at Kanyakumari Beach made every early morning wake-up call worthwhile. As the first rays hit the Vivekananda Rock Memorial, a wave of serenity swept over the gathered crowd. It is easy to see why Swami Vivekananda chose this specific rock for his meditation in 1892; the sheer raw power of the ocean meeting the absolute stillness of the rock creates a sacred atmosphere unlike anywhere else on earth.',
    contentTa: 'மூன்று கடல்கள் சங்கமிக்கும் இடத்திலிருந்து சூரிய உதயத்தைப் பார்ப்பது ஒரு புதிய அனுபவமாக இருந்தது. கன்னியாகுமரி கடற்கரையில் வானத்தில் வரையப்பட்ட வண்ணங்கள் அதிகாலையில் எழுந்ததற்கு முற்றிலும் தகுதியானதாக இருந்தது. விவேகானந்தர் பாறை நினைவகத்தின் மீது முதல் ஒளிக்கதிர்கள் படும்போது, கூடியிருந்த மக்களிடையே ஒரு அமைதி அலை பரவியது.',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=500&fit=crop',
    category: 'TRAVEL_STORY',
    publishedAt: '2026-07-16',
    viewCount: 154
  }
}

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params)
  const { slug } = resolvedParams
  const [blog, setBlog] = useState<any>(null)

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setBlog(data)
        } else {
          setBlog(mockBlogs[slug] || mockBlogs['spiritual-dawn-southern-tip'])
        }
      })
      .catch(() => {
        setBlog(mockBlogs[slug] || mockBlogs['spiritual-dawn-southern-tip'])
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
