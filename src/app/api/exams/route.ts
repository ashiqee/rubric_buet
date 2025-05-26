// app/api/exams/route.ts

import Exam from '@/lib/models/Exam';
import Project from '@/lib/models/Project';
import { connectDB } from '@/lib/mongoose';
import { NextRequest, NextResponse } from 'next/server';
 // Your Project model

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.json();
    const { course, students, projects,title } = data;

   
    

    // 1️⃣ Create Projects
    const createdProjects = await Project.insertMany(projects);

    // 2️⃣ Create Exam with references to Projects
    const exam = await Exam.create({
      title,
      course,
      students,
      projects: createdProjects.map(p => p._id),
    });

    return NextResponse.json(
      { message: 'Exam and projects created successfully', exam },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create exam', error }, { status: 500 });
  }
}




export async function GET() {
  try {
    await connectDB();

   const exams = await Exam.find().sort({ createdAt: -1 });

    return NextResponse.json(exams);
  } catch (error) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      { message: "Failed to fetch exams", error },
      { status: 500 }
    );
  }
}






// export async function GET() {
//   try {
//     await connectDB();

//    const exams = await Exam.find()
//   .populate({
//     path: 'course', // Assuming 'course' is a ref field
//   })
//   .populate({
//     path: 'students', // Assuming 'students' is a ref array
//   })
//   .populate({
//     path: 'projects',
//     populate: {
//       path: 'assessments.rubricId', // Populate the nested `rubricId` inside `assessments`
//     }
//   })
// .sort({ createdAt: -1 });

//     return NextResponse.json(exams);
//   } catch (error) {
//     console.error("Error fetching exams:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch exams", error },
//       { status: 500 }
//     );
//   }
// }