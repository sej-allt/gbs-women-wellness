// src/components/VerifyEmail.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Auth.css"; // Ensure this is imported for styling

const VerifyEmail: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Verify OTP API call
      const response = await axios.post("http://localhost:4000/api/v1/auth/verifyotp", {
        otp,
      });

      if (response.data.success) {
        // If OTP is valid, call the signup API
        const signupResponse = await axios.post("http://localhost:4000/api/v1/auth/signup", {
          // Pass required user details (store these in localStorage or context)
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          name: localStorage.getItem("name"),
        });

        if (signupResponse.data.success) {
          localStorage.setItem("currentUser", JSON.stringify(signupResponse.data.user));
          navigate("/dashboard"); // Redirect to dashboard
        } else {
          setError("Signup failed. Please try again.");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Verify Your Email</h2>
        <p className="auth-subtitle">Enter the OTP sent to your email</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="auth-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>

        <p className="auth-footer">
          Didn’t receive OTP? <a href="#">Resend</a>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
