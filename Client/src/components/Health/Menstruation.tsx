import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa"; // Example icon for cycle
import { useSelector } from "react-redux";
import { fetchMenstruationCycleDetails, updateMenstruationCycle } from "../../operations/services/menstruation";
import { useAppDispatch } from "../../types/hooks";
import "./MenstruationCycleDiv.css";
import { ProgressCalendar } from "./ProgressCalendar";

const MenstruationCycleDiv = () => {
  const [cycleData, setCycleData] = useState([]);
  const [isCycleActive, setIsCycleActive] = useState(false);
  const [currentCycleStart, setCurrentCycleStart] = useState(null);

  const dispatch = useAppDispatch()
  // Get user from Redux or localStorage
  const user = useSelector((state: RootState) => state.auth.user) ||
  JSON.parse(localStorage.getItem("user") || "{}");

  // Load cycle data from backend
  const loadCycleData = async () => {
    if (!user || !user._id) return;
    try {
      const response = await dispatch(fetchMenstruationCycleDetails(user));
      if (response?.success) {
        // Assume each entry is { start, end } dates
        const records = response.data.map((entry) => ({
          start: dayjs(entry.start).format("YYYY-MM-DD"),
          end: entry.end ? dayjs(entry.end).format("YYYY-MM-DD") : null,
        }));
        setCycleData(records);

        // Check if an active cycle exists (one with no end date)
        const ongoingCycle = records.find((entry) => !entry.end);
        if (ongoingCycle) {
          setIsCycleActive(true);
          setCurrentCycleStart(ongoingCycle.start);
        } else {
          setIsCycleActive(false);
          setCurrentCycleStart(null);
        }
      }
    } catch (error) {
      console.error("Failed to fetch cycle data:", error);
    }
  };

  useEffect(() => {
    loadCycleData();
  }, [user]);

  // Start a new cycle (record start date)
  const startCycle = async () => {
    if (!user || !user._id || isCycleActive) return;
    const today = dayjs().format("YYYY-MM-DD");
    try {
      const response = await dispatch(updateMenstruationCycle(user, { start: today }));
      if (response?.success) {
        setIsCycleActive(true);
        setCurrentCycleStart(today);
        loadCycleData();
      }
    } catch (error) {
      console.error("Failed to start cycle:", error);
    }
  };

  // End the active cycle (record end date)
  const endCycle = async () => {
    if (!user || !user._id || !isCycleActive) return;
    const today = dayjs().format("YYYY-MM-DD");
    try {
      const response = await dispatch(updateMenstruationCycle(user, { end: today }));
      if (response?.success) {
        setIsCycleActive(false);
        setCurrentCycleStart(null);
        loadCycleData();
      }
    } catch (error) {
      console.error("Failed to end cycle:", error);
    }
  };

  return (
    <div className="menstrual-container">
      <h3>Menstruation Tracker <FaRegCalendarAlt className="cycle-icon" /></h3>

      <div className="status">
        {isCycleActive ? (
          <p className="active">Cycle started on: {currentCycleStart}</p>
        ) : (
          <p className="inactive">No active cycle</p>
        )}
      </div>

      <div className="buttons">
        <button className="start-btn" onClick={startCycle} disabled={isCycleActive}>
          Start Cycle
        </button>
        <button className="end-btn" onClick={endCycle} disabled={!isCycleActive}>
          End Cycle
        </button>
      </div>

      {/* Display a calendar view using your existing ProgressCalendar */}
      <ProgressCalendar 
        data={cycleData.map(cycle => ({ date: cycle.start, value: cycle.end ? 1 : 0 }))}
        goal={1} 
        color="#f78fb3"
        title="Cycle Calendar" 
      />
    </div>
  );
};

export default MenstruationCycleDiv;
