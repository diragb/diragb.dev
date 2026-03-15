// Packages:
import React from 'react'

// Components:
import CustomHead from '@/components/primary/CustomHead'
import Navbar from '@/components/primary/Navbar'
import BlogCard from '@/components/secondary/BlogCard'

// Constants:
import { publishedBlogs } from '@/utils/blogs'

// Functions:
const BlogPage = () => {
  // Return:
  return (
    <div className='relative flex justify-start items-start flex-col gap-10 sm:gap-12 w-screen max-w-[720px] min-h-screen mx-auto py-24 px-6 text-zinc-950 bg-zinc-50'>
      <CustomHead
        title='Blog - Dirag Biswas'
        description='Thoughts on engineering, open source, and building software.'
      />
      <Navbar />
      <div className='flex justify-start items-start flex-col gap-4 w-full'>
        <h1 className='text-7xl sm:text-8xl leading-tight'>Blog</h1>
        <p className='text-xl sm:text-2xl font-inter tracking-[-0.075em] text-zinc-700'>
          Thoughts on engineering, open source, and building software.
        </p>
      </div>
      <div className='flex justify-start items-start flex-col gap-4 w-full'>
        {
          publishedBlogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))
        }
      </div>
    </div>
  )
}

// Exports:
export default BlogPage
