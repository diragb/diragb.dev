// Packages:
import { z } from 'zod'

// Typescript:
export type Email = z.infer<typeof emailSchema>

// Constants:
export const emailSchema = z.email('Please enter a valid email address')

// Functions:
export const validateEmail = (email: unknown) => {
  return emailSchema.safeParse(email)
}
