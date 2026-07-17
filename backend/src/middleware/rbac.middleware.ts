import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth.middleware'

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions. Required role: ' + roles.join(', ') })
    }
    next()
  }
}

export const requireAdmin = requireRole('TOURISM_OFFICER', 'COLLECTOR', 'SUPER_ADMIN')
export const requireSiteManager = requireRole('SITE_MANAGER', 'TOURISM_OFFICER', 'COLLECTOR', 'SUPER_ADMIN')
