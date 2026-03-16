// Packages:
import { sql } from '@/lib/db'
import { validateEmail } from '@/lib/validators/email'
import { createToken } from '@/lib/newsletter-token'
import { sendEmail } from '@/lib/mailer'

// Typescript:
import type { NextApiRequest, NextApiResponse } from 'next'

// Functions:
const buildConfirmationEmail = (confirmUrl: string, unsubscribeUrl: string) => {
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 0;">
      <h2 style="font-size: 22px; color: #18181b; margin: 0 0 12px;">Confirm your subscription</h2>
      <p style="font-size: 16px; color: #3f3f46; line-height: 1.6; margin: 0 0 24px;">
        Thanks for signing up! Click the button below to confirm your email and start receiving new posts.
      </p>
      <a href="${confirmUrl}" style="display: inline-block; padding: 10px 24px; background-color: #0d9488; color: #fff; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: 500;">
        Confirm my subscription
      </a>
      <p style="font-size: 13px; color: #a1a1aa; margin: 32px 0 0; line-height: 1.5;">
        If you didn't sign up, you can safely ignore this email or
        <a href="${unsubscribeUrl}" style="color: #a1a1aa; text-decoration: underline;">unsubscribe</a>.
      </p>
    </div>
  `

  const text = [
    'Confirm your subscription',
    '',
    'Thanks for signing up! Visit the link below to confirm your email and start receiving new posts.',
    '',
    confirmUrl,
    '',
    `If you didn't sign up, ignore this email or unsubscribe: ${unsubscribeUrl}`,
  ].join('\n')

  return { html, text }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, source } = req.body ?? {}

  if (!email || typeof email !== 'string' || !validateEmail(email.trim()).success) {
    return res.status(400).json({ error: 'A valid email is required' })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const safeSource = ['blog_callout', 'blog_dialog'].includes(source) ? source : null

  try {
    const rows = await sql`
      INSERT INTO subscribers (email, source)
      VALUES (${normalizedEmail}, ${safeSource})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `

    if (rows.length === 0) {
      return res.status(409).json({ error: 'This email is already subscribed' })
    }

    const token = createToken(normalizedEmail)
    const protocol = req.headers['x-forwarded-proto'] ?? 'https'
    const host = req.headers.host
    const baseUrl = `${protocol}://${host}`

    const confirmUrl = `${baseUrl}/newsletter/confirmed?email=${encodeURIComponent(normalizedEmail)}&token=${token}`
    const unsubscribeUrl = `${baseUrl}/newsletter/unsubscribed?email=${encodeURIComponent(normalizedEmail)}&token=${token}`

    const { html, text } = buildConfirmationEmail(confirmUrl, unsubscribeUrl)

    await sendEmail({
      to: normalizedEmail,
      subject: 'Confirm your subscription',
      html,
      text,
    })

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return res.status(500).json({ error: 'Something went wrong. Please try again later.' })
  }
}

// Exports:
export default handler
