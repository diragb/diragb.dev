// Packages:
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

// Components:
import Link from 'next/link'
import CustomHead from '@/components/primary/CustomHead'
import Navbar from '@/components/primary/Navbar'

// Typescript:
type Status = 'loading' | 'success' | 'already_unsubscribed' | 'error'

// Functions:
const UnsubscribedPage = () => {
  // Constants:
  const router = useRouter()

  // State:
  const [status, setStatus] = useState<Status>('loading')
  const [errorMessage, setErrorMessage] = useState('')

  // Effects:
  useEffect(() => {
    const { email, token } = router.query
    if (!email || !token) return

    axios
      .get('/api/newsletter/unsubscribe', { params: { email, token } })
      .then(() => setStatus('success'))
      .catch(err => {
        const code = err.response?.status
        if (code === 404) {
          setStatus('already_unsubscribed')
        } else {
          setStatus('error')
          setErrorMessage(err.response?.data?.error ?? 'Something went wrong.')
        }
      })
  }, [router.query])

  // Return:
  return (
    <div className='relative flex justify-center items-center flex-col gap-6 w-screen max-w-[720px] min-h-screen mx-auto py-24 px-6 text-zinc-950 bg-zinc-50'>
      <CustomHead title='Unsubscribed - Dirag Biswas' />
      <Navbar />

      {status === 'loading' && (
        <div className='flex flex-col items-center gap-3 text-center'>
          <div className='h-10 w-10 rounded-full border-[3px] border-zinc-200 border-t-teal-600 animate-spin' />
          <p className='text-lg font-inter tracking-[-0.025em] text-zinc-500'>Processing your request...</p>
        </div>
      )}

      {status === 'success' && (
        <div className='flex flex-col items-center gap-4 text-center'>
          <div className='flex items-center justify-center h-16 w-16 rounded-full bg-zinc-100 text-zinc-500 text-3xl'>
            &#9993;
          </div>
          <h1 className='text-4xl sm:text-5xl leading-tight'>Unsubscribed</h1>
          <p className='text-lg font-inter tracking-[-0.025em] text-zinc-600 max-w-sm'>
            You&apos;ve been removed from the mailing list. Sorry to see you go!
          </p>
          <Link
            href='/blog'
            className='mt-2 text-base font-inter tracking-[-0.075em] text-teal-600 transition-colors hover:text-teal-700 hover:underline hover:underline-offset-2 decoration-wavy'
          >
            ← Back to blog
          </Link>
        </div>
      )}

      {status === 'already_unsubscribed' && (
        <div className='flex flex-col items-center gap-4 text-center'>
          <div className='flex items-center justify-center h-16 w-16 rounded-full bg-zinc-100 text-zinc-500 text-3xl'>
            &#9993;
          </div>
          <h1 className='text-4xl sm:text-5xl leading-tight'>Already unsubscribed</h1>
          <p className='text-lg font-inter tracking-[-0.025em] text-zinc-600 max-w-sm'>
            You&apos;re not on the mailing list. No further action needed.
          </p>
          <Link
            href='/blog'
            className='mt-2 text-base font-inter tracking-[-0.075em] text-teal-600 transition-colors hover:text-teal-700 hover:underline hover:underline-offset-2 decoration-wavy'
          >
            ← Back to blog
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className='flex flex-col items-center gap-4 text-center'>
          <div className='flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 text-3xl'>
            &#10007;
          </div>
          <h1 className='text-4xl sm:text-5xl leading-tight'>Something went wrong</h1>
          <p className='text-lg font-inter tracking-[-0.025em] text-zinc-600 max-w-sm'>
            {errorMessage}
          </p>
          <Link
            href='/blog'
            className='mt-2 text-base font-inter tracking-[-0.075em] text-teal-600 transition-colors hover:text-teal-700 hover:underline hover:underline-offset-2 decoration-wavy'
          >
            ← Back to blog
          </Link>
        </div>
      )}
    </div>
  )
}

// Exports:
export default UnsubscribedPage
