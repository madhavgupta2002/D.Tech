"use client";

import { memo, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { createPortal, flushSync } from "react-dom";
import { Loader2, Printer, Search } from "lucide-react";
import { Markdown } from "@/apps/pyq/components/markdown";
import { typedNotesUrl } from "@/apps/pyq/lib/typed";
import { PrintSheet } from "@/apps/pyq/components/print-sheet";
import {
  NO_YEAR,
  OTHER_UNIT,
  marksLabel,
  questionVariants,
  questionYears,
  sourceLabels,
  unitHeading,
} from "@/apps/pyq/lib/typed-format";
import type { TypedDoc, TypedQuestion, TypedUnit } from "@/apps/pyq/lib/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 40;

// Fetched subjects, kept for the session so toggling PDF <-> Typed notes doesn't re-download them.
const docCache = new Map<string, TypedDoc>();

interface TypedNotesProps {
  code: string;
  name: string;
}

// "Exam sheet" layout: margin number, serif question, marks on the right, paper line below,
// answer indented under a rule (violet, unlabelled, when the answer was written for the site).
// Memoised: rendering Markdown + KaTeX is the expensive part, and q objects are stable per subject.
const QuestionItem = memo(function QuestionItem({ q, index }: { q: TypedQuestion; index: number }) {
  const labels = sourceLabels(q);
  const variants = questionVariants(q);
  const marks = marksLabel(q.marks);
  const isAi = q.answer_source === "ai_generated";
  return (
    <section className="typed-question border-b py-5 print:py-4">
      <div className="typed-question-head grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-baseline gap-x-2">
        <span className="font-serif text-[15px] font-bold text-primary">Q{index}.</span>
        <div className="min-w-0">
          {variants.length ? (
            variants.map((v, i) => (
              <div key={i}>
                {i > 0 && (
                  <div className="my-2 flex items-center gap-3 text-xs font-bold tracking-widest text-primary" aria-label="or">
                    <span className="h-px flex-1 bg-border" />
                    OR
                    <span className="h-px flex-1 bg-border" />
                  </div>
                )}
                <Markdown text={v} className="font-serif text-[15px] font-medium leading-relaxed" />
              </div>
            ))
          ) : (
            <p className="text-sm italic text-muted-foreground">Question text not present in the source.</p>
          )}
        </div>
        <span className="whitespace-nowrap font-mono text-xs font-semibold text-muted-foreground">
          {marks ? `[${marks}]` : ""}
        </span>
        {labels.length > 0 && (
          <p className="col-start-2 mt-1.5 text-[11px] uppercase tracking-wider text-muted-foreground">
            {labels.join(" · ")}
          </p>
        )}
      </div>
      <div
        className={cn(
          "ml-[3rem] mt-3 border-l-[3px] pl-3.5 print:ml-[2.5rem]",
          isAi ? "border-violet-500/70" : "border-foreground/15"
        )}
      >
        {q.answer ? (
          <Markdown text={q.answer} />
        ) : (
          <p className="text-sm italic text-muted-foreground">No answer in the source.</p>
        )}
      </div>
    </section>
  );
});

// Questions arrive sorted by unit; a divider starts each unit. Numbering runs across the whole list.
function QuestionList({
  questions,
  units,
  unitCounts,
}: {
  questions: TypedQuestion[];
  units: TypedUnit[];
  unitCounts: Map<number, number>;
}) {
  const showUnits = units.length > 0;
  return (
    <div>
      {questions.map((q, i) => {
        const unit = q.unit ?? OTHER_UNIT;
        const startsUnit = showUnits && (i === 0 || (questions[i - 1].unit ?? OTHER_UNIT) !== unit);
        const heading = startsUnit ? unitHeading(unit, units) : null;
        const count = unitCounts.get(unit) ?? 0;
        return (
          <div key={q.id}>
            {heading && (
              <div
                className={cn(
                  "typed-unit-title mb-1 flex items-baseline gap-3 border-b-2 border-primary pb-1.5",
                  i === 0 ? "pt-0" : "pt-6"
                )}
              >
                <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-primary">{heading.label}</span>
                <h2 className="min-w-0 font-serif text-lg font-semibold leading-snug">{heading.title}</h2>
                <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                  {count} {count === 1 ? "question" : "questions"}
                </span>
              </div>
            )}
            <QuestionItem q={q} index={i + 1} />
          </div>
        );
      })}
    </div>
  );
}

const SELECT_CLASS =
  "h-9 min-w-0 rounded-md border border-input bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function TypedNotes({ code, name }: TypedNotesProps) {
  // TypedNotes is keyed by subject code in the page, so all state below starts fresh for each subject.
  const [doc, setDoc] = useState<TypedDoc | null>(() => docCache.get(code) ?? null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [year, setYear] = useState("");
  const [aiOnly, setAiOnly] = useState<"" | "original" | "ai">("");
  const [unitFilter, setUnitFilter] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  // While true, the full filtered set is rendered into a print-only layer (portalled to <body>).
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    if (docCache.has(code)) return;
    let cancelled = false;
    fetch(typedNotesUrl(code))
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<TypedDoc>;
      })
      .then((d) => {
        docCache.set(code, d);
        if (!cancelled) setDoc(d);
      })
      .catch(() => !cancelled && setError("Could not load the typed version."));
    return () => {
      cancelled = true;
    };
  }, [code]);

  useEffect(() => setLimit(PAGE_SIZE), [deferredQuery, year, aiOnly, unitFilter]);

  // Mount the print layer synchronously so it is laid out before the browser snapshots the page. Works for the
  // Print button and for the browser's own print command (Cmd/Ctrl+P, menu), both of which fire beforeprint.
  const startPrint = useCallback(() => {
    if (!docCache.has(code)) return; // nothing loaded yet: let the browser print the page as-is
    flushSync(() => setPrinting(true));
    document.body.classList.add("typed-printing");
  }, [code]);
  const endPrint = useCallback(() => {
    document.body.classList.remove("typed-printing");
    setPrinting(false);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeprint", startPrint);
    window.addEventListener("afterprint", endPrint);
    return () => {
      window.removeEventListener("beforeprint", startPrint);
      window.removeEventListener("afterprint", endPrint);
      document.body.classList.remove("typed-printing");
    };
  }, [startPrint, endPrint]);

  const handlePrint = () => {
    startPrint();
    window.print();
    // Only browsers without print events need manual cleanup; they block inside print() until the dialog closes.
    if (!("onafterprint" in window)) endPrint();
  };

  const aiCount = useMemo(() => (doc ? doc.questions.filter((q) => q.answer_source === "ai_generated").length : 0), [doc]);

  const years = useMemo(() => {
    if (!doc) return [];
    const set = new Set(doc.questions.flatMap(questionYears));
    return Array.from(set).sort((a, b) => (a === NO_YEAR ? 1 : b === NO_YEAR ? -1 : Number(b) - Number(a)));
  }, [doc]);

  const filtered = useMemo(() => {
    if (!doc) return [];
    const needle = deferredQuery.trim().toLowerCase();
    const rank = (q: TypedQuestion) => (q.unit == null ? 0 : q.unit === OTHER_UNIT ? Number.MAX_SAFE_INTEGER : q.unit);
    const byUnit = doc.units?.length
      ? doc.questions
          .map((q, i) => ({ q, i }))
          // Unit first, then the syllabus topic/concept order, then source order as a tie-breaker.
          .sort(
            (a, b) =>
              rank(a.q) - rank(b.q) ||
              (a.q.order ?? Number.MAX_SAFE_INTEGER) - (b.q.order ?? Number.MAX_SAFE_INTEGER) ||
              a.i - b.i
          )
          .map(({ q }) => q)
      : doc.questions;
    return byUnit.filter((q) => {
      if (unitFilter && String(q.unit ?? OTHER_UNIT) !== unitFilter) return false;
      if (year && !questionYears(q).includes(year)) return false;
      if (aiOnly === "original" && q.answer_source === "ai_generated") return false;
      if (aiOnly === "ai" && q.answer_source !== "ai_generated") return false;
      if (!needle) return true;
      return [q.number, q.question, q.answer].some((t) => t && t.toLowerCase().includes(needle));
    });
  }, [doc, deferredQuery, year, aiOnly, unitFilter]);

  const units = useMemo(() => doc?.units ?? [], [doc]);
  const unitCounts = useMemo(() => {
    const m = new Map<number, number>();
    for (const q of filtered) m.set(q.unit ?? OTHER_UNIT, (m.get(q.unit ?? OTHER_UNIT) ?? 0) + 1);
    return m;
  }, [filtered]);
  const hasOther = useMemo(() => (doc ? doc.questions.some((q) => q.unit === OTHER_UNIT) : false), [doc]);

  const visible = useMemo(() => filtered.slice(0, limit), [filtered, limit]);

  const filterSummary = [
    unitFilter && (unitFilter === String(OTHER_UNIT) ? "Other questions" : `Unit ${unitFilter}`),
    year && `Year: ${year === NO_YEAR ? "not stated" : year}`,
    aiOnly === "original" && "Answers from the notes only",
    aiOnly === "ai" && "AI-generated answers only",
    query && `Search: “${query}”`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-0 basis-full">
            <label htmlFor="typed-search" className="sr-only">
              Search questions and answers
            </label>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <input
              id="typed-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions and answers..."
              className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
          {units.length > 0 && (
            <>
              <label htmlFor="typed-unit" className="sr-only">
                Filter by syllabus unit
              </label>
              <select
                id="typed-unit"
                value={unitFilter}
                onChange={(e) => setUnitFilter(e.target.value)}
                className={cn(SELECT_CLASS, "max-w-[14rem]")}
              >
                <option value="">All units</option>
                {units.map((u) => (
                  <option key={u.unit} value={String(u.unit)}>
                    Unit {u.unit} · {u.title}
                  </option>
                ))}
                {hasOther && <option value={String(OTHER_UNIT)}>Other questions</option>}
              </select>
            </>
          )}
          <label htmlFor="typed-year" className="sr-only">
            Filter by year
          </label>
          <select id="typed-year" value={year} onChange={(e) => setYear(e.target.value)} className={SELECT_CLASS}>
            <option value="">All years</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y === NO_YEAR ? "Year not stated" : y}
              </option>
            ))}
          </select>
          {aiCount > 0 && (
            <>
              <label htmlFor="typed-src" className="sr-only">
                Filter by answer source
              </label>
              <select
                id="typed-src"
                value={aiOnly}
                onChange={(e) => setAiOnly(e.target.value as "" | "original" | "ai")}
                className={SELECT_CLASS}
              >
                <option value="">All answers</option>
                <option value="original">From the notes only</option>
                <option value="ai">AI-generated only ({aiCount})</option>
              </select>
            </>
          )}
          <Button
            size="sm"
            className="ml-auto"
            onClick={handlePrint}
            disabled={!doc || filtered.length === 0 || printing}
            title="Print or save as PDF (prints all questions matching the current filters)"
          >
            {printing ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Printer className="mr-2 h-4 w-4" aria-hidden="true" />
            )}
            Print
          </Button>
        </div>
      </div>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
        {error ? (
          <p className="py-10 text-center text-muted-foreground">{error}</p>
        ) : !doc ? (
          <p className="flex items-center justify-center gap-2 py-10 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Loading typed version…
          </p>
        ) : filtered.length === 0 ? (
          <p className="py-10 text-center text-muted-foreground">No questions match these filters.</p>
        ) : (
          <div className="space-y-6">
            <QuestionList questions={visible} units={units} unitCounts={unitCounts} />
            {filtered.length > visible.length && (
              <div className="flex justify-center pb-2">
                <Button variant="secondary" size="sm" onClick={() => setLimit((l) => l + PAGE_SIZE)}>
                  Show more ({filtered.length - visible.length} left)
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {printing &&
        doc &&
        createPortal(
          <PrintSheet
            code={code}
            name={name}
            doc={doc}
            questions={filtered}
            unitCounts={unitCounts}
            filterSummary={filterSummary}
          />,
          document.body
        )}
    </div>
  );
}
