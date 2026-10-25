"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

type NavItem = { label: string; href: string; external?: boolean; static?: boolean };

// `static` pages live in public/ and need a full page load; `external` ones are separate sites.
export const NAV_ITEMS: NavItem[] = [
  { label: "DateSheet", href: "/datesheet" },
  { label: "Result", href: "/result" },
  { label: "Timetable", href: "/timetable" },
  { label: "Subject Analysis", href: "/subject-analysis/index.html", static: true },
  { label: "PYQ Solutions", href: "/pyq" },
  { label: "Placement Stats", href: "https://dtu-tnp.vercel.app/", external: true },
  { label: "MOOC Practice", href: "https://swayam-quiz.vercel.app/", external: true },
];

function NavLink({ item, className, onClick }: { item: NavItem; className?: string; onClick?: () => void }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  if (item.static) {
    return (
      <a href={item.href} className={className} onClick={onClick}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const linkClass =
    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground";

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="rounded-md bg-brand px-1.5 py-0.5 text-sm font-extrabold text-white">D.</span>
          <span>Tech</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} className={linkClass} />
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Main" className="border-t border-border/60 px-4 py-2 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} className={cn(linkClass, "block")} onClick={() => setOpen(false)} />
          ))}
        </nav>
      )}
    </header>
  );
}
