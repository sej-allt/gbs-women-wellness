import mongoose from "mongoose";

const preferencesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  main_focus: {
    type: String, // Health / Finance / Both
    // required: true,
  },
  reminder_time: {
    type: String, // Morning, Evening, Night, No reminders
  },
  notifications: {
    type: String, // Daily, Weekly, Only Important
  },
});
export const Preferences = mongoose.model("Preferences", preferencesSchema);
