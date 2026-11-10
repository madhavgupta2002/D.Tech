import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { loadScripts } from '@/lib/load-scripts'

// Legacy vanilla scripts (public/js) fill the element IDs below; keep them stable.
const SCRIPTS = ['https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js', '/js/result.js', '/js/ResultScript.js']

const SEMS = [1, 2, 3, 4, 5, 6, 7]

function Stat({ id, label, highlight }) {
  return (
    <div id={`${id}Div`} className="data-div rounded-lg border bg-card p-4">
      <p className="label font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</p>
      <p id={id} className={`dynamic-content mt-1 min-h-[1.75rem] break-words font-semibold ${highlight ? 'text-2xl tracking-tight text-primary' : 'text-lg tracking-tight'}`} />
    </div>
  )
}

export default function Result() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    loadScripts(SCRIPTS)
      .then(() => {
        if (!active) return
        window.initResult()
        setReady(true)
      })
      .catch((e) => console.error(e))
    return () => { active = false }
  }, [])

  const { resolvedTheme } = useTheme()
  useEffect(() => {
    // Wait a frame so the .dark class (and CSS variables) are applied before re-reading colours.
    if (ready) requestAnimationFrame(() => window.refreshResultChart?.())
  }, [resolvedTheme, ready])

  return (
    <>
      <Head>
        <title>D.Tech CGPA</title>
        <meta name="description" content="View and compare your DTU CGPA with other students." />
      </Head>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-10">
        <header>
          <h1 className="text-3xl font-bold tracking-tight">Result Analysis</h1>
          <p className="mt-2 text-muted-foreground">See your semester GPAs, CGPA and rank in your branch.</p>
        </header>

        <section className="rounded-lg border bg-card p-5">
          <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1">
              <label htmlFor="inputBox" className="mb-1.5 block text-sm font-medium">Roll number</label>
              <input
                type="text"
                id="inputBox"
                autoComplete="off"
                placeholder="e.g. 2K21/CO/262"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <Button id="submit" type="button" disabled={!ready}>Show</Button>
          </form>
        </section>

        <section id="main-result-content" className="html-content space-y-6" aria-labelledby="p2">
          <h2 id="p2" className="text-xl font-semibold">Result</h2>
          <div id="result-data" className="space-y-4">
            <div className="row grid gap-4 sm:grid-cols-2">
              <Stat id="name" label="Name" />
              <Stat id="rollNo" label="Roll No" />
            </div>
            <div className="row grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
              {SEMS.map((n) => <Stat key={n} id={`sem${n}GPA`} label={`Sem ${n} GPA`} />)}
            </div>
            <div className="row grid gap-4 sm:grid-cols-3">
              <Stat id="gpa" label="CGPA" highlight />
              <Stat id="rank1" label="Branch rank" highlight />
              <Stat id="rank2" label="College rank" highlight />
            </div>
            <div className="row grid gap-4 sm:grid-cols-2">
              <Stat id="projGPA" label="Projected best CGPA (10 in remaining sems)" />
              <Stat id="projRank" label="Projected best dept. rank (10 in remaining sems)" />
            </div>
          </div>
          <div id="graph" className="rounded-lg border bg-card p-4">
            <div className="relative h-64 sm:h-80">
              <canvas id="myChart" role="img" aria-label="Line chart of GPA per semester" />
            </div>
          </div>
        </section>

        <aside className="rounded-lg border bg-muted/50 p-5 text-sm text-muted-foreground">
          <p className="mb-2 font-semibold text-foreground">Disclaimer</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Only for 2K21 B.Tech students.</li>
            <li>Data is taken from the main result files, so later updates are not reflected.</li>
            <li>Results of students who failed a subject may not be visible for the same reason.</li>
            <li>Department ranks are a rough guide; contact your HOD for official data.</li>
          </ul>
        </aside>
      </div>
    </>
  )
}
