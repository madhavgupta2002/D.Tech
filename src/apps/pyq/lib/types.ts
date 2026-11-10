export interface Subject {
  name: string;
  link: string;
  cutoff?: string;
  semester: string;
  type?: string;
}

export interface SubjectData {
  [key: string]: Subject;
}

export interface GroupedSubjects {
  [key: string]: Array<Subject & { code: string }>;
}

export interface LabData {
  [key: string]: {
    name: string;
    link: string;
    type: string;
    semester: string;
  };
}
// Machine-transcribed ("typed") version of a PYQ solutions PDF, served from public/pyq-typed/<code>.json.
export interface TypedQuestion {
  id: string;
  /** Syllabus unit number; 0 = outside the listed units; null = subject has no unit mapping. */
  unit: number | null;
  /** Study order within the subject (syllabus topic order, then concept order); null when not ordered. */
  order: number | null;
  /** Syllabus topic the question belongs to, e.g. "Binary Search Trees". */
  topic: string | null;
  number: string | null;
  year: number | null;
  exam: string | null;
  session: string | null;
  marks: string | null;
  /** Display text; distinct wordings of a repeated question are joined with **OR**. */
  question: string;
  /** Distinct wordings of the same question (asked in different papers). */
  question_variants: string[];
  answer: string;
  /** "ai_generated" means the source PDF had no solution and one was written for the site. */
  answer_source: "original" | "ai_generated" | null;
  pages: number[];
  /** Every paper this question appeared in. */
  sources: TypedSource[];
}

export interface TypedSource {
  number: string | null;
  year: number | null;
  exam: string | null;
  session: string | null;
  marks: string | null;
  pages: number[];
}

export interface TypedUnit {
  unit: number;
  title: string;
}

export interface TypedDoc {
  subject_code: string;
  subject_name: string | null;
  syllabus: { name: string; source: string } | null;
  units: TypedUnit[];
  questions: TypedQuestion[];
}
