"use client";

import { memo } from "react";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";
import { normalizeMath } from "@/apps/pyq/lib/normalize-math.mjs";
import { rehypePlugins, remarkPlugins } from "@/apps/pyq/lib/markdown-config.mjs";

// Raw HTML in the source is not rendered (no rehype-raw), so transcribed text cannot inject markup.
export const Markdown = memo(function Markdown({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cn("typed-md", className)}>
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {normalizeMath(text)}
      </ReactMarkdown>
    </div>
  );
});
