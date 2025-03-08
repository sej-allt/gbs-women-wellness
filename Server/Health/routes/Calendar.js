import express from "express";
import {
  addEvent,
  getPendingPastEvents,
  getTodayEvents,
  markEventComplete,
} from "../controllers/EventController.js";
// import { login, sendotp, signup } from "../controllers/AuthController";

const router = express.Router();

router.post("/markevent", addEvent);
router.post("/completeevent", markEventComplete);
router.get("/getPendingEvents", getPendingPastEvents);
router.get("/eventsfortoday", getTodayEvents);

export default router; // ESM (match with import)
