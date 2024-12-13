'use client'

// Packages:
import React from 'react'
import { cn } from '@/lib/utils'

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import CustomHead from '@/components/primary/CustomHead'

// Functions:
const Education = () => {
  // Constants:

  // Return:
  return (
    <>
      <CustomHead title='Education - Dirag Biswas' />
      <div className={cn('flex justify-center items-center flex-col w-screen h-screen uppercase', ubunto_mono.className)}>
        <div className='flex flex-col gap-2 w-11/12 sm:w-[596px]'>
          <div
            className='text-5xl text-rose-600'
            style={{
              letterSpacing: '-1px',
              fontFamily: 'VCR-OSD-Mono',
            }}
          >
            education
          </div>
          <div className='text-sm font-medium'>
            i'm in my final year of cse undergrad at ipu, based in new delhi, india.<br/>
            <br />
            prior to this i did my schooling at don bosco school, and my +2 at delhi public school.<br />
            <br />
            i picked up a liking towards science and cs during my time at don bosco school, where we were taught the basics of DSA with C++ as a part of the cirriculum
            from the 7th standard.<br />
            <br />
            in the 9th standard, i picked up php and built a website for a <a href='https://instagram.com/worded.xyz' target='_blank' className='font-semibold cursor-pointer hover:underline hover:text-rose-700 transition-all'>writing club</a> that i had started back then.<br />
            <br />
            i built my first react webapp in 2019 called <a href='/things#cerise' className='font-semibold cursor-pointer hover:underline hover:text-rose-700 transition-all'>cerise</a> to help students with studying, which went semi-viral on reddit and instagram. it taught me my first lessons about product-market fit and marketing.<br />
            <br />
            i started working as a software engineer a week before a joined college, and i'm currently a senior frontend engineer at binaryveda.
          </div>
        </div>
      </div>
    </>
  )
}

// Exports:
export default Education
