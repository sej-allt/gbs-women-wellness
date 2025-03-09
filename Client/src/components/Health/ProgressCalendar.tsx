import { useEffect, useState } from "react";
import "./ProgressCalendar.css";

interface ProgressData {
  date: string; // Format: YYYY-MM-DD
  value: number; // Value to track (e.g., glasses of water, steps, hours of sleep)
}

interface ProgressCalendarProps {
  data: ProgressData[];
  goal: number;
  color: string; // Fill color for progress effect
  title?: string;
}

export const ProgressCalendar = ({ data, goal, color, title = "Progress Calendar" }: ProgressCalendarProps) => {
  const [progressMap, setProgressMap] = useState<Map<string, number>>(new Map());

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  useEffect(() => {
    const map = new Map<string, number>();
    if(data.length !==0){
    data.forEach((entry) => {
      map.set(entry.date, entry.value);
    });
    setProgressMap(map)};
  }, [data]);

  return (
    <div className="progress-calendar">
      <h3>{title}</h3>
      <div className="calendar-grid">
        {/* Empty cells for alignment */}
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="empty-cell"></div>
        ))}

        {/* Generate day circles */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;
          const value = progressMap.get(dateKey) || 0;
          const fillPercentage = Math.min((value / goal) * 100, 100);

          return (
            <div key={dateKey} className="day">
              <div
                className="progress-fill"
                style={{ height: `${fillPercentage}%`, backgroundColor: color }}
              ></div>
              <span className="date">{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

