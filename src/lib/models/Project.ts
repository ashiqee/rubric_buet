import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: String,
  
  assessments: [
    {
      name: String,
      rubricId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rubric',
      },
      weight:{type: Number, default:0} ,
    },
  ],
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default Project;
