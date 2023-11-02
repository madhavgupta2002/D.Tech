import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />

        <script async src="/js/script.js"></script>
        <script async src="/js/names.js"></script>
        <script async src="/js/student.js"></script>
        <script async src="/js/dates.js"></script>
        <script async src="/js/timings.js"></script>

      </body>
    </Html>
  )
}
