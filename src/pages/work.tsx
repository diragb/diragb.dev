'use client'

// Packages:
import React from 'react'
import { cn } from '@/lib/utils'

// Typescript:
interface WorkExperience {
  position: string
  firm: string
  duration: [string, string | null]
  description: string[]
}

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import CustomHead from '@/components/primary/CustomHead'
import { ScrollArea } from '@/components/ui/scroll-area'

// Functions:
const Work = () => {
  // Constants:
  const workExperiences = [
    {
      position: 'Senior Frontend Engineer',
      firm: 'Binaryveda',
      duration: ['June 2023', null],
      description: [
        'Led a team of 4 junior engineers to develop key 9+ web products for clients such as Godrej and DTDC.',
        'Coordinated with internal and external stakeholders to streamline development processes and ensure alignment with customer needs.',
        'Delivered critical features while minimizing defects passed to QA, enhancing overall product quality.',
      ],
    },
    {
      position: 'Frontend Engineer',
      firm: 'Heybase',
      duration: ['January 2023', 'May 2023'],
      description: [
        'Shipped 3 highly-requested features from customers while working alongside the Design and Backend teams.',
        'Independently migrated the company\'s frontend codebase from Javascript to Typescript, enhancing performance, improving code maintainability, and resolving numerous existing issues in the process.',
      ],
    },
    {
      position: 'Software Engineer',
      firm: 'Readyly',
      duration: ['January 2022', 'November 2022'],
      description: [
        'Built data visualization tools with React, and leveraged Python for data analysis.',
      ],
    },
    {
      position: 'Software Engineer',
      firm: 'Torrential Ceaseflame',
      duration: ['January 2021', 'December 2021'],
      description: [
        'Helped build the static website and maintain digital presence, optimized SEO and Lighthouse metrics.',
      ],
    },
  ] as WorkExperience[]

  // Return:
  return (
    <>
      <CustomHead title='Work - Dirag Biswas' />
      <ScrollArea className='w-screen h-screen'>
        <div className={cn('flex items-center flex-col w-screen min-h-screen pt-[20vh] pb-28 uppercase', ubunto_mono.className)}>
          <div className='flex flex-col gap-2 w-11/12 sm:w-[596px]'>
            <div
              className='text-5xl text-rose-600'
              style={{
                letterSpacing: '-1px',
                fontFamily: 'VCR-OSD-Mono',
              }}
            >
              work
            </div>
            <div className='flex flex-col gap-6 mt-2'>
              {
                workExperiences.map((workExperience, index) => (
                  <div key={index} className='flex flex-col gap-1'>
                    <div className='text-lg font-bold leading-none'>{workExperience.position} - {workExperience.firm}</div>
                    <div className='text-sm text-slate-700 leading-none'>{workExperience.duration[0]} - {workExperience.duration[1] ?? 'Current'}</div>
                    <div className='flex flex-col gap-0.5 mt-1 text-[0.75rem]'>
                      {
                        workExperience.description.map((point, yandex) => (
                          <div key={yandex}>• {point}</div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

// Exports:
export default Work
