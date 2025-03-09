import React from "react";
import healthImg1 from "../assets/health1.png";  // Replace with your actual image paths
import healthImg2 from "../assets/health2.png";
import healthImg3 from "../assets/health3.png";
import "./HealthSection.css";  // Assuming you will create a separate CSS file for styling

const HealthSection = () => {
  return (
    <section className="health-section" id="health">
      <div className="health-header">
        <h2>Health with Wellth</h2>
      </div>
      <div className="health-container">
        <div className="health-item">
          <img src={healthImg1} alt="Health 1" className="health-image" />
          <p className="health-text">Personalized Health Insights including water tracker,sleep tracker</p>
        </div>
        <div className="health-item">
          <img src={healthImg2} alt="Health 2" className="health-image" />
          <p className="health-text">Track Your Wellness Journey featuring menstrual cycle tracker </p>
        </div>
        <div className="health-item">
          <img src={healthImg3} alt="Health 3" className="health-image" />
          <p className="health-text">Achieve Your Fitness Goals through medidation,exercise,etc</p>
        </div>
      </div>
    </section>
  );
};

export default HealthSection;
