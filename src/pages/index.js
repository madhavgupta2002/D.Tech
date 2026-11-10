import Head from 'next/head'
import Link from 'next/link'
import {
  BarChart3, BookOpen, BriefcaseBusiness, CalendarDays, CalendarClock, FileText,
  GraduationCap, NotebookPen, PieChart, ScrollText, ArrowUpRight,
} from 'lucide-react'

// kind: 'internal' -> next/link, 'static' -> full page load (public/), 'external' -> new tab
const TOOLS = [
  { title: 'Subject Analysis', description: 'Explore subjects, credits and grading trends.', href: '/subject-analysis/index.html', kind: 'static', icon: PieChart },
  { title: 'B.Tech Breakdown', description: 'Course structure for every semester at a glance.', href: 'https://drive.google.com/file/d/1oSqkmZ7rm2rhgYIwzL_0X5srzW0DxCz4/view?usp=drive_link', kind: 'external', icon: GraduationCap },
  { title: 'Time Table Generator', description: 'Build your weekly class timetable.', href: '/timetable', kind: 'internal', icon: CalendarClock },
  { title: 'Placement Stats', description: 'Company-wise placement and package data.', href: 'https://dtu-tnp.vercel.app/', kind: 'external', icon: BriefcaseBusiness },
  { title: 'DateSheet Generator', description: 'Your personal exam datesheet from your roll number.', href: '/datesheet', kind: 'internal', icon: CalendarDays },
  { title: 'Result Analysis', description: 'Semester GPAs, CGPA and branch rank.', href: '/result', kind: 'internal', icon: BarChart3 },
  { title: 'Question Papers', description: 'Previous year end-sem and mid-sem papers.', href: 'https://drive.google.com/drive/folders/1qPI0QfHpfyK3UhsDhbsChGBLATmc7N1e?usp=drive_link', kind: 'external', icon: FileText },
  { title: 'PYQ Solutions', description: 'Browse and read solved previous year questions.', href: '/pyq', kind: 'internal', icon: BookOpen },
  { title: 'MOOC Practice', description: 'Practice quizzes for SWAYAM / NPTEL courses.', href: 'https://swayam-quiz.vercel.app/', kind: 'external', icon: NotebookPen },
  { title: 'Internship Training Diary', description: 'Template for the internship training diary.', href: 'https://drive.google.com/file/d/1w5b1Pa4UN9y1WbsbFsKpHny0ouu_jO8F/view?usp=drive_link', kind: 'external', icon: ScrollText },
]

// A ruled directory rather than floating cards: cells share hairline borders.
const cellClass =
  'group flex h-full flex-col gap-1.5 bg-white p-5 dark:bg-card transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'

function ToolCard({ tool, index }) {
  const Icon = tool.icon
  const body = (
    <>
      <span className="flex items-center justify-between text-muted-foreground">
        <span className="font-mono text-xs">{String(index + 1).padStart(2, '0')}</span>
        {tool.kind === 'external' ? (
          <ArrowUpRight className="h-4 w-4 transition-colors group-hover:text-primary" aria-label="(opens in new tab)" />
        ) : (
          <Icon className="h-4 w-4 transition-colors group-hover:text-primary" aria-hidden="true" />
        )}
      </span>
      <span className="mt-3 font-semibold tracking-tight">{tool.title}</span>
      <span className="text-sm text-muted-foreground">{tool.description}</span>
    </>
  )
  if (tool.kind === 'internal') return <Link href={tool.href} className={cellClass}>{body}</Link>
  if (tool.kind === 'static') return <a href={tool.href} className={cellClass}>{body}</a>
  return <a href={tool.href} target="_blank" rel="noopener noreferrer" className={cellClass}>{body}</a>
}

export default function Home() {
  return (
    <>
      <Head>
        <title>D.Tech – Tools for DTU students</title>
        <meta name="description" content="Datesheets, results, timetables, question papers and more for Delhi Technological University students." />
      </Head>

      <div className="home-white">
      <div className="wood-surface">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-14 sm:pt-20">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Delhi Technological University
        </p>
        <h1 className="mt-3 text-5xl font-bold tracking-tighter sm:text-6xl">
          D<span className="text-primary">.</span>Tech
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          Every tool you need through the semester — datesheets, results, timetables, question papers and more.
        </p>
      </section>

      </div>

      {/* Light mode: everything below the hero sits on pure white so the campus image's white sky blends in. */}
      <section className="mx-auto max-w-7xl px-4 pb-12" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="sr-only">Tools</h2>
        <ul className="grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool, i) => (
            <li key={tool.title} className="bg-white dark:bg-card"><ToolCard tool={tool} index={i} /></li>
          ))}
          {/* Fill the last row so the ruled grid has no hole. */}
          {Array.from({ length: (3 - (TOOLS.length % 3)) % 3 }).map((_, i) => (
            <li key={`pad-${i}`} aria-hidden="true" className="hidden bg-white dark:bg-card lg:block" />
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <img
          src="/assets/img/bg.png"
          alt="Illustration of the Delhi Technological University campus"
          className="w-full object-cover dark:rounded-lg dark:border"
          loading="lazy"
        />
      </section>
      </div>
    </>
  )
}
