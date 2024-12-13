// Packages:
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

// Typescript:
import type { AppProps } from 'next/app'

// Styles:
import '@/styles/globals.css'

// Components:
import { Toaster } from '@/components/ui/toaster'
import Navbar from '@/components/secondary/Navbar'

// Constants:


// Functions:
const App = ({ Component, pageProps }: AppProps) => (
  <main className='text-slate-700 bg-gray-100'>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
  </main>
)

// Exports:
export default App
