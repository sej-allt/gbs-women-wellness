import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../assets/slide1.webp"; // Replace with your actual image paths
import slide2 from "../assets/slide2.jpg";
import slide3 from "../assets/slide3.avif";
import slide4 from "../assets/slide4.webp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <Carousel fade>
        {/* Health Wellness Slides */}
        <Carousel.Item>
          <img className="d-block w-100" src={slide1} alt="Health Wellness 1" />
          <Carousel.Caption>
            <h3>Empower Your Health with Wellth</h3>
            <p>Unlock personalized health insights to elevate your fitness, nutrition, and mental wellness.</p>
          </Carousel.Caption>
        </Carousel.Item>
        
        <Carousel.Item>
          <img className="d-block w-100" src={slide2} alt="Health Wellness 2" />
          <Carousel.Caption>
            <h3>Thrive with Wellth—Your Path to Holistic Health</h3>
            <p>Track key health metrics and achieve your wellness goals with data-driven support.</p>
          </Carousel.Caption>
        </Carousel.Item>

        {/* Wealth Wellness Slides */}
        <Carousel.Item>
          <img className="d-block w-100" src={slide3} alt="Wealth Wellness 1" />
          <Carousel.Caption>
            <h3>Build Your Wealth, Build Your Future with Wellth</h3>
            <p>Master your finances with smart tracking tools and actionable insights to grow your wealth.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100" src={slide4} alt="Wealth Wellness 2" />
          <Carousel.Caption>
            <h3>Unlock Your Financial Potential with Wellth</h3>
            <p>Set financial goals, track spending, and create a secure financial future—all with Wellth’s personalized guidance.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default HeroSection;
