// Packages:
import React, { useState } from 'react'
import useNewsletterSubmit from '@/hooks/use-newsletter-submit'

// Assets:
import { Send } from 'lucide-react'

// Components:
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Functions:
const NewsletterCallout = ({ source = 'blog_callout' }: { source?: string }) => {
  // Constants:
  const { loading, handleSubmit } = useNewsletterSubmit({
    source,
    onSuccess: () => setSubscribed(true),
  })
  
  // State:
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Return:
  if (subscribed) {
    return (
      <div className='flex flex-col gap-2 w-full p-5 border-[1px] border-teal-200 rounded-md bg-teal-50/50'>
        <p className='text-base font-inter tracking-[-0.025em] text-teal-800'>
          Thanks for subscribing! Keep an eye on your inbox.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={event => handleSubmit(email, event)}
      className='flex flex-col gap-3 w-full p-5 border-[1px] border-zinc-200 rounded-md bg-white'
    >
      <div className='flex flex-col gap-2'>
        <span
          className='text-2xl sm:text-3xl font-instrument-serif text-zinc-950'
          style={{ textShadow: '0.3px 0px 0px #18181b, -0.3px 0px 0px #18181b' }}
        >
          Join the newsletter
        </span>
        <p className='text-sm sm:text-base font-inter tracking-[-0.025em] text-zinc-500'>
          Get notified when I publish something new. No spam, unsubscribe anytime.
        </p>
      </div>
      <div className='flex flex-col sm:flex-row gap-2'>
        <Input
          type='email'
          placeholder='you@example.com'
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          className='flex-1 font-inter text-sm bg-zinc-50 border-zinc-200 focus-visible:ring-teal-500'
        />
        <Button type='submit' disabled={loading} className='gap-2 shrink-0 font-inter'>
          {loading ? 'Subscribing...' : (
            <>
              Subscribe
              <Send className='h-3.5 w-3.5' />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

// Exports:
export default NewsletterCallout
