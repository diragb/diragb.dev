// Packages:
import React from 'react'

// Components:
import Head from 'next/head'

// Functions:
const CustomHead = ({
  title,
  description
}: {
  title?: string
  description?: string
}) => (
  <Head>
    <meta charSet='utf-8' />
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta name='theme-color' content='#E11D48' />
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
    <meta name='description' content={ description ?? 'Hi, I\'m Dirag. I solve problems.' } />
    <meta name='image' content='https://diragb.dev/square-cover.png' />
    <meta property='og:url' content='https://diragb.dev' />
    <meta property='og:type' content='article' />
    <meta property='og:title' content={ title ?? 'Dirag Biswas' } />
    <meta property='og:description' content={ description ?? 'Hi, I\'m Dirag. I solve problems.' } />
    <meta property='og:image' content='https://diragb.dev/square-cover.png' />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:creator' content='themandirproject.com' />
    <meta name='twitter:title' content={ title ?? 'Dirag Biswas' } />
    <meta name='twitter:description' content={ description ?? 'Hi, I\'m Dirag. I solve problems.' } />
    <meta name='twitter:image' content='https://diragb.dev/rect-cover.png' />
    <meta name='twitter:image:alt' content={ title ?? 'Dirag Biswas' } />
    <link rel='preconnect' href='https://fonts.googleapis.com' />
    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
    <title>{ title ?? 'Dirag Biswas' }</title>
  </Head>
)

// Exports:
export default CustomHead
