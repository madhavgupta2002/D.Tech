import '@/styles/app.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GoogleAnalytics } from '@/components/google-analytics'

const inter = Inter({ subsets: ['latin'] })

// Pages Router shell; mirrors src/components/site-layout.tsx used by App Router routes.
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className={`${inter.className} flex min-h-screen flex-col bg-background text-foreground`}>
        <div className="print:hidden">
          <SiteHeader />
        </div>
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <SiteFooter />
      </div>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-V1LK36Z65D" />
    </ThemeProvider>
  )
}
