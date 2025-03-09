import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo-placeholder.png";
import { sendotp, signup } from "../operations/services/authapis";
import "../styles/Auth.css";
import { useAppDispatch } from "../types/hooks";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name : "",
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
  const dispatch= useAppDispatch();

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(sendotp(formData.email,navigate))
    setShowOtpInput(true);
    setResendTimer(59);
    setCanResend(false);
  };

  const handleOtpSubmit = () => {
    // alert("OTP Verified! Registration successful.");
    dispatch(signup(formData.name , formData.email , formData.password, formData.confirmPassword, otp, navigate))
    navigate("/login");
  };

  const handleResendOtp = () => {
    if (canResend) {
      alert("OTP Resent!");
      setResendTimer(59);
      setCanResend(false);
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
            <form onSubmit={handleSubmit} className="auth-form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
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
              <button type="submit" className="auth-button">Sign Up</button>
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
            <button onClick={handleOtpSubmit} className="auth-button">Verify OTP</button>
            <p className="resend-otp">
              {canResend ? (
                <button onClick={handleResendOtp} className="resend-button">Resend OTP</button>
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
