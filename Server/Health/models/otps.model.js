import mongoose from "mongoose";
import { mailsender } from "../../utils/mailsender.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, //auto deletes
  },
});

async function sendverificationemail(email, phone_number, otp) {
  try {
    const mailresponse = await mailsender(
      email,
      "Verify Your Email.",
      `This is your One Time Password, valid for 10 minutes. ${otp}. Do not share it.`
    );
    console.log("email sent successfully");
  } catch (error) {
    console.log("error while sending the email ", error);
  }
}

//calling this function middleware

otpSchema.pre("save", async function (next) {
  try {
    await sendverificationemail(this.email, this.phone_number, this.otp);
    next();
  } catch (error) {
    console.log(error);
  }
});

export const Otp = mongoose.model("Otp", otpSchema);
