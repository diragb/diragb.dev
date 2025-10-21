// Packages:
import React, { useEffect, useMemo, useState } from 'react'

// Components:
import ProjectCard, { type Project } from '@/components/secondary/ProjectCard'

// Functions:
const ProjectsSection = () => {
  // State:
  const [isSmallView, setIsSmallView] = useState(false)

  // Memo:
  const projects = useMemo<Project[]>(() => [
    {
      name: 'BOSDAC',
      description: 'A modern, low-latency interface for viewing live INSAT-3x satellite imagery and meteorological data. All the features in MOSDAC, plus timelapse control, intelligent local caching, and more.',
      thumbnailURI: '/projects/bosdac/thumbnail.jpg',
      videoURI: '/projects/bosdac/video.webm',
      technologies: ['Next.js', 'TailwindCSS', 'leaflet-maps'],
      URL: {
        live: 'https://bosdac.diragb.dev',
        github: 'https://github.com/diragb/bosdac',
      }
    },
    {
      name: 'Shadcn Dropzone',
      description: 'Ready to use File Upload Dropzone component, built with shadcn/ui and react-dropzone.',
      thumbnailURI: '',
      videoURI: '/projects/shadcn-dropzone/video.webm',
      technologies: ['Next.js', 'Typescript'],
      URL: {
        live: 'https://www.npmjs.com/package/shadcn-dropzone',
        github: 'https://github.com/diragb/shadcn-dropzone',
      }
    },
    {
      name: 'Yomato',
      description: 'Share your budget and get food combinations from any restaurant of your choice available on Zomato.',
      thumbnailURI: '/projects/yomato/thumbnail.jpg',
      technologies: ['React.js', 'Express.js', 'Typescript'],
      URL: {
        // live: 'https://yomato.diragb.dev',
        github: 'https://github.com/diragb/yomato-frontend',
      }
    },
  ], [])

  // Effects:
  useEffect(() => {
    const handleResize = () => {
      const _isSmallView = window.innerWidth < 820
      setIsSmallView(prev => {
        if (prev !== _isSmallView) {
          return _isSmallView
        }
        return prev
      })
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Return:
  return (
    <div className='flex justify-start items-start flex-col gap-4 w-full'>
      <span className='text-4xl sm:text-5xl leading-tight'>Projects</span>
      {
        isSmallView ? (
          <>
            {
              projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))
            }
          </>
        ) : (
          <>
            <ProjectCard {...projects[0]} />
            <div className='flex flex-wrap gap-2 w-full'>
              {
                projects.slice(1).map((project, index) => (
                  <div key={index} className='w-[calc(50%-4px)] h-full'>
                    <ProjectCard {...project} />
                  </div>
                ))
              }
            </div>
          </>
        )
      }
    </div>
  )
}

// Exports:
export default ProjectsSection
