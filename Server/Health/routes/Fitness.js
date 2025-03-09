import express from "express";
// import { login, sendotp, signup } from "../controllers/AuthController";

import {
  getMenstrualCycle,
  trackMenstrualCycle,
} from "../controllers/MenstrualCycleController.js";
import {
  getSleepSchedule,
  getSleepTrackData,
  markSleep,
  setSleepTime,
} from "../controllers/SleepController.js";
import { getGoogleFitData } from "../controllers/StepsController.js";
import { getWaterTrack, trackWater } from "../controllers/WaterController.js";

const router = express.Router();

router.post("/steps", getGoogleFitData);

router.post("/trackWater", trackWater);
router.post("/getTrackWater", getWaterTrack);

router.post("/setsleepgoal", setSleepTime);
router.post("/getSchedule", getSleepSchedule);
router.post("/getsleepdata", getSleepTrackData);

router.post("/trackmens", trackMenstrualCycle);
router.post("/getmens", getMenstrualCycle);

router.post("/markslept", markSleep);

export default router; // ESM (match with import)
