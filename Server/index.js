import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./Health/routes/Auth.js";
import connect from "./config/database.js";
import { sendWhatsAppMessage } from "./utils/whatsapp_sender.js";
<<<<<<< HEAD

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
=======
dotenv.config({
  path: "./.env",
});
const app = express();
//for form data
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
<<<<<<< HEAD
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
=======
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
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
});

app.post("/send-message", async (req, res) => {
  const { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
<<<<<<< HEAD
    return res.status(400).json({ error: "Phone number and message are required!" });
=======
    return res
      .status(400)
      .json({ error: "Phone number and message are required!" });
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
  }

  try {
    const response = await sendWhatsAppMessage(phoneNumber, message);
    res.json({ success: true, message: response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

<<<<<<< HEAD
// Start server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
=======
app.listen(PORT, () => {
  console.log("runninggg at port ", PORT);
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
});
