import express from "express";
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
