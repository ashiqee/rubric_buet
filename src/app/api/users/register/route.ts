// app/api/users/register/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import User from '@/lib/models/User';

export async function POST(req: Request) {
  await connectDB();
  const data = await req.json();

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await User.hashPassword(data.password);
  data.password = hashedPassword;

  const user = await User.create(data);
  return NextResponse.json(user, { status: 201 });
}
