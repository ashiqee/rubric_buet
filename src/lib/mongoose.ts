// lib/mongoose.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) throw new Error('MONGO_URI is not defined');

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGO_URI);
};
