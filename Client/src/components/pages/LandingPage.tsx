import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar"; // Adjust the path if necessary
import HeroSection from "../HeroSection"; // Adjust the path if necessary
import AboutUsSection from "../AboutUsSection"; // Adjust the path if necessary
import HealthSection from "../HealthSection"; // Import HealthSection
import FinanceSection from "../FinanceSection";  // Import FinanceSection
import ContactSection from "../ContactSection"; // Import ContactSection
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    // Navigate to login page
    navigate("/login");
  };

  return (
    <div className="landing-page">
      <Navbar />
      {/* Internal navigation sections */}
      <div id="home">
        <HeroSection />
      </div>
      <div id="about">
        <AboutUsSection />
      </div>
      <div id="health">
        <HealthSection />
      </div>
      <div id="finance">
        <FinanceSection /> {/* Finance section added here */}
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default LandingPage;
