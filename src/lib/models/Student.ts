import mongoose, { Schema } from "mongoose";

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

const Student = mongoose.models.Student || mongoose.model("Student", StudentSchema);

export default Student;