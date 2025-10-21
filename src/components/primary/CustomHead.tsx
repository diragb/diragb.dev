// Packages:
import React from 'react'

// Constants:
const siteURL = 'https://diragb.dev'
const DEFAULTS = {
  title: 'Dirag Biswas - Software Engineer',
  description: 'I\'m a software engineer, specializing in web technologies. Previously Senior Engineer at Binaryveda.',
}

// Components:
import Head from 'next/head'

// Functions:
const CustomHead = ({
  title,
  description,
  image,
}: {
  title?: string
  description?: string
  image?: {
    og: {
      image: string
      square: string
    }
    twitterImage: string
    alt: string
  }
}) => (
  <Head>
    {/* Primary Meta Tags */}
    <title>{ title ?? DEFAULTS.title }</title>
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='theme-color' content='#0D9488' />
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
    <meta name='title' content={title ?? DEFAULTS.title} />
    <meta name='description' content={ description ?? DEFAULTS.description } />
    <meta name='application-name' content={title ?? DEFAULTS.title} />
    <meta name='image' content={ image?.og.square ?? `${siteURL}/og-square.jpg` } />

    {/* Canonical */}
    <link rel='canonical' href={siteURL} />

    {/* Favicons */}
    <link rel='icon' href='/favicon.ico' />

    {/* Open Graph / Facebook */}
    <meta property='og:type' content='website' />
    <meta property='og:url' content={siteURL} />
    <meta property='og:type' content='article' />
    <meta property='og:site_name' content={ title ?? DEFAULTS.title } />
    <meta property='og:title' content={ title ?? DEFAULTS.title } />
    <meta property='og:description' content={ description ?? DEFAULTS.description } />
    <meta property='og:image' content={ image?.og.image ?? `${siteURL}/og-image.jpg` } />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='630' />
    <meta property='og:image:alt' content={image?.alt ?? DEFAULTS.title} />
    <meta property='og:image' content={image?.og.square ?? `${siteURL}/og-square.jpg`} />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='1200' />

    {/* Twitter */}
    <meta name='twitter:title' content={ title ?? DEFAULTS.title } />
    <meta name='twitter:description' content={ description ?? DEFAULTS.description } />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:creator' content='diragb' />
    <meta name='twitter:image' content={ image?.twitterImage ?? `${siteURL}/twitter-image.jpg` } />
    <meta name='twitter:image:alt' content={ title ?? DEFAULTS.title } />

    {/* JSON-LD Structured Data */}
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: title ?? DEFAULTS.title,
            alternateName: 'diragb',
            url: siteURL,
            jobTitle: 'Senior Frontend Engineer',
            description: description ?? DEFAULTS.description,
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'Guru Gobind Singh Indraprastha University (IPU)',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'New Delhi',
                addressCountry: 'India'
              }
            },
            knowsAbout: [
              'Fullstack Development',
              'React',
              'Next.js',
              'TypeScript',
              'JavaScript',
              'Web Development',
              'Software Engineering',
            ],
            sameAs: [
              'https://github.com/diragb',
              'https://diragb.dev',
              'https://x.com/diragb',
              'https://www.linkedin.com/in/diragb',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'professional',
              url: siteURL
            }
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: title ?? DEFAULTS.title,
            url: siteURL,
            description: description ?? DEFAULTS.description,
            author: {
              '@type': 'Person',
              name: title ?? DEFAULTS.title,
              url: 'https://diragb.dev'
            },
            inLanguage: 'en-US',
            isAccessibleForFree: true,
            license: 'https://creativecommons.org/licenses/by/4.0/'
          }
        ]),
      }}
    />
  </Head>
)

// Exports:
export default CustomHead
