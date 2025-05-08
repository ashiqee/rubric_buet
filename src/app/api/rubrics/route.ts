// app/api/rubrics/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Rubric from '@/lib/models/Rubric';

export async function GET() {
  await connectDB();
  const rubrics = await Rubric.find()
  return NextResponse.json(rubrics);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const rubric = await Rubric.create(body);
  return NextResponse.json(rubric, { status: 201 });
}
