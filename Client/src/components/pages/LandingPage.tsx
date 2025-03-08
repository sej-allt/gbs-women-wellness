import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "../pages/Navbar"; // Import Navbar
import HeroSection from "../HeroSection"; // Import HeroSection
import AboutUsSection from "../AboutUsSection"; // Import AboutUsSection
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleGetStartedClick = () => {
    // Navigate to login page
    navigate("/login"); // Or navigate("/signup") if you want to show the signup page
  };

  return (
    <div className="landing-page">
      <Navbar />
      <HeroSection />
      <AboutUsSection />  {/* Add AboutUsSection here */}
    </div>
  );
};

export default LandingPage;
