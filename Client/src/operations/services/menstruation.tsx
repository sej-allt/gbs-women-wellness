import { toast } from "react-hot-toast";
import { Dispatch } from "redux";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { GET_MENSTRUAL_CYCLE, TRACK_MENSTRUAL_CYCLE } = endpoints;

interface User {
  _id: string;
  // Add other user properties as needed
}

interface CycleData {
  start?: string;
  end?: string;
}

export function fetchMenstruationCycleDetails(user: User) {
  return async (dispatch: Dispatch): Promise<any> => {
    try {
      const response = await apiConnector("POST", GET_MENSTRUAL_CYCLE, { user });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch cycle data");
      }
      return response.data;
    } catch (error: any) {
      console.error("Error in fetchMenstruationCycleDetails:", error);
    //   toast.error(error.response?.data?.message || "Could not fetch cycle data");
    }
  };
}

export function updateMenstruationCycle(user: User, data: CycleData) {
  return async (dispatch: Dispatch): Promise<any> => {
    try {
      const response = await apiConnector("POST", TRACK_MENSTRUAL_CYCLE, { user, ...data });
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to update cycle data");
      }
      return response.data;
    } catch (error: any) {
      console.error("Error in updateMenstruationCycle:", error);
      toast.error(error.response?.data?.message || "Could not update cycle data");
    }
  };
}
