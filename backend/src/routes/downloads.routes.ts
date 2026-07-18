import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const downloadsRouter = Router()

// GET /api/downloads
downloadsRouter.get('/', async (req, res) => {
  try {
    const downloads = await prisma.download.findMany({
      where: { isActive: true }
    })
    return res.json(downloads)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch downloads list' })
  }
})

// POST /api/downloads/:id/count
downloadsRouter.post('/:id/count', async (req, res) => {
  const { id } = req.params
  try {
    const updated = await prisma.download.update({
      where: { id },
      data: { downloadCount: { increment: 1 } }
    })
    return res.json({ success: true, count: updated.downloadCount })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to increment download count' })
  }
})
