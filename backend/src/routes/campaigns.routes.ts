import { Router } from 'express'
import { z } from 'zod'
import { authenticate } from '../middleware/auth.middleware'
import { requireRole } from '../middleware/rbac.middleware'
import crypto from 'crypto'

export const campaignsRouter = Router()

// In-memory store for campaigns (since it's a stub/mock requirement)
const campaigns: any[] = []

const campaignSchema = z.object({
  name: z.string().min(2),
  targetAudience: z.string(),
  channel: z.enum(['EMAIL', 'SMS', 'BOTH']),
  subject: z.string().optional(),
  body: z.string().min(5)
})

// GET / - List all campaigns (requires TOURISM_OFFICER or SUPER_ADMIN)
campaignsRouter.get('/', authenticate, requireRole('TOURISM_OFFICER', 'SUPER_ADMIN'), (req, res) => {
  res.json(campaigns)
})

// GET /stats - Get campaign statistics (mock response)
campaignsRouter.get('/stats', authenticate, requireRole('TOURISM_OFFICER', 'SUPER_ADMIN'), (req, res) => {
  res.json({
    totalCampaigns: campaigns.length,
    sentCampaigns: campaigns.filter(c => c.status === 'SENT').length,
    totalRecipientsReached: 15420,
    openRate: '42.5%',
    clickThroughRate: '15.2%'
  })
})

// POST / - Create a campaign
campaignsRouter.post('/', authenticate, requireRole('TOURISM_OFFICER', 'SUPER_ADMIN'), (req, res) => {
  try {
    const data = campaignSchema.parse(req.body)
    const newCampaign = {
      id: crypto.randomUUID(),
      ...data,
      status: 'DRAFT',
      createdAt: new Date().toISOString()
    }
    campaigns.push(newCampaign)
    res.status(201).json(newCampaign)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors })
    }
    return res.status(500).json({ error: 'Failed to create campaign' })
  }
})

// PUT /:id/send - Execute/send a campaign (stub - just updates status to SENT)
campaignsRouter.put('/:id/send', authenticate, requireRole('TOURISM_OFFICER', 'SUPER_ADMIN'), (req, res) => {
  const { id } = req.params
  const campaign = campaigns.find(c => c.id === id)
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' })
  }
  
  campaign.status = 'SENT'
  campaign.sentAt = new Date().toISOString()
  
  res.json({ message: 'Campaign sent successfully', campaign })
})
