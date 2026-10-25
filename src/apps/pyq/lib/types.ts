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