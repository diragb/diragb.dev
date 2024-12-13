// Packages:
import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

// Constants:
import { ubunto_mono } from '@/styles/fonts'

// Components:
import Link from 'next/link'

// Functions:
const Navbar = () => {
  // Constants:
  const pathname = usePathname()
  const navigationButtons = [
    {
      path: '/',
      name: 'home',
      exact: true,
    },
    {
      path: '/things',
      name: 'things',
    },
    {
      path: '/work',
      name: 'work',
    },
    {
      path: '/education',
      name: 'education',
    },
    {
      path: '/blog',
      name: 'blog',
    },
  ]

  // State:
  const [highlightedNavigationButtonIndex, setHighlightedNavigationButtonIndex] = useState(0)

  // Effects:
  useEffect(() => {
    navigationButtons.forEach((navigationButton, index) => {
      if (
        navigationButton.exact && pathname === navigationButton.path ||
        pathname && pathname.includes(navigationButton.path)
      ) setHighlightedNavigationButtonIndex(index)
    })
  }, [pathname])

  // Return:
  return (
    <div className={cn('absolute top-0 z-[50] flex justify-center items-center w-screen h-16 uppercase backdrop-blur-3xl', ubunto_mono.className)}>
      <div className='flex justify-between items-center w-11/12 sm:w-7/12 h-full'>
        <div className='flex justify-center items-center gap-2'>
          {
            navigationButtons.map((navigationButton, index) => (
              <Link
                key={index}
                href={navigationButton.path}
                className={cn(
                  'px-2 py-0.5 transition-all',
                  highlightedNavigationButtonIndex === index ? 'bg-rose-500 text-white cursor-default' : 'text-black cursor-pointer hover:bg-rose-200 hover:text-rose-800',
                )}
              >
                {navigationButton.name}
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

// Exports:
export default Navbar
