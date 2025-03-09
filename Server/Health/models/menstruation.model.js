import mongoose from "mongoose";

const MenstrualCycleSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cycles: [
    {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        default: null,
      },
    },
  ],
});

export const MenstrualCycle = mongoose.model(
  "MenstrualCycle",
  MenstrualCycleSchema
);
