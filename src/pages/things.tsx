'use client'

// Packages:
import React from 'react'
import { cn } from '@/lib/utils'

// Typescript:
interface Link {
  title: string
  url: string
}

interface Thing {
  id: string
  title: string
  description: React.ReactNode
  image?: string
  video?: string
  links: Link[]
  isDeactivated?: true
  isWIP?: true
}

// Imports:
import {
  Link,
  Rocket,
  Sunset,
} from 'lucide-react'

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import CustomHead from '@/components/primary/CustomHead'
import { ScrollArea } from '@/components/ui/scroll-area'

// Functions:
const Things = () => {
  // Constants:
  const things: Thing[] = [
    {
      id: 'openreply',
      title: 'OpenReply',
      description: (
        <>
          OpenReply is the internet's comment section.<br />
          <br />
          It's a browser extension and website that lets people vote and comment on any website on the internet.
        </>
      ),
      image: '/things/openreply/dirag-biswas.png',
      links: [
        {
          title: 'webapp',
          url: 'https://openreply.app',
        },
        {
          title: 'github',
          url: 'https://github.com/open-reply/open-reply-extension',
        },
      ],
      isWIP: true,
    },
    {
      id: 'yomato',
      title: 'Yomato',
      description: (
        <>
          Share your budget, and Yomato will recommend food combinations for you from any restaurant of your choice available on Zomato.<br />
          <br />
          Yomato was built with React and TailwindCSS on the Frontend, and ExpressJS for the backend. Restaurant and menu details are scraped from Zomato using cheerio, you can find the relevant code <a href='https://github.com/diragb/yomato-backend/blob/main/src/functions/getRestaurant.ts' target='_blank' className='font-bold cursor-pointer hover:underline hover:text-rose-700 transition-all'>here</a>.
        </>
      ),
      image: '/things/yomato/screenshot.jpg',
      links: [
        {
          title: 'webapp',
          url: 'https://yomato-app.web.app',
        },
        {
          title: 'github',
          url: 'https://github.com/diragb/yomato-frontend',
        },
      ],
      isDeactivated: true,
    },
    {
      id: 'shadcn-dropzone',
      title: 'Shadcn Dropzone',
      description: (
        <>
          <div className='flex gap-1 my-2'>
            <a href='https://www.npmjs.com/package/shadcn-dropzone' target='_blank'><img src='https://img.shields.io/badge/npm-shadcn--dropzone-brightgreen.svg?style=flat-square' className='max-w-full' /></a>
            <a href='https://www.npmjs.com/package/shadcn-dropzone' target='_blank'><img src='https://img.shields.io/npm/v/shadcn-dropzone.svg?style=flat-square' className='max-w-full' /></a>
            <a href='https://www.npmjs.com/package/shadcn-dropzone' target='_blank'><img src='https://img.shields.io/npm/dm/shadcn-dropzone.svg?style=flat-square' className='max-w-full' /></a>
          </div>
          Ready to use File Upload Dropzone component, built with shadcn/ui and react-dropzone.
        </>
      ),
      video: '/things/shadcn-dropzone/example.mp4',
      links: [
        {
          title: 'demo',
          url: 'https://diragb.github.io/shadcn-dropzone/',
        },
        {
          title: 'npm',
          url: 'https://www.npmjs.com/package/shadcn-dropzone',
        },
        {
          title: 'github',
          url: 'https://github.com/diragb/shadcn-dropzone',
        },
      ],
    },
    {
      id: 'cerise',
      title: 'Cerise',
      description: (
        <>
          Cerise is a webapp to help you study. It's the first React webapp that I'd ever built.
        </>
      ),
      image: '/things/cerise/screenshot.png',
      links: [
        {
          title: 'webapp',
          url: 'https://cerise-84615.web.app/',
        },
      ],
    },
  ]

  // Return:
  return (
    <>
      <CustomHead title='Things - Dirag Biswas' />
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
              things
            </div>
            <div className='relative w-full h-[20px]'>
              <div className='absolute z-0 text-sm font-semibold ml-1 select-none'>here's a non-exhaustive list of all the things that i've built so far.</div>
              <div className='absolute z-1 text-sm font-semibold ml-1 selection:text-slate-700 selection:bg-rose-300 text-transparent'>here's a non-exhaustive list of all the <span className='cursor-pointer'>_shit_</span> that i've built so far.</div>
            </div>
            <div className='flex flex-col gap-6 mt-6'>
              {
                things.map(thing => (
                  <div id={thing.id} key={thing.id} className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-1'>
                      <div className='flex gap-1.5 text-3xl font-semibold leading-none'>
                        <a href={`#${thing.id}`}>{thing.title}</a>
                        {
                          thing.isDeactivated && (
                            <div className='-ml-0.5' title='This project has been sunsetted.'>
                              <Sunset width={12} height={12} className='text-rose-700' />
                            </div>
                          )
                        }
                        {
                          thing.isWIP && (
                            <div className='-ml-0.5' title='This project is WIP.'>
                              <Rocket width={12} height={12} className='text-rose-700' />
                            </div>
                          )
                        }
                      </div>
                      <div className='flex gap-2'>
                        {
                          thing.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target='_blank'
                              className='flex items-center justify-center gap-0.5 text-slate-700 hover:text-rose-700 hover:underline transition-all'
                            >
                              <Link width={12} height={12} />
                              <span className='text-xs leading-none'>{link.title}</span>
                            </a>
                          ))
                        }
                      </div>
                    </div>
                    {
                      thing.image && (
                        <div
                          className='w-full aspect-video bg-cover bg-center bg-no-repeat rounded-md shadow-sm'
                          style={{
                            backgroundImage: `url(${ thing.image })`,
                          }}
                        />
                      )
                    }
                    {
                      thing.video && (
                        <video
                          src={thing.video}
                          controls={false}
                          autoPlay
                          loop
                          className='w-full aspect-video rounded-md shadow-sm'
                        />
                      )
                    }
                    <div className='text-sm leading'>
                      {thing.description}
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
export default Things
