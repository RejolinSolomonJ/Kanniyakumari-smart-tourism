'use client'

import { useState, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search, MapPin, Star, Filter, Calendar, Map as MapIcon, Grid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { destinations as allDestinations } from '@/lib/data'
import InteractiveMap from '@/components/home/InteractiveMap'
import CategoryExplorer from '@/components/home/CategoryExplorer'

const categories = [
  { key: 'ALL', label: 'All Places' },
  { key: 'BEACH', label: 'Beaches' },
  { key: 'TEMPLE', label: 'Temples' },
  { key: 'HERITAGE', label: 'Heritage' },
  { key: 'WATERFALL', label: 'Waterfalls' },
  { key: 'ADVENTURE', label: 'Adventure' },
  { key: 'MUSEUM', label: 'Museums' },
  { key: 'WILDLIFE', label: 'Wildlife' },
  { key: 'CULTURE', label: 'Culture' }
]

function ExplorePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const viewMode = searchParams.get('view') || 'grid'
  const categoryParam = searchParams.get('category')?.toUpperCase() || 'ALL'

  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [feeFilter, setFeeFilter] = useState<'ALL' | 'FREE' | 'PAID'>('ALL')
  const [destinations, setDestinations] = useState(allDestinations)

  useEffect(() => {
    setActiveCategory(categoryParam)
  }, [categoryParam])

  // The API fetch has been removed to preserve the beautiful pre-populated mock destinations.

  const setViewMode = (mode: 'grid' | 'map') => {
    const params = new URLSearchParams(searchParams.toString())
    if (mode === 'grid') {
      params.delete('view')
    } else {
      params.set('view', 'map')
    }
    router.push(`/explore?${params.toString()}`)
  }

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dest.nameTa.includes(searchTerm)
    const matchesCategory = activeCategory === 'ALL' || dest.category === activeCategory
    const matchesFee = feeFilter === 'ALL' || 
      (feeFilter === 'FREE' && (dest.entryFeeAdult === 0 || !dest.entryFeeAdult)) ||
      (feeFilter === 'PAID' && (dest.entryFeeAdult && dest.entryFeeAdult > 0))

    return matchesSearch && matchesCategory && matchesFee
  })

  return (
    <div className="min-h-screen bg-granite-50 pb-16">

        {/* ── Parallax Hero Banner ── */}
        <div
          className="relative overflow-hidden"
          style={{
            backgroundImage: "url('/images/background.jpg')",
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '50vh',
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] px-4 text-center py-24">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 text-xs font-bold tracking-widest uppercase mb-5"
            >
              EXPLORE BY CATEGORY
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              Discover Kanyakumari
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/80 text-base md:text-lg max-w-xl mb-10"
            >
              Explore ancient wonders, pristine shores, and hidden waterfalls in the southern edge of India.
            </motion.p>

            {/* Search Input */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex bg-white text-granite-900 rounded-full p-1.5 shadow-xl max-w-lg w-full border border-white/20"
            >
              <span className="flex items-center pl-4 text-granite-400">
                <Search className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="Search destinations (e.g. Rock Memorial, Temple)..."
                className="w-full bg-transparent border-0 ring-0 focus:ring-0 px-3 py-2 text-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    document.getElementById('explore-results')?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              />
            </motion.div>
          </div>
        </div>

      <div id="results-section" className="container-wide">

        {/* Category Explorer */}
        {viewMode !== 'map' && (
          <div className="mb-12 bg-white rounded-3xl border border-granite-100 shadow-sm overflow-hidden">
            <CategoryExplorer hideHeader={true} />
          </div>
        )}

        {/* Filters Panel */}
        <div id="explore-results" className="flex flex-col lg:flex-row gap-6 mb-12 justify-between items-center bg-white p-4 rounded-2xl border border-granite-100 shadow-sm">
          {viewMode !== 'map' ? (
            /* Category Filter Pills */
            <div className="flex-1 overflow-x-auto scrollbar-hide py-2 max-w-full lg:max-w-[70%]">
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={cn(
                      'category-pill',
                      activeCategory === cat.key && 'category-pill-active'
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-body-sm font-semibold text-granite-500 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ocean animate-pulse" />
              Interactive Exploration Map Active
            </div>
          )}

          {/* View Toggles & Entry Filters */}
          <div className="flex items-center gap-4 flex-wrap">
            {viewMode !== 'map' && (
              <div className="flex bg-granite-50 rounded-full border border-granite-250 p-1">
                {(['ALL', 'FREE', 'PAID'] as const).map(option => (
                  <button
                    key={option}
                    onClick={() => setFeeFilter(option)}
                    className={cn(
                      'px-4 py-1.5 rounded-full text-caption font-semibold transition-all',
                      feeFilter === option
                        ? 'bg-ocean text-white shadow-sm'
                        : 'text-granite-650 hover:bg-granite-100'
                    )}
                  >
                    {option === 'ALL' ? 'All Entry' : option === 'FREE' ? 'Free Entry' : 'Paid Entry'}
                  </button>
                ))}
              </div>
            )}

            {/* Grid vs Map Toggle */}
            <div className="flex bg-granite-50 rounded-full border border-granite-250 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-caption font-semibold transition-all',
                  viewMode !== 'map'
                    ? 'bg-ocean text-white shadow-sm'
                    : 'text-granite-650 hover:bg-granite-100'
                )}
              >
                <Grid className="w-3.5 h-3.5" />
                Cards
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={cn(
                  'flex items-center gap-1.5 px-4 py-1.5 rounded-full text-caption font-semibold transition-all',
                  viewMode === 'map'
                    ? 'bg-ocean text-white shadow-sm'
                    : 'text-granite-650 hover:bg-granite-100'
                )}
              >
                <MapIcon className="w-3.5 h-3.5" />
                Map
              </button>
            </div>
          </div>
        </div>

        {/* View Mode Conditional Render */}
        {viewMode === 'map' ? (
          <div className="bg-white rounded-3xl overflow-hidden shadow-card border border-granite-100 p-4">
            <InteractiveMap />
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest, index) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 4) * 0.08 }}
              >
                <Link href={`/explore/${dest.slug}`} className="destination-card group block h-full">
                  <div className="card-image">
                    <img
                      src={dest.heroImage}
                      alt={dest.nameEn}
                      className="w-full h-48 object-cover"
                    />
                    <span className="absolute top-3 left-3 badge-ocean bg-ocean-50/90 text-ocean backdrop-blur-sm shadow-sm font-semibold">
                      {dest.category}
                    </span>
                    {dest.entryFeeAdult === 0 && (
                      <span className="absolute top-3 right-3 badge-sea bg-sea-50/90 text-sea backdrop-blur-sm shadow-sm font-semibold">
                        Free Entry
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-heading-sm text-granite-900 group-hover:text-ocean transition-colors mb-0.5 line-clamp-1">
                      {dest.nameEn}
                    </h3>
                    <p className="text-caption text-granite-400 font-tamil mb-3">{dest.nameTa}</p>
                    
                    <div className="flex flex-col gap-2 mt-4 pt-3 border-t border-granite-100">
                      <div className="flex items-center justify-between text-caption text-granite-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-ocean" />
                          {dest.location || 'Kanyakumari'}
                        </span>
                        <span className="flex items-center gap-1 text-gold-600 font-semibold">
                          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                          {dest.rating || '4.5'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          const url = dest.lat && dest.lng 
                            ? `https://www.google.com/maps/dir/?api=1&destination=${dest.lat},${dest.lng}` 
                            : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest.nameEn + ', Kanyakumari')}`
                          window.open(url, '_blank')
                        }}
                        className="w-full py-1.5 px-3 rounded-lg bg-ocean-50 hover:bg-ocean text-ocean hover:text-white transition-all duration-200 text-[11px] font-bold flex items-center justify-center gap-1 border border-ocean-100 cursor-pointer"
                      >
                        <MapPin className="w-3 h-3" /> Get Directions
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-granite-100 shadow-sm max-w-md mx-auto">
            <Filter className="w-12 h-12 text-granite-300 mx-auto mb-4" />
            <h3 className="font-serif text-heading text-granite-800 mb-2">No Destinations Found</h3>
            <p className="text-body-sm text-granite-500 mb-6">
              Try adjusting your filters or changing your search terms.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('ALL'); setFeeFilter('ALL'); }}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-ocean"></div></div>}>
      <ExplorePageContent />
    </Suspense>
  )
}

