
import { Course } from "@/lib/models/Course";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  try {
    const newCourse = await Course.create(data);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create course", error }, { status: 500 });
  }
}



export async function GET() {
  await connectDB();

  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch courses", error }, { status: 500 });
  }
}
