// app/api/rubrics/route.ts
import { NextResponse } from 'next/server';

import { connectDB } from '@/lib/mongoose';
import { Rubric } from '@/lib/models/Rubric';


// Upadte Rubric 
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  try {
    const body = await req.json();

    const {id} = await params
    

    
    const updatedRubric = await Rubric.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRubric) {
      return NextResponse.json({ error: 'Rubric not found' }, { status: 404 });
    }

    return NextResponse.json(updatedRubric, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update rubric', details: error.message },
      { status: 500 }
    );
  }
}


// delete rubric temp 
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const {id}= await params;

  try {
    const deletedRubric = await Rubric.findByIdAndDelete(id);

    if (!deletedRubric) {
      return NextResponse.json({ error: 'Rubric not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Rubric deleted successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete rubric', details: error.message },
      { status: 500 }
    );
  }
}