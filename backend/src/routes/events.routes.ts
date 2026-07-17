import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const eventsRouter = Router()

// GET /api/events
eventsRouter.get('/', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: { isActive: true },
      orderBy: { startDate: 'asc' }
    })
    return res.json(events)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch events' })
  }
})

// GET /api/events/upcoming
eventsRouter.get('/upcoming', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        isActive: true,
        endDate: { gte: new Date() }
      },
      orderBy: { startDate: 'asc' }
    })
    return res.json(events)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch upcoming events' })
  }
})

// GET /api/events/:id
eventsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const event = await prisma.event.findUnique({
      where: { id }
    })
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    return res.json(event)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch event details' })
  }
})
