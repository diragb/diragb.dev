'use client'

// Packages:
import { useEffect } from 'react'

// Functions:
const InstagramEmbed = ({ url }: { url: string }) => {
  // Effects:
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).instgrm) {
      (window as any).instgrm.Embeds.process()
    }
  }, [])

  // Return:
  return (
    <div className='w-full overflow-hidden'>
      <blockquote
        className='instagram-media'
        data-instgrm-permalink={url}
        data-instgrm-version='14'
        style={{
          maxWidth: '100% !important',
          width: '100% !important',
          margin: 'auto',
        }}
      />
    </div>
  )
}

// Exports:
export default InstagramEmbed
