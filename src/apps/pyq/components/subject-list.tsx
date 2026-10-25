"use client";

import { ScrollArea } from "@/apps/pyq/components/ui/scroll-area";
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
    <ScrollArea className="h-[calc(100vh-270px)] pr-4">
      <div className="space-y-6">
        {semesters.map((semester) => (
          <div key={semester}>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="text-primary">Semester {semester}</span>
            </h2>
            <div className="space-y-2">
              {groupedSubjects[semester].map(({ code, name }) => (
                <button
                  key={code}
                  className={`w-full flex items-start gap-2 p-3 rounded-md transition-colors ${
                    selectedSubject === code
                      ? 'bg-primary text-white'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => onSubjectSelect(code)}
                >
                  {type === 'pyq' ? (
                    <FileText className="h-4 w-4 mt-1" />
                  ) : (
                    <Beaker className="h-4 w-4 mt-1" />
                  )}
                  <div className="text-left">
                    <div className="font-medium">{code}</div>
                    <div className={`text-sm ${
                      selectedSubject === code ? 'text-white/70' : 'text-muted-foreground'
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