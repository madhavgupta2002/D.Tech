// Prepares transcribed Markdown for remark-math + KaTeX. Shared by the site renderer
// (src/apps/pyq/components/markdown.tsx) and scripts/check-typed-notes.mjs.
//
// 1. \(...\) becomes $...$; \[...\] becomes a $$...$$ block only when it sits on its own lines, so escaped
//    literal brackets inside a sentence or a table row (e.g. arr\[i\]) are left alone.
// 2. Inside math, an escaped dollar (\$, e.g. the end-marker in FOLLOW sets) would be read by
//    remark-math as the closing delimiter, so it is rewritten to KaTeX's \char36.
// Code blocks and inline code are left untouched.

const CODE = /(```[\s\S]*?```|`[^`\n]*`)/g;

function fixDollarsInMath(text) {
  let out = '';
  let mode = null; // null | 'inline' | 'display'
  for (let i = 0; i < text.length; ) {
    if (text.startsWith('\\$', i)) {
      out += mode ? '\\char36 ' : '\\$';
      i += 2;
    } else if (text.startsWith('$$', i)) {
      if (mode === 'inline') {
        out += '$';
        mode = null;
        i += 1;
      } else {
        out += '$$';
        mode = mode === 'display' ? null : 'display';
        i += 2;
      }
    } else if (text[i] === '$') {
      if (mode === 'display') out += '\\char36 ';
      else {
        out += '$';
        mode = mode === 'inline' ? null : 'inline';
      }
      i += 1;
    } else {
      out += text[i];
      i += 1;
    }
  }
  return out;
}

export function normalizeMath(text) {
  return text
    .split(CODE)
    .map((part, i) =>
      i % 2 === 1
        ? part
        : fixDollarsInMath(
            part
              .replace(/^[ \t]*\\\[([\s\S]+?)\\\][ \t]*$/gm, (_m, body) => `$$\n${body.trim()}\n$$`)
              .replace(/\\\(([\s\S]+?)\\\)/g, (_m, body) => `$${body.trim()}$`),
          ),
    )
    .join('');
}
