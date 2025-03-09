import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { BsAlarmFill, BsMoonStarsFill } from "react-icons/bs";
import { getSleepData, markSleep } from "../../operations/services/fetchdetails"; // Import getSleepData
import { useAppDispatch } from "../../types/hooks";
import { ProgressCalendar } from "./ProgressCalendar";
import "./SleepTracker.css";

type ProgressData = {
  date: string;
  value: number;
};

export const SleepTracker: React.FC = () => {
  const [sleepTime, setSleepTime] = useState(localStorage.getItem("sleep_time") || "22:30");
  const [wakeTime, setWakeTime] = useState(localStorage.getItem("wake_time") || "07:00");
  const [sleepGoal, setSleepGoal] = useState<number>(8);
  const [sleepQuestionVisible, setSleepQuestionVisible] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<"Yes" | "No" | null>(null);
  const [manualSleepTime, setManualSleepTime] = useState(sleepTime);
  const [manualWakeTime, setManualWakeTime] = useState(wakeTime);
  const [animationClass, setAnimationClass] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Get user from localStorage

  // Fetch and generate sleep data for ProgressCalendar
  const [sleepData, setSleepData] = useState<ProgressData[]>([]);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await dispatch(getSleepData(user)); // Call getSleepData
        console.log(response);
        const records = response.map((entry: any) => {
                console.log(entry);
                return({
                date: dayjs(entry.day).format("YYYY-MM-DD"), // Convert to 'YYYY-MM-DD'
                value: entry.hours, // Extract water intake
              })});
              console.log(records)
        setSleepData(records);
      } catch (error) {
        console.error("Error fetching sleep data:", error);
      }
    };

    fetchSleepData();
  }, [sleepTime, wakeTime]); // Fetch data on mount and when sleep/wake time changes

  // Calculate Sleep Duration
  const calculateSleepDuration = (start: string, end: string): number => {
    const [sleepH, sleepM] = start.split(":").map(Number);
    const [wakeH, wakeM] = end.split(":").map(Number);
    let duration = wakeH - sleepH + (wakeM - sleepM) / 60;
    return duration < 0 ? duration + 24 : duration;
  };

  // Mood logic
  const getSleepMood = (hours: number) => {
    if (selectedAnswer !== null) {
      if (hours < 5) return "😴 Tired";
      if (hours < 8) return "🙂 Rested";
      return "😃 Super Rested";
    }
  };

  useEffect(() => {
    localStorage.setItem("sleep_time", sleepTime);
    localStorage.setItem("wake_time", wakeTime);
  }, [sleepTime, wakeTime]);

  const handleMarkSleep = () => {
    const sleepDuration = calculateSleepDuration(
      selectedAnswer === "No" ? manualSleepTime : sleepTime,
      selectedAnswer === "No" ? manualWakeTime : wakeTime
    );

    dispatch(
      markSleep(user, selectedAnswer, selectedAnswer === "No" ? manualSleepTime : sleepTime, selectedAnswer === "No" ? manualWakeTime : wakeTime)
    );

    if (selectedAnswer === "Yes") {
      setAnimationClass("happy-animation");
    } else {
      setAnimationClass(sleepDuration < calculateSleepDuration(sleepTime, wakeTime) ? "sad-animation" : "happy-animation");
    }
    setSleepQuestionVisible(false);

    setTimeout(() => {
      setAnimationClass(null); // Hide animation after 3 seconds
    }, 3000);
  };

  return (
    <div className="sleep-container">
      <h3>Sleep Tracker</h3>

      <div className="sleep-mood-container">
        <span className={`sleep-mood ${getSleepMood(calculateSleepDuration(sleepTime, wakeTime))}`}>
          {getSleepMood(calculateSleepDuration(sleepTime, wakeTime))}
        </span>
      </div>

      {animationClass && <div className={`sleep-animation ${animationClass}`}></div>}

      {sleepQuestionVisible && (
        <div className="sleep-question">
          <p>Did you sleep well today? ({sleepTime} - {wakeTime})</p>
          <button onClick={() => { setSelectedAnswer("Yes"); handleMarkSleep(); }}>Yes</button>
          <button onClick={() => setSelectedAnswer("No")}>No</button>
        </div>
      )}

      {selectedAnswer === "No" && (
        <div className="manual-sleep-entry">
          <div className="input-box">
            <BsMoonStarsFill className="input-icon" />
            <label>Sleep Time</label>
            <input type="time" value={manualSleepTime} onChange={(e) => setManualSleepTime(e.target.value)} />
          </div>
          <div className="input-box">
            <BsAlarmFill className="input-icon" />
            <label>Wake Time</label>
            <input type="time" value={manualWakeTime} onChange={(e) => setManualWakeTime(e.target.value)} />
          </div>
          <button className="mark-sleep-btn" onClick={handleMarkSleep}>Mark</button>
        </div>
      )}

      {/* Progress Calendar */}
      <div className="sleep-calendar">
        <ProgressCalendar data={sleepData} goal={sleepGoal} color="green" title="Sleep Progress" />
      </div>
    </div>
  );
};
