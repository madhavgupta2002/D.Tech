import { Bug, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t bg-card print:hidden">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Built by{" "}
          <a
            href="https://www.linkedin.com/in/madhavgupta2002/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-foreground underline-offset-4 hover:underline"
          >
            Madhav Gupta <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          {" "}· UI contributions by Mrinal Deb
        </p>
        <a
          href="mailto:madhavgupta_co21a5_07@dtu.ac.in"
          className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
        >
          <Bug className="h-4 w-4" aria-hidden="true" /> Report a bug
        </a>
      </div>
    </footer>
  );
}
