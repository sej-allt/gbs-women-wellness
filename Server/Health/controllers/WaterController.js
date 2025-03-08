import { WaterIntake } from "../models/waterIntake.model.js"; // Adjust the path as needed

export const trackWater = async (req, res) => {
  try {
    const { user, glasses } = req.body;
    const user_id = user._id;
    const today = new Date().setHours(0, 0, 0, 0); // Normalize date to ignore time

    // Check if there's an existing entry for the user
    let waterEntry = await WaterIntake.findOne({ user_id });

    if (!waterEntry) {
      // If no entry exists, create a new one
      waterEntry = new WaterIntake({
        user_id,
        track_data: [{ day: today, glasses }],
      });
    } else {
      // Check if today's entry exists in track_data
      const index = waterEntry.track_data.findIndex(
        (entry) => new Date(entry.day).setHours(0, 0, 0, 0) === today
      );

      if (index !== -1) {
        // Update existing day's glasses count
        waterEntry.track_data[index].glasses = glasses;
      } else {
        // Add a new entry for today
        waterEntry.track_data.push({ day: today, glasses });
      }
    }

    await waterEntry.save();
    res.status(200).json({
      success: true,
      message: "Water intake updated successfully!",
      data: waterEntry,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
