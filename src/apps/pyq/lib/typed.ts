import typedIndex from "./typed-index.json";

const index = typedIndex as Record<string, { questions: number; ai?: number }>;

export function hasTypedNotes(code: string | null | undefined): boolean {
  return Boolean(code && index[code]);
}

export function typedNotesUrl(code: string): string {
  return `/pyq-typed/${encodeURIComponent(code)}.json`;
}
