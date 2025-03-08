import mongoose from "mongoose";

const healthDetailsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  age: {
    type: Number,
  },
  height: {
    type: Number, // in cm
  },
  weight: {
    type: Number, // in kg
  },
  medical_conditions: {
    type: [String], // Array of conditions
  },
  allergies: {
    type: [String], // Array of allergies
  },
  activity_level: {
    type: String, // Sedentary, Moderate, Active
  },
  motive: {
    type: String, // Weight Loss, Muscle Gain, etc.
  },
  bmi: {
    type: String,
  },
  maintain_calorie: {
    type: String,
  },
  menstrual_cycle_tracker: {
    type: Boolean,
    default: false,
  },
  journey_start_date: {
    type: Date,
  },
});
export const Health = mongoose.model("Health", healthDetailsSchema);
