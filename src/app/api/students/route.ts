

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



export async function GET() {
  await connectDB();

  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch students", error }, { status: 500 });
  }
}
