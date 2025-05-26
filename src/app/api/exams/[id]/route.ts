import { connectDB } from "@/lib/mongoose";
import Exam from "@/lib/models/Exam";


import Project from "@/lib/models/Project";
 // Add this if not already

import { NextResponse } from "next/server";
import { Course } from "@/lib/models/Course";
import { Rubric } from "@/lib/models/Rubric";
import { Student } from "@/lib/models/Student";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;

    const exam = await Exam.findById(id)
      .populate({
        path: "course",
        select: "c_CourseTitle c_CourseID c_Group c_CourseProgram c_OfferTo",
        model: Course, // Explicitly add model
      })
      .populate({
        path: "students",
        select: "student_id name level_term admission_year status",
        model: Student, // Explicitly add model
      })
      .populate({
        path: "projects",
        populate: {
          path: "assessments.rubricId",
          model: Rubric, // Explicitly add model
        },
        model: Project, // Explicitly add model
      })
      .lean(); // Optional: plain JS object

    if (!exam) {
      return NextResponse.json({ message: "Exam not found" }, { status: 404 });
    }

    return NextResponse.json(exam);
  } catch (error) {
    console.error("Error fetching exam:", error);
    return NextResponse.json(
      { message: "Failed to fetch exam", error },
      { status: 500 }
    );
  }
}
