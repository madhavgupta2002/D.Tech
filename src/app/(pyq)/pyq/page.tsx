"use client";

import { useState } from "react";
import { SubjectList } from "@/apps/pyq/components/subject-list";
import { PDFViewer } from "@/apps/pyq/components/pdf-viewer";
import { SearchBar, type Department } from "@/apps/pyq/components/search-bar";
import { subjectsData, labData } from "@/apps/pyq/lib/data";
import { GroupedSubjects } from "@/apps/pyq/lib/types";
import { BookOpen, Linkedin, Beaker, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Sticky SiteHeader is 56px (h-14); panel heights subtract it plus page chrome.
const PANEL_HEIGHT = "md:h-[calc(100vh-56px-2rem)]";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDepartment, setCurrentDepartment] = useState<Department>("all");
  const [activeTab, setActiveTab] = useState<"pyq" | "lab">("pyq");

  const handleTabChange = (tab: "pyq" | "lab") => {
    setActiveTab(tab);
    setSelectedSubject(null);
  };

  const handleSelect = (code: string) => {
    setSelectedSubject(code);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const data = activeTab === "pyq" ? subjectsData : labData;
  const filteredAndGroupedSubjects = Object.entries(data).reduce((acc, [code, d]) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = d.name.toLowerCase().includes(q) || code.toLowerCase().includes(q);
    const matchesDepartment =
      currentDepartment === "all" ||
      (currentDepartment === "cs" && code.startsWith("CO")) ||
      (currentDepartment === "others" && !code.startsWith("CO"));
    if (matchesSearch && matchesDepartment) {
      const sem = d.semester;
      if (!acc[sem]) acc[sem] = [];
      acc[sem].push({ code, ...d });
      acc[sem].sort((a, b) => a.code.localeCompare(b.code));
    }
    return acc;
  }, {} as GroupedSubjects);

  const selectedSubjectData = selectedSubject ? data[selectedSubject] : null;
  const hasSelection = Boolean(selectedSubject && selectedSubjectData);

  const tabs = [
    { id: "pyq" as const, label: "PYQ Solutions", Icon: BookOpen },
    { id: "lab" as const, label: "Lab Manuals", Icon: Beaker },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-4">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" aria-hidden="true" />
          <h1 className="text-xl font-bold sm:text-2xl">DTU PYQ Solutions</h1>
        </div>
        <Button asChild size="sm" className="self-start sm:self-auto">
          <a href="https://www.linkedin.com/in/madhavgupta2002" target="_blank" rel="noopener noreferrer">
            Made by Madhav Gupta
            <Linkedin className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:grid-cols-[450px_minmax(0,1fr)]">
        <section
          aria-label="Subjects"
          className={cn(
            "flex min-w-0 flex-col rounded-lg border bg-card p-4",
            PANEL_HEIGHT,
            hasSelection && "hidden md:flex"
          )}
        >
          <div role="tablist" aria-label="Content type" className="mb-4 grid grid-cols-2 gap-2">
            {tabs.map(({ id, label, Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                onClick={() => handleTabChange(id)}
                className={cn(
                  "flex items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                  activeTab === id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            department={currentDepartment}
            onDepartmentChange={setCurrentDepartment}
          />
          <div className="mt-4 min-h-0 flex-1 max-md:h-[60vh]">
            <SubjectList
              groupedSubjects={filteredAndGroupedSubjects}
              selectedSubject={selectedSubject}
              onSubjectSelect={handleSelect}
              type={activeTab}
            />
          </div>
        </section>

        <section
          aria-label="Viewer"
          className={cn(
            "min-w-0 flex-col rounded-lg border bg-card p-4",
            PANEL_HEIGHT,
            hasSelection ? "flex h-[calc(100vh-56px-2rem)]" : "hidden md:flex"
          )}
        >
          {hasSelection && (
            <Button
              variant="outline"
              size="sm"
              className="mb-3 self-start md:hidden"
              onClick={() => setSelectedSubject(null)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to list
            </Button>
          )}
          <div className="mx-auto h-full min-h-0 w-full max-w-[800px] flex-1">
            {selectedSubject && selectedSubjectData ? (
              <PDFViewer subject={{ code: selectedSubject, ...selectedSubjectData }} type={activeTab} />
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                {activeTab === "pyq" ? (
                  <BookOpen className="mb-6 h-24 w-24 opacity-50" aria-hidden="true" />
                ) : (
                  <Beaker className="mb-6 h-24 w-24 opacity-50" aria-hidden="true" />
                )}
                <p className="text-xl">Select a {activeTab === "pyq" ? "subject" : "lab manual"} to view</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
