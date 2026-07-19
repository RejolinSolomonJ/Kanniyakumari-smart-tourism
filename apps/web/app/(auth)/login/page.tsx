'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useAuthStore } from '@/lib/auth'
import { ShieldCheck, Mail, Lock, Phone, MessageSquare } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [useOtp, setUseOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { setAuth } = useAuthStore()

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "").endsWith("/api") ? (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") : (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") + "/api"}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
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
        name: 'John Doe',
        email: email || 'tourist@example.com',
        role: 'TOURIST',
        language: 'en',
        isVerified: true
      }, 'simulated_jwt_token')
      window.location.href = '/'
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone) return alert('Phone number is required.')
    setIsLoading(true)

    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "").endsWith("/api") ? (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") : (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") + "/api"}/auth/otp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setOtpSent(true)
      }
    } catch {
      // Simulate sending OTP
      setOtpSent(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp) return alert('OTP is required.')
    setIsLoading(true)

    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "").endsWith("/api") ? (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") : (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") + "/api"}/auth/otp/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setAuth(data.user, data.token)
        window.location.href = '/'
      }
    } catch {
      // Simulate verification success
      setAuth({
        id: '2',
        name: 'SMS Tourist',
        email: `${phone}@kanyakumaritourism.temp`,
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

  const handleGoogleLogin = async (response: any) => {
    setIsLoading(true)
    try {
      const res = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "").endsWith("/api") ? (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") : (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/+$/, "") + "/api"}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential })
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setAuth(data.user, data.token)
        window.location.href = '/'
      }
    } catch (err) {
      console.error(err)
      alert('Connecting to the secure server (this may take up to 50 seconds if the server is waking up). Please try clicking again!')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '1029272365922-fakeclientid.apps.googleusercontent.com',
          callback: handleGoogleLogin
        });
        (window as any).google.accounts.id.renderButton(
          document.getElementById('google-signin-btn'),
          { theme: 'outline', size: 'large', width: '100%' }
        );
      }
    }

    return () => {
      const btn = document.getElementById('google-signin-btn')
      if (btn) btn.innerHTML = ''
    }
  }, [email])

  return (
    <div className="pt-24 min-h-screen bg-granite-50 flex items-center justify-center pb-16">
      <div className="bg-white p-8 rounded-2xl border border-granite-100 shadow-sm max-w-sm w-full space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-ocean-50 text-ocean flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-heading font-bold text-granite-900">
            {useOtp ? 'Quick Login via OTP' : 'Login to Account'}
          </h1>
          <p className="text-caption text-granite-500">
            Access bookings, itineraries, and reports.
          </p>
        </div>

        {useOtp ? (
          /* OTP Auth Flow */
          !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-caption font-semibold text-granite-600 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-granite-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit mobile number"
                    className="input-field pl-10"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-body-sm font-bold">
                {isLoading ? 'Sending OTP...' : 'Send Verification OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-caption font-semibold text-granite-600 mb-1">
                  Enter 6-digit OTP
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-granite-400" />
                  <input
                    type="text"
                    required
                    placeholder="Type OTP sent to phone"
                    className="input-field pl-10"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="btn-gold w-full py-3 text-body-sm font-bold">
                {isLoading ? 'Verifying...' : 'Verify & Log In'}
              </button>
            </form>
          )
        ) : (
          /* Password Auth Flow */
          <form onSubmit={handlePasswordLogin} className="space-y-4">
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
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-granite-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="input-field pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary w-full py-3 text-body-sm font-bold">
              {isLoading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        )}

        {/* Google Sign In Option */}
        <div className="space-y-3 pt-2">
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-granite-100"></div>
            <span className="flex-shrink mx-4 text-caption text-granite-400 font-medium">Or continue with</span>
            <div className="flex-grow border-t border-granite-100"></div>
          </div>
          <div id="google-signin-btn" className="w-full flex justify-center py-1"></div>
        </div>

        <div className="flex flex-col gap-2.5 text-center text-caption font-medium border-t border-granite-100 pt-4">
          <button
            onClick={() => { setUseOtp(!useOtp); setOtpSent(false); }}
            className="text-ocean hover:underline"
          >
            {useOtp ? 'Use Email / Password Login' : 'Log in using Phone & OTP'}
          </button>
          <span className="text-granite-400">or</span>
          <Link href="/register" className="text-gold hover:underline">
            Don&apos;t have an account? Sign Up
          </Link>
        </div>

      </div>
    </div>
  )
}

