// Copies parsed PYQ transcriptions into public/pyq-typed/<CODE>.json and writes a small index
// used by the PYQ viewer to know which subjects have a typed version.
// Usage: node scripts/build-typed-notes.mjs <transcriptions-dir>
//   Each subject folder needs parsed/grouped.json (repeats merged, AI answers filled) or, failing that,
//   parsed/transcription.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const src = process.argv[2];
if (!src) {
  console.error('Usage: node scripts/build-typed-notes.mjs <transcriptions-dir>');
  process.exit(1);
}
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'pyq-typed');
fs.mkdirSync(outDir, { recursive: true });
// Start clean so subjects removed from the source are no longer served.
for (const f of fs.readdirSync(outDir)) if (f.endsWith('.json')) fs.rmSync(path.join(outDir, f));

const index = {};
for (const code of fs.readdirSync(src).sort()) {
  const grouped = path.join(src, code, 'parsed', 'grouped.json');
  const plain = path.join(src, code, 'parsed', 'transcription.json');
  const file = fs.existsSync(grouped) ? grouped : plain;
  if (!fs.existsSync(file)) continue;
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
  // Optional syllabus units: <dir>/_work/units/<CODE>.json maps group keys to unit numbers.
  const unitsFile = path.join(src, '_work', 'units', `${code}.json`);
  const unitData = fs.existsSync(unitsFile) ? JSON.parse(fs.readFileSync(unitsFile, 'utf8')) : null;
  const questions = doc.questions.map((q) => ({
    unit: unitData ? unitData.assign[q.group_key] ?? 0 : null,
    // Study order inside the unit (syllabus topic order, then basics before harder concepts) and its topic label.
    order: unitData?.order?.[q.group_key] ?? null,
    topic: unitData?.topic?.[q.group_key] ?? null,
    id: q.id,
    number: q.number,
    year: q.year,
    exam: q.exam,
    session: q.session,
    marks: q.marks,
    question: q.question,
    question_variants: q.question_variants ?? (q.question ? [q.question] : []),
    answer: q.answer,
    answer_source: q.answer_source ?? (q.answer ? 'original' : null),
    pages: q.pages,
    sources: (q.sources ?? []).map(({ number, year, exam, session, marks, pages }) => ({ number, year, exam, session, marks, pages })),
  }));
  fs.writeFileSync(
    path.join(outDir, `${code}.json`),
    JSON.stringify({
      subject_code: doc.subject_code,
      subject_name: doc.subject_name,
      syllabus: unitData ? { name: unitData.syllabus, source: unitData.source } : null,
      units: unitData ? unitData.units : [],
      questions,
    }),
  );
  index[code] = { questions: questions.length, ai: questions.filter((q) => q.answer_source === 'ai_generated').length };
}

const indexFile = path.join(root, 'src', 'apps', 'pyq', 'lib', 'typed-index.json');
fs.writeFileSync(indexFile, JSON.stringify(index, null, 2) + '\n');
console.log(`Wrote ${Object.keys(index).length} subjects to ${outDir}`);
