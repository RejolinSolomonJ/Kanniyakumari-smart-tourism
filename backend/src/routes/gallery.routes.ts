import { Router } from 'express'
import { PrismaClient, MediaType } from '@prisma/client'

const prisma = new PrismaClient()
export const galleryRouter = Router()

// GET /api/gallery/photos
galleryRouter.get('/photos', async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      where: {
        isActive: true,
        type: MediaType.PHOTO
      },
      orderBy: { createdAt: 'desc' }
    })
    return res.json(items)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch photos' })
  }
})

// GET /api/gallery/videos
galleryRouter.get('/videos', async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({
      where: {
        isActive: true,
        OR: [
          { type: MediaType.VIDEO },
          { type: MediaType.DRONE }
        ]
      },
      orderBy: { createdAt: 'desc' }
    })
    return res.json(items)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch videos' })
  }
})
