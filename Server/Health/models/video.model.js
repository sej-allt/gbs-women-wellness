// Updated Video.model.js
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    videoLink: { type: String, required: true },
    thumbnail: {
      type: String,
      required: true,
    },
    tag: { type: String, required: true },
    // Remove 'completed' field and use completedBy to track user completions
    completedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Video = mongoose.model("Video", VideoSchema);
