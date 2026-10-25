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

const cardClass =
  'group flex h-full items-start gap-4 rounded-lg border bg-card p-5 text-card-foreground shadow-sm transition-colors hover:border-primary/50 hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

function ToolCard({ tool }) {
  const Icon = tool.icon
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 font-semibold">
          {tool.title}
          {tool.kind === 'external' && (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-label="(opens in new tab)" />
          )}
        </span>
        <span className="mt-1 block text-sm text-muted-foreground">{tool.description}</span>
      </span>
    </>
  )
  if (tool.kind === 'internal') return <Link href={tool.href} className={cardClass}>{body}</Link>
  if (tool.kind === 'static') return <a href={tool.href} className={cardClass}>{body}</a>
  return <a href={tool.href} target="_blank" rel="noopener noreferrer" className={cardClass}>{body}</a>
}

export default function Home() {
  return (
    <>
      <Head>
        <title>D.Tech – Tools for DTU students</title>
        <meta name="description" content="Datesheets, results, timetables, question papers and more for Delhi Technological University students." />
      </Head>

      <section className="border-b bg-gradient-to-b from-brand/20 via-brand/5 to-background">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:py-20">
          <p className="mb-3 inline-flex rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            For Delhi Technological University students
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-primary">D.</span>Tech
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Every tool you need through the semester — datesheets, results, timetables, question papers and more.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="sr-only">Tools</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <li key={tool.title}><ToolCard tool={tool} /></li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        <img
          src="/assets/img/bg.png"
          alt="Illustration of the Delhi Technological University campus"
          className="w-full rounded-lg border object-cover"
          loading="lazy"
        />
      </section>
    </>
  )
}
