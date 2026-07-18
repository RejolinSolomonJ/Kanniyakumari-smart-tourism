import { Router, Response } from 'express'
import { z } from 'zod'
import { PrismaClient, Role } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import { requireRole } from '../middleware/rbac.middleware'
import { analyzeSentiment } from '../services/sentiment.service'

const prisma = new PrismaClient()
export const reviewsRouter = Router()

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(3),
  destinationId: z.string().optional(),
  hotelId: z.string().optional(),
  guideId: z.string().optional()
}).refine(data => data.destinationId || data.hotelId || data.guideId, {
  message: "Must provide destinationId, hotelId, or guideId"
})

// GET / - List all approved reviews (with pagination, filter by destinationId, hotelId, guideId)
reviewsRouter.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit
    
    const { destinationId, hotelId, guideId } = req.query
    const where: any = { isApproved: true }
    
    if (destinationId) where.destinationId = String(destinationId)
    if (hotelId) where.hotelId = String(hotelId)
    if (guideId) where.guideId = String(guideId)

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, id: true } }
        }
      }),
      prisma.review.count({ where })
    ])

    return res.json({
      reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

// GET /stats - Get average ratings per destination
reviewsRouter.get('/stats', async (req, res) => {
  try {
    const stats = await prisma.review.groupBy({
      by: ['destinationId'],
      where: {
        destinationId: { not: null },
        isApproved: true
      },
      _avg: { rating: true },
      _count: { _all: true }
    })
    
    // Enrich with destination names
    const enrichedStats = await Promise.all(stats.map(async (stat) => {
      if (!stat.destinationId) return stat
      const dest = await prisma.destination.findUnique({
        where: { id: stat.destinationId },
        select: { nameEn: true }
      })
      return {
        ...stat,
        destinationName: dest?.nameEn || 'Unknown'
      }
    }))
    
    return res.json(enrichedStats)
  } catch (error) {
    console.error('Error fetching review stats:', error)
    return res.status(500).json({ error: 'Failed to fetch review stats' })
  }
})

// POST / - Submit a review (requires auth)
reviewsRouter.post('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const data = reviewSchema.parse(req.body)
    
    // Analyze sentiment (optional feature)
    const sentiment = await analyzeSentiment(data.comment)
    
    const review = await prisma.review.create({
      data: {
        rating: data.rating,
        comment: data.comment,
        destinationId: data.destinationId,
        hotelId: data.hotelId,
        guideId: data.guideId,
        userId: req.user!.id,
        isApproved: false // Requires approval
      }
    })
    
    return res.status(201).json({
      message: 'Review submitted successfully and is pending approval.',
      review,
      sentiment
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors })
    }
    console.error('Error submitting review:', error)
    return res.status(500).json({ error: 'Failed to submit review' })
  }
})

// PUT /:id/approve - Approve a review
reviewsRouter.put('/:id/approve', authenticate, requireRole('TOURISM_OFFICER', 'SUPER_ADMIN'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    const review = await prisma.review.update({
      where: { id },
      data: { isApproved: true }
    })
    return res.json({ message: 'Review approved successfully', review })
  } catch (error) {
    console.error('Error approving review:', error)
    return res.status(500).json({ error: 'Failed to approve review' })
  }
})

// DELETE /:id - Delete review
reviewsRouter.delete('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params
    
    const review = await prisma.review.findUnique({ where: { id } })
    if (!review) {
      return res.status(404).json({ error: 'Review not found' })
    }
    
    // Only own review or admin
    if (review.userId !== req.user!.id && !['TOURISM_OFFICER', 'SUPER_ADMIN'].includes(req.user!.role)) {
      return res.status(403).json({ error: 'Not authorized to delete this review' })
    }
    
    await prisma.review.delete({ where: { id } })
    return res.json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.error('Error deleting review:', error)
    return res.status(500).json({ error: 'Failed to delete review' })
  }
})
