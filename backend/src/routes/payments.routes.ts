import { Router } from 'express'
import { PrismaClient, BookingStatus, PaymentStatus } from '@prisma/client'
import { authenticate } from '../middleware/auth.middleware'
import * as razorpayService from '../services/razorpay.service'
import * as emailService from '../services/email.service'
import * as smsService from '../services/sms.service'

const prisma = new PrismaClient()
export const paymentsRouter = Router()

// POST /api/payments/create-order
paymentsRouter.post('/create-order', authenticate, async (req, res) => {
  const { amount, bookingId } = req.body
  if (!amount || !bookingId) {
    return res.status(400).json({ error: 'Amount and bookingId are required' })
  }

  try {
    const order = await razorpayService.createOrder(amount, bookingId)
    return res.json(order)
  } catch (error) {
    console.error('Razorpay order creation error:', error)
    return res.status(500).json({ error: 'Failed to create payment order' })
  }
})

// POST /api/payments/verify
paymentsRouter.post('/verify', authenticate, async (req, res) => {
  const { orderId, paymentId, signature, bookingId } = req.body
  if (!orderId || !paymentId || !signature || !bookingId) {
    return res.status(400).json({ error: 'All parameters are required' })
  }

  const isValid = razorpayService.verifySignature(orderId, paymentId, signature)
  if (!isValid) {
    return res.status(400).json({ error: 'Invalid payment signature' })
  }

  try {
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: BookingStatus.CONFIRMED,
        paymentStatus: PaymentStatus.SUCCESS,
        paymentId,
        paymentGateway: 'Razorpay'
      },
      include: {
        user: true
      }
    })

    // Send notifications asynchronously
    if (booking.user.email) {
      emailService.sendBookingConfirmation(booking.user.email, booking).catch(err => {
        console.error('Failed to send booking confirmation email:', err)
      })
    }
    if (booking.user.phone) {
      smsService.sendBookingConfirmationSms(booking.user.phone, booking).catch(err => {
        console.error('Failed to send booking confirmation SMS:', err)
      })
    }

    return res.json({ success: true, booking })
  } catch (error) {
    console.error('Payment verification db update error:', error)
    return res.status(500).json({ error: 'Payment verified, but booking status update failed' })
  }
})
