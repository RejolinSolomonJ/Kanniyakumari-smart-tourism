import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
    role: string
    name: string
  }
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-for-pilot') as any
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    req.user = { id: user.id, email: user.email, role: user.role, name: user.name }
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-for-pilot') as any
      const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
      if (user) {
        req.user = { id: user.id, email: user.email, role: user.role, name: user.name }
      }
    }
    next()
  } catch {
    next()
  }
}
