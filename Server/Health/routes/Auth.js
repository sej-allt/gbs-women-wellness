import express from "express";
// import { login, sendotp, signup } from "../controllers/AuthController";

import {
  determineAndUpdateGoal,
  login,
  sendotp,
  signup,
} from "../controllers/AuthController.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/setgoal", determineAndUpdateGoal);

export default router; // ESM (match with import)
