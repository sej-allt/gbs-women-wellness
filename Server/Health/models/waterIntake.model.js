import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User", // Assuming there's a User model
  },
  target_water: {
    type: Number,
    default: 8, // You can set a default target if needed
  },
  track_data: [
    {
      day: {
        type: Date,
        required: true,
      },
      glasses: {
        type: Number,
        required: true,
      },
    },
  ],
});

export const WaterIntake = mongoose.model("WaterIntake", waterSchema);
