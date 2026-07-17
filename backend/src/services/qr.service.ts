import QRCode from 'qrcode'
import { v2 as cloudinary } from 'cloudinary'

const configureCloudinary = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret || cloudName === 'your-cloudinary-cloud-name') {
    return false
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret
  })
  return true
}

export async function generateTicketQR(payload: {
  bookingId: string
  ticketId: string
  destinationId: string
  visitDate: string
  ticketType: string
  quantity: number
}): Promise<{ qrCode: string; qrCodeUrl: string }> {
  
  const data = Buffer.from(JSON.stringify(payload)).toString('base64')
  
  const qrBuffer = await QRCode.toBuffer(data, {
    errorCorrectionLevel: 'H',
    width: 400,
    margin: 2,
    color: { dark: '#0B4F8A', light: '#FFFFFF' }
  })

  const base64Image = `data:image/png;base64,${qrBuffer.toString('base64')}`

  const isCloudinaryConfigured = configureCloudinary()
  
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: 'tickets/qr',
        public_id: payload.ticketId
      })
      return { qrCode: data, qrCodeUrl: result.secure_url }
    } catch (err) {
      console.error('Cloudinary upload failed, falling back to data URI:', err)
    }
  }

  // Fallback: Use base64 Data URI directly as the URL
  return { qrCode: data, qrCodeUrl: base64Image }
}
