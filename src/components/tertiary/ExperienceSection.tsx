// Packages:
import React, { useMemo } from 'react'

// Components:
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
      description: 'Senior engineer with leadership experience, delivering 10+ client projects by building complex systems including IoT network management (ESP32, BLE), custom email tooling, and interactive dashboards (D3, Next.js, Tailwind), while managing a team of 5 and leveraging AI to streamline development workflows.',
      technologies: ['Next.js', 'Svelte', 'Typescript'],
    },
    {
      company: {
        logo: '/experiences/heybase-logo.jpg',
        name: 'Heybase',
        initials: 'HB',
        URL: 'https://www.heybase.com',
      },
      position: 'Fullstack Engineer',
      duration: ['Jan ‘23', 'May ‘23'],
      description: 'Built a collaborative WYSIWYG editor with CRDT-based real-time sync and custom Quill.js templating, independently migrated a monorepo to TypeScript, and improved app performance through code-splitting, query optimization, and resolving technical debt.',
      technologies: ['Next.js', 'Express.js', 'MongoDB', 'Typescript'],
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
      technologies: ['React.js', 'd3', 'Typescript', 'Python'],
    },
  ], [])

  // Return:
  return (
    <div className='flex justify-start items-start flex-col gap-4 w-full'>
      <span className='text-4xl sm:text-5xl leading-tight'>Work Experience</span>
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
