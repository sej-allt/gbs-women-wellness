import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./Health/routes/Auth.js";
import connect from "./config/database.js";
import { sendWhatsAppMessage } from "./utils/whatsapp_sender.js";
dotenv.config({
  path: "./.env",
});
const app = express();
//for form data
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
const PORT = process.env.PORT || 4000;

connect();

app.use("/", authRoutes);

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
