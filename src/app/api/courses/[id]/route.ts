
import { NextResponse } from "next/server";

import { Course } from "@/lib/models/Course";
import { connectDB } from "@/lib/mongoose";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const data = await req.json();

  const {id}= await params;

  try {
    const updated = await Course.findByIdAndUpdate(id, data, { new: true });

    if (!updated) return NextResponse.json({ message: "Course not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update", error }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const {id}= await params;

  try {
    const deleted = await Course.findByIdAndDelete(id);

    if (!deleted) return NextResponse.json({ message: "Course not found" }, { status: 404 });

    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete", error }, { status: 500 });
  }
}
