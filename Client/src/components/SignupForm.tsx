import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import logo from "../assets/logo-placeholder.png";
import { sendOtp, signup } from "../services/auth";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0 && !canResend) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, canResend]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the formData
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check if the passwords match
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setPasswordMatchError("Passwords do not match.");
      } else {
        setPasswordMatchError("");
      }
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  // Handle OTP sending and ensure password match validation
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission by default

    // Check if passwords match before sending OTP
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
      return; // Don't proceed if passwords don't match
    }

    // Send OTP if passwords match
    await sendOtp(formData.email, navigate);
    setShowOtpInput(true);
    setResendTimer(59);
    setCanResend(false);
  };

  const handleOtpSubmit = async () => {
    try {
      await signup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.confirmPassword,
        otp,
        navigate
      );
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        {!showOtpInput ? (
          <>
            <h2 className="auth-title">Create Your Account</h2>
            <form onSubmit={handleSendOtp} className="auth-form">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="auth-input"
              />
              {passwordMatchError && (
                <p className="error-message">{passwordMatchError}</p>
              )}
              <button type="submit" className="auth-button">
                Send OTP
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="auth-title">Enter OTP</h2>
            <p className="otp-instruction">An OTP has been sent to your email.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              required
              className="auth-input"
            />
            <button onClick={handleOtpSubmit} className="auth-button">
              Verify OTP & Signup
            </button>
            <p className="resend-otp">
              {canResend ? (
                <button onClick={handleSendOtp} className="resend-button">
                  Resend OTP
                </button>
              ) : (
                <>Resend OTP in {resendTimer} seconds</>
              )}
            </p>
          </>
        )}
        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
