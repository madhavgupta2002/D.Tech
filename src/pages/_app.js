import '@/styles/app.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { GoogleAnalytics } from '@/components/google-analytics'
import { fontClasses } from '@/lib/fonts'

// Pages Router shell; mirrors src/components/site-layout.tsx used by App Router routes.
export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <div className={`${fontClasses} flex min-h-screen flex-col text-foreground`}>
        <SiteHeader />
        <main className="flex-1">
          <Component {...pageProps} />
        </main>
        <SiteFooter />
      </div>
      <GoogleAnalytics GA_MEASUREMENT_ID="G-V1LK36Z65D" />
    </ThemeProvider>
  )
}
