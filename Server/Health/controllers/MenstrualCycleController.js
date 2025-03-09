import { MenstrualCycle } from "../models/menstruation.model.js";

export const trackMenstrualCycle = async (req, res) => {
  try {
    const { user, start, end } = req.body;
    const user_id = user._id;

    let cycleEntry = await MenstrualCycle.findOne({ user_id });

    if (!cycleEntry) {
      // If no record exists, create one
      cycleEntry = new MenstrualCycle({
        user_id,
        cycles: [],
      });
    }

    if (end) {
      // End the active cycle by adding the end date
      const activeCycleIndex = cycleEntry.cycles.findIndex(
        (cycle) => !cycle.end
      );
      if (activeCycleIndex !== -1) {
        cycleEntry.cycles[activeCycleIndex].end = end;
      } else {
        return res
          .status(400)
          .json({ success: false, message: "No active cycle found." });
      }
    } else if (start) {
      // Start a new cycle (only if there is no active cycle)
      const activeCycle = cycleEntry.cycles.find((cycle) => !cycle.end);
      if (activeCycle) {
        return res
          .status(400)
          .json({ success: false, message: "A cycle is already active." });
      }
      cycleEntry.cycles.push({ start });
    }

    await cycleEntry.save();
    res.status(200).json({
      success: true,
      message: "Menstrual cycle updated successfully!",
      data: cycleEntry,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export const getMenstrualCycle = async (req, res) => {
  try {
    const { user } = req.body;
    const user_id = user._id;

    const cycleEntry = await MenstrualCycle.findOne({ user_id });
    if (!cycleEntry) {
      return res.status(404).json({
        success: false,
        message: "No menstrual cycle record found for this user.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Menstrual cycle records fetched successfully!",
      data: cycleEntry.cycles,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
