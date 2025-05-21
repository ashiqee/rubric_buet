import mongoose, { Schema, model, models } from "mongoose";

const StudentSchema = new Schema(
  {
    student_id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile_no: { type: String },
    department: { type: String, required: true },
    level_term: { type: String }, // optional
    admission_year: { type: Number, required: true },
    status: {
      type: String,
      enum: ['active', 'graduated', 'dropped'],
      default: 'active',
    },
  },
  { timestamps: true }
);

// Export model, preventing recompilation error in Next.js
export const Student = models.Student || model("Student", StudentSchema);
