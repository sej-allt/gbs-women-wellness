import { Sleep } from "../models/sleep.model.js";

const parseTime = (timeStr) => {
  if (!timeStr) return null; // Handle empty input
  const [hours, minutes] = timeStr.split(":").map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

// ✅ **Utility function to calculate sleep duration**
const calculateSleepHours = (sleepTime, wakeTime) => {
  if (!sleepTime || !wakeTime) return 0; // Handle missing values
  let diff = (wakeTime - sleepTime) / (1000 * 60 * 60);
  return diff < 0 ? diff + 24 : diff; // Handle next-day wake up
};

// ✅ **Set Sleep & Wake Time API**
export const setSleepTime = async (req, res) => {
  try {
    const { user, sleep_time, wake_time } = req.body;

    const user_id = user._id;

    let sleepEntry = await Sleep.findOne({ user_id });

    if (!sleepEntry) {
      sleepEntry = new Sleep({
        user_id,
        sleep_time,
        wake_time,
        track_data: [],
      });
    } else {
      sleepEntry.sleep_time = sleep_time;
      sleepEntry.wake_time = wake_time;
    }

    await sleepEntry.save();
    res.status(200).json({
      success: true,
      message: "Sleep time updated successfully!",
      data: sleepEntry,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const markSleep = async (req, res) => {
  try {
    const { user, sleep, sleep_time, wake_time } = req.body;
    const user_id = user._id;
    console.log("marksleep");
    if (!user_id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    // Get current date (backend generated)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part, only date remains

    // Fetch user’s sleep data
    const sleepEntry = await Sleep.findOne({ user_id });
    if (!sleepEntry) {
      return res
        .status(404)
        .json({ success: false, message: "No sleep data found for user" });
    }

    // Use stored sleep times if `sleep` is true, otherwise use actual times provided
    let d_sleep_time = parseTime(sleepEntry.sleep_time);
    let d_wake_time = parseTime(sleepEntry.wake_time);

    if (!sleep) {
      d_sleep_time = parseTime(sleep_time);
      d_wake_time = parseTime(wake_time);
    }

    // Calculate sleep hours
    const hours = calculateSleepHours(d_sleep_time, d_wake_time);

    // Update or insert today's sleep record
    let updatedEntry = await Sleep.findOneAndUpdate(
      { user_id, "track_data.day": today },
      { $set: { "track_data.$.sleep": sleep, "track_data.$.hours": hours } },
      { new: true }
    );

    // If today's entry doesn't exist, push a new one
    if (!updatedEntry) {
      updatedEntry = await Sleep.findOneAndUpdate(
        { user_id },
        { $push: { track_data: { day: today, sleep, hours } } },
        { new: true }
      );
    }

    res.status(200).json({ success: true, data: updatedEntry });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSleepSchedule = async (req, res) => {
  try {
    const { user } = req.body;
    const user_id = user._id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch sleep data for the user
    const sleepEntry = await Sleep.findOne({ user_id });

    if (!sleepEntry) {
      return res.status(404).json({
        success: false,
        message: "No sleep schedule found for this user.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sleep schedule fetched successfully!",
      data: {
        sleep_time: sleepEntry.sleep_time,
        wake_time: sleepEntry.wake_time,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getSleepTrackData = async (req, res) => {
  try {
    const { user } = req.body;
    console.log("I'm here", user);
    const user_id = user._id;

    if (!user_id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Fetch user's sleep tracking data
    const sleepEntry = await Sleep.findOne({ user_id });

    // If sleepEntry is null, set data as an empty array
    const data = sleepEntry ? sleepEntry.track_data || [] : [];

    res.status(200).json({
      success: true,
      message: "Sleep tracking data fetched successfully!",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
