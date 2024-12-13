// Packages:
import React from 'react'

// Context:
import { ThemeProvider } from '@/components/theme-provider'

// Components:
import {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document'

// Functions:
const Document = () => (
  <Html lang='en'>
    <Head />
    <body>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <Main />
        <NextScript />
      </ThemeProvider>
    </body>
  </Html>
)

// Exports:
export default Document
