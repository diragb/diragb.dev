// Typescript:
interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text: string
}

// Constants:
const API_URL = 'https://api.mailersend.com/v1/email'
const TOKEN = process.env.MAILERSEND_TOKEN!
const FROM_EMAIL = process.env.MAILERSEND_FROM_EMAIL!
const FROM_NAME = process.env.MAILERSEND_FROM_NAME ?? 'Newsletter'

// Exports:
export const sendEmail = async ({ to, subject, html, text }: SendEmailOptions) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: { email: FROM_EMAIL, name: FROM_NAME },
      to: [{ email: to }],
      subject,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`MailerSend error (${res.status}): ${body}`)
  }
}
