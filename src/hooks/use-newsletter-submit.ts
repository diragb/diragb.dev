// Packages:
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { validateEmail } from '@/lib/validators/email'

// Constants:
export const SUBSCRIBED_KEY = 'newsletter_subscribed'

// Functions:
const useNewsletterSubmit = ({ source, onSuccess }: { source: string; onSuccess?: () => void }) => {
  // Constants:
  const { toast } = useToast()

  // State:
  const [loading, setLoading] = useState(false)

  // Functions:
  const handleSubmit = async (email: string, event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim() || loading) return

    if (!validateEmail(email).success) {
      toast({ title: 'Invalid email', description: 'Please enter a valid email address.' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source }),
      })

      const data = await res.json()

      if (res.ok) {
        localStorage.setItem(SUBSCRIBED_KEY, '1')
        toast({ title: 'You\'re in!', description: 'Thanks for subscribing.' })
        onSuccess?.()
      } else if (res.status === 409) {
        localStorage.setItem(SUBSCRIBED_KEY, '1')
        toast({ title: 'Already subscribed', description: 'You\'re already on the list!' })
        onSuccess?.()
      } else {
        toast({ title: 'Something went wrong', description: data.error ?? 'Please try again.' })
      }
    } catch {
      toast({ title: 'Network error', description: 'Could not reach the server.' })
    } finally {
      setLoading(false)
    }
  }

  // Return:
  return { loading, handleSubmit }
}

// Exports:
export default useNewsletterSubmit
