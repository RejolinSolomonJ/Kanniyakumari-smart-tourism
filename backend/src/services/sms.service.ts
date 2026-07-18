export async function sendOtp(phone: string, otp: string): Promise<boolean> {
  const apiKey = process.env.FAST2SMS_API_KEY
  
  if (!apiKey || apiKey === 'your-fast2sms-api-key') {
    console.log(`[SIMULATED SMS] To: ${phone} | Message: Your Kanyakumari Tourism verification OTP is ${otp}. Valid for 10 minutes.`)
    return true
  }

  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'variables_values': otp,
        'route': 'otp',
        'numbers': phone
      })
    })
    const data = await response.json() as any
    return data.return === true
  } catch (error) {
    console.error('Fast2SMS sendOtp error:', error)
    return false
  }
}

export async function sendBookingConfirmationSms(phone: string, bookingDetails: { id: string; totalAmount: number }): Promise<boolean> {
  const apiKey = process.env.FAST2SMS_API_KEY
  const msg = `Your booking with Kanyakumari Tourism is confirmed! ID: ${bookingDetails.id}. Amount: INR ${bookingDetails.totalAmount}. Thank you!`

  if (!apiKey || apiKey === 'your-fast2sms-api-key') {
    console.log(`[SIMULATED SMS] To: ${phone} | Message: ${msg}`)
    return true
  }

  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'route': 'q',
        'message': msg,
        'language': 'english',
        'numbers': phone
      })
    })
    const data = await response.json() as any
    return data.return === true
  } catch (error) {
    console.error('Fast2SMS sendBookingConfirmationSms error:', error)
    return false
  }
}
