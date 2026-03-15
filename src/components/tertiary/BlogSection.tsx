// Packages:
import React, { useMemo } from 'react'

// Components:
import Link from 'next/link'
import BlogCard from '@/components/secondary/BlogCard'

// Constants:
import { publishedBlogs } from '@/utils/blogs'

// Functions:
const BlogSection = () => {
  // Memo:
  const recentBlogs = useMemo(() => publishedBlogs.slice(0, 3), [])

  // Return:
  return (
    <div className='flex justify-start items-start flex-col gap-4 w-full'>
      <span className='text-4xl sm:text-5xl leading-tight'>Blog</span>
      {
        recentBlogs.map((blog, index) => (
          <BlogCard key={index} {...blog} />
        ))
      }
      {
        publishedBlogs.length > 3 && (
          <Link
            href='/blog'
            className='self-end text-base font-inter tracking-[-0.075em] text-zinc-500 transition-all hover:text-teal-600'
          >
            View all posts →
          </Link>
        )
      }
    </div>
  )
}

// Exports:
export default BlogSection
