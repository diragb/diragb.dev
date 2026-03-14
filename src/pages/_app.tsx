// Typescript:
import type { AppProps } from 'next/app'

// Styles:
import '@/styles/globals.css'

// Constants:
import { instrumentSerif, inter } from '@/styles/fonts'

// Components:
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { ScrollArea } from '@/components/ui/scroll-area'

// Functions:
const App = ({ Component, pageProps }: AppProps) => (
  <main className={`${instrumentSerif.variable} ${inter.variable} font-instrument-serif text-slate-700 bg-zinc-50`}>
    <ScrollArea className='h-screen w-screen'>
      <Component {...pageProps} />
    </ScrollArea>
    <Toaster />
    <Analytics />
  </main>
)

// Exports:
export default App
