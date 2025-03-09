import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";

const { ADD_VIDEO, GET_ALL_VIDEOS, MARK_VIDEO_COMPLETED } = endpoints;

export function addVideo(videoData: { videoLink: string; tag: string }) {
  return async (dispatch: any) => {
    try {
      const response = await apiConnector("POST", ADD_VIDEO, videoData);
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to add video");
      }
      return response.data;
    } catch (error: any) {
      console.error("Error in addVideo:", error);
      toast.error(error.response?.data?.message || "Could not add video");
    }
  };
}

export function fetchAllVideos() {
  return async (dispatch: any) => {
    try {
      const response = await apiConnector("GET", GET_ALL_VIDEOS);
      if (!response.data?.success) {
        throw new Error(response.data?.message || "Failed to fetch videos");
      }
      return response.data;
    } catch (error: any) {
      console.error("Error in fetchAllVideos:", error);
      toast.error(error.response?.data?.message || "Could not fetch videos");
    }
  };
}

// In videoService.ts

export function markVideoCompleted(videoId: string, userId: string) {
    return async (dispatch: any) => {
      try {
        const response = await apiConnector("POST", MARK_VIDEO_COMPLETED, {
          videoId,
          userId,
        });
        if (!response.data?.success) {
          throw new Error(response.data?.message || "Failed to mark video completed");
        }
        return response.data;
      } catch (error: any) {
        console.error("Error in markVideoCompleted:", error);
        toast.error(
          error.response?.data?.message || "Could not mark video completed"
        );
      }
    };
  }
  