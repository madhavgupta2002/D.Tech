"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Linkedin, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AUTHOR_LINKEDIN, AUTHOR_NAME } from "@/lib/credits";
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

function NavLink({
  item,
  active,
  className,
  onClick,
}: {
  item: NavItem;
  active: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const props = { className, onClick, "aria-current": active ? ("page" as const) : undefined };
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" {...props}>
        {item.label}
      </a>
    );
  }
  if (item.static) {
    return (
      <a href={item.href} {...props}>
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} {...props}>
      {item.label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname() ?? "";
  const isActive = (item: NavItem) => !item.external && !item.static && pathname.startsWith(item.href);

  // Desktop: plain text links, the current page underlined in the accent colour.
  const linkClass =
    "relative px-2.5 py-4 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:font-medium aria-[current=page]:text-foreground aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-2.5 aria-[current=page]:after:-bottom-px aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-primary";
  const mobileLinkClass =
    "block border-b border-border/60 py-3 text-sm text-muted-foreground last:border-0 hover:text-foreground aria-[current=page]:font-medium aria-[current=page]:text-foreground";

  return (
    <header className="sticky top-0 z-40 border-b bg-background print:hidden">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="text-lg font-bold tracking-tight" aria-label="D.Tech home">
          D<span className="text-primary">.</span>Tech
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} active={isActive(item)} className={linkClass} />
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={AUTHOR_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${AUTHOR_NAME} on LinkedIn`}
            className="inline-flex h-9 items-center gap-1.5 rounded-md px-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline lg:hidden xl:inline">{AUTHOR_NAME}</span>
          </a>
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Main" className="border-t px-4 lg:hidden">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isActive(item)}
              className={cn(mobileLinkClass)}
              onClick={() => setOpen(false)}
            />
          ))}
        </nav>
      )}
    </header>
  );
}
