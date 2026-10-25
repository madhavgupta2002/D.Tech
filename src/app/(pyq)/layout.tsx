import '@/styles/app.css';
import type { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';

export const metadata: Metadata = {
  title: 'DTU Previous Year Questions (PYQ) Solutions',
  description: 'Access and download DTU previous year question solutions by semester and department',
};

export default function PyqLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout gaId="G-08P16MS25G">{children}</SiteLayout>;
}
