import { Html, Head, Main, NextScript } from 'next/document'

// Page-specific legacy scripts are loaded by the pages that need them (see src/lib/load-scripts.js).
export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
