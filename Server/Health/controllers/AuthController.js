import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpgenerator from "otp-generator";
import { Health } from "../models/healthDetails.model.js";
import { Otp } from "../models/otps.model.js";
import { Preferences } from "../models/preferences.model.js";
import { User } from "../models/users.model.js";

export const sendotp = async (request, response) => {
  try {
    const { email, phone_number } = request.body;

    if (!email && !phone_number) {
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
      otp = otpgenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await Otp.findOne({ otp: otp });
    }
    //create entry as well
    let otppayload = { email, otp };

    const otpdata = await Otp.create(otppayload);

    if (!otpdata) console.log("no otp bro saved ni hua ");

    return response.status(200).json({
      success: true,
      otp,
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

export const signup = async (request, response) => {
  try {
    const { name, email, password, confirm, otp } = request.body;

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

export const login = async (request, response) => {
  try {
    const { email, phone_number, password } = request.body;

    if (!password) {
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
  }
};
