"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { GraduationCap } from "lucide-react";
import { GroupedSubjects } from "@/apps/pyq/lib/types";
import { cn } from "@/lib/utils";

interface SubjectListProps {
  groupedSubjects: GroupedSubjects;
  selectedSubject: string | null;
  onSubjectSelect: (code: string) => void;
  type: "pyq" | "lab";
}

export function SubjectList({ groupedSubjects, selectedSubject, onSubjectSelect, type }: SubjectListProps) {
  const semesters = Object.keys(groupedSubjects).sort();

  if (semesters.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-sm text-muted-foreground">
        <GraduationCap className="mb-3 h-8 w-8 opacity-40" strokeWidth={1.5} aria-hidden="true" />
        <p>No {type === "pyq" ? "subjects" : "lab manuals"} found</p>
      </div>
    );
  }

  // Index-style list: semester as a small ruled heading, then code + name rows.
  // The selected row gets an accent bar on the left instead of a filled block.
  return (
    <ScrollArea className="h-full [&_[data-radix-scroll-area-viewport]>div]:!block">
      <div className="space-y-5 pr-3">
        {semesters.map((semester) => (
          <div key={semester}>
            <h2 className="mb-1 flex items-baseline justify-between border-b pb-1.5 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>Semester {semester}</span>
              <span>{groupedSubjects[semester].length}</span>
            </h2>
            <ul>
              {groupedSubjects[semester].map(({ code, name }) => {
                const selected = selectedSubject === code;
                return (
                  <li key={code}>
                    <button
                      aria-pressed={selected}
                      onClick={() => onSubjectSelect(code)}
                      className={cn(
                        "flex w-full min-w-0 items-baseline gap-3 border-l-2 py-2 pl-3 pr-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                        selected
                          ? "border-primary bg-accent"
                          : "border-transparent hover:border-border hover:bg-accent/60"
                      )}
                    >
                      <span
                        className={cn(
                          "w-[4.5rem] shrink-0 font-mono text-xs",
                          selected ? "font-semibold text-primary" : "text-muted-foreground"
                        )}
                      >
                        {code}
                      </span>
                      <span className={cn("min-w-0 flex-1 truncate text-sm", selected && "font-medium")}>{name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
