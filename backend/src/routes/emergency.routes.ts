import { Router } from 'express'
import { PrismaClient, EmergencyType } from '@prisma/client'

const prisma = new PrismaClient()
export const emergencyRouter = Router()

// GET /api/emergency/contacts
emergencyRouter.get('/contacts', async (req, res) => {
  try {
    const contacts = await prisma.emergencyContact.findMany({
      where: { isActive: true }
    })
    return res.json(contacts)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch emergency contacts' })
  }
})

// GET /api/emergency/nearby
emergencyRouter.get('/nearby', async (req, res) => {
  const { lat, lng } = req.query
  if (!lat || !lng) {
    return res.status(400).json({ error: 'lat and lng parameters are required' })
  }

  // In the pilot stage, we simply return all hospital and police emergency contacts
  // Sort or filter by simple proximity in production
  try {
    const contacts = await prisma.emergencyContact.findMany({
      where: {
        isActive: true,
        OR: [
          { type: EmergencyType.HOSPITAL },
          { type: EmergencyType.POLICE }
        ]
      }
    })
    return res.json(contacts)
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch nearby emergency services' })
  }
})
