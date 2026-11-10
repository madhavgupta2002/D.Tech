"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type Department = "all" | "cs" | "others";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  department: Department;
  onDepartmentChange: (department: Department) => void;
}

const DEPTS: { id: Department; label: string }[] = [
  { id: "all", label: "All" },
  { id: "cs", label: "Computer Sci." },
  { id: "others", label: "Others" },
];

export function SearchBar({ value, onChange, department, onDepartmentChange }: SearchBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <label htmlFor="pyq-search" className="sr-only">
          Search subjects by name or code
        </label>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          id="pyq-search"
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or code"
          className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm placeholder:text-muted-foreground focus-visible:border-foreground/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>
      <div role="group" aria-label="Department filter" className="flex gap-1.5">
        {DEPTS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={department === id}
            onClick={() => onDepartmentChange(id)}
            className={cn(
              "whitespace-nowrap rounded-md border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              department === id
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
