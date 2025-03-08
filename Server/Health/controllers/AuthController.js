import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpgenerator from "otp-generator";
import { Health } from "../models/healthDetails.model.js";
import { Otp } from "../models/otps.model.js";
import { Preferences } from "../models/preferences.model.js";
import { User } from "../models/users.model.js";

<<<<<<< HEAD
// Helper function to send error responses
const sendErrorResponse = (res, status, message) => {
  return res.status(status).json({ success: false, message });
};

// ✅ Send OTP API
=======
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
export const sendotp = async (request, response) => {
  try {
    const { email, phone_number } = request.body;

    if (!email && !phone_number) {
<<<<<<< HEAD
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
=======
      return response.status(400).json({
        success: false,
        message: "Either email or password required",
      });
    }

    //check if already present
    let usr;
    if (email) {
      usr = await User.findOne({ email: email });
    } else {
      usr = await User.findOne({ phone_number });
    }
    if (usr) {
      return response.status(400).json({
        success: false,
        message: "user already exists",
      });
    }

    var otp = otpgenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log(otp);

    //check if its already present in the table otp
    let result = await Otp.findOne({ otp: otp });

    while (result) {
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
<<<<<<< HEAD
    } while (existingOtps.has(otp));

    console.log("Generated OTP:", otp);

    // Store OTP in the database with expiry time
    const otpdata = await Otp.create({ email, otp, createdAt: Date.now() });

    if (!otpdata) {
      console.log("OTP not saved in DB");
    }
=======
      result = await Otp.findOne({ otp: otp });
    }
    //create entry as well
    let otppayload = { email, otp };

    const otpdata = await Otp.create(otppayload);

    if (!otpdata) console.log("no otp bro saved ni hua ");
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4

    return response.status(200).json({
      success: true,
      otp,
<<<<<<< HEAD
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
=======
      message: "otp generated successfully",
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      otp: error,
      message: "otp generation failed",
    });
  }
};

>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
export const signup = async (request, response) => {
  try {
    const { name, email, password, confirm, otp } = request.body;

<<<<<<< HEAD
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
=======
    //validate
    if (!name || !email || !password || !confirm || !otp) {
      return response.status(500).json({
        success: false,
        message: " all fields are required",
      });
    }

    //password match

    if (password !== confirm) {
      return response.satus(502).json({
        success: false,
        message: "passwords do not match",
      });
    }

    //user with email exists already

    let user = await User.findOne({ email });
    if (user) {
      return response.status(502).json({
        success: false,
        message: "user already exists",
      });
    }

    //find most recent otp stored in db
    let dbotp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log(dbotp);
    if (dbotp.length === 0) {
      return response.status(400).json({
        success: false,
        message: "otp not found in db",
      });
    }
    console.log(dbotp[0].otp);
    if (otp !== dbotp[0].otp) {
      return response.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //hash passwords now when otp is matched

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: "error hashing passwords",
        error: error,
      });
    }

    //create entry
    console.log(hashedPassword);

    let userPayload = {
      name,
      email,
      password: hashedPassword,
    };

    let usernew = await User.create(userPayload);
    usernew.password = undefined;

    //create for profile first then connect with users in additional details
    const preference = await Preferences.create({
      user_id: usernew._id,
    });
    const details = await Health.create({
      user_id: usernew._id,
    });
    return response.status(200).json({
      success: true,
      message: "user registered successfully",
      user: usernew,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: "error registering user",
      error: error,
    });
  }
};

>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
export const login = async (request, response) => {
  try {
    const { email, phone_number, password } = request.body;

    if (!password) {
<<<<<<< HEAD
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
=======
      return response.status(400).json({
        success: false,
        message: "password required",
      });
    }
    if (!email && phone_number) {
      return response.status(400).json({
        success: false,
        message: "either email or phone number required",
      });
    }

    let user_details;
    user_details = await User.findOne({ email });

    if (!user_details) {
      return response.status(400).json({
        success: false,
        message: "Account with credentials does not exists",
      });
    }
    console.log(user_details);
    if (await bcrypt.compare(password, user_details.password)) {
      user_details.password = undefined;

      let payload = {
        user: email,
        id: user_details._id,
        account_type: user_details.account_type,
      };
      console.log(payload);
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user_details.token = token;

      //create cookkie

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //ms
        httpOnly: true,
      };

      return response.cookie("token", token, options).status(200).json({
        success: true,
        message: "User Login Successful",
        user: user_details,
        token: token,
      });
    } else {
      return response.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    return response.status(500).json({
      success: false,
      message: " error while logging in",
      error: error.message,
    });
>>>>>>> b36ebe12f86fc6045d5eb24411822b875c6b8de4
  }
};
