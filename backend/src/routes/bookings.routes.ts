import { Router } from 'express'
import { PrismaClient, BookingType, BookingStatus, PaymentStatus, TicketType } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import { z } from 'zod'
import { generateTicketQR } from '../services/qr.service'

const prisma = new PrismaClient()
export const bookingsRouter = Router()

const ticketBookingSchema = z.object({
  destinationId: z.string(),
  visitDate: z.string(),
  tickets: z.array(z.object({
    type: z.nativeEnum(TicketType),
    quantity: z.number().min(1),
    unitPrice: z.number(),
    timeSlot: z.string().optional()
  }))
})

// POST /api/bookings/ticket/create
bookingsRouter.post('/ticket/create', authenticate, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' })

  try {
    const data = ticketBookingSchema.parse(req.body)
    const destination = await prisma.destination.findUnique({ where: { id: data.destinationId } })
    if (!destination) {
      return res.status(404).json({ error: 'Destination not found' })
    }

    const totalAmount = data.tickets.reduce((sum, t) => sum + (t.quantity * t.unitPrice), 0)

    // Create unified Booking
    const booking = await prisma.booking.create({
      data: {
        userId: req.user.id,
        type: BookingType.TICKET,
        status: BookingStatus.PENDING,
        totalAmount,
        paymentStatus: PaymentStatus.PENDING,
        paymentId: `pending_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      }
    })

    // Create individual Tickets & generate base64/Cloudinary QRs
    const ticketPromises = data.tickets.map(async (t) => {
      const ticketId = 'tkt_' + Math.random().toString(36).substr(2, 9)
      
      const payload = {
        bookingId: booking.id,
        ticketId,
        destinationId: destination.id,
        visitDate: data.visitDate,
        ticketType: t.type,
        quantity: t.quantity
      }

      const { qrCode, qrCodeUrl } = await generateTicketQR(payload)

      return prisma.ticket.create({
        data: {
          id: ticketId,
          destinationId: destination.id,
          bookingId: booking.id,
          ticketType: t.type,
          quantity: t.quantity,
          unitPrice: t.unitPrice,
          totalPrice: t.quantity * t.unitPrice,
          visitDate: new Date(data.visitDate),
          timeSlot: t.timeSlot,
          qrCode,
          qrCodeUrl,
        }
      })
    })

    const createdTickets = await Promise.all(ticketPromises)

    return res.status(201).json({
      booking: {
        ...booking,
        tickets: createdTickets
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message })
    }
    console.error('Booking creation error:', error)
    return res.status(500).json({ error: `Failed to create booking: ${(error as any).message || 'Unknown server error'}` })
  }
})

// GET /api/bookings/ticket/:id
bookingsRouter.get('/ticket/:id', authenticate, async (req: AuthRequest, res) => {
  const { id } = req.params
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        destination: true,
        booking: true
      }
    })

    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' })
    }

    return res.json(ticket)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch ticket' })
  }
})

// GET /api/bookings/user
bookingsRouter.get('/user', authenticate, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: 'Auth required' })
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.user.id },
      include: {
        tickets: {
          include: {
            destination: {
              select: { nameEn: true, nameTa: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    return res.json(bookings)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user bookings' })
  }
})
