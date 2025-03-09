import dayjs from "dayjs"; // Import dayjs for date formatting
import { Wine } from "phosphor-react"; // Elegant & minimal glass icon
import { useEffect, useState } from "react";
import { BiHappy, BiLaugh, BiSad } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchWaterTrackDetails, updateWaterIntake } from "../../operations/services/fetchdetails";
import { ProgressCalendar } from "./ProgressCalendar";

import "./WaterDiv.css";

const WaterDiv = () => {
  const [waterCount, setWaterCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [waterData, setWaterData] = useState<{ date: string; value: number }[]>([]);
  
  const dispatch = useDispatch();
  
  // Get user from Redux store or localStorage
  const user = useSelector((state: any) => state.auth.user) || 
               JSON.parse(localStorage.getItem("user") || "{}");

  // Fetch water intake data

const loadWaterData = async () => {
  if (!user || !user._id) return; // Ensure user exists

  try {
    const response = await dispatch(fetchWaterTrackDetails(user) as any);
    console.log(response);
    if (response?.success) {
      const records = response.data.map((entry: any) => {
        console.log(entry);
        return({
        date: dayjs(entry.day).format("YYYY-MM-DD"), // Convert to 'YYYY-MM-DD'
        value: entry.glasses, // Extract water intake
      })});

      setWaterData(records);
      setWaterCount(records.length > 0 ? records[0].value : 0);
    }
  } catch (error) {
    console.error("Failed to fetch water data:", error);
  }
};


  console.log(waterData)

  useEffect(() => {
    loadWaterData();
  }, [user]); // Refetch if user changes

  // Handle water intake update
  const updateWater = async (newCount: number) => {
    if (!user || !user._id) return; // Ensure user exists
    if (newCount >= 0) {
      setWaterCount(newCount);
      await dispatch(updateWaterIntake(user, newCount) as any);
      loadWaterData(); // Refresh data after updating
    }
  };

  const increaseWater = () => {
    if (waterCount < goal) updateWater(waterCount + 1);
  };

  const decreaseWater = () => {
    if (waterCount > 0) updateWater(waterCount - 1);
  };

  const getMoodIcon = () => {
    const ratio = waterCount / goal;
    if (ratio < 0.33) return <BiSad className="mood sad" />;
    if (ratio < 0.75) return <BiHappy className="mood happy" />;
    return <BiLaugh className="mood super-happy" />;
  };

  return (
    <div className="water-container">
      <h3>Stay Hydrated 💧</h3>

      <div className="mood-container">{getMoodIcon()}</div>

      <div className="counter">
   <button onClick={decreaseWater}>−</button> {/* Minus symbol looks cleaner */}
   <div className="glass">
     <Wine className="water-icon"  size={40} />
     <span>{waterCount} / {goal}</span>
   </div>
   <button onClick={increaseWater}>+</button>
 </div>

      <ProgressCalendar data={waterData} goal={goal} color="#A5E2E0" title="Water Intake" />
    </div>
  );
};

export default WaterDiv;
