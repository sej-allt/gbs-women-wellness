import { Event } from "../models/events.model.js";

export const addEvent = async (req, res) => {
  try {
    const { user, title, description, date, start_time, end_time, whole_day } =
      req.body;

    const user_id = user._id;
    const event = new Event({
      user_id,
      title,
      description,
      date,
      start_time,
      end_time,
      whole_day,
      completed: false, // By default event is incomplete
    });

    await event.save();
    res.status(201).json({ success: true, message: "Event added!", event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const markEventComplete = async (req, res) => {
  try {
    const { event_id } = req.body;

    const event = await Event.findByIdAndUpdate(
      event_id,
      { completed: true },
      { new: true }
    );

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.json({ success: true, message: "Event marked as completed!", event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTodayEvents = async (req, res) => {
  try {
    const { user } = req.body;

    const user_id = user._id;

    // Get today's date (only YYYY-MM-DD part)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      user_id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPendingPastEvents = async (req, res) => {
  try {
    const { user } = req.body;

    const user_id = user._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      user_id,
      date: { $lt: today }, // Events before today
      completed: false, // Only incomplete events
    });

    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
