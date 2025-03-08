// src/components/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Dashboard</h2>
        <p>Welcome to your dashboard!</p>
        <button onClick={handleLogout} className="auth-button" style={{ marginTop: "1rem" }}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
