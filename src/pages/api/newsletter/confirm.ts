// Packages:
import { sql } from '@/lib/db'
import { verifyToken } from '@/lib/newsletter-token'

// Typescript:
import type { NextApiRequest, NextApiResponse } from 'next'

// Functions:
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const email = req.query.email as string | undefined
  const token = req.query.token as string | undefined

  if (!email || !token) {
    return res.status(400).json({ error: 'Missing email or token' })
  }

  try {
    if (!verifyToken(email, token)) {
      return res.status(403).json({ error: 'Invalid or expired link' })
    }
  } catch {
    return res.status(403).json({ error: 'Invalid or expired link' })
  }

  try {
    const rows = await sql`
      UPDATE subscribers
      SET status = 'active', confirmed_at = now()
      WHERE email = ${email.toLowerCase()} AND status = 'pending'
      RETURNING id
    `

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Subscription not found or already confirmed' })
    }

    return res.status(200).json({ success: true, message: 'Email confirmed!' })
  } catch (err) {
    console.error('Newsletter confirm error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' })
  }
}

// Exports:
export default handler
