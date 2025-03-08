import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  whole_day: {
    type: Boolean,
  },
  completed: {
    type: Boolean,
  },
});

export const Event = mongoose.model("Event", eventSchema);
