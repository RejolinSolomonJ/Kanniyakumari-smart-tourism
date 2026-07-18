import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const announcementsRouter = Router()

// GET /api/announcements
announcementsRouter.get('/', async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isActive: true },
      orderBy: { publishedAt: 'desc' }
    })
    return res.json(announcements)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch announcements' })
  }
})
