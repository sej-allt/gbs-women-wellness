import { useState } from "react";
import { FaBell, FaUser } from "react-icons/fa"; // Elegant Icons
import { useSelector } from "react-redux";
import { RootState } from "../types/store"; // Adjust path as needed
import "./Dashboard.css";
import MenstruationCycleDiv from "./Health/Menstruation";
import { SleepTracker } from "./Health/SleepTracker";
import { VideoLecturesDiv } from "./Health/VideoLecturesDiv";
import WaterDiv from "./Health/WaterDiv";

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user); // Get user from Redux
  const userName = user?.name || "User"; // Default if name is missing

  const [steps, setSteps] = useState(7000);
  const [water, setWater] = useState(6);
  const [sleep, setSleep] = useState(7);

  return (
    <div className="dashboard">
      
      {/* Navbar */}
      <div className="container-main">
      <nav className="navbar">
        <h2>Hi, {userName} 👋</h2>
        <div className="icons">
          <FaBell className="icon" />
          <FaUser className="icon" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="trackers-container">
          <WaterDiv />
          <SleepTracker />
          <MenstruationCycleDiv></MenstruationCycleDiv>
          <VideoLecturesDiv></VideoLecturesDiv>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Dashboard;
