import express from "express";
// import { login, sendotp, signup } from "../controllers/AuthController";

import { markSleep, setSleepTime } from "../controllers/SleepController.js";
import { getGoogleFitData } from "../controllers/StepsController.js";
import { trackWater } from "../controllers/WaterController.js";
const router = express.Router();

router.post("/steps", getGoogleFitData);

router.post("/trackWater", trackWater);

router.post("/setsleepgoal", setSleepTime);

router.post("/markslept", markSleep);

export default router; // ESM (match with import)
