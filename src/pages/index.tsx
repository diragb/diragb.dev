// Packages:
import React from 'react'

// Components:
import Link from 'next/link'
import CustomHead from '@/components/primary/CustomHead'
import ProjectsSection from '@/components/tertiary/ProjectsSection'
import ExperienceSection from '@/components/tertiary/ExperienceSection'
import BlogSection from '@/components/tertiary/BlogSection'

// Functions:
const Home = () => {
  // Return:
  return (
    <div className='relative flex justify-start items-start flex-col gap-12 w-screen max-w-[720px] min-h-screen mx-auto py-24 px-6 text-zinc-950 bg-zinc-50'>
      <CustomHead />
      <div className='flex justify-start items-start flex-col w-full'>
        <span className='text-8xl leading-tight'>Dirag Biswas</span>
        <span className='text-3xl'>Web Engineer, previously Senior Engineer at <Link href='https://www.binaryveda.com/blog/wfh-we-tried-and-we-recommend' target='_blank' className='transition-all hover:text-teal-600'>Binaryveda</Link></span>
        <div className='flex items-center justify-center gap-3 mt-4 ml-1'>
          <Link href='https://github.com/diragb' target='_blank'>
            <div className='size-5 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg)' }} />
          </Link>
          <Link href='https://x.com/diragb' target='_blank'>
            <div className='size-4 bg-cover bg-center bg-no-repeat' style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg)' }} />
          </Link>
          <Link href='https://www.linkedin.com/in/diragb' target='_blank'>
            <div className='size-5 bg-cover bg-center bg-no-repeat grayscale contrast-200' style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png)' }} />
          </Link>
        </div>
      </div>
      <ExperienceSection />
      <ProjectsSection />
      {/* <BlogSection /> */}
    </div>
  )
}

// Exports:
export default Home
