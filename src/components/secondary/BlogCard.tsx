// Packages:
import React from 'react'

// Typescript:
import type { BlogMeta } from '@/lib/blogs'

// Components:
import Link from 'next/link'

// Functions:
const BlogCard = ({
  id,
  title,
  excerpt,
  date,
  readTime,
  tags,
}: BlogMeta) => {
  // Return:
  return (
    <Link href={`/blog/${id}`} className='group w-full'>
      <div className='flex flex-col gap-2 w-full p-4 border-[1px] border-zinc-200 rounded-md bg-white transition-all hover:border-zinc-300'>
        <div className='flex items-center gap-2 font-inter tracking-[-0.075em] text-sm text-zinc-500'>
          <span>{date}</span>
          <span>·</span>
          <span>{readTime}</span>
        </div>
        <span
          className='text-xl sm:text-2xl font-inter tracking-[-0.025em] text-zinc-950 transition-colors group-hover:text-teal-600'
          style={{
            textShadow: '0.3px 0px 0px #18181b, -0.3px 0px 0px #18181b',
          }}
        >
          {title}
        </span>
        <span className='text-base sm:text-lg font-inter tracking-[-0.075em] text-zinc-600 leading-snug'>
          {excerpt}
        </span>
        <div className='flex flex-wrap gap-1 w-full mt-1'>
          {
            tags.map((tag, index) => (
              <div
                key={index}
                className='py-[1px] sm:py-0.5 px-1.5 sm:px-2 bg-zinc-100 text-xs sm:text-sm font-inter tracking-[-0.05em] text-zinc-950 border-[1px] border-zinc-200 rounded-full'
              >
                {tag}
              </div>
            ))
          }
        </div>
      </div>
    </Link>
  )
}

// Exports:
export default BlogCard
