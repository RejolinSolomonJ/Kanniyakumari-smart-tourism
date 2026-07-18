import { Router } from 'express'
import { PrismaClient, BookingStatus } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import { z } from 'zod'

const prisma = new PrismaClient()
export const guidesRouter = Router()

// GET /api/guides
guidesRouter.get('/', async (req, res) => {
  try {
    const guides = await prisma.guide.findMany({
      where: { isAvailable: true, isVerified: true },
      orderBy: { experience: 'desc' }
    })
    return res.json(guides)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch guides' })
  }
})

// GET /api/guides/:id
guidesRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const guide = await prisma.guide.findUnique({
      where: { id },
      include: {
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } }
        }
      }
    })
    if (!guide) {
      return res.status(404).json({ error: 'Guide not found' })
    }
    return res.json(guide)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch guide details' })
  }
})

const guideBookingSchema = z.object({
  guideId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  totalAmount: z.number()
})

// POST /api/guides/book
guidesRouter.post('/book', authenticate, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' })

  try {
    const data = guideBookingSchema.parse(req.body)
    
    const guide = await prisma.guide.findUnique({ where: { id: data.guideId } })
    if (!guide || !guide.isAvailable) {
      return res.status(400).json({ error: 'Guide not available for booking' })
    }

    const booking = await prisma.guideBooking.create({
      data: {
        guideId: data.guideId,
        userId: req.user.id,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: BookingStatus.PENDING,
        totalAmount: data.totalAmount
      }
    })

    return res.status(201).json(booking)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    return res.status(500).json({ error: 'Failed to book guide' })
  }
})
