
import { Student } from "@/lib/models/Student";
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const data = await req.json();

  try {
    const updated = await Student.findByIdAndUpdate(params.id, data, { new: true });
    if (!updated) return NextResponse.json({ message: "Student not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Failed to update", error }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const deleted = await Student.findByIdAndDelete(params.id);
    if (!deleted) return NextResponse.json({ message: "Student not found" }, { status: 404 });
    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete", error }, { status: 500 });
  }
}
