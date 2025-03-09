import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector"; // Adjust the import based on your project structure
import { endpoints } from "../apis"; // Adjust based on your API routes


const {GET_TRACK_WATER, TRACK_WATER, GETSLEEPSCHEDULE , SET_SLEEP_TIME, MARK_SLEEP, GET_SLEEP_DATA } = endpoints;
export function fetchWaterTrackDetails(user: {}) {
  return async (dispatch: (action: any) => void) => {

    try {
      const response = await apiConnector("POST", GET_TRACK_WATER, { user });

      console.log("fetchWaterTrackDetails response:", response);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch water intake data");
      }
      return response.data; // Returning data if needed in the calling component
    } catch (error: any) {
      console.error("Error in fetchWaterTrackDetails:", error);
      toast.error(error.response?.data?.message || "Could not fetch water intake data");
    } finally {
    }
  };
}

export function updateWaterIntake(user: {}, glasses: number) {
    return async (dispatch: (action: any) => void) => {
  
      try {
        const response = await apiConnector("POST", TRACK_WATER, { user, glasses });
  
        console.log("updateWaterIntake response:", response);
  
        if (!response.data?.success) {
          throw new Error(response.data?.message || "Failed to update water intake");
        }
  
        return response.data; // Returning data if needed in the calling component
      } catch (error: any) {
        console.error("Error in updateWaterIntake:", error);
        toast.error(error.response?.data?.message || "Could not update water intake");
      } finally {
      }
    };
  }


export function getSleepSchedule(user: {}) {
    return async (dispatch: (action: any) => void) => {
      try {
        // Check if data exists in localStorage
        const cachedData = localStorage.getItem("sleepSchedule");
        if (cachedData) {
          console.log("Using cached sleep schedule:", JSON.parse(cachedData));
          return JSON.parse(cachedData);
        }
  
        // If no cache, fetch from API
        const response = await apiConnector("POST", GETSLEEPSCHEDULE, { user });
  
        console.log("getSleepSchedule response:", response);
  
        if (!response.data?.success) {
          throw new Error(response.data?.message || "Failed to fetch sleep schedule");
        }
  
        // Store data in localStorage
        localStorage.setItem("sleepSchedule", JSON.stringify(response.data));
  
        return response.data; // Returning data if needed in the calling component
      } catch (error: any) {
        console.error("Error in getSleepSchedule:", error);
        toast.error(error.response?.data?.message || "Could not fetch sleep schedule");
      }
    };
  }

  export function markSleep(user: {}, sleep: "Yes" | "No" |null, sleep_time?: string, wake_time?: string) {
    return async (dispatch: (action: any) => void) => {
      try {
        const sleepStatus = sleep === "Yes";
  
        const payload = { user, sleep: sleepStatus, sleep_time, wake_time };
  
        const response = await apiConnector("POST", MARK_SLEEP, payload);
  
        console.log("markSleep response:", response);
  
        if (!response.data?.success) {
          throw new Error(response.data?.message || "Failed to mark sleep");
        }
  
        // Store latest sleep data in localStorage
        localStorage.setItem("sleepSchedule", JSON.stringify(response.data));
  
        toast.success("Sleep status updated successfully!");
  
        return response.data; // Returning data if needed in the calling component
      } catch (error: any) {
        console.error("Error in markSleep:", error);
        toast.error(error.response?.data?.message || "Could not update sleep status");
      }
    };
  }

  export function setSleepTime(user: {}, sleep_time: string, wake_time: string) {
    return async (dispatch: (action: any) => void) => {
      try {
        const payload = { user, sleep_time, wake_time };
  
        const response = await apiConnector("POST", SET_SLEEP_TIME, payload);
  
        console.log("setSleepTime response:", response);
  
        if (!response.data?.success) {
          throw new Error(response.data?.message || "Failed to set sleep time");
        }
  
        // Store updated sleep time in localStorage
        localStorage.setItem("sleepSchedule", JSON.stringify(response.data));
  
        toast.success("Sleep time updated successfully!");
  
        return response.data; // Returning data if needed in the calling component
      } catch (error: any) {
        console.error("Error in setSleepTime:", error);
        toast.error(error.response?.data?.message || "Could not update sleep time");
      }
    };
  }


export function getSleepData(user: {}) {
  return async (dispatch: (action: any) => void) => {
    try {
        console.log(user);
        console.log(GET_SLEEP_DATA);
      const response = await apiConnector("POST", GET_SLEEP_DATA, { user });

      console.log("getSleepData response:", response);

      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch sleep data");
      }

      // Store sleep data in localStorage
      localStorage.setItem("sleepSchedule", JSON.stringify(response.data.data));

      return response.data.data; // Returning data if needed in the calling component
    } catch (error: any) {
      console.error("Error in getSleepData:", error);
      toast.error(error.response?.data?.message || "Could not fetch sleep data");
    }
  };
}
