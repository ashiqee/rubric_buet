import mongoose from 'mongoose';

const ExamSchema = new mongoose.Schema({
    title: String ,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true }],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
}, { timestamps: true });

export default mongoose.models.Exam || mongoose.model('Exam', ExamSchema);
