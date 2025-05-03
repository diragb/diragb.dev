// Packages:
import React from 'react'

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
    square: string
    rectangle: string
  }
}) => (
  <Head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='theme-color' content='#E11D48' />
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
    <meta name='description' content={ description ?? 'hi, i\'m dirag. senior frontend engineer at binaryveda, cse undergrad @ ipu. learn more about me.' } />
    <meta name='image' content={ image?.square ?? 'https://diragb.dev/square-cover.png' } />
    <meta property='og:url' content='https://diragb.dev' />
    <meta property='og:type' content='article' />
    <meta property='og:title' content={ title ?? 'Dirag Biswas' } />
    <meta property='og:description' content={ description ?? 'hi, i\'m dirag. senior frontend engineer at binaryveda, cse undergrad @ ipu. learn more about me.' } />
    <meta property='og:image' content={ image?.square ?? 'https://diragb.dev/square-cover.png' } />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:creator' content='diragb' />
    <meta name='twitter:title' content={ title ?? 'Dirag Biswas' } />
    <meta name='twitter:description' content={ description ?? 'hi, i\'m dirag. senior frontend engineer at binaryveda, cse undergrad @ ipu. learn more about me.' } />
    <meta name='twitter:image' content={ image?.rectangle ?? 'https://diragb.dev/rect-cover.png' } />
    <meta name='twitter:image:alt' content={ title ?? 'Dirag Biswas' } />
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
    <title>{ title ?? 'Dirag Biswas' }</title>
  </Head>
)

// Exports:
export default CustomHead
