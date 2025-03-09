import { useEffect, useState } from "react";
import "./calendar.css";

interface WaterIntake {
  date: string; // Format: YYYY-MM-DD
  glasses: number;
}

interface WaterCalendarProps {
  goal: number;
  fetchData: () => Promise<WaterIntake[]>; // Function to fetch water intake data
}
const fetchWaterData = async () => {
    return [
      { date: "2025-03-05", glasses: 3 },
      { date: "2025-03-10", glasses: 7 },
      { date: "2025-03-15", glasses: 2 },
    ]; // Simulated API response
  };
  
  
  

const WaterCalendar = ({ goal, fetchData }: WaterCalendarProps) => {
  const [waterData, setWaterData] = useState<WaterIntake[]>([]);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setWaterData(data);
    };
    getData();
  }, [fetchData]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Convert data into a map for easy lookup
  const waterMap = new Map<string, number>();
  waterData.forEach((entry) => {
    waterMap.set(entry.date, entry.glasses);
  });

  return (
    <div className="water-calendar">
      <h3>Water Intake Calendar</h3>
      <div className="calendar-grid">
        {/* Empty divs for spacing (aligns first day correctly) */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="empty-cell"></div>
        ))}

        {/* Generate days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;
          const glasses = waterMap.get(dateKey) || 0;
          const fillPercentage = Math.min((glasses / goal) * 100, 100);

          return (
            <div key={dateKey} className="day">
              <div className="water-fill" style={{ height: `${fillPercentage}%` }}></div>
              <span className="date">{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
<WaterCalendar goal={8} fetchData={fetchWaterData} />;

export default WaterCalendar;
