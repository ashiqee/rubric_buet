import { Course, Rubric, Student } from "@/types/models";

export async function fetchCourses(): Promise<Course[]> {
  const res = await fetch("/api/courses");
  return res.json();
}

export async function fetchStudents(query: { year?: number; ids?: string[] }): Promise<Student[]> {
  const params = new URLSearchParams();
  if (query.year) params.append("year", query.year.toString());
  if (query.ids && query.ids.length) params.append("ids", query.ids.join(","));

  const res = await fetch(`/api/students?${params.toString()}`);
  return res.json();
}

export async function fetchRubrics(): Promise<Rubric[]> {
  const res = await fetch("/api/rubrics");
  return res.json();
}


export const fetchExams = async () => {
  const res = await fetch("/api/exams");
  const data = await res.json();
  return data;
};
