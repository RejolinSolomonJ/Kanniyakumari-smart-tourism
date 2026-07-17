import rateLimit from 'express-rate-limit'

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many authentication attempts. Please try again later.' }
})

export const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: 'AI request limit exceeded. Please wait a minute.' }
})

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300
})
