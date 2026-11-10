// Single Markdown + KaTeX configuration for typed PYQ notes. Used by the site renderer
// (src/apps/pyq/components/markdown.tsx) and by scripts/check-typed-notes.mjs, so the check renders exactly
// what the site renders. Raw HTML is not enabled (no rehype-raw), so transcribed text cannot inject markup.
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import rehypeKatex from 'rehype-katex';

/** @type {import('react-markdown').Options['remarkPlugins']} */
export const remarkPlugins = [remarkGfm, remarkMath, remarkBreaks];
/** @type {import('react-markdown').Options['rehypePlugins']} */
export const rehypePlugins = [[rehypeKatex, { throwOnError: false, strict: false }]];
