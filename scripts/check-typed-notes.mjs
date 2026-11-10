// Server-renders every typed PYQ question with the same Markdown + KaTeX pipeline the site uses
// and reports math that KaTeX could not parse. Run from the project root:
//   node scripts/check-typed-notes.mjs
import fs from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';

import { normalizeMath } from '../src/apps/pyq/lib/normalize-math.mjs';
import { rehypePlugins, remarkPlugins } from '../src/apps/pyq/lib/markdown-config.mjs';

const render = (t) =>
  renderToStaticMarkup(
    React.createElement(
      ReactMarkdown,
      { remarkPlugins, rehypePlugins },
      normalizeMath(t),
    ),
  );

const dir = 'public/pyq-typed';
const total = { questions: 0, math: 0, mathErrors: 0, crashes: 0, tables: 0, codeBlocks: 0 };
const warn = console.warn;
console.warn = () => {};
for (const f of fs.readdirSync(dir).sort()) {
  const doc = JSON.parse(fs.readFileSync(`${dir}/${f}`, 'utf8'));
  const s = { questions: doc.questions.length, math: 0, mathErrors: 0 };
  for (const q of doc.questions) {
    // Check what the site renders: every question wording plus the answer.
    for (const t of [...(q.question_variants?.length ? q.question_variants : [q.question]), q.answer]) {
      if (!t) continue;
      try {
        const html = render(t);
        s.math += (html.match(/class="katex"/g) || []).length;
        s.mathErrors += (html.match(/katex-error/g) || []).length;
        total.tables += (html.match(/<table>/g) || []).length;
        total.codeBlocks += (html.match(/<pre>/g) || []).length;
      } catch {
        total.crashes++;
      }
    }
  }
  total.questions += s.questions;
  total.math += s.math;
  total.mathErrors += s.mathErrors;
  console.log(f.padEnd(16), s);
}
console.warn = warn;
console.log('TOTAL', total);
process.exitCode = total.crashes ? 1 : 0;
