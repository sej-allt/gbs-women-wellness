import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SESSION_PATH = path.join(__dirname, "whatsapp_session");

async function sendWhatsAppMessage(phoneNumber, message) {
  if (!phoneNumber || !message)
    throw new Error("Phone number and message are required!");

  // ✅ Ensure phone number is in international format (without `+`)
  if (!/^\d+$/.test(phoneNumber)) {
    throw new Error(
      "Invalid phone number format! Use only digits (e.g., 919876543210)"
    );
  }

  const browserOptions = {
    headless: false,
    userDataDir: SESSION_PATH, // ✅ Session save karega
  };

  const browser = await puppeteer.launch(browserOptions);
  const page = await browser.newPage();

  console.log("Opening WhatsApp Web...");
  await page.goto("https://web.whatsapp.com");

  if (!fs.existsSync(SESSION_PATH)) {
    console.log("QR Code Scan Karle Bhai...");
    await page.waitForTimeout(100000); // ✅ Wait for user to scan QR code
  }

  const url = `https://web.whatsapp.com/send?phone=${phoneNumber}`;
  await page.goto(url);

  try {
    console.log("Waiting for chat box...");
    await page.waitForSelector('div[title="Type a message"]', {
      timeout: 100000,
    }); // ✅ Increased timeout

    await page.type('div[title="Type a message"]', message);
    await page.keyboard.press("Enter");

    console.log("Message Sent! ✅");

    await page.waitForTimeout(5000); // ✅ Let the message send before closing
  } catch (error) {
    console.error("Error: Chat box not found!");
  } finally {
    await browser.close();
  }

  return "Message sent successfully!";
}

export { sendWhatsAppMessage };
