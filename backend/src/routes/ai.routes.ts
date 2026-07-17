import { Router } from 'express'
import { aiLimiter } from '../middleware/rateLimit.middleware'
import { authenticate, optionalAuth, AuthRequest } from '../middleware/auth.middleware'
import * as geminiService from '../services/gemini.service'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const aiRouter = Router()

// POST /api/ai/chat
aiRouter.post('/chat', aiLimiter, async (req, res) => {
  const { message, language, history } = req.body
  if (!message) {
    return res.status(400).json({ error: 'Message is required' })
  }

  try {
    const reply = await geminiService.chatWithAssistant({
      message,
      language: language || 'en',
      history: history || []
    })
    return res.json({ reply })
  } catch (error) {
    console.error('AI Chat Error:', error)
    return res.status(500).json({ error: 'AI Assistant is currently unavailable' })
  }
})

// POST /api/ai/itinerary
aiRouter.post('/itinerary', aiLimiter, optionalAuth, async (req: AuthRequest, res) => {
  const {
    days,
    budget,
    travelType,
    interests,
    hotelPreference,
    dietary,
    language,
    accessibility
  } = req.body

  if (!days || !budget || !travelType) {
    return res.status(400).json({ error: 'Days, budget, and travelType are required' })
  }

  try {
    const itineraryData = await geminiService.generateItinerary({
      days: Number(days),
      budget: Number(budget),
      travelType,
      interests: interests || ['Beach', 'Heritage'],
      hotelPreference: hotelPreference || 'Mid-range',
      dietary: dietary || 'Veg',
      language: language || 'en',
      accessibility: !!accessibility
    })

    // If logged in, save the itinerary
    let savedItinerary = null
    if (req.user) {
      savedItinerary = await prisma.itinerary.create({
        data: {
          userId: req.user.id,
          title: itineraryData.title || `Trip to Kanyakumari`,
          days: Number(days),
          budget: Number(budget),
          data: itineraryData
        }
      })
    }

    return res.json({
      itinerary: itineraryData,
      savedId: savedItinerary ? savedItinerary.id : null
    })
  } catch (error) {
    console.error('AI Itinerary Error:', error)
    return res.status(500).json({ error: 'Failed to generate itinerary. Please try again.' })
  }
})

// POST /api/ai/translate
aiRouter.post('/translate', async (req, res) => {
  const { text, from, to } = req.body
  if (!text) {
    return res.status(400).json({ error: 'Text is required' })
  }

  // Simple hardcoded translations for common labels to keep pilot light & responsive
  // Fallback to text if translation is not found
  const translations: Record<string, Record<string, string>> = {
    'en': {
      'முகப்பு': 'Home',
      'ஆராயுங்கள்': 'Explore',
      'அனுபவங்கள்': 'Experiences',
      'என் பயணத்தை திட்டமிடு': 'Plan My Trip',
      'அவசரநிலை': 'Emergency'
    },
    'ta': {
      'Home': 'முகப்பு',
      'Explore': 'ஆராயுங்கள்',
      'Experiences': 'அனுபவங்கள்',
      'Plan My Trip': 'என் பயணத்தை திட்டமிடு',
      'Emergency': 'அவசரநிலை'
    }
  }

  const targetLang = to || 'en'
  const sourceText = text.trim()
  const result = translations[targetLang]?.[sourceText] || sourceText

  return res.json({ translatedText: result })
})
