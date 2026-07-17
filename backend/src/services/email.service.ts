import nodemailer from 'nodemailer'

const getTransporter = () => {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey || apiKey === 'your-sendgrid-api-key') {
    console.warn('⚠️ SendGrid API key not set. Email confirmations will be logged to console.')
    return null
  }
  
  // Use SendGrid SMTP or generic transport
  return nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: 'apikey',
      pass: apiKey
    }
  })
}

export async function sendOtpEmail(to: string, otp: string): Promise<boolean> {
  const transporter = getTransporter()
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@kanyakumaritourism.org'

  const mailOptions = {
    from: fromEmail,
    to,
    subject: 'Kanyakumari Tourism - OTP Verification Code',
    text: `Your OTP code for verification is: ${otp}. It is valid for 10 minutes.`,
    html: `<p>Your OTP code for Kanyakumari Tourism verification is: <strong>${otp}</strong>.</p><p>It is valid for 10 minutes.</p>`
  }

  if (!transporter) {
    console.log(`[SIMULATED EMAIL] To: ${to} | Subject: ${mailOptions.subject} | Body: ${mailOptions.text}`)
    return true
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

export async function sendBookingConfirmation(to: string, bookingDetails: any): Promise<boolean> {
  const transporter = getTransporter()
  const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@kanyakumaritourism.org'

  const mailOptions = {
    from: fromEmail,
    to,
    subject: `Booking Confirmed - ID: ${bookingDetails.id}`,
    text: `Thank you for booking with Kanyakumari Tourism. Your booking ID is: ${bookingDetails.id}. Total Amount Paid: INR ${bookingDetails.totalAmount}.`,
    html: `
      <h2>Booking Confirmed!</h2>
      <p>Thank you for choosing Kanyakumari Tourism. Your trip booking details are below:</p>
      <ul>
        <li><strong>Booking ID:</strong> ${bookingDetails.id}</li>
        <li><strong>Type:</strong> ${bookingDetails.type}</li>
        <li><strong>Total Amount:</strong> INR ${bookingDetails.totalAmount}</li>
        <li><strong>Status:</strong> ${bookingDetails.status}</li>
      </ul>
      <p>Show your ticket QR code at the check-in point.</p>
    `
  }

  if (!transporter) {
    console.log(`[SIMULATED EMAIL] To: ${to} | Subject: ${mailOptions.subject} | Body: ${mailOptions.text}`)
    return true
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending booking confirmation email:', error)
    return false
  }
}
