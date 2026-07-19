import { Router } from 'express'
import { PrismaClient, InfraIssueType, ReportStatus } from '@prisma/client'
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth.middleware'
import { requireAdmin } from '../middleware/rbac.middleware'
import { z } from 'zod'

const prisma = new PrismaClient()
export const reportsRouter = Router()

const infraReportSchema = z.object({
  location: z.string(),
  type: z.nativeEnum(InfraIssueType),
  description: z.string(),
  images: z.array(z.string()).optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional()
})

// POST /api/reports/infra - Create report (open access for citizens, optionally authenticated)
reportsRouter.post('/infra', optionalAuth, async (req: AuthRequest, res) => {
  try {
    const data = infraReportSchema.parse(req.body)
    const report = await prisma.infraReport.create({
      data: {
        userId: req.user ? req.user.id : null,
        location: data.location,
        type: data.type,
        description: data.description,
        images: data.images || [],
        latitude: data.latitude,
        longitude: data.longitude,
        status: ReportStatus.OPEN
      }
    })
    return res.status(201).json(report)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    return res.status(500).json({ error: 'Failed to submit infrastructure report' })
  }
})

// GET /api/reports/infra/public - Public access to view recent reports
reportsRouter.get('/infra/public', async (req, res) => {
  try {
    const reports = await prisma.infraReport.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' }
    })
    return res.json(reports)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch public reports' })
  }
})

// GET /api/reports/infra - Admin access only to view all reports
reportsRouter.get('/infra', authenticate, requireAdmin, async (req, res) => {
  try {
    const reports = await prisma.infraReport.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return res.json(reports)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch reports' })
  }
})
