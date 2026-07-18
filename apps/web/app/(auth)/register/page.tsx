'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/auth'
import { ShieldCheck, User, Mail, Lock, Phone } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { setAuth } = useAuthStore()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone })
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setAuth(data.user, data.token)
        window.location.href = '/'
      }
    } catch {
      // Simulation for pilot
      setAuth({
        id: '1',
        name,
        email,
        phone,
        role: 'TOURIST',
        language: 'en',
        isVerified: true
      }, 'simulated_jwt_token')
      window.location.href = '/'
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-granite-50 flex items-center justify-center pb-16">
      <div className="bg-white p-8 rounded-2xl border border-granite-100 shadow-sm max-w-sm w-full space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-ocean-50 text-ocean flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-heading font-bold text-granite-900">
            Create Tourist Account
          </h1>
          <p className="text-caption text-granite-500">
            Sign up to plan trips and book tickets.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-caption font-semibold text-granite-600 mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-granite-400" />
              <input
                type="text"
                required
                placeholder="John Doe"
                className="input-field pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-caption font-semibold text-granite-600 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-granite-400" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="input-field pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-caption font-semibold text-granite-600 mb-1">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 w-4 h-4 text-granite-400" />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                className="input-field pl-10"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-caption font-semibold text-granite-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-granite-400" />
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                className="input-field pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-body-sm font-bold">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center text-caption font-medium border-t border-granite-100 pt-4">
          <Link href="/login" className="text-gold hover:underline">
            Already have an account? Sign In
          </Link>
        </div>

      </div>
    </div>
  )
}
