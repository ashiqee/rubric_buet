import { connectDB } from "@/lib/mongoose";
import Exam from "@/lib/models/Exam";
import Student from "@/lib/models/Student";

import Project from "@/lib/models/Project";
 // Add this if not already

import { NextResponse } from "next/server";
import { Course } from "@/lib/models/Course";
import { Rubric } from "@/lib/models/Rubric";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const { id } = params;

    const exam = await Exam.findById(id)
      .populate({
        path: "course",
        select: "c_CourseTitle c_CourseID c_Group c_CourseProgram c_OfferTo c_CourseType c_Credits c_CreditHours c_Prerequisite",
        model: Course, // Explicitly add model
      })
      .populate({
        path: "students",
        select: "student_id name email mobile_no department level_term admission_year status",
        model: Student, // Explicitly add model
      })
      .populate({
        path: "projects",
        populate: {
          path: "assessments.rubricId",
          select: "name description",
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
