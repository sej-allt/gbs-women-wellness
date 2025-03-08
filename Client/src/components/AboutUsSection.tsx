import React, { useState } from "react";
import TabContent from "./TabContent"; // Import TabContent
import aboutUsImage from "../assets/logo-placeholder.png"; // Import image (adjust path as necessary)
import './AboutUsSection.css';

const AboutUsSection = () => {
  const [selectedTab, setSelectedTab] = useState("company");

  return (
    <section className="about-us-section">
      <div className="about-us-header">
        <h2>About Us</h2>
      </div>
      
      <div className="about-us-container">
        {/* Left side: Text & Tabs */}
        <div className="about-us-text">
          <div className="tabs">
            <span
              className={`tab-text ${selectedTab === "company" ? "active" : ""}`}
              onClick={() => setSelectedTab("company")}
            >
              Our Company
            </span>
            <span
              className={`tab-text ${selectedTab === "mission" ? "active" : ""}`}
              onClick={() => setSelectedTab("mission")}
            >
              Our Mission
            </span>
            <span
              className={`tab-text ${selectedTab === "vision" ? "active" : ""}`}
              onClick={() => setSelectedTab("vision")}
            >
              Our Vision
            </span>
          </div>

          {/* Paragraph and Learn More Button */}
          <div className="tab-content">
            <TabContent selectedTab={selectedTab} />
            <button className="learn-more-btn">Learn More</button>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="about-us-image">
          <img src={aboutUsImage} alt="About Us" /> {/* Use imported image */}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
