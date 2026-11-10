import { AUTHOR_LINKEDIN, AUTHOR_NAME, SITE_LABEL, SITE_URL } from "@/lib/credits";
import { cn } from "@/lib/utils";

// Print-only credit line. Real links, so they stay clickable in "Save as PDF" output.
export function PrintCredit({ className }: { className?: string }) {
  return (
    <p className={cn("print-credit hidden text-center text-[10px] text-neutral-600 print:block", className)}>
      <a href={SITE_URL} className="font-semibold text-neutral-900 underline underline-offset-2">
        {SITE_LABEL}
      </a>
      {" · Made by "}
      <a href={AUTHOR_LINKEDIN} className="font-semibold text-neutral-900 underline underline-offset-2">
        {AUTHOR_NAME} (LinkedIn)
      </a>
    </p>
  );
}
