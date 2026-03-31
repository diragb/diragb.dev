// Packages:
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
const resetScrollAfterNavigation = () => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  document
    .querySelector<HTMLElement>('[data-radix-scroll-area-viewport]')
    ?.scrollTo(0, 0)
}

const App = ({ Component, pageProps }: AppProps) => {
  // Constants:
  const router = useRouter()

  // Effects:
  useEffect(() => {
    const onRouteComplete = () => {
      resetScrollAfterNavigation()
    }
    router.events.on('routeChangeComplete', onRouteComplete)
    return () => {
      router.events.off('routeChangeComplete', onRouteComplete)
    }
  }, [router])

  // Return:
  return (
    <main className={`${instrumentSerif.variable} ${inter.variable} font-instrument-serif text-slate-700 bg-zinc-50`}>
      <ScrollArea className='h-screen w-screen'>
        <Component {...pageProps} />
      </ScrollArea>
      <Toaster />
      <Analytics />
    </main>
  )
}

// Exports:
export default App
