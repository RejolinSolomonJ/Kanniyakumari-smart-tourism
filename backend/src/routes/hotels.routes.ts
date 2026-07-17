import { Router } from 'express'
import { PrismaClient, HotelType } from '@prisma/client'

const prisma = new PrismaClient()
export const hotelsRouter = Router()

// GET /api/hotels
hotelsRouter.get('/', async (req, res) => {
  const { type, featured } = req.query
  try {
    const hotels = await prisma.hotel.findMany({
      where: {
        isActive: true,
        ...(type ? { type: type as HotelType } : {}),
        ...(featured === 'true' ? { isFeatured: true } : {})
      },
      orderBy: { pricePerNight: 'asc' }
    })
    return res.json(hotels)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch hotels' })
  }
})

// GET /api/hotels/type/:type
hotelsRouter.get('/type/:type', async (req, res) => {
  const { type } = req.params
  try {
    const hotels = await prisma.hotel.findMany({
      where: {
        isActive: true,
        type: type.toUpperCase() as HotelType
      }
    })
    return res.json(hotels)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch hotels by type' })
  }
})

// GET /api/hotels/:id
hotelsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const hotel = await prisma.hotel.findUnique({
      where: { id },
      include: {
        reviews: {
          where: { isApproved: true },
          include: {
            user: { select: { name: true } }
          }
        }
      }
    })

    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' })
    }

    return res.json(hotel)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch hotel details' })
  }
})
