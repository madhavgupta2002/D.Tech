import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Printer, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { loadScripts } from '@/lib/load-scripts'

// Legacy vanilla scripts (public/js) query the element IDs below; keep them stable.
const SCRIPTS = [
  '/js/2024_Odd_End/names_2024_End.js',
  '/js/2024_Odd_End/student_2024_End.js',
  '/js/2024_Odd_End/dates_2024_End.js',
  '/js/result.js',
  '/js/DateSheetScript.js',
]

const inputClass =
  'h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
const labelClass = 'mb-1.5 block text-sm font-medium'
const tableClass =
  'w-full min-w-[560px] border-collapse text-sm [&_th]:border-b [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border-b [&_td]:px-3 [&_td]:py-2 [&_td]:align-top print:min-w-0 print:[&_td]:border print:[&_th]:border'

export default function DateSheet() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    loadScripts(SCRIPTS)
      .then(() => {
        if (!active) return
        window.initDateSheet()
        setReady(true)
      })
      .catch((e) => console.error(e))
    return () => { active = false }
  }, [])

  return (
    <>
      <Head>
        <title>DTU Datesheet Generator</title>
        <meta name="description" content="One click solution to automatically generate your B.Tech exam datesheet." />
      </Head>

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-10 print:max-w-none print:p-0">
        <header className="print:hidden">
          <h1 className="text-3xl font-bold tracking-tight">DTU Exam DateSheet Generator</h1>
          <p className="mt-2 text-muted-foreground">Enter your roll number to generate your personal exam schedule.</p>
        </header>

        <section className="rounded-lg border bg-card p-5 shadow-sm print:hidden">
          <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={(e) => e.preventDefault()}>
            <div className="flex-1">
              <label htmlFor="newRoll" className={labelClass}>Roll number</label>
              <input type="text" id="newRoll" className={inputClass} placeholder="e.g. 2K21/CO/262" autoComplete="off" />
            </div>
            <Button id="addRollButton" type="submit" disabled={!ready}>Generate</Button>
          </form>
        </section>

        <section id="main-content" className="html-content rounded-lg border bg-card p-5 shadow-sm print:border-0 print:shadow-none">
          <div className="mb-4 text-center">
            <p id="p2" className="font-semibold">DateSheet for B.Tech Odd End Semester Examination November-December 2024 (2024-25)</p>
            <p id="p1" className="mt-1 text-muted-foreground" />
          </div>
          <div className="overflow-x-auto rounded-md border print:overflow-visible">
            <table id="myTable" className={tableClass}>
              <tbody>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Subject Code</th>
                  <th scope="col">Subject Name</th>
                  <th scope="col">Timings</th>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Generated using <a className="font-medium text-primary underline-offset-4 hover:underline" href="https://bit.ly/DTUexam">DTU Exam DateSheet Generator</a>
          </p>
          <p className="mt-1 text-center text-xs text-muted-foreground">
            <b>Disclaimer:</b> Kindly{' '}
            <a className="font-medium text-primary underline-offset-4 hover:underline" href="http://exam.dtu.ac.in/DateSheet.htm" target="_blank" rel="noopener noreferrer">verify</a>{' '}
            the corresponding dates.
          </p>
          <div className="mt-4 flex justify-center print:hidden">
            <Button id="print" type="button" variant="outline" disabled={!ready}>
              <Printer className="mr-2 h-4 w-4" aria-hidden="true" /> Print
            </Button>
          </div>
        </section>

        <details className="group rounded-lg border bg-card shadow-sm print:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-medium">
            Add additional subjects (optional)
            <Plus className="h-4 w-4 transition-transform group-open:rotate-45" aria-hidden="true" />
          </summary>
          <form id="add_col" className="grid gap-4 border-t p-5 sm:grid-cols-3" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="newDate" className={labelClass}>Date</label>
              <input type="date" id="newDate" className={inputClass} />
            </div>
            <div>
              <label htmlFor="newCode" className={labelClass}>Subject code</label>
              <input type="text" id="newCode" className={inputClass} />
            </div>
            <div>
              <label htmlFor="newSubject" className={labelClass}>Subject name</label>
              <input type="text" id="newSubject" className={inputClass} />
            </div>
            <div className="sm:col-span-3">
              <Button id="addRowButton" type="submit" variant="secondary" disabled={!ready}>Add row</Button>
            </div>
          </form>
        </details>
      </div>
    </>
  )
}
