'use client'

// Packages:
import React from 'react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/router'
import { truncate } from 'lodash'

// Typescript:
interface Blog {
  id: string
  title: string
  postedOn: string
  preview: string
}

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import CustomHead from '@/components/primary/CustomHead'
import { ScrollArea } from '@/components/ui/scroll-area'

// Functions:
const Work = () => {
  // Constants:
  const router = useRouter()
  const blogs: Blog[] = [
    {
      id: 'gambits',
      title: 'Gambits',
      postedOn: '14th December, 2024',
      preview: 'it has often filled me with equal parts confusion and a deep sense of pity whenever i have learned of the fruitless misadventures of the greatly ambitious, who, when one engages in conversation with them, declares confidently - sometimes too confidently - their plans and ideas, to achieve what they think they need to, or should, achieve.'
    },
  ]

  // Return:
  return (
    <>
      <CustomHead title='Blog - Dirag Biswas' />
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
              blog
            </div>
            <div className='text-sm font-semibold'>all the thoughts that made it out of my personal diary.</div>
            <div className='flex flex-col gap-6 mt-6'>
              {
                blogs.map(blog => (
                  <div
                    key={blog.id}
                    className='flex flex-col gap-1 p-2 bg-slate-200 cursor-pointer hover:bg-rose-200 transition-all'
                    onClick={() => router.push(`/blog/${ blog.id }`)}
                  >
                    <div
                      className='text-2xl text-rose-600 leading-none'
                      style={{
                        letterSpacing: '-1px',
                        fontFamily: 'VCR-OSD-Mono',
                      }}
                    >
                      {blog.title}
                    </div>
                    <div className='text-slate-600 text-[0.65rem] leading-none'>
                      posted on {blog.postedOn}
                    </div>
                    <div className='text-xs'>
                      { truncate(blog.preview, { length: 200 }) }
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
