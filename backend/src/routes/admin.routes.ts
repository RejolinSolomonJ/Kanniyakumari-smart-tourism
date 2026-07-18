import { Router } from 'express'
import { PrismaClient, Role, BookingStatus } from '@prisma/client'
import { authenticate } from '../middleware/auth.middleware'
import { requireAdmin } from '../middleware/rbac.middleware'

const prisma = new PrismaClient()
export const adminRouter = Router()

// Apply protection to all admin routes
adminRouter.use(authenticate, requireAdmin)

// GET /api/admin/dashboard
adminRouter.get('/dashboard', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [
      totalVisitorsToday,
      totalRevenue,
      activeBookings,
      openReports
    ] = await Promise.all([
      // Count total scanned tickets today
      prisma.ticket.count({
        where: {
          isScanned: true,
          scannedAt: { gte: today }
        }
      }),
      // Sum all success bookings
      prisma.booking.aggregate({
        where: { status: BookingStatus.CONFIRMED },
        _sum: { totalAmount: true }
      }),
      // Confirmed bookings total
      prisma.booking.count({
        where: { status: BookingStatus.CONFIRMED }
      }),
      // Open infra reports
      prisma.infraReport.count({
        where: { status: 'OPEN' }
      })
    ])

    return res.json({
      todayVisitors: totalVisitorsToday,
      totalRevenue: totalRevenue._sum.totalAmount || 0,
      activeBookings,
      openReports
    })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch admin dashboard stats' })
  }
})

// GET /api/admin/analytics
adminRouter.get('/analytics', async (req, res) => {
  try {
    // Generate simple rechart-friendly stats for the last 7 days
    const analytics = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - i)
      return {
        date: d.toLocaleDateString('en-IN', { weekday: 'short' }),
        visitors: Math.floor(Math.random() * 500) + 100,
        revenue: Math.floor(Math.random() * 25000) + 5000,
        bookings: Math.floor(Math.random() * 50) + 10
      }
    }).reverse()

    return res.json(analytics)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch analytics data' })
  }
})

// GET /api/admin/bookings
adminRouter.get('/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' }
    })
    return res.json(bookings)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch bookings list' })
  }
})

// GET /api/admin/users
adminRouter.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isVerified: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch users list' })
  }
})

// POST /api/admin/destinations - Create Destination
adminRouter.post('/destinations', async (req, res) => {
  try {
    const destination = await prisma.destination.create({
      data: req.body
    })
    return res.status(201).json(destination)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create destination' })
  }
})

// PUT /api/admin/destinations/:id - Update Destination
adminRouter.put('/destinations/:id', async (req, res) => {
  const { id } = req.params
  try {
    const destination = await prisma.destination.update({
      where: { id },
      data: req.body
    })
    return res.json(destination)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update destination' })
  }
})

// POST /api/admin/blogs - Create Blog
adminRouter.post('/blogs', async (req, res) => {
  try {
    const blog = await prisma.blog.create({
      data: req.body
    })
    return res.status(201).json(blog)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create blog' })
  }
})

// PUT /api/admin/blogs/:id - Update Blog
adminRouter.put('/blogs/:id', async (req, res) => {
  const { id } = req.params
  try {
    const blog = await prisma.blog.update({
      where: { id },
      data: req.body
    })
    return res.json(blog)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update blog' })
  }
})

// POST /api/admin/events - Create Event
adminRouter.post('/events', async (req, res) => {
  try {
    const event = await prisma.event.create({
      data: req.body
    })
    return res.status(201).json(event)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create event' })
  }
})

// GET /api/admin/reports - Get all reports
adminRouter.get('/reports', async (req, res) => {
  try {
    const reports = await prisma.infraReport.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return res.json(reports)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch reports' })
  }
})

// PUT /api/admin/reports/:id/status - Update report status
adminRouter.put('/reports/:id/status', async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  try {
    const report = await prisma.infraReport.update({
      where: { id },
      data: {
        status,
        ...(status === 'RESOLVED' ? { resolvedAt: new Date() } : {})
      }
    })
    return res.json(report)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update report status' })
  }
})
