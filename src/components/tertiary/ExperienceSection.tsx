// Packages:
import React, { useMemo } from 'react'

// Components:
import Link from 'next/link'
import ExperienceCard, { type Experience } from '@/components/secondary/ExperienceCard'

// Functions:
const ExperienceSection = () => {
  // Memo:
  const experiences = useMemo<Experience[]>(() => [
    {
      company: {
        logo: '/experiences/binaryveda-logo.jpg',
        name: 'Binaryveda',
        initials: 'BV',
        URL: 'https://www.binaryveda.com',
      },
      position: 'Senior Frontend Engineer',
      duration: ['May ‘23', 'Sep ‘25'],
      description: (
        <>
          Delivered more than ten projects for clients like{' '}
          <Link className='italic transition-all hover:text-teal-600' href='https://www.godrejenterprises.com/locks-and-security'>Godrej</Link>,{' '}
          <Link className='italic transition-all hover:text-teal-600' href='https://www.dtdc.com/in/'>DTDC</Link>,{' '}
          <Link className='italic transition-all hover:text-teal-600' href='https://www.keus.in/'>Keus</Link>,{' '}
          managed a team of 5 engineers, and collaborated with cross-functional teams.
        </>
      ),
      technologies: ['Next.js', 'Svelte', 'Typescript', 'TailwindCSS'],
    },
    {
      company: {
        logo: '/experiences/heybase-logo.jpg',
        name: 'Heybase',
        initials: 'HB',
        URL: 'https://www.heybase.com',
      },
      position: 'Fullstack Engineer (Frontend Heavy)',
      duration: ['Jan ‘23', 'May ‘23'],
      description: 'Independently migrated the codebase from Javascript to Typescript, and shipped some key features.',
      technologies: ['Next.js', 'Express.js', 'MongoDB', 'Typescript', 'TailwindCSS'],
    },
    {
      company: {
        logo: '/experiences/readyly-logo.jpg',
        name: 'Readyly',
        initials: 'RL',
        URL: 'https://www.readyly.com',
      },
      position: 'Software Engineer',
      duration: ['Jan ‘22', 'Dec ‘22'],
      description: 'Built data visualization tools with React, leveraged Python for data analysis.',
      technologies: ['React.js', 'Styled Components', 'd3', 'Typescript', 'Python', 'pandas', 'numpy'],
    },
  ], [])

  // Return:
  return (
    <div className='flex justify-start items-start flex-col gap-4 w-full'>
      <span className='text-4xl sm:text-5xl leading-tight'>Experiences</span>
      {
        experiences.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))
      }
    </div>
  )
}

// Exports:
export default ExperienceSection
