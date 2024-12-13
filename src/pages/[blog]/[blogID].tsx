'use client'

// Packages:
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { cn } from '@/lib/utils'

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import CustomHead from '@/components/primary/CustomHead'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'

// Functions:
const BlogArticle = () => {
  // Constants:
  const router = useRouter()
  const blogID = router.query.blogID
  const { toast } = useToast()

  // State:
  const [isFetchingBlog, setIsFetchingBlog] = useState(false)
  const [content, setContent] = useState<string | null>(null)

  // Functions:
  const fetchBlog = async (blogID: string) => {
    try {
      setIsFetchingBlog(true)
      const response = await fetch(`/blog/${blogID}.html`)
      const data = await response.text()
      setContent(data)
    } catch (error) {
      console.error('shit, something went wrong: ', error)
      toast({
        title: 'Could not fetch blog post :(',
        description: 'Sorry, something went wrong.',
        variant: 'destructive',
      })
    } finally {
      setIsFetchingBlog(false)
    }
  }

  // Effects:
  useEffect(() => {
    if (blogID && typeof blogID === 'string') fetchBlog(blogID)
  }, [blogID])
  
  // Return:
  return (
    <>
      <CustomHead title={`Blog - Dirag Biswas`} />
      <ScrollArea className='w-screen h-screen'>
        <div className={cn('flex items-center flex-col w-screen min-h-screen pt-[20vh] pb-28 uppercase', ubunto_mono.className)}>
          {
            isFetchingBlog ? (
              <div className='w-11/12 sm:w-[596px] text-medium text-slate-600'>Loading...</div>
            ) : content && (
              <div className='w-11/12 sm:w-[596px]' dangerouslySetInnerHTML={{ __html: content }} />
            )
          }
        </div>
      </ScrollArea>
    </>
  )
}

// Exports:
export default BlogArticle
