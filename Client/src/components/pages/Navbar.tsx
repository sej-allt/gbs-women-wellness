import React from "react";
import { Link, useNavigate } from "react-router-dom";  // Import Link component
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/src/assets/logo-placeholder.png" alt="Your Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="#home">Home</Link></li>  {/* Use Link for internal navigation */}
        <li><Link to="#about">About Us</Link></li>
        <li><Link to="#health">Health</Link></li>
        <li><Link to="#finance">Finance</Link></li>
        <li><Link to="#contact">Contact Us</Link></li>
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
