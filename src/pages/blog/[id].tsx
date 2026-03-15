// Packages:
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import fs from 'fs'
import path from 'path'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import 'katex/dist/katex.min.css'
import rehypeUnwrapBlocks from '@/utils/rehype-unwrap-blocks'

// Typescript:
import type { GetStaticPaths, GetStaticProps } from 'next'
import type { BlogPost } from '@/utils/blogs'
import type { Components } from 'react-markdown'

// Components:
import Link from 'next/link'
import Script from 'next/script'
import Markdown from 'react-markdown'
import CustomHead from '@/components/primary/CustomHead'
import Navbar from '@/components/primary/Navbar'

// Constants:
import { blogs } from '@/utils/blogs'
import widgets from '@/components/widgets'

const markdownComponents: Components = {
  ...widgets,
  h1: ({ children }) => (
    <h1 className='text-5xl sm:text-6xl font-instrument-serif text-zinc-950 mt-6'>{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className='text-3xl sm:text-4xl font-instrument-serif text-zinc-950 mt-4'>{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className='text-2xl sm:text-3xl font-instrument-serif text-zinc-950 mt-3'>{children}</h3>
  ),
  p: ({ children }) => (
    <p className='text-lg leading-relaxed text-zinc-800'>{children}</p>
  ),
  strong: ({ children }) => (
    <span
      className='text-zinc-950'
      style={{ textShadow: '0.3px 0px 0px #18181b, -0.3px 0px 0px #18181b' }}
    >
      {children}
    </span>
  ),
  code: ({ children, className }) => {
    const isBlock = className?.includes('language-')
    if (isBlock) {
      return (
        <code className={`block w-full p-4 bg-zinc-100 border-[1px] border-zinc-200 rounded-md text-base text-zinc-800 overflow-x-auto ${className}`}>
          {children}
        </code>
      )
    }
    return (
      <code className='px-1.5 py-0.5 bg-zinc-100 border-[1px] border-zinc-200 rounded text-base text-teal-700'>
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <pre className='w-full overflow-x-auto'>{children}</pre>
  ),
  a: ({ href, children }) => (
    <Link
      href={href ?? '#'}
      target={href?.[0] === '#' ? undefined : '_blank'}
      className='text-teal-600 font-bold transition-colors hover:text-teal-700 hover:underline hover:underline-offset-2 decoration-wavy'
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className='flex flex-col gap-2 pl-5 list-disc marker:text-zinc-400'>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className='flex flex-col gap-2 pl-5 list-decimal marker:text-zinc-400'>{children}</ol>
  ),
  li: ({ children }) => (
    <li className='text-lg leading-relaxed text-zinc-800'>{children}</li>
  ),
  blockquote: ({ children, className, ...props }) => {
    if (className?.includes('twitter-tweet')) {
      return <blockquote className={className} {...props}>{children}</blockquote>
    }
    return <blockquote className='pl-4 border-l-[3px] border-teal-400 text-zinc-600 italic'>{children}</blockquote>
  },
  table: ({ children }) => (
    <div className='w-full overflow-x-auto'>
      <table className='w-full border-collapse text-base'>
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className='bg-zinc-100 text-left text-zinc-950'>
      {children}
    </thead>
  ),
  th: ({ children }) => (
    <th className='px-4 py-2 bg-teal-900 text-white border border-zinc-200 font-semibold text-sm tracking-wide'>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className='px-4 py-2 border border-zinc-200 text-zinc-700'>
      {children}
    </td>
  ),
  tr: ({ children }) => (
    <tr className='even:bg-teal-50 odd:bg-white'>
      {children}
    </tr>
  ),
  script: () => null,
  hr: () => (
    <hr className='border-t-[1px] border-zinc-200 my-2' />
  ),
}

// Functions:
export const getStaticPaths: GetStaticPaths = () => {
  const paths = blogs.map(blog => ({
    params: { id: blog.id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<{ blog: BlogPost }> = (context) => {
  const id = context.params?.id as string
  const meta = blogs.find(b => b.id === id)

  if (!meta) {
    return { notFound: true }
  }

  const filePath = path.join(process.cwd(), 'content', 'blogs', `${id}.md`)
  const content = fs.readFileSync(filePath, 'utf-8')

  return { props: { blog: { ...meta, content } } }
}

const BlogPostPage = ({ blog }: { blog: BlogPost }) => {
  // Constants:
  const router = useRouter()

  // Effects:
  useEffect(() => {
    const twttr = (window as any).twttr
    if (twttr?.widgets) {
      twttr.widgets.load()
    }
  }, [blog.content])

  // Return:
  if (router.isFallback) return <div>Loading...</div>
  return (
    <div className='relative flex justify-start items-start flex-col gap-8 sm:gap-10 w-screen max-w-[720px] min-h-screen mx-auto py-24 px-6 text-zinc-950 bg-zinc-50'>
      <CustomHead
        title={`${blog.title} - Dirag Biswas`}
        description={blog.excerpt}
      />
      <Navbar />
      {blog.workInProgress && (
        <div className='flex items-center gap-2.5 w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 font-inter tracking-[-0.025em]'>
          <span className='text-lg leading-none'>🚧</span>
          <p className='text-sm'>
            <span className='font-semibold'>Work in progress</span> — This article is still being written. Content may change or be incomplete.
          </p>
        </div>
      )}
      <article className='flex flex-col gap-6 w-full'>
        <header className='flex flex-col gap-3 w-full'>
          <Link
            href='/blog'
            className='text-base font-inter tracking-[-0.075em] text-zinc-500 transition-all hover:text-teal-600'
          >
            ← Back to blog
          </Link>
          <h1 className='text-5xl sm:text-6xl leading-tight'>{blog.title}</h1>
          <div className='flex items-center gap-2 font-inter tracking-[-0.075em] text-base text-zinc-500'>
            <span>{blog.date}</span>
            <span>·</span>
            <span>{blog.readTime}</span>
          </div>
          <div className='flex flex-wrap gap-1 w-full'>
            {
              blog.tags.map((tag, index) => (
                <div
                  key={index}
                  className='py-[1px] sm:py-0.5 px-1.5 sm:px-2 bg-zinc-100 text-xs sm:text-sm font-inter tracking-[-0.05em] text-zinc-950 border-[1px] border-zinc-200 rounded-full'
                >
                  {tag}
                </div>
              ))
            }
          </div>
        </header>
        <div className='flex flex-col gap-5 w-full font-inter tracking-[-0.025em]'>
          <Markdown
            components={markdownComponents}
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeUnwrapBlocks, rehypeKatex]}
          >
            {blog.content}
          </Markdown>
        </div>
      </article>
      <div className='flex items-center justify-between w-full pt-6 border-t-[1px] border-zinc-200'>
        <Link
          href='/blog'
          className='text-base font-inter tracking-[-0.075em] text-zinc-500 transition-all hover:text-teal-600'
        >
          ← All posts
        </Link>
      </div>
      <Script
        id='twitter-widgets'
        src='https://platform.twitter.com/widgets.js'
        strategy='afterInteractive'
        onLoad={() => {
          (window as any).twttr?.widgets?.load()
        }}
      />
    </div>
  )
}

// Exports:
export default BlogPostPage
