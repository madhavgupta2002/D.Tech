import '@/styles/styles.css'
import '@/styles/globals.css'
import Script from 'next/script'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />

      <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-V1LK36Z65D`}
      />

      <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-V1LK36Z65D');
          `}
      </Script>


    </>
  )
  
}
