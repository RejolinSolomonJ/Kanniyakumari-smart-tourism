import { Router } from 'express'
import { PrismaClient, Category } from '@prisma/client'

const prisma = new PrismaClient()
export const destinationsRouter = Router()

// GET /api/destinations
destinationsRouter.get('/', async (req, res) => {
  const { category, featured } = req.query

  try {
    const destinations = await prisma.destination.findMany({
      where: {
        isActive: true,
        ...(category ? { category: category as Category } : {}),
        ...(featured === 'true' ? { isFeatured: true } : {})
      },
      orderBy: { nameEn: 'asc' }
    })
    return res.json(destinations)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch destinations' })
  }
})

// GET /api/destinations/featured
destinationsRouter.get('/featured', async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany({
      where: { isActive: true, isFeatured: true }
    })
    return res.json(destinations)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch featured destinations' })
  }
})

// GET /api/destinations/category/:category
destinationsRouter.get('/category/:category', async (req, res) => {
  const { category } = req.params
  try {
    const destinations = await prisma.destination.findMany({
      where: {
        isActive: true,
        category: category.toUpperCase() as Category
      }
    })
    return res.json(destinations)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch destinations by category' })
  }
})

// GET /api/destinations/:slug
destinationsRouter.get('/:slug', async (req, res) => {
  const { slug } = req.params
  try {
    const destination = await prisma.destination.findUnique({
      where: { slug },
      include: {
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: { name: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    return res.json(destination)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch destination details' })
  }
})
