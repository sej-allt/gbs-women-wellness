import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL; // Read from .env file

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Ensures cookies are sent (for authentication)
});

// Function to make API requests
export const apiConnector = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  bodyData?: object,
  headers?: object,
  params?: object
) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || null,
      headers: headers || {},
      params: params || {},
    });

    return response;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
