// Packages:
import React, { useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import sleep from 'sleep-promise'

// Typescript:
export interface Project {
  thumbnailURI: string
  videoURI?: string
  name: string
  description: string
  technologies: string[]
  URL: {
    live?: string
    github: string
  }
}

// Components:
import Link from 'next/link'

// Functions:
const ProjectCard = ({
  thumbnailURI,
  videoURI,
  name,
  description,
  technologies,
  URL,
}: Project) => {
  // Ref:
  const videoRef = useRef<HTMLVideoElement>(null)

  // State:
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)

  // Return:
  return (
    <div
      className='flex flex-col w-full border-[1px] border-zinc-200 rounded-md overflow-hidden cursor-pointer'
      onMouseEnter={() => {
        if (!videoURI) return
        setShouldPlayVideo(true)
        videoRef.current?.play()
      }}
      onMouseLeave={async () => {
        if (!videoURI) return
        await sleep(1000)
        setShouldPlayVideo(false)
        if (videoRef.current) {
          videoRef.current.pause()
          videoRef.current.currentTime = 0
        }
      }}
      onClick={e => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.altKey ||
          e.shiftKey
        ) return

        if ((e.target as HTMLElement)?.closest('a')) return
        window.open(URL.live ?? URL.github, '_blank')
      }}
    >
      <div className='relative w-full h-48 bg-zinc-200 rounded-t-[7px]'>
        <div
          className={cn(
            'absolute z-10 top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all',
            shouldPlayVideo ? 'opacity-0' : 'opacity-100'
          )}
          style={{
            backgroundImage: `url(${thumbnailURI})`
          }}
        />
        {
          videoURI && (
            <video
              ref={videoRef}
              src={videoURI}
              className='absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto scale-125 transform -translate-x-1/2 -translate-y-1/2 object-cover'
              muted
              loop
              controls={false}
            />
          )
        }
      </div>

      <div className='relative flex justify-start items-start flex-col gap-1 w-full p-3 bg-white'>
        <span
          className='text-xl sm:text-2xl tracking-[0.05em]'
          style={{
            textShadow: '0.3px 0px 0px #18181b, -0.3px 0px 0px #18181b'
          }}
        >
          {name}
        </span>
        <span className='text-lg sm:text-xl tracking-[0.05em] leading-[28px] text-zinc-700'>{description}</span>
        <div className='flex gap-1 w-full mt-1'>
          {
            URL.live && (
              <Link href={URL.live} target='_blank' className='py-[1px] sm:py-0.5 px-1.5 sm:px-2 bg-cyan-200 text-xs sm:text-sm leading-[14px] text-zinc-950 border-[1px] border-cyan-400 rounded-full transition-all hover:brightness-110'>Live</Link>
            )
          }
          <Link href={URL.github} target='_blank' className='py-[1px] sm:py-0.5 px-1.5 sm:px-2 bg-teal-200 text-xs sm:text-sm leading-[14px] text-zinc-950 border-[1px] border-teal-400 rounded-full transition-all hover:brightness-110'>GitHub</Link>
          {
            technologies.map((technology, index) => (
              <div className='py-[1px] sm:py-0.5 px-1.5 sm:px-2 bg-zinc-100 text-xs sm:text-sm leading-[14px] text-zinc-950 border-[1px] border-zinc-200 rounded-full' key={index}>{technology}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

// Exports:
export default ProjectCard
