// Packages:
import crypto from 'crypto'

// Constants:
const SECRET = process.env.NEWSLETTER_SECRET!

// Exports:
export const createToken = (email: string) =>
  crypto.createHmac('sha256', SECRET).update(email.toLowerCase()).digest('hex')

export const verifyToken = (email: string, token: string) =>
  crypto.timingSafeEqual(
    Buffer.from(createToken(email)),
    Buffer.from(token)
  )
