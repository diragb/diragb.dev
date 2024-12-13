// Packages:
import React from 'react'
import { cn } from '@/lib/utils'

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import Link from 'next/link'
import CustomHead from '@/components/primary/CustomHead'

// Functions:
const Home = () => {

  // Return:
  return (
    <>
      <CustomHead />
      <div className={cn('flex justify-center items-center flex-col w-screen h-screen uppercase', ubunto_mono.className)}>
        <div className='flex flex-col gap-2 w-11/12 sm:w-[596px]'>
          <div
            className='text-5xl text-rose-600'
            style={{
              letterSpacing: '-1px',
              fontFamily: 'VCR-OSD-Mono',
            }}
          >
            di<span style={{letterSpacing: '2px'}}>rag</span> bi<span style={{letterSpacing: '2px'}}>swa</span>s
          </div>
          <div className='text-md font-medium'>
            <Link
              href='/education'
              className='cursor-pointer hover:underline hover:text-rose-700 transition-all'
            >
              cse undergrad @ ipu
            </Link>{', '}
            <Link
              href='/work'
              className='cursor-pointer hover:underline hover:text-rose-700 transition-all'
            >
              senior frontend engineer at binaryveda
            </Link>{', '}
            currently building{' '}
            <Link
              href='/things?thing=openreply'
              className='font-semibold cursor-pointer hover:underline hover:text-rose-700 transition-all'
            >
              openreply
            </Link> on the side.
          </div>
        </div>
      </div>
    </>
  )
}

// Exports:
export default Home
