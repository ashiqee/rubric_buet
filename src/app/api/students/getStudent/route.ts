import { NextResponse } from "next/server";
import { Student } from "@/types/models";

const students: Student[] = [
  { _id: '1', student_id: '2201001', name: 'John Doe', admission_year: 2022 },
  { _id: '2', student_id: '2201002', name: 'Jane Smith', admission_year: 2023 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const ids = searchParams.get('ids')?.split(',');

  let filtered = students;

  if (year) {
    filtered = filtered.filter((s) => s.admission_year === Number(year));
  }

  if (ids) {
    filtered = filtered.filter((s) => ids.includes(s.student_id));
  }

  return NextResponse.json(filtered);
}
