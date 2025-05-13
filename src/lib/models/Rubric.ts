import mongoose from 'mongoose';

const CriterionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  weight: { type: Number, required: true }
}, { _id: false });

const RatingLevelSchema = new mongoose.Schema({
  label: { type: String, required: true },
  count: { type: Number, required: true },
  range: {
    type: [Number], // must be explicitly defined
    // validate: {
    //   validator: (val) => val.length === 2,
    //   message: 'Range must be an array of two numbers'
    // }
  }
}, { _id: false });

const RubricSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  criteria: [CriterionSchema],
  ratingLevels: [RatingLevelSchema],
  scores: { type: Map, of: Number }, // scores like { Design: 4, Creativity: 3, ... }
  totalScore: { type: Number },
  grade: { type: String }
}, {
  timestamps: true
});

export const Rubric = mongoose.model('Rubric', RubricSchema);
