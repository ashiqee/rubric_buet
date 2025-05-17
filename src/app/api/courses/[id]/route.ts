
import { Course } from "@/lib/models/Course";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();

  try {
    const updated = await Course.findByIdAndUpdate(params.id, data, { new: true });
    if (!updated) return NextResponse.json({ message: "Course not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update", error }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const deleted = await Course.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: "Course not found" }, { status: 404 });
    return NextResponse.json({ message: "Course deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete", error }, { status: 500 });
  }
}
