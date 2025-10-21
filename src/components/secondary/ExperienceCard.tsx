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
    <div className='flex items-start gap-3 w-full'>
      <Avatar className='size-[52px] border-[1px] border-zinc-200'>
        <AvatarImage src={company.logo} />
        <AvatarFallback>{company.initials}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex flex-col w-full'>
          <div className='flex items-center justify-between w-full h-[31px]'>
            <div
              className='text-2xl leading-[31px] text-zinc-950'
              style={{
                textShadow: '0.3px 0px 0px #18181b, -0.3px 0px 0px #18181b',
              }}
            >
              {position}
            </div>
            <div className='text-base leading-[21px] text-zinc-800'>
              {duration[0]} - {duration[1]}
            </div>
          </div>
          <Link href={company.URL} target='_blank' className='w-fit text-base leading-[21px] text-zinc-700 transition-all hover:text-teal-600'>{company.name}</Link>
        </div>
        <div className='text-xl leading-[26px] text-zinc-800'>
          {description}
        </div>
        <div className='flex gap-1 w-full'>
          {
            technologies.map((technology, index) => (
              <div className='py-0.5 px-2 bg-zinc-100 text-sm leading-[14px] text-zinc-950 border-[1px] border-zinc-200 rounded-full' key={index}>{technology}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

// Exports:
export default ExperienceCard
