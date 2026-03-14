// Packages:
import React from 'react'

// Typescript:
export interface Experience {
  company: {
    logo: string
    name: string
    initials: string
    URL: string
  }
  position: string
  duration: [string, string],
  description: string | React.ReactNode
  technologies: string[]
}

// Components:
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import Link from 'next/link'

// Functions:
const ExperienceCard = ({
  company,
  position,
  duration,
  description,
  technologies,
}: Experience) => {

  // Return:
  return (
    <div className='flex items-start gap-2 sm:gap-3 w-full'>
      <Avatar className='size-[52px] border-[1px] border-zinc-200'>
        <AvatarImage src={company.logo} alt={company.name} />
        <AvatarFallback className='font-inter tracking-[-0.075em]'>{company.initials}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-1 sm:gap-2 w-full'>
        <div className='flex flex-col w-full'>
          <div className='flex items-start sm:items-center justify-start sm:justify-between flex-col sm:flex-row w-full'>
            <div
              className='text-xl sm:text-2xl font-inter tracking-[-0.025em] text-zinc-950'
              style={{
                textShadow: '0.3px 0px 0px #18181b, -0.3px 0px 0px #18181b',
              }}
            >
              {position}
            </div>
            <div className='text-base font-inter tracking-[-0.075em] text-zinc-700'>
              {duration[0]}&nbsp; → &nbsp;{duration[1]}
            </div>
          </div>
          <Link
            href={company.URL}
            target='_blank'
            className='w-fit sm:mt-0 mt-0.5 sm:text-base text-sm font-inter tracking-[-0.075em] text-zinc-500 transition-all hover:text-teal-600'
          >
          {company.name}
          </Link>
        </div>
        <div className='text-base sm:text-lg font-inter tracking-[-0.075em] text-zinc-800'>
          {description}
        </div>
        <div className='flex flex-wrap gap-1 w-full mt-2 sm:mt-0'>
          {
            technologies.map((technology, index) => (
              <div
                key={index}
                className='py-[1px] sm:py-0.5 px-1.5 sm:px-2 bg-zinc-100 text-xs sm:text-sm font-inter tracking-[-0.05em] text-zinc-950 border-[1px] border-zinc-200 rounded-full'
              >
                {technology}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

// Exports:
export default ExperienceCard
