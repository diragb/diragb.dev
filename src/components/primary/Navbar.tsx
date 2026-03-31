// Packages:
import React from 'react'

// Components:
import Link from 'next/link'
import Image from 'next/image'

// Functions:
const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 font-inter tracking-[-0.075em] bg-zinc-50/80 backdrop-blur-sm'>
      <div className='flex justify-between items-center w-screen max-w-[720px] mx-auto px-6 py-4'>
        <Link href='/' className='text-2xl text-zinc-950 transition-colors hover:text-teal-600'>
          <Image alt='DB' width={32} height={32} src='/profile-picture.jpg' className='rounded-full' />
        </Link>
        <div className='flex items-center gap-6'>
          <Link href='/blog' className='text-lg text-zinc-950 transition-colors hover:text-teal-600'>
            Blog
          </Link>
          <Link target='_blank' referrerPolicy='no-referrer' href='https://docs.google.com/document/d/1D-ZdGlDxXKwvAsXDAdPpJDpw0zL5Jo8V/edit?usp=sharing&ouid=101760868985617262773&rtpof=true&sd=true' className='text-lg text-zinc-950 transition-colors hover:text-teal-600'>
            Resume
          </Link>
        </div>
      </div>
    </nav>
  )
}

// Exports:
export default Navbar
