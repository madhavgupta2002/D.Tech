import '@/styles/styles.css'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-V1LK36Z65D"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments)}
        gtag('js', new Date());

        gtag('config', 'G-V1LK36Z65D');
      </script>
    </>
  )
  
}
