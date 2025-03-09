import axios, { Method } from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = (
  method: Method, // Type for HTTP methods
  url: string,
  bodyData?: any,
  headers?: Record<string, string>,
  params?: Record<string, any>
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData ?? null,
    headers: headers ?? undefined,
    params: params ?? undefined,
  });
};
