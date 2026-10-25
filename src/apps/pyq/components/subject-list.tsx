"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, GraduationCap, Beaker } from "lucide-react";
import { GroupedSubjects } from "@/apps/pyq/lib/types";

interface SubjectListProps {
  groupedSubjects: GroupedSubjects;
  selectedSubject: string | null;
  onSubjectSelect: (code: string) => void;
  type: 'pyq' | 'lab';
}

export function SubjectList({ groupedSubjects, selectedSubject, onSubjectSelect, type }: SubjectListProps) {
  const semesters = Object.keys(groupedSubjects).sort();

  if (semesters.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
        <GraduationCap className="h-12 w-12 mb-4 opacity-50" />
        <p>No {type === 'pyq' ? 'subjects' : 'lab manuals'} found</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full [&_[data-radix-scroll-area-viewport]>div]:!block">
      <div className="space-y-6 pr-3">
        {semesters.map((semester) => (
          <div key={semester}>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-primary">Semester {semester}</span>
            </h2>
            <div className="space-y-2">
              {groupedSubjects[semester].map(({ code, name }) => (
                <button
                  key={code}
                  aria-pressed={selectedSubject === code}
                  className={`w-full min-w-0 flex items-start gap-2 p-3 rounded-lg transition-colors ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset ${
                    selectedSubject === code
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                  onClick={() => onSubjectSelect(code)}
                >
                  {type === 'pyq' ? (
                    <FileText className="h-4 w-4 mt-1 shrink-0" aria-hidden="true" />
                  ) : (
                    <Beaker className="h-4 w-4 mt-1 shrink-0" aria-hidden="true" />
                  )}
                  <div className="min-w-0 flex-1 text-left">
                    <div className="font-medium">{code}</div>
                    <div className={`text-sm ${
                      selectedSubject === code ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    } truncate`}>
                      {name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {semester !== semesters[semesters.length - 1] && (
              <div className="h-px bg-border my-4" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}