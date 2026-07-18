import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { authRouter } from './routes/auth.routes'
import { destinationsRouter } from './routes/destinations.routes'
import { bookingsRouter } from './routes/bookings.routes'
import { hotelsRouter } from './routes/hotels.routes'
import { eventsRouter } from './routes/events.routes'
import { blogsRouter } from './routes/blogs.routes'
import { galleryRouter } from './routes/gallery.routes'
import { guidesRouter } from './routes/guides.routes'
import { aiRouter } from './routes/ai.routes'
import { adminRouter } from './routes/admin.routes'
import { emergencyRouter } from './routes/emergency.routes'
import { downloadsRouter } from './routes/downloads.routes'
import { scannerRouter } from './routes/scanner.routes'
import { reportsRouter } from './routes/reports.routes'
import { paymentsRouter } from './routes/payments.routes'
import { announcementsRouter } from './routes/announcements.routes'
import { reviewsRouter } from './routes/reviews.routes'
import { campaignsRouter } from './routes/campaigns.routes'
import { weatherRouter } from './routes/weather.routes'
import { generalLimiter } from './middleware/rateLimit.middleware'

const app = express()

// Global Security & Request Parsing Middleware
app.use(helmet())
app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  credentials: true 
}))
app.use(express.json({ limit: '10mb' }))

// Apply rate limiting generally
app.use('/api', generalLimiter)

// Route Registrations
app.use('/api/auth', authRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/events', eventsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/gallery', galleryRouter)
app.use('/api/guides', guidesRouter)
app.use('/api/ai', aiRouter)
app.use('/api/admin', adminRouter)
app.use('/api/emergency', emergencyRouter)
app.use('/api/downloads', downloadsRouter)
app.use('/api/scanner', scannerRouter)
app.use('/api/reports', reportsRouter)
app.use('/api/payments', paymentsRouter)
app.use('/api/announcements', announcementsRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/campaigns', campaignsRouter)
app.use('/api/weather', weatherRouter)

// Health Check Endpoint
app.get('/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Global Error Handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled Application Error:', err.message)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 Kanyakumari Tourism API running on port ${PORT}`)
})

export default app
