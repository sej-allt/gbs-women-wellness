import mongoose from "mongoose";

const sleepSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  sleep_time: {
    type: String,
  },
  wake_time: {
    type: String,
  },
  track_data: [
    {
      day: {
        type: Date,
        required: true,
      },
      sleep: {
        type: Boolean,
        default: false,
      },
      hours: {
        type: Number,
        default: 0,
      },
    },
  ],
});
export const Sleep = mongoose.model("Sleep", sleepSchema);
