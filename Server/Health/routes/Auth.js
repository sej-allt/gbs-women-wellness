import express from "express";
// import { login, sendotp, signup } from "../controllers/AuthController";

import {
  determineAndUpdateGoal,
  login,
  sendotp,
  signup,
} from "../controllers/AuthController.js";
import {
  addVideo,
  getAllVideos,
  markVideoCompleted,
} from "../controllers/VideoController.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/setgoal", determineAndUpdateGoal);

router.post("/markcomplete", markVideoCompleted);
router.post("/addvideo", addVideo);
router.get("/getvideos", getAllVideos);

export default router; // ESM (match with import)
