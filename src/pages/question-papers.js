import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { loadScripts } from '@/lib/load-scripts'

// public/js/PaperScript.js renders the list into #navigator and loads PDFs into #myIframe.
const SCRIPTS = ['/js/drive.js', '/js/PaperScript.js']

const navClass =
  'max-h-[70vh] overflow-y-auto text-sm [&_h2]:mt-3 [&_h2]:cursor-pointer [&_h2]:rounded-md [&_h2]:bg-muted [&_h2]:px-3 [&_h2]:py-2 [&_h2]:font-semibold first:[&_h2]:mt-0 [&_span]:inline-block [&_span]:rounded [&_span]:px-3 [&_span]:py-1 [&_span]:text-muted-foreground hover:[&_span]:bg-accent hover:[&_span]:text-accent-foreground'

export default function QuestionPapers() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    loadScripts(SCRIPTS)
      .then(() => {
        if (!active) return
        window.initPapers()
        setReady(true)
      })
      .catch((e) => console.error(e))
    return () => { active = false }
  }, [])

  return (
    <>
      <Head>
        <title>DTU Question Papers</title>
        <meta name="description" content="Study from previous year question papers for Delhi Technological University semester exams." />
      </Head>

      <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Question Papers</h1>
            <p className="mt-2 text-muted-foreground">Pick a subject, then a paper to preview it.</p>
          </div>
          <Button id="display" type="button" disabled={!ready}>Semester 5-8 (CO IT SE)</Button>
        </header>

        <div id="main-result-content" className="html-content grid gap-6 md:grid-cols-[320px_1fr]">
          <div id="navigator" className={`rounded-lg border bg-card p-4 shadow-sm ${navClass}`} />
          <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
            <iframe id="myIframe" title="Question paper preview" className="h-[70vh] w-full" />
          </div>
        </div>
      </div>
    </>
  )
}
