import Razorpay from 'razorpay'
import crypto from 'crypto'

const getRazorpayInstance = () => {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret || keyId === 'your-razorpay-key-id') {
    console.warn('⚠️ Razorpay credentials not set. Running in simulation mode.')
    return null
  }
  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

export async function createOrder(amount: number, bookingId: string) {
  const razorpay = getRazorpayInstance()
  if (!razorpay) {
    // Return simulated order response
    return {
      id: 'order_simulated_' + Math.random().toString(36).substr(2, 9),
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: bookingId,
      status: 'created',
      simulated: true
    }
  }
  return await razorpay.orders.create({
    amount: Math.round(amount * 100), // paise
    currency: 'INR',
    receipt: bookingId,
    notes: { bookingId }
  })
}

export function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (orderId.startsWith('order_simulated_')) {
    return true // Always verify simulated payments in pilot
  }
  const secret = process.env.RAZORPAY_KEY_SECRET || 'your-razorpay-key-secret'
  const body = orderId + '|' + paymentId
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex')
  return expectedSignature === signature
}
