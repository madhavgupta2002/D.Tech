"use client";

import { useState } from "react";
import { SubjectList } from "@/apps/pyq/components/subject-list";
import { PDFViewer } from "@/apps/pyq/components/pdf-viewer";
import { SearchBar } from "@/apps/pyq/components/search-bar";
import { ThemeToggle } from "@/apps/pyq/components/theme-toggle";
import { subjectsData, labData } from "@/apps/pyq/lib/data";
import { GroupedSubjects } from "@/apps/pyq/lib/types";
import { BookOpen, Linkedin, Beaker } from "lucide-react";

export default function Home() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentDepartment, setCurrentDepartment] = useState<'all' | 'cs' | 'others'>('all');
  const [activeTab, setActiveTab] = useState<'pyq' | 'lab'>('pyq');

  const handleTabChange = (tab: 'pyq' | 'lab') => {
    setActiveTab(tab);
    setSelectedSubject(null); // Reset selected subject when switching tabs
  };

  const getFilteredAndGroupedData = () => {
    const data = activeTab === 'pyq' ? subjectsData : labData;
    
    return Object.entries(data).reduce((acc, [code, data]) => {
      const matchesSearch =
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        currentDepartment === 'all' ||
        (currentDepartment === 'cs' && code.startsWith('CO')) ||
        (currentDepartment === 'others' && !code.startsWith('CO'));

      if (matchesSearch && matchesDepartment) {
        const sem = data.semester;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push({ code, ...data });
        acc[sem].sort((a, b) => a.code.localeCompare(b.code));
      }
      return acc;
    }, {} as GroupedSubjects);
  };

  const filteredAndGroupedSubjects = getFilteredAndGroupedData();

  const currentData = activeTab === 'pyq' ? subjectsData : labData;
  const selectedSubjectData = selectedSubject ? currentData[selectedSubject] : null;

  return (
    <div className="min-h-screen bg-background px-4 sm:px-40">
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl sm:text-2xl font-bold">DTU PYQ Solutions</h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/madhavgupta2002"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                <span className="hidden sm:inline">Made by Madhav Gupta</span>
                <span className="sm:hidden">Madhav Gupta</span>
                <Linkedin className="h-4 w-4" />
              </a>
              <ThemeToggle />
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleTabChange('pyq')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'pyq'
                  ? 'bg-primary text-white'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              PYQ Solutions
            </button>
            <button
              onClick={() => handleTabChange('lab')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'lab'
                  ? 'bg-primary text-white'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              <Beaker className="h-4 w-4" />
              Lab Manuals
            </button>
          </div>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onDepartmentChange={setCurrentDepartment}
          />
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-[450px_1fr] gap-6">
          <div className="p-4 h-[calc(100vh-220px)] bg-card rounded-lg border">
            <SubjectList
              groupedSubjects={filteredAndGroupedSubjects}
              selectedSubject={selectedSubject}
              onSubjectSelect={setSelectedSubject}
              type={activeTab}
            />
          </div>

          <div className="p-4 h-[calc(100vh-220px)] bg-card rounded-lg border">
            <div className="max-w-[800px] mx-auto h-full">
              {selectedSubject && selectedSubjectData ? (
                <PDFViewer
                  subject={{ code: selectedSubject, ...selectedSubjectData }}
                  type={activeTab}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                  {activeTab === 'pyq' ? (
                    <BookOpen className="h-24 w-24 mb-6 opacity-50" />
                  ) : (
                    <Beaker className="h-24 w-24 mb-6 opacity-50" />
                  )}
                  <p className="text-xl">
                    Select a {activeTab === 'pyq' ? 'subject' : 'lab manual'} to view
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}