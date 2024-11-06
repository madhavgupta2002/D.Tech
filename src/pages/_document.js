import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />

        <script async src="/js/DateSheetScript.js"></script>
        <script async src="/js/ResultScript.js"></script>
        <script async src="/js/2024_Odd_End/names_2024_End.js"></script>
        <script async src="/js/2024_Odd_End/student_2024_End.js"></script>
        <script async src="/js/2024_Odd_End/dates_2024_End.js"></script>
        <script async src="/js/2024_Odd_End/timings_2024_End.js"></script>
        <script async src="/js/result.js"></script>
        <script async src="/js/chart.js"></script>
        <script async src="/js/PaperScript.js"></script>
        <script async src="/js/drive.js"></script>
        <script async src="https://cdn.jsdelivr.net/npm/chart.js"></script>

      </body>
    </Html>
  )
}
