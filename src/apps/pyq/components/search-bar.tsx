"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onDepartmentChange: (department: Department) => void;
}

type Department = 'all' | 'cs' | 'others';

export function SearchBar({ value, onChange, onDepartmentChange }: SearchBarProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by name or code..."
          className="w-full pl-9 pr-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex gap-2">
        {['all', 'cs', 'others'].map((dept) => (
          <button
            key={dept}
            onClick={() => onDepartmentChange(dept as Department)}
            className={`flex-1 px-4 py-2 rounded-md transition-colors ${
              value === dept
                ? 'bg-primary text-white'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {dept === 'cs' ? 'Computer Science' : dept.charAt(0).toUpperCase() + dept.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}