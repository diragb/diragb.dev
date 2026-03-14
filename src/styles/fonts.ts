// Packages:
import { Inter, Instrument_Serif } from 'next/font/google'

// Exports:
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
