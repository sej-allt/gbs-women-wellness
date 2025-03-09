import React from "react";
import { useNavigate } from "react-router-dom"; // For external navigation
import { Link as ScrollLink } from "react-scroll"; // For internal navigation
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/src/assets/logo-placeholder.png" alt="Your Logo" />
      </div>
      <ul className="nav-links">
        <li>
          <ScrollLink to="home" smooth={true} duration={500}>
            Home
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="about" smooth={true} duration={500}>
            About Us
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="health" smooth={true} duration={500}>
            Health
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="finance" smooth={true} duration={500}>
            Finance
          </ScrollLink>
        </li>
        <li>
          <ScrollLink to="contact" smooth={true} duration={500}>
            Contact Us
          </ScrollLink>
        </li>
      </ul>
      <div className="buttons">
        <button className="get-started" onClick={() => navigate("/login")}>
          Get Started with Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
