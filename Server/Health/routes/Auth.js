import express from "express";
<<<<<<< HEAD
import { login, sendotp, signup, verifyotp } from "../controllers/AuthController.js"; // Import verifyotp

const router = express.Router();

// ✅ Test route
router.get("/test", (req, res) => {
  res.json({ success: true, message: "Auth API is working!" });
});

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);
router.post("/verifyotp", verifyotp); // ✅ Add this missing route

export default router;
=======
// import { login, sendotp, signup } from "../controllers/AuthController";

import { login, sendotp, signup } from "../controllers/AuthController.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/sendotp", sendotp);

export default router; // ESM (match with import)
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
