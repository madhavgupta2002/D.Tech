import '@/styles/app.css';
import '@/apps/timetable/timetable.css';
import type { Metadata } from 'next';
import { SiteLayout } from '@/components/site-layout';

export const metadata: Metadata = {
  title: 'DTU Timetable Generator',
};

export default function TimetableLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout gaId="G-S6X2BQQHXE">{children}</SiteLayout>;
}
