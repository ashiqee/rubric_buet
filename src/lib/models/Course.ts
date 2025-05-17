import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    c_CourseTitle: String,
    c_CourseID: String,
    c_Group: String,
    c_CourseProgram: String,
    c_OfferTo: String,
    c_CourseType: String,
    c_Credits: String,
    c_CreditHours: String,
    c_Prerequisite: String,
  },
  { timestamps: true }
);

export const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
