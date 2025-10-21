// Typescript:
import type { AppProps } from 'next/app'
import { Instrument_Serif } from 'next/font/google'
import { cn } from '@/lib/utils'

// Styles:
import '@/styles/globals.css'

// Constants:
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
})

// Components:
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'

// Functions:
const App = ({ Component, pageProps }: AppProps) => (
  <main className={cn('text-slate-700 bg-zinc-50', instrumentSerif.className)}>
    <Component {...pageProps} />
    <Toaster />
    <Analytics />
  </main>
)

// Exports:
export default App
