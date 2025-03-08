import { apiConnector } from "./apiConnector";
import { endpoints } from "./apis";
import toast from "react-hot-toast";

// Extract API endpoints
const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API } = endpoints;

// Send OTP
export async function sendOtp(email: string, navigate: (path: string) => void) {
  try {
    toast.loading("Sending OTP...");
    const response = await apiConnector("POST", SENDOTP_API, { email, checkUserPresent: true });
    toast.dismiss();
    if (response.data.success) {
      toast.success("OTP sent successfully!");
      navigate("/verifyemail");
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.dismiss();
    toast.error("Failed to send OTP");
    console.error(error);
  }
}

// Signup
export async function signup(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirm: string,
  otp: string,
  navigate: (path: string) => void
) {
  try {
    toast.loading("Signing up...");
    const response = await apiConnector("POST", SIGNUP_API, {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      confirm,
      otp,
    });
    toast.dismiss();
    if (response.data.success) {
      toast.success("Signup Successful!");
      navigate("/login");
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.dismiss();
    toast.error("Signup Failed");
    console.error(error);
  }
}

// Login
export async function login(email: string, password: string, navigate: (path: string) => void) {
  try {
    toast.loading("Logging in...");
    const response = await apiConnector("POST", LOGIN_API, { email, password });
    toast.dismiss();
    if (response.data.success) {
      toast.success("Login Successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.dismiss();
    toast.error("Login Failed");
    console.error(error);
  }
}

// Logout
export function logout(navigate: (path: string) => void) {
  localStorage.removeItem("token");
  toast.success("Logged Out");
  navigate("/");
}

// Password Reset
export async function requestPasswordReset(email: string) {
  try {
    toast.loading("Sending reset email...");
    const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
    toast.dismiss();
    if (response.data.success) {
      toast.success("Password reset email sent!");
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.dismiss();
    toast.error("Failed to send reset email");
    console.error(error);
  }
}

// Reset Password
export async function resetPassword(token: string, password: string, confirmPassword: string) {
  try {
    toast.loading("Resetting password...");
    const response = await apiConnector("POST", RESETPASSWORD_API, { token, password, confirmpassword: confirmPassword });
    toast.dismiss();
    if (response.data.success) {
      toast.success("Password updated!");
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    toast.dismiss();
    toast.error("Failed to reset password");
    console.error(error);
  }
}
