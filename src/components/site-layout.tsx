import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { GoogleAnalytics } from '@/components/google-analytics';
import { fontClasses } from '@/lib/fonts';

// Shared <html>/<body> shell for App Router route groups: theme, header and analytics.
export function SiteLayout({ children, gaId }: { children: React.ReactNode; gaId: string }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontClasses}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SiteHeader />
          {children}
        </ThemeProvider>
        <GoogleAnalytics GA_MEASUREMENT_ID={gaId} />
      </body>
    </html>
  );
}
