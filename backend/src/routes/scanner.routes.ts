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
    const ticket = await prisma.ticket.findUnique({
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
      return res.json({ valid: false, message: 'Invalid ticket. QR code not found.' })
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
