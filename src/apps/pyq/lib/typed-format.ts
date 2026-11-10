// Display helpers shared by the on-screen typed notes and the print sheet.
import type { TypedQuestion, TypedSource, TypedUnit } from "@/apps/pyq/lib/types";

export const NO_YEAR = "none";
export const OTHER_UNIT = 0;

// Source labels in the data are inconsistent ("M", "Mid Term", "E (old)"); show one wording.
export function normalizeExam(exam: string | null): string | null {
  if (!exam) return null;
  const e = exam.trim();
  if (/^(m|mid|mid[\s-]?(sem(ester)?|term)(\s+examination)?)$/i.test(e)) return "Mid Sem";
  if (/^(e|es|end[\s-]?(sem(ester)?|term))$/i.test(e)) return "End Sem";
  const endNote = e.match(/^e\s*\((.+)\)$/i);
  if (endNote) return `End Sem (${endNote[1]})`;
  if (/^(s|supp|supplementary)$/i.test(e)) return "Supplementary";
  if (/^(se|s\s*[|/]\s*e|supplementary end sem(ester)?)$/i.test(e)) return "Supplementary End Sem";
  if (/^sm$/i.test(e)) return "Supplementary Mid Sem";
  if (/^(g|gate)$/i.test(e)) return "GATE";
  return e;
}

function sourceLabel(s: TypedSource): string | null {
  const year = s.year != null ? String(s.year) : null;
  // Drop sessions that only repeat the year/exam code (e.g. "2018E").
  const session = s.session && !/^\s*\d{4}\s*[a-z]{0,2}\s*$/i.test(s.session) && s.session !== year ? s.session : null;
  const bits = [year, normalizeExam(s.exam), session].filter(Boolean);
  return bits.length ? bits.join(" · ") : null;
}

export function sourceLabels(q: TypedQuestion): string[] {
  const list = q.sources?.length ? q.sources : [q];
  return Array.from(new Set(list.map(sourceLabel).filter((l): l is string => Boolean(l))));
}

export function questionYears(q: TypedQuestion): string[] {
  const years = (q.sources?.length ? q.sources : [q]).map((s) => (s.year != null ? String(s.year) : NO_YEAR));
  return Array.from(new Set(years));
}

// The notes often end a question with its paper tag ("... anywhere. 2018 M"); the source line already shows it.
// Only clear tags are removed: bracketed "(2019 E)", year + exam code "2018 M" / "2023M", or a bare year
// right after sentence-ending punctuation. "since 2019" stays.
function stripTrailingYearTag(text: string, years: string[]): string {
  if (!years.length) return text;
  const y = `(?:${years.join("|")})`;
  const code = "(?:[A-Z]{1,3}|[Mm]id\\w*|[Ee]nd\\w*|[Ss]upp\\w*)";
  const patterns = [
    new RegExp(`\\s*[\\(\\[]\\s*${y}\\s*${code}?\\s*[\\)\\]]\\s*\\.?\\s*$`),
    new RegExp(`\\s+${y}\\s*${code}\\s*\\.?\\s*$`),
    new RegExp(`([.?!:])\\s*${y}\\s*$`),
  ];
  let out = text;
  for (const re of patterns) out = out.replace(re, (_m, punct) => (typeof punct === "string" ? punct : ""));
  out = out.trimEnd();
  return out || text;
}

// The question's wordings (several when the same question was asked differently), paper tags removed.
export function questionVariants(q: TypedQuestion): string[] {
  const years = questionYears(q).filter((y) => y !== NO_YEAR);
  const raw = q.question_variants?.length ? q.question_variants : q.question ? [q.question] : [];
  return raw.map((v) => stripTrailingYearTag(v, years));
}

// Marks arrive as "5", "(4)", "[2]" or "2X3=06"; show them bare inside one pair of brackets.
export function marksLabel(marks: string | null): string | null {
  const m = (marks ?? "").replace(/^[\s([]+|[\s)\]]+$/g, "").replace(/\s*marks?$/i, "").trim();
  return m || null;
}

export function unitHeading(unit: number, units: TypedUnit[]): { label: string; title: string } {
  if (unit === OTHER_UNIT) return { label: "Other", title: "Questions outside the syllabus units" };
  return { label: `Unit ${unit}`, title: units.find((u) => u.unit === unit)?.title ?? "" };
}
