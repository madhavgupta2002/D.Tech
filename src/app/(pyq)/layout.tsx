import '@/apps/pyq/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/apps/pyq/components/theme-provider';
import { GoogleAnalytics } from '@/apps/pyq/components/google-analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DTU Previous Year Questions (PYQ) Solutions',
  description: 'Access and download DTU previous year question solutions by semester and department',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
        <GoogleAnalytics GA_MEASUREMENT_ID="G-08P16MS25G" />
      </body>
    </html>
  );
}