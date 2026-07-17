'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { LucideIcon } from 'lucide-react'

interface NavChild {
  label: string
  href: string
  icon: LucideIcon
  badge?: string
}

interface NavLink {
  label: string
  href: string
  icon: LucideIcon
  children?: NavChild[]
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export default function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (label: string) => {
    setOpenSections(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-granite-100 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-ocean flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">K</span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-ocean text-lg">Kanyakumari</h2>
                <p className="text-caption text-granite-500">Tourism Portal</p>
              </div>
            </div>

            {/* Nav Links */}
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-granite-700 font-medium hover:bg-ocean-50 hover:text-ocean transition-colors"
              >
                Home
              </Link>

              {links.map((link) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() => toggleSection(link.label)}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-granite-700 font-medium hover:bg-ocean-50 hover:text-ocean transition-colors"
                      >
                        <span className="flex items-center gap-3">
                          <link.icon className="w-5 h-5 opacity-60" />
                          {link.label}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            openSections.includes(link.label) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openSections.includes(link.label) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="ml-6 pl-4 border-l-2 border-ocean-100 space-y-1 py-1">
                              {link.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={onClose}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-body-sm text-granite-600 hover:bg-ocean-50 hover:text-ocean transition-colors"
                                >
                                  <child.icon className="w-4 h-4 opacity-60" />
                                  {child.label}
                                  {child.badge && (
                                    <span className="ml-auto text-[10px] bg-sunset-50 text-sunset-600 px-2 py-0.5 rounded-full font-medium">
                                      {child.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-granite-700 font-medium hover:bg-ocean-50 hover:text-ocean transition-colors"
                    >
                      <link.icon className="w-5 h-5 opacity-60" />
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Emergency + Login */}
            <div className="px-6 py-6 space-y-3 border-t border-granite-100 mt-4">
              <Link
                href="/emergency"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors"
              >
                🚨 Emergency Services
              </Link>
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-ocean text-white font-medium rounded-xl hover:bg-ocean-700 transition-colors"
              >
                Login / Register
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
