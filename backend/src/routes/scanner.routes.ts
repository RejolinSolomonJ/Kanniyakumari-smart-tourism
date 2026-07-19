import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, AuthRequest } from '../middleware/auth.middleware'
import { requireSiteManager } from '../middleware/rbac.middleware'

const prisma = new PrismaClient()
export const scannerRouter = Router()

// POST /api/scanner/validate
scannerRouter.post('/validate', authenticate, requireSiteManager, async (req: AuthRequest, res) => {
  const { qrCode } = req.body
  if (!qrCode) {
    return res.status(400).json({ error: 'QR Code payload is required' })
  }

  try {
    // Ticket lookup by base64 qrCode content or decoded payload ID
    let ticket = await prisma.ticket.findUnique({
      where: { qrCode },
      include: {
        destination: { select: { nameEn: true, nameTa: true } },
        booking: {
          select: {
            user: { select: { name: true, email: true, phone: true } }
          }
        }
      }
    })

    if (!ticket) {
      // Fallback 1: Check if qrCode parameter is the ticket ID
      ticket = await prisma.ticket.findUnique({
        where: { id: qrCode },
        include: {
          destination: { select: { nameEn: true, nameTa: true } },
          booking: {
            select: {
              user: { select: { name: true, email: true, phone: true } }
            }
          }
        }
      })
    }

    if (!ticket) {
      // Fallback 2: Check if qrCode is the booking ID
      const bookingTickets = await prisma.ticket.findMany({
        where: { bookingId: qrCode },
        include: {
          destination: { select: { nameEn: true, nameTa: true } },
          booking: {
            select: {
              user: { select: { name: true, email: true, phone: true } }
            }
          }
        }
      })
      if (bookingTickets && bookingTickets.length > 0) {
        ticket = bookingTickets[0]
      }
    }

    if (!ticket && qrCode.includes('_')) {
      // Fallback 3: Handle legacy/simulated QR formats (bookingId_type_quantity)
      const parts = qrCode.split('_')
      const potentialBookingId = parts[0]
      const bookingTickets = await prisma.ticket.findMany({
        where: { bookingId: potentialBookingId },
        include: {
          destination: { select: { nameEn: true, nameTa: true } },
          booking: {
            select: {
              user: { select: { name: true, email: true, phone: true } }
            }
          }
        }
      })
      if (bookingTickets && bookingTickets.length > 0) {
        const potentialType = parts[1]
        const matched = bookingTickets.find(t => t.ticketType.startsWith(potentialType))
        ticket = matched || bookingTickets[0]
      }
    }

    if (!ticket) {
      return res.json({ valid: false, message: 'Invalid ticket. QR code, Ticket ID, or Booking ID not found.' })
    }

    // Security check: Check if Checker is restricted to a specific destination
    if (req.user) {
      const checkerUser = await prisma.user.findUnique({
        where: { id: req.user.id }
      })
      if (checkerUser && checkerUser.destinationId && ticket.destinationId !== checkerUser.destinationId) {
        const authorizedDest = await prisma.destination.findUnique({
          where: { id: checkerUser.destinationId },
          select: { nameEn: true }
        })
        return res.json({
          valid: false,
          message: `Authorized Location Conflict. This ticket is for "${ticket.destination.nameEn}". You are only assigned to validate entries at "${authorizedDest?.nameEn}".`
        })
      }
    }

    if (ticket.isScanned) {
      return res.json({
        valid: false,
        alreadyScanned: true,
        message: `Ticket already scanned at ${ticket.scannedAt?.toLocaleTimeString('en-IN')}`,
        ticketDetails: {
          destination: ticket.destination.nameEn,
          visitorName: ticket.booking.user.name,
          ticketType: ticket.ticketType,
          quantity: ticket.quantity,
          timeSlot: ticket.timeSlot,
          scannedAt: ticket.scannedAt
        }
      })
    }

    // Mark as scanned
    const updatedTicket = await prisma.ticket.update({
      where: { id: ticket.id },
      data: {
        isScanned: true,
        scannedAt: new Date(),
        scannedBy: req.user ? req.user.name : 'Site Manager'
      }
    })

    return res.json({
      valid: true,
      message: 'Ticket scanned successfully. Access granted.',
      ticketDetails: {
        id: updatedTicket.id,
        destination: ticket.destination.nameEn,
        visitorName: ticket.booking.user.name,
        ticketType: ticket.ticketType,
        quantity: ticket.quantity,
        timeSlot: ticket.timeSlot,
        visitDate: ticket.visitDate
      }
    })
  } catch (error) {
    console.error('QR Ticket scanning validation error:', error)
    return res.status(500).json({ error: 'Validation process failed' })
  }
})

// GET /api/scanner/logs - Retrieve scan logs for today
scannerRouter.get('/logs', authenticate, requireSiteManager, async (req, res) => {
  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  try {
    const scannedTickets = await prisma.ticket.findMany({
      where: {
        isScanned: true,
        scannedAt: { gte: startOfToday }
      },
      include: {
        destination: { select: { nameEn: true } },
        booking: {
          select: {
            user: { select: { name: true } }
          }
        }
      },
      orderBy: { scannedAt: 'desc' }
    })

    return res.json(scannedTickets)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch scan logs' })
  }
 })

// GET /api/scanner/stats - Retrieve ticket stats for the checkers assigned destination
scannerRouter.get('/stats', authenticate, requireSiteManager, async (req: AuthRequest, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' })
    }

    const checker = await prisma.user.findUnique({
      where: { id: req.user.id }
    })

    if (!checker || !checker.destinationId) {
      return res.json({
        hasAssignedGate: false,
        message: 'No specific gate location assigned to your profile. (Full validator access)'
      })
    }

    const destination = await prisma.destination.findUnique({
      where: { id: checker.destinationId },
      select: { nameEn: true }
    })

    if (!destination) {
      return res.status(404).json({ error: 'Assigned destination not found.' })
    }

    // Get today's start date
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    // Sum booked tickets for this destination today/all
    const bookedSum = await prisma.ticket.aggregate({
      where: { 
        destinationId: checker.destinationId,
        visitDate: { gte: startOfToday }
      },
      _sum: { quantity: true }
    })

    // Sum scanned checkedin tickets for this destination today/all
    const scannedSum = await prisma.ticket.aggregate({
      where: {
        destinationId: checker.destinationId,
        isScanned: true,
        scannedAt: { gte: startOfToday }
      },
      _sum: { quantity: true }
    })

    return res.json({
      hasAssignedGate: true,
      destinationName: destination.nameEn,
      ticketsBookedToday: bookedSum._sum.quantity || 0,
      scannedEntriesToday: scannedSum._sum.quantity || 0
    })
  } catch (error) {
    console.error('Error fetching checker statistics:', error)
    return res.status(500).json({ error: 'Failed to fetch checker stats' })
  }
})
