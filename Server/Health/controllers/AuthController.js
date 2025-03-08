import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpgenerator from "otp-generator";
import { Health } from "../models/healthDetails.model.js";
import { Otp } from "../models/otps.model.js";
import { Preferences } from "../models/preferences.model.js";
import { User } from "../models/users.model.js";

// Helper function to send error responses
const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

// ✅ Send OTP API
export const sendotp = async (request, response) => {
  try {
    const { email, phone_number } = request.body;

    if (!email && !phone_number) {
      return sendErrorResponse(response, 400, "Either email or phone number required");
    }

    // Check if the user already exists
    const existingUser = email
      ? await User.findOne({ email })
      : await User.findOne({ phone_number });

    if (existingUser) {
      return sendErrorResponse(response, 400, "User already exists");
    }

    // Generate a unique OTP
    const existingOtps = new Set(await Otp.find().distinct("otp"));
    let otp;
    do {
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    } while (existingOtps.has(otp));

    console.log("Generated OTP:", otp);

    // Store OTP in the database with expiry time
    const otpdata = await Otp.create({ email, otp, createdAt: Date.now() });

    if (!otpdata) {
      console.log("OTP not saved in DB");
    }

    return response.status(200).json({
      success: true,
      otp,
      message: "OTP generated successfully",
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(response, 500, "OTP generation failed");
  }
};

// ✅ Verify OTP API (Fix for Missing Export)
export const verifyotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return sendErrorResponse(res, 400, "Email and OTP are required");
    }

    // Find the most recent OTP for the user
    const latestOtp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!latestOtp) {
      return sendErrorResponse(res, 400, "OTP not found");
    }

    if (latestOtp.otp !== otp) {
      return sendErrorResponse(res, 400, "Invalid OTP");
    }

    return res.status(200).json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
};

// ✅ Signup API
export const signup = async (request, response) => {
  try {
    const { name, email, password, confirm, otp } = request.body;

    if (!name || !email || !password || !confirm || !otp) {
      return sendErrorResponse(response, 400, "All fields are required");
    }

    if (password !== confirm) {
      return sendErrorResponse(response, 400, "Passwords do not match");
    }

    // Check if user already exists
    if (await User.findOne({ email })) {
      return sendErrorResponse(response, 400, "User already exists");
    }

    // Find the most recent OTP
    const dbotp = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!dbotp || dbotp.otp !== otp) {
      return sendErrorResponse(response, 400, "Invalid OTP");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email, password: hashedPassword });
    user.password = undefined; // Do not send password in response

    // Create linked health & preference details
    await Preferences.create({ user_id: user._id });
    await Health.create({ user_id: user._id });

    return response.status(200).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(response, 500, "Error registering user");
  }
};

// ✅ Login API
export const login = async (request, response) => {
  try {
    const { email, phone_number, password } = request.body;

    if (!password) {
      return sendErrorResponse(response, 400, "Password is required");
    }

    if (!email && !phone_number) {
      return sendErrorResponse(response, 400, "Either email or phone number is required");
    }

    // Find user
    const user = email ? await User.findOne({ email }) : await User.findOne({ phone_number });

    if (!user) {
      return sendErrorResponse(response, 400, "Account with given credentials does not exist");
    }

    // Validate password
    if (!(await bcrypt.compare(password, user.password))) {
      return sendErrorResponse(response, 401, "Incorrect password");
    }

    // Remove password from response
    user.password = undefined;

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT Secret is missing in environment variables");
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: email, id: user._id, account_type: user.account_type },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Set token in cookie
    return response
      .cookie("token", token, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), httpOnly: true })
      .status(200)
      .json({ success: true, message: "User login successful", user, token });
  } catch (error) {
    console.error(error);
    return sendErrorResponse(response, 500, "Error while logging in");
  }
};
