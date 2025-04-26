'use client'

// Packages:
import React from 'react'
import { cn } from '@/lib/utils'

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import CustomHead from '@/components/primary/CustomHead'
import { ScrollArea } from '@/components/ui/scroll-area'

// Functions:
const HiFarza = () => (
  <>
    <CustomHead
      title='taking a shot in the dark'
      description='the odds of this article being read are low; the odds of me being a part of the sf dream team? vanishingly so.'
      image={{
        square: 'https://diragb.dev/taking-a-shot-in-the-dark.png',
        rectangle: 'https://diragb.dev/taking-a-shot-in-the-dark.png',
      }}
    />
    <ScrollArea className='w-screen h-screen'>
      <div className={cn('flex items-center flex-col w-screen min-h-screen pt-[20vh] pb-28', ubunto_mono.className)}>
        <div className='w-11/12 sm:w-[596px]'>
          <div className='flex flex-col gap-2 w-full'>
            <div
              className='text-5xl font-semibold'
            >
              hi farza
            </div>
            <div className='text-sm leading-5'>
              i&apos;m dirag at 23.<br />
              <br />
              i was born in a small town near the himalayas, where i spent the last 2 decades of my life.<br />
              <img src='/diragb.jpeg' className='my-5' />
              i&apos;ve been following you since buildspace days. watching people build interesting things always got me excited.<br />
              <br />
              looking back, i&apos;ve always been interested in building cool stuff too: sugar rockets, adverts, websites.<br />
              <br />
              i had a tough time surviving school; creativity being discouraged did a number to my mental health.<br />
              <br />
              but i got out of school and joined an ai startup 3 years back as an intern. i&apos;m currently a senior frontend engineer.<br />
              <br />
              i&apos;m a final year cse undergrad, graduating next month.<br />
              <br />
              <span className='text-2xl font-bold'>things</span><br />
              i&apos;m building <a target='_blank' href='https://github.com/open-reply/open-reply-extension' className='font-bold underline text-blue-700 transition-all'>openreply</a>, a browser extension + webapp that lets people comment on any website across the internet.<br />
              <br />
              it&apos;s still a work-in-progress, tbh. i try to work on it on nights and weekends.<br />
              <br />
              but for now, i don&apos;t have much else to show that&apos;s <span className='italic'>good</span>.<br />
              <br />
              <span className='text-2xl font-bold'>a bit about what drives me</span><br />
              above all else, i am deeply passionate about building interesting and useful things. most of it just happens to be in tech.<br />
              <br />
              maybe i&apos;m not the guy you&apos;re looking for, and that&apos;s okay. but if you think i&apos;m worth it, let me know. i&apos;ll keep my bags packed.<br />
              <br />
              best,
              <br />
              dirag
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  </>
)

// Exports:
export default HiFarza
