// Packages:
import React, { useState, useEffect, useRef } from 'react'
import useNewsletterSubmit, { SUBSCRIBED_KEY } from '@/hooks/use-newsletter-submit'

// Assets:
import { Send } from 'lucide-react'

// Constants:
const DISMISSED_KEY = 'newsletter_dialog_dismissed'

// Components:
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Functions:
const NewsletterDialog = () => {
  // Constants:
  const { loading, handleSubmit } = useNewsletterSubmit({
    source: 'blog_dialog',
    onSuccess: () => setOpen(false),
  })

  // Ref:
  const markerRef = useRef<HTMLDivElement>(null)

  // State:
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  // Functions:
  const handleDismiss = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      sessionStorage.setItem(DISMISSED_KEY, '1')
    }
  }

  // Effects:
  useEffect(() => {
    const wasDismissed = sessionStorage.getItem(DISMISSED_KEY)
    const wasSubscribed = localStorage.getItem(SUBSCRIBED_KEY)
    if (wasDismissed || wasSubscribed) return

    const marker = markerRef.current
    if (!marker) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true)
          observer.disconnect()
        }
      },
      { threshold: 0 }
    )

    observer.observe(marker)
    return () => observer.disconnect()
  }, [])

  // Return:
  return (
    <>
      <div
        ref={markerRef}
        className='absolute left-0 w-0 h-0 pointer-events-none'
        style={{ top: '40%' }}
        aria-hidden
      />
      <Dialog open={open} onOpenChange={handleDismiss}>
        <DialogContent className='max-w-[90vw] rounded-md sm:max-w-md bg-zinc-50'>
          <DialogHeader>
            <DialogTitle className='font-instrument-serif tracking-normal text-3xl text-zinc-950'>
              I&apos;M SO SORRY.
            </DialogTitle>
            <DialogDescription className='font-inter tracking-[-0.025em] text-zinc-800'>
              <div className='font-semibold text-lg text-zinc-900'>I hate popups. I know you do too.</div>
              <div className='mt-2 text-base'>
                But if you like what you&apos;re reading, please feel free to subscribe!
              </div>
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={event => handleSubmit(email, event)} className='flex flex-col gap-2'>
            <div className='flex flex-col sm:flex-row gap-2'>
              <Input
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className='flex-1 font-inter text-sm bg-white border-zinc-200 focus-visible:ring-teal-500'
              />
              <Button type='submit' disabled={loading} className='gap-2 shrink-0'>
                {loading ? 'Subscribing...' : (
                  <>
                    Subscribe
                    <Send className='h-3.5 w-3.5' />
                  </>
                )}
              </Button>
            </div>
            <span className='w-full text-sm text-center sm:text-left text-zinc-500'>
              No spam, unsubscribe anytime.
            </span>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

// Exports:
export default NewsletterDialog
