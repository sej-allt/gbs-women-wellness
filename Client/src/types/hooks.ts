import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store"; // Import your store's dispatch type

export const useAppDispatch = () => useDispatch<AppDispatch>(); 
