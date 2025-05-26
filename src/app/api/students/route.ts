

import { Student } from "@/lib/models/Student";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  try {
    const newStudent = await Student.create(data);
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to add Student", error }, { status: 500 });
  }
}



export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const ids = searchParams.get("ids")?.split(",");

  try {
    await connectDB();

    let filter: any = {};
    if (year) {
      filter.admission_year = Number(year);
    }
    if (ids) {
      filter.student_id = { $in: ids };
    }

    const students = await Student.find(filter).sort({ createdAt: -1 });

    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ message: "Failed to fetch students", error }, { status: 500 });
  }
}