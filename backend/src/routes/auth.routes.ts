import { Router, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient, Role, Provider } from '@prisma/client'
import { z } from 'zod'
import { authLimiter } from '../middleware/rateLimit.middleware'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import * as smsService from '../services/sms.service'
import * as emailService from '../services/email.service'

const prisma = new PrismaClient()
export const authRouter = Router()

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional()
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
})

// POST /api/auth/register
authRouter.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body)
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          ...(data.phone ? [{ phone: data.phone }] : [])
        ]
      }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email or phone already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(data.password, salt)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || `no_phone_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        passwordHash,
        role: Role.TOURIST,
        provider: Provider.EMAIL,
        isVerified: false
      }
    })

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-for-pilot',
      { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d' }
    )

    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified
      },
      token
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    return res.status(500).json({ error: 'Failed to register user' })
  }
})

// POST /api/auth/login
authRouter.post('/login', authLimiter, async (req, res) => {
  try {
    const data = loginSchema.parse(req.body)
    const user = await prisma.user.findUnique({ where: { email: data.email } })

    if (!user || !user.passwordHash) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(data.password, user.passwordHash)
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-for-pilot',
      { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d' }
    )

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified
      },
      token
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    return res.status(500).json({ error: 'Login failed' })
  }
})

// POST /api/auth/otp/send
authRouter.post('/otp/send', async (req, res) => {
  const { phone, email } = req.body
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' })
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  try {
    await prisma.otpStore.create({
      data: {
        phone,
        email,
        otp,
        expiresAt
      }
    })

    // Send via SMS
    await smsService.sendOtp(phone, otp)
    
    // Send via Email if supplied
    if (email) {
      await emailService.sendOtpEmail(email, otp)
    }

    return res.json({ success: true, message: 'OTP sent successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send OTP' })
  }
})

// POST /api/auth/otp/verify
authRouter.post('/otp/verify', async (req, res) => {
  const { phone, otp } = req.body
  if (!phone || !otp) {
    return res.status(400).json({ error: 'Phone and OTP are required' })
  }

  try {
    const record = await prisma.otpStore.findFirst({
      where: {
        phone,
        otp,
        used: false,
        expiresAt: { gte: new Date() }
      },
      orderBy: { createdAt: 'desc' }
    })

    if (!record) {
      return res.status(400).json({ error: 'Invalid or expired OTP' })
    }

    await prisma.otpStore.update({
      where: { id: record.id },
      data: { used: true }
    })

    // Find or create User with phone
    let user = await prisma.user.findUnique({ where: { phone } })
    
    if (!user) {
      // Create lazy user account
      user = await prisma.user.create({
        data: {
          name: record.email ? record.email.split('@')[0] : 'Tourist ' + phone.substring(phone.length - 4),
          email: record.email || `${phone}@kanyakumaritourism.temp`,
          phone,
          role: Role.TOURIST,
          provider: Provider.PHONE,
          isVerified: true
        }
      })
    } else if (!user.isVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true }
      })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-for-pilot',
      { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d' }
    )

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified
      },
      token
    })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify OTP' })
  }
})

// POST /api/auth/logout
authRouter.post('/logout', (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully' })
})

// POST /api/auth/google
authRouter.post('/google', async (req, res) => {
  const { credential } = req.body
  if (!credential) {
    return res.status(400).json({ error: 'Credential token is required' })
  }

  try {
    const payload: any = await new Promise((resolve, reject) => {
      const https = require('https')
      https.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`, (response: any) => {
        let data = ''
        response.on('data', (chunk: any) => data += chunk)
        response.on('end', () => resolve(JSON.parse(data)))
      }).on('error', reject)
    })

    if (payload.error_description || !payload.email) {
      return res.status(400).json({ error: 'Invalid Google token' })
    }

    const { email, name, sub } = payload

    let user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      user = await prisma.user.create({
        data: {
          name: name || email.split('@')[0],
          email,
          phone: `google_${sub}`,
          role: Role.TOURIST,
          provider: Provider.GOOGLE,
          providerId: sub,
          isVerified: true
        }
      })
    } else if (user.provider !== Provider.GOOGLE) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          provider: Provider.GOOGLE,
          providerId: sub,
          isVerified: true
        }
      })
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret-for-pilot',
      { expiresIn: (process.env.JWT_EXPIRES_IN as any) || '7d' }
    )

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isVerified: user.isVerified
      },
      token
    })
  } catch (error: any) {
    console.error('Google login error:', error)
    return res.status(500).json({ error: `Google login failed: ${error.message || 'Unknown server error'}` })
  }
})

// GET /api/auth/me
authRouter.get('/me', authenticate, async (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Not authenticated' })
  }
  return res.json({ user: req.user })
})
