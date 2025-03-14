import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./Health/routes/Auth.js";
import calendarRoutes from "./Health/routes/Calendar.js";
import fitRoutes from "./Health/routes/Fitness.js";
import connect from "./config/database.js";
import { sendWhatsAppMessage } from "./utils/whatsapp_sender.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

connect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/fit", fitRoutes);
app.use("/api/v1/calendar", calendarRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: " running ",
  });
});

app.post("/send-message", async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res
      .status(400)
      .json({ error: "Phone number and message are required!" });
  }

  try {
    const response = await sendWhatsAppMessage(phoneNumber, message);
    res.json({ success: true, message: response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen(PORT, () => {
  console.log("runninggg at port ", PORT);
});
