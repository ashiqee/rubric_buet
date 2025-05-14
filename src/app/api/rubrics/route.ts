// app/api/rubrics/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Rubric } from '@/lib/models/Rubric';


// GET all rubrics
export async function GET() {
  try {
    await connectDB();
    const rubrics = await Rubric.find().sort({ createdAt: -1 });
    return NextResponse.json(rubrics, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch rubrics', error },
      { status: 500 }
    );
  }
}

// POST a new rubric
export async function POST(req: Request) {
  await connectDB();
  try {
    const body = await req.json();
    
    const rubric = await Rubric.create(body);
    console.log(rubric,"body");


    return NextResponse.json(rubric, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create rubric", details: error.message },
      { status: 500 }
    );
  }
}

