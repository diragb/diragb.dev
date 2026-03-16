// Packages:
import { neon } from '@neondatabase/serverless'

// Exports:
export const sql = neon(process.env.DATABASE_URL!)
