import { Router } from 'express'

export const weatherRouter = Router()

// GET /current - Return current weather for Kanyakumari
weatherRouter.get('/current', (req, res) => {
  res.json({
    location: 'Kanyakumari, Tamil Nadu',
    temperature: 28,
    unit: 'C',
    humidity: 75,
    windSpeed: 15,
    windUnit: 'km/h',
    condition: 'Partly Cloudy',
    timestamp: new Date().toISOString()
  })
})

// GET /forecast - Return 7-day forecast (mock data)
weatherRouter.get('/forecast', (req, res) => {
  const forecast = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() + i)
    return {
      date: date.toISOString().split('T')[0],
      maxTemp: 30 + Math.floor(Math.random() * 4),
      minTemp: 24 + Math.floor(Math.random() * 3),
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
    }
  })
  res.json({ location: 'Kanyakumari', forecast })
})

// GET /tides - Return tide information (mock data)
weatherRouter.get('/tides', (req, res) => {
  res.json({
    location: 'Kanyakumari Coast',
    date: new Date().toISOString().split('T')[0],
    tides: [
      { type: 'HIGH', time: '02:15 AM', height: '1.2m' },
      { type: 'LOW', time: '08:45 AM', height: '0.4m' },
      { type: 'HIGH', time: '03:10 PM', height: '1.1m' },
      { type: 'LOW', time: '09:30 PM', height: '0.3m' }
    ]
  })
})

// GET /sunrise-sunset - Return sunrise/sunset times for today (mock data)
weatherRouter.get('/sunrise-sunset', (req, res) => {
  res.json({
    location: 'Kanyakumari',
    date: new Date().toISOString().split('T')[0],
    sunrise: '06:15 AM',
    sunset: '06:30 PM'
  })
})
