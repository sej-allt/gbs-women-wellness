import { Video } from "../models/video.model.js";

// Add a new video
export const addVideo = async (req, res) => {
  try {
    const { videoLink, tag, thumbnail } = req.body;
    if (!videoLink || !tag || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: "videoLink and tag are required.",
      });
    }
    // Determine the order for this tag
    const lastVideo = await Video.findOne({ tag }).sort({ order: -1 });
    const order = lastVideo ? lastVideo.order + 1 : 1;

    const video = new Video({ videoLink, tag, order, thumbnail });
    await video.save();
    res.status(200).json({
      success: true,
      message: "Video added successfully!",
      data: video,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Get all videos, sorted by tag and order
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().sort({ tag: 1, order: 1 });
    res.status(200).json({
      success: true,
      message: "Videos fetched successfully!",
      data: videos,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// In VideoController.js
export const markVideoCompleted = async (req, res) => {
  try {
    const { videoId, userId } = req.body;

    if (!videoId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Video ID and user ID are required.",
      });
    }

    // Use $addToSet to avoid duplicate entries
    const video = await Video.findByIdAndUpdate(
      videoId,
      { $addToSet: { completedBy: userId } },
      { new: true }
    );
    if (!video) {
      return res
        .status(404)
        .json({ success: false, message: "Video not found." });
    }
    res.status(200).json({
      success: true,
      message: "Video marked as completed for this user!",
      data: video,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// In VideoController.js

// Get all videos completed by a specific user
export const getCompletedVideosByUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // Find videos where the completedBy array includes the userId
    const videos = await Video.find({ completedBy: userId }).sort({
      tag: 1,
      order: 1,
    });
    res.status(200).json({
      success: true,
      message: "Completed videos fetched successfully!",
      data: videos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
