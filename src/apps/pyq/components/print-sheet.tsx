// Print layout for typed notes, modelled on AceDBE's printed question paper (centred header with a meta row,
// bold "Q1." gutter, tinted answer box, small footer), plus what D.Tech has on top: syllabus unit dividers,
// OR between alternative wordings, the papers a question came from, marks, and AI-generated answers (violet box, no label).
// Rendered by TypedNotes into a portal that only exists while printing; styles are the .tp-* rules in app.css.
import { Markdown } from "@/apps/pyq/components/markdown";
import {
  OTHER_UNIT,
  marksLabel,
  questionVariants,
  sourceLabels,
  unitHeading,
} from "@/apps/pyq/lib/typed-format";
import type { TypedDoc, TypedQuestion, TypedUnit } from "@/apps/pyq/lib/types";
import { AUTHOR_LINKEDIN, AUTHOR_NAME, SITE_LABEL, SITE_URL } from "@/lib/credits";

interface PrintSheetProps {
  code: string;
  name: string;
  doc: TypedDoc;
  questions: TypedQuestion[];
  unitCounts: Map<number, number>;
  filterSummary: string;
}

function PrintQuestion({ q, index }: { q: TypedQuestion; index: number }) {
  const variants = questionVariants(q);
  const labels = sourceLabels(q);
  const marks = marksLabel(q.marks);
  const isAi = q.answer_source === "ai_generated";
  return (
    <div className="tp-question">
      <div className="tp-question-header">
        <span className="tp-q-num">Q{index}.</span>
        <div className="tp-q-content">
          {variants.length ? (
            variants.map((v, i) => (
              <div key={i}>
                {i > 0 && <div className="tp-or">OR</div>}
                <Markdown text={v} className="tp-md tp-q-text" />
              </div>
            ))
          ) : (
            <p className="tp-missing">Question text not present in the source.</p>
          )}
          {labels.length > 0 && <div className="tp-sources">{labels.join(" • ")}</div>}
        </div>
        {marks && <span className="tp-marks">[{marks}]</span>}
      </div>
      <div className={isAi ? "tp-answer tp-answer-ai" : "tp-answer"}>
        <div className="tp-answer-label">Answer</div>
        {q.answer ? <Markdown text={q.answer} className="tp-md" /> : <p className="tp-missing">No answer in the source.</p>}
      </div>
    </div>
  );
}

function UnitDivider({ unit, units, count }: { unit: number; units: TypedUnit[]; count: number }) {
  const { label, title } = unitHeading(unit, units);
  return (
    <div className="tp-unit">
      <span className="tp-unit-label">{label}</span>
      <span className="tp-unit-title">{title}</span>
      <span className="tp-unit-count">
        {count} {count === 1 ? "question" : "questions"}
      </span>
    </div>
  );
}

// Page footer in the page margin, on every page, via CSS page-margin boxes (Chrome/Edge 131+; other browsers
// ignore it). The code is the only dynamic part; it is restricted to safe characters before going into CSS.
function pageFooterCss(code: string): string {
  const safe = code.replace(/[^A-Za-z0-9 ._-]/g, "");
  return `@media print { @page {
  @bottom-left { content: "${SITE_LABEL} • Made by ${AUTHOR_NAME}"; font: 8.5px system-ui, sans-serif; color: #777; }
  @bottom-right { content: "${safe} • Page " counter(page) " of " counter(pages); font: 8.5px system-ui, sans-serif; color: #777; }
} }`;
}

// Clickable in "Save as PDF" output; also repeated as plain text in the page footer.
function Credit() {
  return (
    <div className="tp-credit">
      <a href={SITE_URL}>{SITE_LABEL}</a>
      {" · Made by "}
      <a href={AUTHOR_LINKEDIN}>{AUTHOR_NAME} (LinkedIn)</a>
    </div>
  );
}

export function PrintSheet({ code, name, doc, questions, unitCounts, filterSummary }: PrintSheetProps) {
  const units = doc.units ?? [];
  return (
    <div className="typed-print-root tp-root">
      <style>{pageFooterCss(code)}</style>
      <div className="tp-header">
        <h1>{name}</h1>
        <div className="tp-meta">
          <span>
            <strong>Course:</strong> {code}
          </span>
          <span>
            <strong>Total Questions:</strong> {questions.length}
            {questions.length !== doc.questions.length ? ` of ${doc.questions.length}` : ""}
          </span>
          {units.length > 0 && (
            <span>
              <strong>Units:</strong> {units.length}
            </span>
          )}
        </div>
        <div className="tp-subtext">Previous Year Questions &amp; Solutions</div>
        {filterSummary && <div className="tp-subtext">Filters: {filterSummary}</div>}
        <Credit />
      </div>
      {questions.map((q, i) => {
        const unit = q.unit ?? OTHER_UNIT;
        const startsUnit = units.length > 0 && (i === 0 || (questions[i - 1].unit ?? OTHER_UNIT) !== unit);
        return (
          <div key={q.id}>
            {startsUnit && <UnitDivider unit={unit} units={units} count={unitCounts.get(unit) ?? 0} />}
            <PrintQuestion q={q} index={i + 1} />
          </div>
        );
      })}
      <div className="tp-end">
        <Credit />
      </div>
    </div>
  );
}
