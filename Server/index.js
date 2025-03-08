import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./Health/routes/Auth.js";
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
    origin: "http://localhost:5174", // Allow frontend to access API
    credentials: true, // Allow cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Connect to database
connect();

// Routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  return res.json({ success: true, message: "Server is running" });
});

app.post("/send-message", async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).json({ error: "Phone number and message are required!" });
  }

  try {
    const response = await sendWhatsAppMessage(phoneNumber, message);
    res.json({ success: true, message: response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
