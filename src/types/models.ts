export type Course = {
  _id: string;
  c_CourseTitle: string;
  c_CourseID: string;
};

export type Student = {
  _id: string;
  student_id: string;
  name: string;
  level_term?: string;
  admission_year: number;
};

export type Rubric = {
  _id: string;
  title: string;
};

export type Project = {
    _id?: string;
  name: string;
  assessments: Assessment[];
};

export type Assessment = {
  name: string;
  rubricId: string;
};
